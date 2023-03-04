import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from 'constructs';
import path from 'path';

const domain = "jackrose.co.nz"
const fullDomain = `mr-and-mrs.${domain}`;
const websiteDistSourcePath = "./website";

export class WeddingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //
    // {{{ setup static hosting on subdomain
    //
    // Create a private S3 bucket
    const sourceBucket = new s3.Bucket(this, "AssetsBucket", {
      websiteIndexDocument: "index.html",
      bucketName: fullDomain
    });

    // Create access identity, and grant read access only, we will use this identity in CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OIA",
      {
        comment: "Setup access from CloudFront to the bucket ( read )",
      }
    );
    sourceBucket.grantRead(originAccessIdentity);

    // Deploy the source code from the /app folder, in this example thats just 1 file.
    new BucketDeployment(this, "DeployWebsite", {
      sources: [Source.asset(websiteDistSourcePath)],
      destinationBucket: sourceBucket,
    });

    const zone = route53.HostedZone.fromLookup(this, "baseZone", {
      domainName: domain,
    });

    // Request the wildcard TLS certificate, CDK will take care of domain ownership validation via
    // CNAME DNS entries in Route53, a custom resource will be used on our behalf
    // NOTE: not using wildcare, will this still work?
    const myCertificate = new acm.DnsValidatedCertificate(this, "mySiteCert", {
      domainName: fullDomain,
      hostedZone: zone,
    });

    // Create the CloudFront Distribution, set the alternate CNAMEs and pass in the ACM ARN of the cert created.
    const cfDist = new cloudfront.CloudFrontWebDistribution(this, "myDist", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: sourceBucket,
            originAccessIdentity: originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
        myCertificate,
        { aliases: [fullDomain] }
      ),
    });
        // Create the wildcard DNS entry in route53 as an alias to the new CloudFront Distribution.
    new route53.ARecord(this, "AliasRecord", {
      zone,
      recordName: fullDomain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(cfDist)
      ),
    });
    //
    // }}}
    //

    const mainFunction = new NodejsFunction(this, 'MainFunction', {
      entry: path.join(__dirname, "lambdas/main.ts"),
      runtime: lambda.Runtime.NODEJS_18_X
    });

    const gateway = new apigw.LambdaRestApi(this, 'MainEndpoint', {
      handler: mainFunction
    });

    new cdk.CfnOutput(this, 'MainFunctionName', { value: mainFunction.functionName, })
    new cdk.CfnOutput(this, 'ApiGatewayUrl', { value: gateway.url })
  }
}

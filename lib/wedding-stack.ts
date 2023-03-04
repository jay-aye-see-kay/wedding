import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import path from 'path';

export class WeddingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

import Head from 'next/head'
import Image from 'next/image'
import eucalyptusImg from "../../wedding-images/eucalyptus-2.png"

const defaultPageTitle = "Nora & Jack's Wedding"

type Props = {
  pageTitle?: string
  children: React.ReactNode
}

export function PageWrapper(props: Props) {
  return (
    <>
      <Head>
        <title>{props.pageTitle ?? defaultPageTitle}</title>
        <meta name="description" content={defaultPageTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="parallax">
        <div className="parallax__layer parallax__layer--back">
          <div>&nbsp;</div>
          <Image
            alt=""
            src={eucalyptusImg}
            style={{ transform: "translate(-12%, calc(150px + -45vw)) rotate(170deg)" }}
          />
        </div>
        <div className="parallax__layer parallax__layer--back2">
          <div>&nbsp;</div>
          <Image
            alt=""
            src={eucalyptusImg}
            style={{ transform: "translate(30%, calc(150px + -50vw)) rotate(30deg)" }}
          />
        </div>
        <div className="parallax__layer parallax__layer--base">{props.children}</div>
      </main>
    </>
  )
}

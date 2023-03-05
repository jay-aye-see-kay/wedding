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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> {/* TODO: add favicon*/}
      </Head>
      <Image
        alt=""
        src={eucalyptusImg}
        className="absolute"
        style={{ transform: "translateY(-35%) translateX(-12%) rotate(170deg)" }}
      />
      <>{props.children}</>
    </>
  )
}

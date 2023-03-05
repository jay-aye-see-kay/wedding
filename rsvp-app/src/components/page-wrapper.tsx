import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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

      <div className="navbar bg-base-100">
        <div className="flex-1"></div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/rsvp">RSVP</Link>
            </li>
          </ul>
        </div>
      </div>

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

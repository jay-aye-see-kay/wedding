import { PageWrapper } from '@/components/page-wrapper'
import Link from 'next/link'

const pageTitle = "Nora & Jack's Wedding"

export default function Home() {
  return (
    <PageWrapper pageTitle={pageTitle}>
      <div className="text-center mx-auto max-w-2xl flex flex-col items-center shadow min-h-screen">
        <h1 className="font-sans mt-44 text-5xl">{pageTitle}</h1>
        <p className="mt-4">4th of November 2023</p>
        <p className="mt-1">Healesville Sanctuary</p>

        <div className="flex items-center my-6 space-x-4">
          <Link href="/" className="btn btn-outline">More info</Link>
          <Link href="/rsvp" className="btn btn-outline">RSVP</Link>
        </div>
      </div>
    </PageWrapper>
  )
}

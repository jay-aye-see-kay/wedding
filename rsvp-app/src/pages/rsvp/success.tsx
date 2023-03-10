import { PageWrapper } from '@/components/page-wrapper';
import Link from 'next/link';

const pageTitle = "RSVP to Nora & Jack's Wedding"

export default function Rsvp() {

  return (
    <PageWrapper pageTitle={pageTitle}>
      <div className="relative mt-8 m-auto max-w-xl px-6 py-4 rounded-lg bg-white text-center">
        <p className="text-lg mt-4 mb-8">Thanks your RSVP had been submitted</p>
        <p>
          If you need to change your response or have any other question send us an email: <a className="link" href="mailto:jack.and.nora@jackrose.co.nz">jack.and.nora@jackrose.co.nz</a>.
        </p>

        <div className="mb-2 mt-12 mx-1 flex justify-center">
          <Link href="/" className="btn">Return to home page</Link>
        </div>
      </div>
    </PageWrapper>
  )
}

import { PageWrapper } from "@/components/page-wrapper";
import Link from "next/link";

const pageTitle = "Nora & Jack's Wedding";

export default function Home() {
  return (
    <PageWrapper pageTitle={pageTitle}>
      <div className="text-center mx-auto max-w-2xl flex flex-col items-center shadow min-h-screen">
        <h1 className="font-sans mt-44 text-5xl">{pageTitle}</h1>
        <p className="mt-4">4th of November 2023</p>
        <p className="mt-1">Healesville Sanctuary</p>

        <div className="my-6">
          <p>
            Email us at{" "}
            <a className="link" href="mailto:jack.and.nora@jackrose.co.nz">
              jack.and.nora@jackrose.co.nz
            </a>{" "}
            if you need to update your RSVP
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

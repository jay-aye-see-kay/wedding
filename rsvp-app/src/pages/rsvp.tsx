import { PageWrapper } from '@/components/page-wrapper'

const pageTitle = "RSVP to Nora & Jack's Wedding"

export default function Rsvp() {
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (event.target.secret.value !== "skippy") {
      alert("secret code not correct, check your invite")
      return
    }
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        names: event.target.names.value,
        dietary: event.target.dietary.value,
      }),
    })
    console.log(await response.json())
  }

  return (
    <PageWrapper pageTitle={pageTitle}>
        <form className="mt-8 m-auto max-w-xl" onSubmit={handleSubmit}>
          <div className="card-body">

            <label className="my-2 input-group">
              <span>Names</span>
              <input className="input input-bordered" type="text" name="names" required />
            </label>

            <label className="my-2 input-group">
              <span>Dietary requirements</span>
              <input className="input input-bordered" type="text" name="dietary" required />
            </label>

            <label className="my-2 input-group">
              <span>Secret code</span>
              <input className="input input-bordered" type="text" name="secret" required />
            </label>

            <div className="my-2 card-actions justify-end">
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </div>
        </form>
    </PageWrapper>
  )
}

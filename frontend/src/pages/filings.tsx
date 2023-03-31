import FilingsIndex from "@/components/filings/filingsIndex"

export default function Filings() {
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">Filings Index</h1>
        </div>
      </div>
      <div className="m-4">
        <FilingsIndex includeFiler={true} />
      </div>
    </>
  )
}
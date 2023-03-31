import FilersIndex from "@/components/filers/filersIndex"

export default function Filers() {
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">Filers Index</h1>
        </div>
      </div>
      <div className="m-4">
        <FilersIndex />
      </div>
    </>
  )
}
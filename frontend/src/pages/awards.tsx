import AwardsIndex from "@/components/awards/awardsIndex"

export default function Awards() {
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">Awards Index</h1>
        </div>
      </div>
      <div className="m-4">
        <AwardsIndex includeFrom={true} includeTo={true} />
      </div>
    </>
  )
}
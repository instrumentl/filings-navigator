import RecipientsIndex from "@/components/recipients/recipientsIndex"

export default function Recipients() {
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">Recipients Index</h1>
        </div>
      </div>
      <div className="m-4">
        <RecipientsIndex />
      </div>
    </>
  )
}
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePostFilingMutation } from '@/state/apiSlice'
import { displayError } from '@/utils/errorToComponent'

export default function FilingsForm() {
  const [uploadType, setUploadType] = useState<"File" | "Url">("Url")
  const [fileData, setFileData] = useState<string | null>(null)
  const [urlData, setUrlData] = useState<string>("")
  const [usingSampleData, sampleDataSelect] = useState(false)
  const router = useRouter()
  const [postFiling, { data, isLoading, isSuccess, isError, error }] = usePostFilingMutation()

  useEffect(() => {
    if (isSuccess) {
      router.push(`/filings/${data.id}`)
    }
  }, [isSuccess, router, data])

  const generateSampleData = () => {
    sampleDataSelect(true)
    postFiling({ filing: { url: "https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201612429349300846_public.xml" }})
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (uploadType === "File") {
      if (fileData) {
        const encodedData = Buffer.from(fileData, 'utf-8')
        postFiling({ filing: { xml_data: encodedData.toString('base64') }})
      }
    } else {
      if (urlData.trim() !== "") {
        postFiling({ filing: { url: urlData }})
      }
    }
  }

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          setFileData(reader.result as string)
        }
      }
      reader.readAsText(event.target.files[0])
    }
  }

  const spanClasses = (isSampleButton: boolean) => {
    let classes = ''
    if (isLoading && isSampleButton === usingSampleData) {
      classes += 'spinner-border spinner-border-sm'
    }
    return classes
  }

  const buttonClasses = (isSampleButton: boolean) => {
    let classes = 'btn btn-outline-light btn-lg'
    const disableButton = (!isSampleButton && !validInput()) || 
      (isLoading && (isSampleButton !== usingSampleData))
    if (disableButton) {
      classes += ' disabled'
    }
    return classes
  }

  const switchCurrentFormType = () => {
    uploadType === "Url" ? setUploadType("File") : setUploadType("Url")
  }

  const validInput = () => {
    const validInputProvided = (uploadType === "Url" && urlData !== "") || 
      (uploadType === "File" && fileData)
    if (validInputProvided) {
      return true
    }
    return false
  }
  
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Filing Form</h1>
          <p className="col-md-8 fs-4">Generate sample data with a button click! (Alternatively, enter a url or file to create a new filing manually!)</p>
          <button className={buttonClasses(true)} onClick={generateSampleData} type="button">
            <span className={spanClasses(true)} />     
            {isLoading && usingSampleData ? ' Loading...' : 'Generate test data!'}
          </button>
        </div>
      </div>
      {isError && displayError(error)}
      <form className='m-4'>
        <div className={`mb-3 ${uploadType === "File" ? "hidden" : ""}`}>
          <label htmlFor="url" className='form-label'>XML URL:</label>
          <input type="text" name="url" id="url" value={urlData}
            onChange={(e) => setUrlData(e.target.value)} className='form-control' required />
        </div>
        <div className={`mb-3 ${uploadType === "Url" ? "hidden" : ""}`}>
          <label htmlFor="file" className='form-label'>Upload XML:</label>
          <input type="file" name="file" id="file" accept='text/xml' 
            onChange={(e) => handleFileSelect(e)} className='form-control' required />
        </div>
        <button className='btn btn-outline-light btn-lg' onClick={() => switchCurrentFormType()}>
          {uploadType === "Url" ? 'Upload a file instead!' : 'Enter a url instead!'}
        </button>
        <button className={"ms-2 " + buttonClasses(false)} onClick={handleSubmit}>
          <span className={spanClasses(false)} />
          {isLoading && !usingSampleData ? ' Loading...' : `Submit ${uploadType}`}
        </button>
      </form>
    </>
  )
}
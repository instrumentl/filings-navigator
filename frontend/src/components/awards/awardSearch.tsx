import React, { useState } from 'react'
import AwardsIndex from './awardsIndex'

export default function AwardSearch() {
  const [filingId, setFilingId] = useState("")
  const [filerEin, setFilerEin] = useState("")
  const [filerName, setFilerName] = useState("")
  const [recipientEin, setRecipientEin] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [checkMoreThan, setCheckMoreThan] = useState(false)
  const [amountMoreThan, setAmountMoreThan] = useState(1000)
  const [checkLessThan, setCheckLessThan] = useState(false)
  const [amountLessThan, setAmountLessThan] = useState(5000)
  const [submitted, setSubmitted] = useState(false)

  const stateToParams = () => {
    const paramsList = []
    if (filingId !== "") {paramsList.push(`filing_id=${filingId}`)}
    if (filerEin !== "") { paramsList.push(`filer_ein=${filerEin}`)}
    if (filerName !== "") {paramsList.push(`filer_name=${filerName}`)}
    if (recipientEin !== "") {paramsList.push(`recipient_ein=${recipientEin}`)}
    if (recipientName !== "") {paramsList.push(`recipient_name=${recipientName}`)}
    if (checkMoreThan) {paramsList.push(`amount_more_than=${amountMoreThan}`)}
    if (checkLessThan) {paramsList.push(`amount_less_than=${amountLessThan}`)}
    return paramsList.join('&')
  }
  
  const displayResults = () => {
    return (
      <div className="m-4">
        <hr />
        <h3 className="text-center">Query Results:</h3>
        <hr />
        <AwardsIndex params={stateToParams()} includeFrom={true} includeTo={true} />
      </div>
    )
  }

  const handleAmountInput = (amount: string, handleNumberType: string) => {
    let moneyAmount = parseInt(amount)
    if (moneyAmount < 0) {
      moneyAmount = 0
    }

    handleNumberType === 'checkMoreThan' ? 
      setAmountMoreThan(moneyAmount) :
      setAmountLessThan(moneyAmount)
  }
  
  return (
    <>
      <div className='m-4'>
        <h3 className="text-center">Find Awards By:</h3>
        <hr />
        <div className='row'>
          <div className='mb-3 col'>
            <label htmlFor="filerEin" className='form-label'>Filer EIN:</label>
            <input type="text" name="filerEin" id="filerEin" value={filerEin}
              onChange={(e) => setFilerEin(e.target.value)} className='form-control' disabled={submitted} />
          </div>
          <div className='mb-3 col'>
            <label htmlFor="filingId" className='form-label'>Filing ID:</label>
            <input type="text" name="filingId" id="filingId" value={filingId}
              onChange={(e) => setFilingId(e.target.value)} className='form-control' disabled={submitted} />
          </div>
          <div className='mb-3 col'>
            <label htmlFor="recipientEin" className='form-label'>Recipient EIN:</label>
            <input type="text" name="recipientEin" id="recipientEin" value={recipientEin}
              onChange={(e) => setRecipientEin(e.target.value)} className='form-control' disabled={submitted} />
          </div>
        </div>
        <div className='row'>
          <div className='mb-3 col'>
            <label htmlFor="filerName" className='form-label'>Filer Name:</label>
            <input type="text" name="filerName" id="filerName" value={filerName}
              onChange={(e) => setFilerName(e.target.value)} className='form-control' disabled={submitted} />
          </div>
          <div className='mb-3 col'>
            <label htmlFor="recipientName" className='form-label'>Recipient Name:</label>
            <input type="text" name="recipientName" id="recipientName" value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)} className='form-control' disabled={submitted} />
          </div>
        </div>
        <div className='row'>
          <div className='mb-3 col'>
            <label htmlFor="amountLessThan" className="form-label">Award Amount Less Than:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input type="number" className="form-control" id="amountLessThan" name="amountLessThan" min="0" step="1" value={amountLessThan} onChange={(e) => handleAmountInput(e.target.value, 'checkLessThan')} disabled={submitted} />
            </div>
            <div className="form-check form-switch mt-3">
              <label className="form-check-label" htmlFor="checkLessThan">Enable</label>
              <input className="form-check-input" type="checkbox" id="checkLessThan" name="checkLessThan" value={checkLessThan ? "0" : "1"} onClick={() => setCheckLessThan(!checkLessThan)} disabled={submitted} />
            </div>
          </div>
          <div className='mb-3 col'>
            <label htmlFor="amountMoreThan" className="form-label">Award Amount More Than:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input type="number" className="form-control" id="amountMoreThan" name="amountMoreThan" min="0" step="1" value={amountMoreThan} onChange={(e) => handleAmountInput(e.target.value, 'checkMoreThan')} disabled={submitted} />
            </div>
            <div className="form-check form-switch mt-3">
              <label className="form-check-label" htmlFor="checkMoreThan">Enable</label>
              <input className="form-check-input" type="checkbox" id="checkMoreThan" name="checkMoreThan" value={checkMoreThan ? "0" : "1"} onClick={() => setCheckMoreThan(!checkMoreThan)} disabled={submitted} />
            </div>
          </div>
        </div>
        <div>
          <button className={`btn btn-outline-light btn-lg ${submitted ? "disabled" : ""}`} onClick={() => setSubmitted(true)}>
            Submit
          </button>
          {submitted && <button className='ms-2 btn btn-outline-light btn-lg' onClick={() => setSubmitted(false)}>Edit Search</button>}
        </div>
      </div>
      {submitted && displayResults()}
    </>
  )
}
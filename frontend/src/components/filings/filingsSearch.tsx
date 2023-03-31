import React, { useState } from 'react'
import FilingsIndex from './filingsIndex'

export default function FilingSearch() {
  const [filerEin, setFilerEin] = useState("")
  const [filerName, setFilerName] = useState("")
  const [lessAwardsThan, setLessAwardsThan] = useState(0)
  const [checkLessAwards, setCheckLessAwards] = useState(false)
  const [moreAwardsThan, setMoreAwardsThan] = useState(0)
  const [checkMoreAwards, setCheckMoreAwards] = useState(false)
  const [awardedLessThan, setAwardedLessThan] = useState(0)
  const [checkAwardedLess, setCheckAwardedLess] = useState(false)
  const [awardedMoreThan, setAwardedMoreThan] = useState(0)
  const [checkAwardedMore, setCheckAwardedMore] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const stateToParams = () => {
    const paramsList = []
    if (filerEin !== "") { paramsList.push(`filer_ein=${filerEin}`) }
    if (filerName !== "") { paramsList.push(`filer_name=${filerName}`) }
    if (checkMoreAwards) { paramsList.push(`more_awards_than=${moreAwardsThan}`) }
    if (checkLessAwards) { paramsList.push(`less_awards_than=${lessAwardsThan}`) }
    if (checkAwardedMore) { paramsList.push(`awarded_more_than=${awardedMoreThan}`) }
    if (checkAwardedLess) { paramsList.push(`awarded_less_than=${awardedLessThan}`) }
    return paramsList.join('&')
  }

  const displayResults = () => {
    return (
      <div className="m-4">
        <hr />
        <h3 className="text-center">Query Results:</h3>
        <hr />
        <FilingsIndex params={stateToParams()} includeFiler={true} />
      </div>
    )
  }

  const handleAmountInput = (amount: string, handleNumberType: string) => {
    let moneyAmount = parseInt(amount)
    if (moneyAmount < 0) {
      moneyAmount = 0
    }

    if (handleNumberType === 'lessAwardsThan') {
      setLessAwardsThan(moneyAmount)
    } else if (handleNumberType === 'moreAwardsThan') {
      setMoreAwardsThan(moneyAmount)
    } else if (handleNumberType === 'awardedLessThan') {
      setAwardedLessThan(moneyAmount)
    } else {
      setAwardedMoreThan(moneyAmount)
    }
  }

  return (
    <>
      <div className='m-4'>
        <h3 className="text-center">Find Filings By:</h3>
        <hr />
        <div className='row'>
          <div className='mb-3 col'>
            <label htmlFor="filerEin" className='form-label'>Filer EIN:</label>
            <input type="text" name="filerEin" id="filerEin" value={filerEin}
              onChange={(e) => setFilerEin(e.target.value)} className='form-control' disabled={submitted} />
          </div>
          <div className='mb-3 col'>
            <label htmlFor="filerName" className='form-label'>Filer Name:</label>
            <input type="text" name="filerName" id="filerName" value={filerName}
              onChange={(e) => setFilerName(e.target.value)} className='form-control' disabled={submitted} />
          </div>
        </div>
        <div className='row'>
          <div className='mb-3 col'>
            <label htmlFor="lessAwardsThan" className="form-label">Total Awards On Filing Less Than:</label>
            <div className="input-group">
              <input type="number" className="form-control" id="lessAwardsThan" name="lessAwardsThan" min="0" step="1" value={lessAwardsThan} onChange={(e) => handleAmountInput(e.target.value, 'lessAwardsThan')} disabled={submitted} />
            </div>
            <div className="form-check form-switch mt-3">
              <label className="form-check-label" htmlFor="checkLessAwards">Enable</label>
              <input className="form-check-input" type="checkbox" id="checkLessAwards" name="checkLessAwards" value={checkLessAwards ? "0" : "1"} onClick={() => setCheckLessAwards(!checkLessAwards)} disabled={submitted} />
            </div>
          </div>
          <div className='mb-3 col'>
            <label htmlFor="moreAwardsThan" className="form-label">Total Awards On Filing Greater Than:</label>
            <div className="input-group">
              <input type="number" className="form-control" id="moreAwardsThan" name="moreAwardsThan" min="0" step="1" value={moreAwardsThan} onChange={(e) => handleAmountInput(e.target.value, 'moreAwardsThan')} disabled={submitted} />
            </div>
            <div className="form-check form-switch mt-3">
              <label className="form-check-label" htmlFor="checkMoreAwards">Enable</label>
              <input className="form-check-input" type="checkbox" id="checkMoreAwards" name="checkMoreAwards" value={checkMoreAwards ? "0" : "1"} onClick={() => setCheckMoreAwards(!checkMoreAwards)} disabled={submitted} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='mb-3 col'>
            <label htmlFor="awardedLessThan" className="form-label">Sum Of All Awards Less Than:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input type="number" className="form-control" id="awardedLessThan" name="awardedLessThan" min="0" step="1" value={awardedLessThan} onChange={(e) => handleAmountInput(e.target.value, 'awardedLessThan')} disabled={submitted} />
            </div>
            <div className="form-check form-switch mt-3">
              <label className="form-check-label" htmlFor="checkAwardedLess">Enable</label>
              <input className="form-check-input" type="checkbox" id="checkAwardedLess" name="checkAwardedLess" value={checkAwardedLess ? "0" : "1"} onClick={() => setCheckAwardedLess(!checkAwardedLess)} disabled={submitted} />
            </div>
          </div>
          <div className='mb-3 col'>
            <label htmlFor="awardedMoreThan" className="form-label">Sum Of All Awards Greater Than:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input type="number" className="form-control" id="awardedMoreThan" name="awardedMoreThan" min="0" step="1" value={awardedMoreThan} onChange={(e) => handleAmountInput(e.target.value, 'awardedMoreThan')} disabled={submitted} />
            </div>
            <div className="form-check form-switch mt-3">
              <label className="form-check-label" htmlFor="checkAwardedMore">Enable</label>
              <input className="form-check-input" type="checkbox" id="checkAwardedMore" name="checkAwardedMore" value={checkAwardedMore ? "0" : "1"} onClick={() => setCheckAwardedMore(!checkAwardedMore)} disabled={submitted} />
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
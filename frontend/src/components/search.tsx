import React, { useState } from 'react'
import AwardSearch from './awards/awardSearch'
import FilerSearch from './filers/filerSearch'
import FilingSearch from './filings/filingsSearch'
import RecipientSearch from './recipients/recipientsSearch'


export default function Search() {
  const [searchType, setSearchType] = useState<"filing" | "filer" | "award" | "recipient">("award")

  const searchButtonClasses = (buttonType: string) => {
    const classes = buttonType === searchType ? "active " : ""
    return classes + 'btn btn-outline-light col'
  }

  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">Advanced Search</h1>
          <p className="col-md-8 fs-4">{"Find what you're looking for with as much (or as little) data as you want."}</p>
          <div className="container text-center">
            <div className='row row-cols-2'>
              <button className={searchButtonClasses("award")} onClick={() => setSearchType("award")}>Award Search</button>
              <button className={searchButtonClasses("filer")} onClick={() => setSearchType("filer")}>Filer Search</button>
              <button className={searchButtonClasses("filing")} onClick={() => setSearchType("filing")}>Filing Search</button>
              <button className={searchButtonClasses("recipient")} onClick={() => setSearchType("recipient")}>Recipient Search</button>
            </div>
          </div>
        </div>
      </div>
      {searchType === "award" && <AwardSearch />}
      {searchType === "filer" && <FilerSearch />}
      {searchType === "filing" && <FilingSearch />}
      {searchType === "recipient" && <RecipientSearch />}
    </>
  )
}
import React, { useState } from 'react'
import { FilingIndexType } from '@/types/FilingTypes'
import { useGetFilingsQuery } from '@/state/apiSlice'
import FilingsItem from './filingsItem'
import LoadingDisplay from '../loadingDisplay'
import { displayError } from '@/utils/errorToComponent'
import Pagination from '../pagination'

interface FilingsIndexProps {
  params?: string,
  includeFiler: boolean,
}

export default function FilingsIndex({ params, includeFiler }: FilingsIndexProps) {
  const [page, setPage] = useState<number>(1)
  const apiParams = `?page=${page}${("&" + params) || ""}`
  const { data, isFetching, isSuccess, isError, error } = useGetFilingsQuery(apiParams, {})
  const filings = data?.filings

  const displayHeader = (filing: FilingIndexType) => {
    let header = `${filing.tax_period} Filing`
    if (includeFiler) {
      header = `${filing.filer_name} ` + header
    }
    return header
  }

  const displayFilings = () => {
    if (filings.length === 0) {
      return <p>No Filings Found</p>
    }
    return (filings as FilingIndexType[]).map((filing) => (
      <div className="accordion-item" key={filing.id}>
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#filing-${filing.id}-collapse`} aria-expanded="true" aria-controls={`filing-${filing.id}-collapse`}>
            {displayHeader(filing)}
          </button>
        </h2>
        <div id={`filing-${filing.id}-collapse`} className="accordion-collapse collapse">
          <div className="accordion-body">
            <FilingsItem filing={filing} isIndexItem={true} />
          </div>
        </div>
      </div>
    ))
  }

  const accordionStyle = params ? "accordion accordion-flush" : "accordion"

  return (
    <>
      {isFetching && <LoadingDisplay />}
      {isError && displayError(error)}
      {isSuccess && 
        <>
          <div className={accordionStyle}>
            {displayFilings()}
          </div>
          {data.total_pages > 1 && <Pagination setPage={setPage} totalPages={data.total_pages} currentPage={page} />}
        </>
      }  
    </>
  )
}
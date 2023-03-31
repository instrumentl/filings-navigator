import React, { useState } from 'react'
import { FilerIndexType } from '@/types/FilerTypes'
import { useGetFilersQuery } from '@/state/apiSlice'
import FilersItem from './filersItem'
import LoadingDisplay from '../loadingDisplay'
import { displayError } from '@/utils/errorToComponent'
import Pagination from '../pagination'

interface FilersIndexProps {
  params?: string | null
}

export default function FilersIndex({ params = null }: FilersIndexProps) {
  const [page, setPage] = useState<number>(1)
  const apiParams = `?page=${page}${params ? ("&" + params) : ""}`
  const { data, isFetching, isSuccess, isError, error } = useGetFilersQuery(apiParams, {})
  const filers = data?.filers

  const displayFilers = () => {
    if (filers.length === 0) {
      return <p>No Filers Found</p>
    }
    return (filers as FilerIndexType[]).map((filer) => (
      <div className="accordion-item" key={filer.id}>
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#filer-${filer.id}-collapse`} aria-expanded="true" aria-controls={`filer-${filer.id}-collapse`}>
            {filer.name}
          </button>
        </h2>
        <div id={`filer-${filer.id}-collapse`} className="accordion-collapse collapse">
          <div className="accordion-body">
            <FilersItem filer={filer} isIndexItem={true} />
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
            {displayFilers()}
          </div>
          {data.total_pages > 1 && <Pagination setPage={setPage} totalPages={data.total_pages} currentPage={page} />}
        </>
      }
    </>
  )
}
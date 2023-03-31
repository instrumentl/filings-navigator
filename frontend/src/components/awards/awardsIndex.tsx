import React, { useState } from 'react'
import { AwardIndexType } from '@/types/AwardTypes'
import { useGetAwardsQuery } from '@/state/apiSlice'
import AwardsItem from './awardsItem'
import LoadingDisplay from '../loadingDisplay'
import { displayError } from '@/utils/errorToComponent'
import { formatMoney } from '@/utils/formatMoney'
import Pagination from '../pagination'

interface AwardsIndexProps {
  params?: string | null,
  includeFrom: boolean,
  includeTo: boolean
}

export default function AwardsIndex({ params = null, includeFrom, includeTo }: AwardsIndexProps) {
  const [page, setPage] = useState<number>(1)
  const apiParams = `?page=${page}${params ? ("&" + params) : ""}`
  const { data, isFetching, isSuccess, isError, error } = useGetAwardsQuery(apiParams, {})
  const awards = data?.awards

  const displayHeader = (award: AwardIndexType) => {
    let header = `${formatMoney(award.award_amount)} award`
    if (includeFrom) {
      header += ` from ${award.filer_name}`
    }
    if (includeTo) {
      header += ` to ${award.recipient_name}`
    }
    return header
  }

  const displayAwards = () => {
    if (awards.length === 0) {
      return <p>No Awards Found</p>
    }
    return (awards as AwardIndexType[]).map((award) => (
      <div className="accordion-item" key={award.id}>
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#award-${award.id}-collapse`} aria-expanded="true" aria-controls={`award-${award.id}-collapse`}>
            {displayHeader(award)}
          </button>
        </h2>
        <div id={`award-${award.id}-collapse`} className="accordion-collapse collapse">
          <div className="accordion-body">
            <AwardsItem award={award} isIndexItem={true} />
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
            {displayAwards()}
          </div>
          {data.total_pages > 1 && <Pagination setPage={setPage} totalPages={data.total_pages} currentPage={page} />}
        </>
      }
    </>
  )
}
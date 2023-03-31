import React, { useState } from 'react'
import { RecipientIndexType } from '@/types/RecipientTypes'
import { useGetRecipientsQuery } from '@/state/apiSlice'
import RecipientsItem from './recipientsItem'
import LoadingDisplay from '../loadingDisplay'
import { displayError } from '@/utils/errorToComponent'
import Pagination from '../pagination'

interface RecipientsIndexProps {
  params?: string
}

export default function RecipientsIndex({ params }: RecipientsIndexProps) {
  const [page, setPage] = useState<number>(1)
  const apiParams = `?page=${page}${("&" + params) || ""}`
  const { data, isFetching, isSuccess, isError, error } = useGetRecipientsQuery(apiParams, {})
  const recipients = data?.recipients

  const displayRecipients = () => {
    if (recipients.length === 0) {
      return <p>No Recipients Found</p>
    }
    return (recipients as RecipientIndexType[]).map((recipient) => (
      <div className="accordion-item" key={recipient.id}>
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#recipient-${recipient.id}-collapse`} aria-expanded="true" aria-controls={`recipient-${recipient.id}-collapse`}>
            {recipient.name}
          </button>
        </h2>
        <div id={`recipient-${recipient.id}-collapse`} className="accordion-collapse collapse">
          <div className="accordion-body">
            <RecipientsItem recipient={recipient} isIndexItem={true} />
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
            {displayRecipients()}
          </div>
          {data.total_pages > 1 && <Pagination setPage={setPage} totalPages={data.total_pages} currentPage={page} />}
        </>
      }
    </>
  )
}
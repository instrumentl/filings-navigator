import React from 'react'
import LoadingDisplay from '../loadingDisplay'
import { useGetRecipientByIdQuery } from '@/state/apiSlice'
import { RecipientIndexType } from '@/types/RecipientTypes'
import { displayError } from '@/utils/errorToComponent'
import RecipientsItem from './recipientsItem'
import AwardsIndex from '../awards/awardsIndex'
import Row from '../row'

interface RecipientProps {
  recipientId: string
}

export default function RecipientsShow({ recipientId }: RecipientProps) {
  const { data, isFetching, isSuccess, isError, error } = useGetRecipientByIdQuery(recipientId, {})

  const displayAwards = (params: string) => {
    return (
      <div className="container">
        <Row label='Awards:' content={
          <AwardsIndex params={params} includeFrom={true} includeTo={false} />
        } />
      </div>
    )
  }

  const displayRecipient = () => {
    const recipient = data as RecipientIndexType
    const params = `recipient_ein=${recipient.ein}`
    return (
      <div className='recipient-page'>
        <div className="p-5 mb-4 bg-body-tertiary">
          <div className="container-fluid py-2">
            <h1 className="display-5 fw-bold">{recipient.name}</h1>
          </div>
        </div>
        <RecipientsItem recipient={recipient} isIndexItem={false} />
        {displayAwards(params)}
      </div>
    )
  }

  return (
    <>
      {isFetching && <LoadingDisplay />}
      {isError && displayError(error)}
      {isSuccess && displayRecipient()}
    </>
  )
}
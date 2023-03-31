import React from 'react'
import LoadingDisplay from '../loadingDisplay'
import { useGetAwardByIdQuery } from '@/state/apiSlice'
import { AwardIndexType } from '@/types/AwardTypes'
import { displayError } from '@/utils/errorToComponent'
import AwardsItem from './awardsItem'
import { formatMoney } from '@/utils/formatMoney'

interface AwardProps {
  awardId: string
}

export default function AwardsShow({ awardId }: AwardProps) {
  const { data, isFetching, isSuccess, isError, error } = useGetAwardByIdQuery(awardId, {})

  const displayAward = () => {
    const award = data as AwardIndexType
    return (
      <div className="award-page">
        <div className="p-5 mb-4 bg-body-tertiary">
          <div className="container-fluid py-2">
            <h1 className="display-5 fw-bold">{formatMoney(award.award_amount)} Award</h1>
            <p className="col-md-8 fs-4">{`From ${award.filer_name} to ${award.recipient_name}`}</p>
            {award.purpose && <p>{award.purpose}</p>}
          </div>
        </div>
        <AwardsItem award={award} isIndexItem={false} />
      </div>
    )
  }

  return (
    <>
      {isFetching && <LoadingDisplay />}
      {isError && displayError(error)}
      {isSuccess && displayAward()}
    </>
  )
}
import React from 'react'
import LoadingDisplay from '../loadingDisplay'
import { useGetFilingByIdQuery } from '@/state/apiSlice'
import { FilingIndexType } from '@/types/FilingTypes'
import { displayError } from '@/utils/errorToComponent'
import FilingsItem from './filingsItem'
import AwardsIndex from '../awards/awardsIndex'
import Row from '../row'

interface FilingProps {
  filingId: string
}

export default function FilingsShow({ filingId }: FilingProps) {
  const { data, isFetching, isSuccess, isError, error } = useGetFilingByIdQuery(filingId, {})

  const displayAwards = (params: string) => {
    return (
      <div className="container">
        <Row label='Awards:' content={
          <AwardsIndex params={params} includeFrom={true} includeTo={false} />
        } />
      </div>
    )
  }

  const displayFiling = () => {
    const filing = data as FilingIndexType
    const params = `filing_id=${filing.id}`
    return (
      <div className="filing-page">
        <div className="p-5 mb-4 bg-body-tertiary">
          <div className="container-fluid py-2">
            <h1 className="display-5 fw-bold">{`${filing.filer_name} ${filing.tax_period} Filing`}</h1>
          </div>
        </div>
        <FilingsItem filing={filing} isIndexItem={false} />
        {displayAwards(params)}
      </div>
    )
  }

  return (
    <>
      {isFetching && <LoadingDisplay />}
      {isError && displayError(error)}
      {isSuccess && displayFiling()}
    </>
  )
}
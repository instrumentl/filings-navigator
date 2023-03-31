import React from 'react'
import LoadingDisplay from '../loadingDisplay'
import { useGetFilerByIdQuery } from '@/state/apiSlice'
import { FilerIndexType } from '@/types/FilerTypes'
import { displayError } from '@/utils/errorToComponent'
import FilersItem from './filersItem'
import AwardsIndex from '../awards/awardsIndex'
import FilingsIndex from '../filings/filingsIndex'
import Row from '../row'

interface FilerProps {
  filerId: string
}

export default function FilersShow({ filerId }: FilerProps) {
  const { data, isFetching, isSuccess, isError, error } = useGetFilerByIdQuery(filerId, {})
  
  const displayAwards = (params: string) => {
    return (
      <div className="container">
        <Row label='Awards:' content={
          <AwardsIndex params={params} includeFrom={false} includeTo={true}/>
        } />
      </div>      
    )
  }

  const displayFilings = (params: string) => {
    return (
      <div className="container">
        <Row label='Filings:' content={
          <FilingsIndex params={params} includeFiler={false} />
        } />
      </div>
    )
  }

  const displayFiler = () => {
    const filer = data as FilerIndexType
    const params = `filer_ein=${filer.ein}`
    return (
      <div className="filer-page">
        <div className="p-5 mb-4 bg-body-tertiary">
          <div className="container-fluid py-2">
            <h1 className="display-5 fw-bold">{filer.name}</h1>
          </div>
        </div>
        <FilersItem filer={filer} isIndexItem={false} />
        {displayFilings(params)}
        {displayAwards(params)}
      </div>
    )
  }

  return (
    <>
      {isFetching && <LoadingDisplay />}
      {isError && displayError(error)}
      {isSuccess && displayFiler()}
    </>
  )
}
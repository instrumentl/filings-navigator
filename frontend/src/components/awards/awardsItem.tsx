import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AwardIndexType } from '@/types/AwardTypes'
import { formatMoney } from '@/utils/formatMoney'
import Row from '../row'

interface AwardProps {
  award: AwardIndexType,
  isIndexItem: boolean,
}

export default function AwardsItem({ award, isIndexItem }: AwardProps) {
  const router = useRouter()
  
  return (
    <div className='award-item container'>
      <Row label='Award Amount:' content={formatMoney(award.award_amount)} />
      <Row label='Award Purpose:' content={award.purpose || 'Not Specified'} />
      <Row label='Filer:' content={
        <Link href={'/filers/[filerId]'} 
          as={'/filers/' + award.filer_id}>
          {award.filer_name}
        </Link>
      } />
      <Row label='Recipient:' content={
        <Link href={'/recipients/[recipientId]'} 
          as={'/recipients/' + award.recipient_id}>
          {award.recipient_name}
        </Link>
      } />
      <Row label='Filing:' content={
        <Link href={'/filings/[filingId]'}
          as={'/filings/' + award.filing_id}>
          {`${award.filing_tax_period} tax period`}
        </Link>
      } />
      {isIndexItem &&
        <button
          className="btn btn-outline-light mt-2 col-12"
          onClick={() => router.push('/awards/' + award.id)}
        >
          More Award Details
        </button>
      }
    </div>
  )
}
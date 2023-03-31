import React from 'react'
import { useRouter } from 'next/router'
import { RecipientIndexType } from '@/types/RecipientTypes'
import Row from '../row'

interface RecipientProps {
  recipient: RecipientIndexType,
  isIndexItem: boolean
}

export default function RecipientsItem({ recipient, isIndexItem }: RecipientProps) {
  const router = useRouter()

  return (
    <div className='recipient-item container'>
      <Row label='Name:' content={recipient.name} />
      <Row label='EIN:' content={recipient.ein} />
      <Row label='Address:' content={recipient.line_1} />
      <Row label='City:' content={recipient.city} />
      <Row label='State:' content={recipient.state} />
      <Row label='Zipcode:' content={recipient.zipcode} />
      {isIndexItem && 
        <button 
          className="btn btn-outline-light mt-2 col-12" 
          onClick={() => router.push('/recipients/' + recipient.id)}
        >
          Go to Recipient Page
        </button>
      }
    </div>
  )
}
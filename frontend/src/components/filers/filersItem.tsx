import React from 'react'
import { useRouter } from 'next/router'
import { FilerIndexType } from '@/types/FilerTypes'
import Row from '../row'

interface FilerProps {
  filer: FilerIndexType,
  isIndexItem: boolean
}

export default function FilersItem({ filer, isIndexItem }: FilerProps) {
  const router = useRouter()

  return (
    <div className='filer-item container'>
      <Row label='Name:' content={filer.name} />
      <Row label='EIN:' content={filer.ein} />
      <Row label='Address:' content={filer.line_1} />
      <Row label='City:' content={filer.city} />
      <Row label='State:' content={filer.state} />
      <Row label='Zipcode:' content={filer.zipcode} />
      {isIndexItem &&
        <button
          className="btn btn-outline-light mt-2 col-12"
          onClick={() => router.push('/filers/' + filer.id)}
        >
          Go to Filer Page
        </button>
      }
    </div>
  )
}
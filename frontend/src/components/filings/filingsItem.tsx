import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Row from '../row'
import { FilingIndexType } from "@/types/FilingTypes"
import { formatDate } from '@/utils/formatDate'

interface FilingProps {
  filing: FilingIndexType,
  isIndexItem: boolean
}

export default function FilingsItem({ filing, isIndexItem }: FilingProps) {
  const router = useRouter()

  return (
    <div className="filing-item container">
      <Row label='Filer:' content={
        <Link href={"/filers/[filerId]"} as={"/filers/" + filing.filer_id}>
          { filing.filer_name }
        </Link>
      } />
      <Row label='Tax Period:' content={filing.tax_period} />
      <Row label='Return Timestamp:' content={formatDate(filing.return_timestamp)} />
      <Row label='Amended Return Indicator:' content={filing.amended_return_indicator || "N/A"} />
      {isIndexItem &&
        <button
          className="btn btn-outline-light mt-2 col-12"
          onClick={() => router.push("/filings/" + filing.id)}
        >
          Go to Filing Page
        </button>
      }
    </div>
  )
}
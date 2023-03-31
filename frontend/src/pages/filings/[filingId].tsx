import FilingsShow from '@/components/filings/filingsShow'
import LoadingDisplay from '@/components/loadingDisplay'
import { useRouter } from 'next/router'

export default function FilingShowPage() {
  const router = useRouter()
  const { filingId } = router.query

  return (
    <>
      {!filingId && <LoadingDisplay />}
      {filingId && <FilingsShow filingId={filingId as string} />}
    </>
  )
}
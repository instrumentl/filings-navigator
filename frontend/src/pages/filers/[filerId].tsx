import FilersShow from '@/components/filers/filersShow'
import LoadingDisplay from '@/components/loadingDisplay'
import { useRouter } from 'next/router'

export default function FilerShowPage() {
  const router = useRouter()
  const { filerId } = router.query

  return (
    <>
      {!filerId && <LoadingDisplay />}
      {filerId && <FilersShow filerId={filerId as string} />}
    </>
  )
}
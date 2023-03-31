import AwardsShow from '@/components/awards/awardsShow'
import LoadingDisplay from '@/components/loadingDisplay'
import { useRouter } from 'next/router'

export default function AwardShowPage() {
  const router = useRouter()
  const { awardId } = router.query

  return (
    <>
      {!awardId && <LoadingDisplay />}
      {awardId && <AwardsShow awardId={awardId as string} />}
    </>
  )
}
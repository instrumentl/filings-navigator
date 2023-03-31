import RecipientsShow from '@/components/recipients/recipientsShow'
import LoadingDisplay from '@/components/loadingDisplay'
import { useRouter } from 'next/router'

export default function RecipientShowPage() {
  const router = useRouter()
  const { recipientId } = router.query

  return (
    <>
      {!recipientId && <LoadingDisplay />}
      {recipientId && <RecipientsShow recipientId={recipientId as string} />}
    </>
  )
}
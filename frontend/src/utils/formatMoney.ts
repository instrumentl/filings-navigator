  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  export const formatMoney = (money: number) => moneyFormatter.format(money)
export interface AwardIndexType {
  id: string,
  filing_id: string,
  award_amount: number,
  purpose: string,
  recipient_name: string,
  recipient_id: string,
  filer_name: string,
  filer_id: string,
  filing_tax_period: string
}

export interface AwardShowType extends AwardIndexType {
  
}
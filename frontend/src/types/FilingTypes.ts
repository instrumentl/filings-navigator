export interface FilingIndexType {
  id: string,
  return_timestamp: string,
  amended_return_indicator?: string,
  tax_period: string,
  filer_name: string,
  filer_id: string
}

export interface FilingShowType extends FilingIndexType {
  
}
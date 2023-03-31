export interface RecipientIndexType {
  id: string,
  ein: string,
  name: string,
  line_1: string,
  city: string,
  state: string,
  zipcode: string
}

export interface RecipientShowType extends RecipientIndexType {
  
}
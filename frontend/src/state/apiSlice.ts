import { BaseQueryFn, createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react'

export interface ServerErrorType {
  data: {
    error: string
  },
  status: number | string
}

const backend = process.env.NODE_ENV === 'production' ? 
  `${process.env.BACKEND_URL}` :
  'http://localhost:3000/api'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: backend
  }) as BaseQueryFn<string | FetchArgs, unknown, ServerErrorType, {}>,
  endpoints: build => ({
    getAwards: build.query({
      query: params => `/awards${params}`
    }),
    getAwardById: build.query({
      query: awardId => `/awards/${awardId}`
    }),
    getFilers: build.query({
      query: params => `/filers${params}`
    }),
    getFilerById: build.query({
      query: filerId => `/filers/${filerId}`
    }),
    getFilings: build.query({
      query: params => `/filings${params}`
    }),
    getFilingById: build.query({
      query: filingId => `/filings/${filingId}`
    }),
    postFiling: build.mutation({
      query: (data) => ({
        url: '/filings',
        method: 'POST',
        body: data
      })
    }),
    getRecipients: build.query({
      query: params => `/recipients${params}`
    }),
    getRecipientById: build.query({
      query: recipientId => `/recipients/${recipientId}`
    })
  })
})

export const {
  useGetAwardsQuery, 
  useGetAwardByIdQuery,
  useGetFilersQuery, 
  useGetFilerByIdQuery,
  useGetFilingsQuery, 
  useGetFilingByIdQuery, 
  usePostFilingMutation,
  useGetRecipientsQuery, 
  useGetRecipientByIdQuery
} = api
import React from 'react'

interface ErrorProps {
  status: string | number,
  message: string
}

export default function ErrorDisplay({ status, message }: ErrorProps) {
  return (
    <div className="alert alert-danger alert-dismissible fade show m-4" role="alert">
      <strong>Error {status}: </strong>{message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}
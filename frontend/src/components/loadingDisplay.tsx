import React from 'react'

export default function LoadingDisplay() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status" style={{ width: '50px', height: '50px', marginTop: '100px'}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
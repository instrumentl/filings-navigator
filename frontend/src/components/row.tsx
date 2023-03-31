import React from 'react'

interface RowProps {
  label: string,
  content: any
}

export default function Row({ label, content }: RowProps) {
  return (
    <div className='row'>
      <div className='col-3 border'>
        <strong>{label}</strong>
      </div>
      <div className='col border'>
        {content}
      </div>
    </div>
  )
}
import React from 'react'

export default function Homepage() {
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">Homepage</h1>
          <p className="col-md-8 fs-4">Hello and welcome!</p>
        </div>
      </div>
      <div className="container">
        <h5>Examples of a few actions to do from here:</h5>
        <ul>
          <li>See the navbar for links to different pages</li>
          <li>{'Click on the "Create Filing" button to start parsing tax returns'}</li>
          <li>{'Click on the "Advanced Search" button to do a data deep-dive'}</li>
        </ul>
      </div>
    </>
  )
}
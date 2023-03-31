import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">Homepage</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" href="/awards">Awards</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/filers">Filers</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/filings">Filings</Link></li>
            <li className="nav-item"><Link className="nav-link me-2" href="/recipients">Recipients</Link></li>
          </ul>
          <button className="btn btn-outline-light me-2" onClick={() => router.push('/filings/create')}>Create Filing</button>
          <button className="btn btn-outline-light" onClick={() => router.push('/search')}>Advanced Search</button>
        </div>
      </div>
    </nav>
  )
}
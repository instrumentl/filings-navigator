import React from 'react'

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>,
  totalPages: number,
  currentPage: number
}

export default function Pagination({setPage, totalPages, currentPage}: PaginationProps) {
  const nextPageEnabled = currentPage < totalPages
  const previousPageEnabled = currentPage > 1

  const displayPrevious = () => {
    return (
      <li className="page-item" aria-current="page">
        <a className="page-link" href="#" onClick={() => setPage(currentPage - 1)}>{currentPage - 1}</a>
      </li>
    )
  }

  const displayNext = () => {
    return (
      <li className="page-item" aria-current="page">
        <a className="page-link" href="#" onClick={() => setPage(currentPage + 1)}>{currentPage + 1}</a>
      </li>
    )
  }

  const linkClasses = (isPrevious: boolean) => {
    const enableLink = isPrevious ? previousPageEnabled : nextPageEnabled
    return enableLink ? "page-link" : "page-link disabled"
  }

  return (
    <ul className="pagination m-4">
      <li className="page-item">
        <a className={linkClasses(true)} onClick={() => setPage(currentPage - 1)} href="#">Previous</a>
      </li>
      {previousPageEnabled && displayPrevious()}
      <li className="page-item active" aria-current="page">
        <a className="page-link" href="#">{currentPage}</a>
      </li>
      {nextPageEnabled && displayNext()}
      <li className="page-item">
        <a className={linkClasses(false)} onClick={() => setPage(currentPage + 1)} href="#">Next</a>
      </li>
    </ul>
  )
}
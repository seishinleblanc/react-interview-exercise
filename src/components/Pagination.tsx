import React from 'react'
import "./design/Pagination.css";

// Pagination component added in order to deal with large amount of returned data

const Pagination = ({totalResults, resultsPerPage, setCurrentPage, currentPage}) => {
    let pages = [];
// rangeStart and rangeEnd are necessary to prevent pagination from returning too many pages at once, since data set is large
    let rangeStart = (currentPage <= 4) ? 0 : currentPage - 4
    let rangeEnd = currentPage + 3;
    let totalPages = Math.ceil(totalResults/resultsPerPage)

// We need to use ceiling to avoid cutting off the results not evenly divided by 10
    for(let i = 1; i<= Math.ceil(totalResults/resultsPerPage); i++) {
        pages.push(i)
    }
  return (
    <div className="pagination">
      { (currentPage > 1) ?
        <button
          onClick={() => setCurrentPage(currentPage -1)}
          > {'<'} 
        </button> : null 
      }
      { (currentPage > 5) ?
        <button
          onClick={() => setCurrentPage(1)}
        >
        1
        </button> : null 
      }
      {pages.slice(rangeStart,rangeEnd).map((page, index) => {
        return (
        <button 
          key={index} 
          onClick={() => setCurrentPage(page)} 
          className={page == currentPage ? "active" : ""}
          > {page}
        </button>
        ); 
        })
      } 
      { ((currentPage + 3) < totalPages) ?
        <button
          onClick={() => setCurrentPage(totalPages)}
        >
        {totalPages}
        </button> : null 
      }
      { (currentPage < totalPages) ?
        <button
          onClick={() => setCurrentPage(currentPage +1)}
          > {'>'} 
        </button> : null 
      }
    </div>
  )
}

export default Pagination
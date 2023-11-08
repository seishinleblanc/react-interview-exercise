import React from 'react'
import "./design/Pagination.css";
import { Icon } from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

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
      
      {/* The previous button */}
        { (currentPage > 1) ?
          <button
            onClick={() => setCurrentPage(currentPage -1)}
            > <Icon as={GrFormPrevious} />
          </button> : null 
        }

      {/* The first page button */}
        { (currentPage > 5) ?
          <button
            onClick={() => setCurrentPage(1)}
          >
          1
          </button> : null 
        }

      {/* The range of pages buttons */}
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

      {/* The last page button */}
        { ((currentPage + 3) < totalPages) ?
          <button
            onClick={() => setCurrentPage(totalPages)}
          >
          {totalPages}
          </button> : null 
        }

      {/* The next button */}
        { (currentPage < totalPages) ?
          <button
            onClick={() => setCurrentPage(currentPage +1)}
            > <Icon as={GrFormNext} />
          </button> : null 
        }
    </div>
  )
}

export default Pagination
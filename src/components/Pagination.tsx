import React from 'react'
import "./design/Pagination.css";

const Pagination = ({totalDistricts, districtsPerPage, setCurrentPage, currentPage}) => {
    let pages = [];

    for(let i = 1; i<= Math.ceil(totalDistricts/districtsPerPage); i++) {
        pages.push(i)
    }
  return (
    <div className="pagination">
    {pages.slice(0,50).map((page, index) => {
      return (
      <button 
      key={index} 
      onClick={() => setCurrentPage(page)} 
      className={page == currentPage ? "active" : ""}>
        {page}
        </button>
      );
    })}
    </div>
  )
}

export default Pagination
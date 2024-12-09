import React from 'react'


interface PaginationProps{
    currentPage: number;
    lastPage: number;
    onPageChange: (newPage: number) => void;
    limit: number;
}
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    lastPage,
    onPageChange,
    limit,
}) => {

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };
  return (
      <div className="table__pagination">
          <h3>Page {currentPage} of {lastPage}</h3>
          <div className="btn-wrap">
              <button
                  className="btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
              >
                  <i className="bx bx-left-arrow-alt"></i> Back
              </button>
              <button
                  className="btn"
                  onClick={handleNextPage}
                  disabled={currentPage === lastPage}
              >
                  Next <i className="bx bx-right-arrow-alt"></i>
              </button>
          </div>
      </div>
  )
}

export default Pagination
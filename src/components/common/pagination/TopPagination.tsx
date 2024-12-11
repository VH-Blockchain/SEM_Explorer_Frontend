import React from 'react'


interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (newPage: number) => void;
    limit: number;
}
const TopPagination: React.FC<PaginationProps> = ({
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
    const openPage = (pageNo: any) => {

        onPageChange(pageNo);

    };
    return (
        <div className="pagination-sec">
            <ul className="pagination-ul">
                <li className="pagination-li" onClick={() => openPage(0)}><span>First</span></li>
                <li className="pagination-li" onClick={handlePrevPage}><span><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 32 32"><g><path d="M25.46 2.11a1 1 0 0 0-1.05.08l-18 13a1 1 0 0 0 0 1.62l18 13A1 1 0 0 0 25 30a1.07 1.07 0 0 0 .46-.11A1 1 0 0 0 26 29V3a1 1 0 0 0-.54-.89z" data-name="88-Left" fill="#6c757d" opacity="1" data-original="#000000" ></path></g></svg></span></li>
                <li className="pagination-li"><span>Page {currentPage} of {lastPage}</span></li>
                <li className="pagination-li" onClick={handleNextPage}><span className="next-arrow"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 490.661 490.661"><g><path d="M453.352 236.091 48.019 1.424c-3.285-1.899-7.36-1.899-10.688 0a10.681 10.681 0 0 0-5.333 9.237v469.333c0 3.819 2.048 7.339 5.333 9.237a10.802 10.802 0 0 0 5.333 1.429c1.856 0 3.691-.469 5.355-1.429l405.333-234.667c3.285-1.92 5.312-5.44 5.312-9.237s-2.027-7.338-5.312-9.236z" fill="#6c757d" opacity="1" data-original="#000000"></path></g></svg></span></li>
                <li className="pagination-li" onClick={() => openPage(lastPage)}><span>Last</span></li>
            </ul>
            {/* <div className="table__pagination">
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
            </div> */}
        </div>
    )
}

export default TopPagination
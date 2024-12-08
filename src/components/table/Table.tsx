import React, { useEffect, useState } from "react";

import "./table.scss";

interface TableProps {
    thead?: React.FC
    tbody: React.FC | React.FC[]
    limit?: number,
    pagesLimit?: number
}

const Table: React.FC<TableProps> = ({
    thead: Thead,
    tbody: Tbody,
    limit = 100,
    pagesLimit = NaN
}) => {
    const Tbodys: React.FC[] = Array.isArray(Tbody) ? Tbody : [Tbody];
    const initialData = limit ? Tbodys.slice(0, Number(limit) || 100) : Tbodys;
    const [TableBody, setTableBody] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.floor(Tbodys.length / limit);
    const pages = Tbodys.length % limit === 0 ? pageCount : pageCount + 1;

    const selectPage = (page: number) => {
        const start = limit * page;
        const end = start + limit;

        setTableBody(Tbodys.slice(start, end));
        setCurrentPage(page);
    };

    useEffect(() => {
        const Tbodys: React.FC[] = Array.isArray(Tbody) ? Tbody : [Tbody];

        const start = limit * currentPage;
        const end = start + limit;
        const initialData = limit ? Tbodys.slice(start, end) : Tbodys;
        setTableBody(initialData);

    }, [Tbody, limit, currentPage])

    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {Thead &&
                        <thead>
                            <Thead />
                        </thead>
                    }
                    <tbody>
                        {TableBody.map((Tbody, index) => {
                            return (<Tbody key={index} />)
                        })}
                    </tbody>
                </table>

                {/* { pages > 1 &&
                    <div className="table__pagination">
                        <h3>Page {currentPage + 1} of {pagesLimit ? (pageCount + 1 > pagesLimit ? pagesLimit : pageCount + 1 ) : pageCount}</h3>
                        <div className="btn-wrape">
                            { currentPage + 1 > 1 && (
                                    <button className="btn"  onClick={() => {
                                    selectPage(currentPage - 1);
                                }}><i className="bx bx-left-arrow-alt"></i> Back</button>
                            )}
                            { (currentPage + 1) < (pagesLimit ? (pagesLimit > pageCount + 1 ? pagesLimit : pageCount) :  pageCount) &&
                                
                                    <button className="btn" onClick={() => {
                                    const updatedPage = currentPage + 1;
                                    if (updatedPage > pagesLimit || updatedPage > pageCount) return;
                                    selectPage(currentPage + 1);
                                }}>Next <i className="bx bx-right-arrow-alt"></i></button>
                            }
                        </div>
                    </div>
                } */}
            </div>
        </div>
    );
};

export default Table;
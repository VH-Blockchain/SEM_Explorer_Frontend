import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../table/Table";
import Web3 from "web3";
import { getPrice } from "../../../services/binance";
import { getLatestBlock, timestampToMinutes } from "../../../services/web3";
import "../../pages/home/home.scss";
import { time } from "console";
import axios from "axios";
import Pagination from "../../common/pagination/Pagination";

const Blocks: React.FC = () => {
  const [latestBlocks, setLatestBlocks] = useState<
    Array<{
      number: number | string;
      txs: number | string;
      timeAt: string;
      bnbPrice: string;
      gasUsed: number;
      validator: string;
      gasLimit: number;
      baseFeePerGas: number;
    }>
  >([]);

  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [totalTx, setTotalTx] = useState<number>(0);

  const changePage = async (_page: number) => {
    setLatestBlocks([])
    function timeAgo(isoTimestamp: any) {
      const now: any = new Date();
      const timestamp: any = new Date(isoTimestamp);
      const diffInSeconds = Math.floor((now - timestamp) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minutes ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hours ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} days ago`;
      }
    }
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/fetchBlocks?page=${_page}&limit=${limit}`)
    setLastPage(response.data.data?.meta?.last_page);
    setCurrentPage(response.data.data?.meta.current_page);
    setLimit(response.data.data?.meta?.per_page);
    setTotalTx(response.data.data?.meta?.total);
    setLatestBlocks((prevTransactions) => {
      const prevNumber = prevTransactions.map((tx) => tx.number);
      const newTransactions = response.data.data.blocks
        .filter((tx: any) => !prevNumber.includes(tx.number))
        .map((tx: any) => {
          const timeAt = (timestamp: EpochTimeStamp) => {
            const date = new Date(timestamp);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            return formattedTime;
          };
          const gasInEther = (Number(21000) * Number(tx.gasUsed)) / 1e18;
          const baseFee = tx.baseFeePerGas / 1e9;
          return {
            number: tx.number,
            txs: tx.totaltransactions,
            timeAt: timeAgo(tx.timestamp),
            bnbPrice: gasInEther,
            gasUsed: tx.gasUsed,
            validator: tx.miner,
            gasLimit: tx.gasLimit,
            baseFeePerGas: baseFee
          };
        });
      return [...newTransactions, ...prevTransactions];
    });
  }
  useEffect(() => {
    // const updateInfo = async () => {
    //   const bnbPrice = await getPrice("BNB", "USDT").then(
    //     (quote) => Number(quote.price).toFixed(2) + "$"
    //   );
    //   const block = await getLatestBlock();
    //   const timeAt = timestampToMinutes(block);

    //   const updateTables = () => {
    //     setLatestBlocks((prevBlocks) => {
    //       const blockExistsInTable = prevBlocks.find(
    //         (blck) => blck.number === block.number
    //       );
    //       if (blockExistsInTable) return prevBlocks;

    //       return [
    //         {
    //           number: block.number,
    //           txs: block.transactions.length,
    //           timeAt: timeAt,
    //           bnbPrice: bnbPrice,
    //           gasUsed: block.gasUsed
    //         },
    //         ...prevBlocks,
    //       ];
    //     });
    //   };
    //   updateTables();
    // };
    function timeAgo(isoTimestamp: any) {
      const now: any = new Date();
      const timestamp: any = new Date(isoTimestamp);
      const diffInSeconds = Math.floor((now - timestamp) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minutes ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hours ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} days ago`;
      }
    }

    const updateTables = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/fetchBlocks?page=${currentPage}&limit=${limit}`)
      setLastPage(response.data.data?.meta?.last_page);
      setCurrentPage(response.data.data?.meta.current_page);
      setLimit(response.data.data?.meta?.per_page);
      setTotalTx(response.data.data?.meta?.total);
      setLatestBlocks((prevTransactions) => {
        const prevNumber = prevTransactions.map((tx) => tx.number);
        const newTransactions = response.data.data.blocks
          .filter((tx: any) => !prevNumber.includes(tx.number))
          .map((tx: any) => {
            const timeAt = (timestamp: EpochTimeStamp) => {
              const date = new Date(timestamp);
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const seconds = date.getSeconds().toString().padStart(2, '0');
              const formattedTime = `${hours}:${minutes}:${seconds}`;
              return formattedTime;
            };
            const gasInEther = (Number(21000) * Number(tx.gasUsed)) / 1e18;
            const baseFee = tx.baseFeePerGas / 1e9;
            return {
              number: tx.number,
              txs: tx.totaltransactions,
              timeAt: timeAgo(tx.timestamp),
              bnbPrice: gasInEther,
              gasUsed: tx.gasUsed,
              validator: tx.miner,
              gasLimit: tx.gasLimit,
              baseFeePerGas: baseFee
            };
          });
        return [...newTransactions, ...prevTransactions];
      });
    };
    // updateInfo();
    updateTables();
    // const cardInfoHandler = setInterval(updateInfo, 2500);

    // return () => clearInterval(cardInfoHandler);
  }, [currentPage, limit]);

  return (
    <div className="card">
      <div className="card__header cus-between">
        <h3 data-tooltip="test">Latest Blocks:</h3>
        <div className="pagination-sec">
          <ul className="pagination-ul">
            <li className="pagination-li"><span>First</span></li>
            <li className="pagination-li"><span><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 32 32"><g><path d="M25.46 2.11a1 1 0 0 0-1.05.08l-18 13a1 1 0 0 0 0 1.62l18 13A1 1 0 0 0 25 30a1.07 1.07 0 0 0 .46-.11A1 1 0 0 0 26 29V3a1 1 0 0 0-.54-.89z" data-name="88-Left" fill="#6c757d" opacity="1" data-original="#000000" ></path></g></svg></span></li>
            <li className="pagination-li"><span>Page 1 of 100</span></li>
            <li className="pagination-li"><span className="next-arrow"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 490.661 490.661"><g><path d="M453.352 236.091 48.019 1.424c-3.285-1.899-7.36-1.899-10.688 0a10.681 10.681 0 0 0-5.333 9.237v469.333c0 3.819 2.048 7.339 5.333 9.237a10.802 10.802 0 0 0 5.333 1.429c1.856 0 3.691-.469 5.355-1.429l405.333-234.667c3.285-1.92 5.312-5.44 5.312-9.237s-2.027-7.338-5.312-9.236z" fill="#6c757d" opacity="1" data-original="#000000"></path></g></svg></span></li>
            <li className="pagination-li"><span>Last</span></li>
          </ul>
        </div>
      </div>
      <div className="card__body api-key-table">
        <Table
          thead={() => {
            return (
              <tr>
                <th>Number</th>
                <th>Time At</th>
                <th>Tx Count</th>
                <th>Validator</th>
                <th>Gas Used</th>
                <th>Gas Limit</th>
                <th>Base Fee</th>
              </tr>
            );
          }}
          tbody={latestBlocks.map((block) => {
            return () => {
              return (
                <tr key={block.number}>
                  <td>
                    <Link to={`/block/${block.number}`}>{block.number}</Link>
                  </td>
                  <td>{block.timeAt}</td>
                  <td>{block.txs}</td>
                  <td>{block.validator.slice(0, 8) + "..." + block.validator.slice(-4)}</td>
                  <td>{block.gasUsed} SEM</td>
                  <td>{block.gasLimit}</td>
                  <td>{block.baseFeePerGas} Gwei</td>
                </tr>
              );
            };
          })}
          limit={10}
          pagesLimit={5}
        />
        {/* {latestBlocks.length > 0 &&
          <div className="table__pagination">
            <h3>Page {currentPage} of {lastPage}</h3>
            <div className="btn-wrape">
              {(limit * currentPage) > limit && (
                <button className="btn" onClick={() => {
                  changePage(Number(currentPage) - 1)
                }}><i className="bx bx-left-arrow-alt"></i> Back</button>
              )}
              {(true) &&
                <button className="btn" onClick={() => {
                  changePage(Number(currentPage) + 1)
                }}>Next <i className="bx bx-right-arrow-alt"></i></button>
              }
            </div>
          </div>
        } */}
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={changePage}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default Blocks;

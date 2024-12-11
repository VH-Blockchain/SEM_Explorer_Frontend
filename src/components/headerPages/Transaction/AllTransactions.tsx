import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../table/Table";
import moment from 'moment';
import { getPrice } from "../../../services/binance";
import {
  getLatestBlock
} from "../../../services/web3";
import "../../pages/home/home.scss";
import axios from "axios";
import { getTransactionDetailed } from "../../pages/tx/tx.controller."
import { time, timeStamp } from "console";
import Pagination from "../../common/pagination/Pagination";

const AllTransactions: React.FC = () => {
  const [latestTransactions, setLatestTransactions] = useState<
    Array<{
      hash: string;
      blocknumber: number | string;
      from: string;
      to: string | null;
      value: string;
      gasPrice: number;
      age: number | string;
    }>
  >([]);
  console.log(latestTransactions,"latestTransactions1313")
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(latestTransactions.length / rowsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [lastPage, setLastPage] = useState<number>(0);
  const [totalTx, setTotalTx] = useState<number>(0);


  const changePage = async (_page: number) => {
    setLatestTransactions([])
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/txs?page=${_page}&limit=${limit}`)
    setCurrentPage(response.data.data?.meta.current_page);
    setLimit(response.data.data?.meta?.per_page);
    setTotalTx(response.data.data?.meta?.total);
    setLastPage(response.data.data?.meta?.last_page);

    setLatestTransactions((prevTransactions) => {
      const prevHashes = prevTransactions.map((tx) => tx.hash);
      const newTransactions = response.data.data.transactions
        .filter((tx: any) => !prevHashes.includes(tx.hash))
        .map((tx: any) => {
          const gasInEther = (Number(21000) * Number(tx.gasPrice)) / 1e18;
          return {
            hash: tx.transaction_hash,
            blocknumber: tx.blockNumber,
            from: tx.from,
            to: tx.to,
            value: (tx.value / 10 ** 18).toString(),
            gasPrice: gasInEther,
            age: tx.timestamp
          };
        });
      return [...newTransactions, ...prevTransactions];
    });
  }

  useEffect(() => {
    const run = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/txs?page=${currentPage}&limit=${limit}`)
      setCurrentPage(response.data.data?.meta.current_page);
      setLimit(response.data.data?.meta?.per_page);
      setTotalTx(response.data.data?.meta?.total);
      setLastPage(response.data.data?.meta?.last_page);

      setLatestTransactions((prevTransactions) => {
        const prevHashes = prevTransactions.map((tx) => tx.hash);
        const newTransactions = response.data.data.transactions
          .filter((tx: any) => !prevHashes.includes(tx.hash))
          .map((tx: any) => {
            const gasInEther = (Number(21000) * Number(tx.gasPrice)) / 1e18;
            return {
              hash: tx.transaction_hash,
              blocknumber: tx.blockNumber,
              from: tx.from,
              to: tx.to,
              value: (tx.value / 10 ** 18).toString(),
              gasPrice: gasInEther,
              age: tx.timestamp,
            };
          });
        return [...newTransactions, ...prevTransactions];
      });
    }
  }, []);
  useEffect(() => {
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
    const updateInfo = async () => {
      const bnbPrice = await getPrice("BNB", "USDT").then(
        (quote) => Number(quote.price).toFixed(2) + "$"
      );
      const block = await getLatestBlock();

      const updateTables = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/txs?page=${currentPage}&limit=${limit}`)
        setLastPage(response.data.data?.meta?.last_page);

        setLatestTransactions((prevTransactions) => {
          const prevHashes = prevTransactions.map((tx) => tx.hash);
          const newTransactions = response.data.data.transactions
            .filter((tx: any) => !prevHashes.includes(tx.hash))
            .map((tx: any) => {
              let add;
              const checkAddress = () => {
                if (tx.to === "null") {
                  return add = tx.creates
                }
                return add = tx.to
              }
              checkAddress()

              const gasInEther = (Number(21000) * Number(tx.gasPrice)) / 1e18;
              return {
                hash: tx.transaction_hash,
                blocknumber: tx.blockNumber,
                from: tx.from,
                to: add,
                value: (tx.value / 10 ** 18).toString(),
                gasPrice: gasInEther,
                age: timeAgo(tx.timestamp)
              };
            });
          return [...newTransactions, ...prevTransactions];
        });
      };

      updateTables();
    };

    updateInfo();
    // const cardInfoHandler = setInterval(updateInfo, 2500);

    // return () => clearInterval(cardInfoHandler);
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <h3>Transactions</h3>
      </div>
      <div className="card__body api-key-table">
        <Table
          thead={() => {
            return (
              <tr>
                <th>Transaction Hash</th>
                <th>Age</th>
                <th>Block</th>
                <th>From</th>
                <th></th>
                <th>To</th>
                <th>Amount</th>
                <th>GasPrice (SEM)</th>
              </tr>
            );
          }}
          tbody={latestTransactions.map((tx) => {
            return () => {
              return (
                <tr key={tx.hash}>
                  <td>
                    <Link to={`/tx/${tx.hash}`}>
                      {tx.hash.slice(0, 8) + "..." + tx.hash.slice(-4)}
                    </Link>
                  </td>
                  <td>{tx.age}</td>
                  <td>
                    <Link to={`/block/${tx.blocknumber}`}>
                      {tx.blocknumber}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/address/${tx.from}`}>
                      {tx.from.slice(0, 8) + "..." + tx.from.slice(-4)}
                    </Link>
                  </td>
                  <td className="right-arrow-td">
                  <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><g transform="translate(-1238 -1)"><g id="expanded-ready"><path d="m1600.87 33.001c39.61.188 78.21 21.958 98.75 56.215 10.61 17.69 16.28 38.296 16.38 58.911.13 71.915.13 143.831 0 215.746-.17 38.057-20.5 75.63-52.67 96.538-18.48 12.012-40.42 18.484-62.46 18.588-71.91.114-143.83.114-215.74 0-39.82-.189-78.57-22.327-98.93-56.514-10.5-17.629-16.1-37.997-16.2-58.612-.13-71.915-.13-143.831 0-215.746.17-38.132 20.62-75.707 52.67-96.538 18.48-12.009 40.29-18.483 62.46-18.588 71.91-.114 143.83-.114 215.74 0zm-215.36 15.999c-32.58.051-64.82 17.186-83.01 44.64-10.64 16.055-16.41 35.125-16.5 54.538-.13 71.988-.33 143.978 0 215.966.26 31.675 16.56 62.682 42.41 80.838 16.4 11.518 36.34 17.857 56.45 18.016 72.09.342 144.19.342 216.28 0 40.57-.321 79.62-27.463 93.33-66.737 3.6-10.295 5.44-21.192 5.53-32.117.33-72.095.33-144.193 0-216.288-.26-31.683-16.56-62.682-42.41-80.838-16.41-11.523-36.43-17.857-56.45-18.016-71.87-.342-143.75-.002-215.63-.002zm217.53 199-103.19-114.648 11.9-10.704c40 44.451 80.01 88.901 120.01 133.352l-120.01 133.352-11.9-10.704 103.19-114.648h-246.94v-16z"/></g></g></svg>
                  </td>
                  <td>
                    {tx.to ? (
                      <Link to={`/address/${tx.to}`}>
                        {tx.to.slice(0, 8) + "..." + tx.to.slice(-4)}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{tx.value} SEM</td>
                  <td>{tx.gasPrice}</td>
                </tr>
              );
            };
          })}
          limit={10}
          pagesLimit={1000}
        />
        {/* <>
          {latestTransactions.length > 10 &&
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
          }
        </> */}
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

export default AllTransactions;

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
          return {
            hash: tx.transaction_hash,
            from: tx.from,
            to: tx.to,
            value: (tx.value / 10 ** 18).toString(),
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
            return {
              hash: tx.transaction_hash,
              from: tx.from,
              to: tx.to,
              value: (tx.value / 10 ** 18).toString(),
              age: tx.timestamp,
            };
          });
        return [...newTransactions, ...prevTransactions];
      });
    }
  }, []);
  useEffect(() => {
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

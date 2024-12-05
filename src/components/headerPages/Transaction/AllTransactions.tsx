import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../table/Table";

import { getPrice } from "../../../services/binance";
import {
  getLatestBlock
} from "../../../services/web3";


import "../../pages/home/home.scss";
import axios from "axios";
import { getTransactionDetailed } from "../../pages/tx/tx.controller."

const AllTransactions: React.FC = () => {
  const [latestTransactions, setLatestTransactions] = useState<
    Array<{
      hash: string;
      blocknumber: number | string;
      from: string;
      to: string | null;
      value: string;
      gasPrice: number;
    }>
  >([]);
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTx, setTotalTx] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);

  const changePage = async (_page: number) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/txs?page=${_page}&limit=${limit}`)
    console.log(response.data.data.transactions, "response");
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
          };
        });
      return [...newTransactions, ...prevTransactions];
    });
  }

  useEffect(() => {
    const run = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/txs?page=${currentPage}&limit=${limit}`)
      console.log(response.data.data.transactions, "response");
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

              const gasInEther = (Number(21000) * Number(tx.gasPrice)) / 1e18;
              return {
                hash: tx.transaction_hash,
                blocknumber: tx.blockNumber,
                from: tx.from,
                to: tx.to,
                value: (tx.value / 10 ** 18).toString(),
                gasPrice: gasInEther
              };
            });
          return [...newTransactions, ...prevTransactions];
        });
      };

      updateTables();
    };

    updateInfo();
    const cardInfoHandler = setInterval(updateInfo, 2500);

    return () => clearInterval(cardInfoHandler);
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <h3>Latest Transactions:</h3>
      </div>
      <div className="card__body api-key-table">
        <Table
          thead={() => {
            return (
              <tr>
                <th>Tx</th>
                <th>Block Number</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
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
                      {tx.hash.slice(0, 10) + "..."}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/block/${tx.blocknumber}`}>
                      {tx.blocknumber}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/address/${tx.from}`}>
                      {tx.from.slice(0, 20) + "..."}
                    </Link>
                  </td>
                  <td>
                    {tx.to ? (
                      <Link to={`/address/${tx.to}`}>
                        {tx.to.slice(0, 20) + "..."}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{tx.value}</td>
                  <td>{tx.gasPrice}</td>
                </tr>
              );
            };
          })}
          limit={10}
          pagesLimit={1000}
        />
        <>
          {latestTransactions.length > 0 &&
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
        </>
      </div>
    </div>

  );
};

export default AllTransactions;

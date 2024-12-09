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
            timeAt: timeAt(tx.timestamp),
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
              timeAt: timeAt(tx.timestamp),
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
      <div className="card__header">
        <h3 data-tooltip="test">Latest Blocks:</h3>
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

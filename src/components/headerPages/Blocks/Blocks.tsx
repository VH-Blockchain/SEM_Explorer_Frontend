import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../table/Table";

import { getPrice } from "../../../services/binance";
import { getLatestBlock, timestampToMinutes } from "../../../services/web3";
import "../../pages/home/home.scss";

const Blocks: React.FC = () => {
  const [latestBlocks, setLatestBlocks] = useState<
    Array<{
      number: number | string;
      txs: number | string;
      timeAt: string;
      bnbPrice: string;
    }>
  >([]);

  useEffect(() => {
    const updateInfo = async () => {
      const bnbPrice = await getPrice("BNB", "USDT").then(
        (quote) => Number(quote.price).toFixed(2) + "$"
      );
      const block = await getLatestBlock();
      const timeAt = timestampToMinutes(block);

      const updateTables = () => {
        setLatestBlocks((prevBlocks) => {
          const blockExistsInTable = prevBlocks.find(
            (blck) => blck.number === block.number
          );
          if (blockExistsInTable) return prevBlocks;

          return [
            {
              number: block.number,
              txs: block.transactions.length,
              timeAt: timeAt,
              bnbPrice: bnbPrice,
            },
            ...prevBlocks,
          ];
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
        <h3 data-tooltip="test">Latest Blocks:</h3>
      </div>
      <div className="card__body api-key-table">
        <Table
          thead={() => {
            return (
              <tr>
                <th>Number</th>
                <th>Tx Count</th>
                <th>Time At</th>
                <th>B4Fire Price</th>
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
                  <td>{block.txs}</td>
                  <td>{block.timeAt}</td>
                  <td>NA</td>
                </tr>
              );
            };
          })}
          limit={10}
          pagesLimit={5}
        />
      </div>
    </div>
  );
};

export default Blocks;

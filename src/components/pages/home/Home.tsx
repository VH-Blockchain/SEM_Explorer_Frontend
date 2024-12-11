import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import StatusCard from "../../status-card/StatusCard";
import Chart, { ChartSeries } from "../../Chart/Chart";
import Table from "../../table/Table";

import { getPrice } from "../../../services/binance";
import { SelectChangeEvent } from "@mui/material";
import {
  getLatestBlock,
  calculateGas,
  timestampToMinutes,
} from "../../../services/web3";

import Grid from "@mui/material/Grid";

import "./home.scss";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Select,
} from "@mui/material";
import { MenuItem } from "react-pro-sidebar";

const Home: React.FC = () => {
  const [cardInfo, setCardInfo] = useState({
    bnbPrice: "?",
    latestBlock: "?",
    txCount: "?",
    blockTime: "?",
  });

  const [gasPriceChart, setGasPriceChart] = useState<{
    series: ChartSeries;
    timeAt: string[];
  }>({
    series: [
      { name: "Min Price", data: [] },
      { name: "Max Price", data: [] },
      { name: "Avg Price", data: [] },
    ],
    timeAt: [],
  });

  const [latestBlocks, setLatestBlocks] = useState<
    Array<{
      number: number | string;
      txs: number | string;
      timeAt: string;
      validateBy: string;
      bnbPrice: string;
      gasUsed: number;
    }>
  >([]);

  const [latestTransactions, setLatestTransactions] = useState<
    Array<{
      hash: string;
      from: string;
      to: string | null;
      value: string;
    }>
  >([]);
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTx, setTotalTx] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const navigate = useNavigate();

  const changePage = async (_page: number) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}internal/txs?page=${_page}&limit=${limit}`
    );
    console.log(response, "response");
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
  };
  const timeAgo = (timeAt: string) => {
 
    const now: any = new Date();
    const [hours, minutes, seconds] = timeAt.split(':').map((part) => parseInt(part, 10));

    const time:any = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);

    const diffInSeconds = Math.floor((now - time) / 1000);

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
  };
  useEffect(() => {

    const updateInfo = async () => {
      const bnbPrice = await getPrice("BNB", "USDT").then(
        (quote) => Number(quote.price).toFixed(2) + "$"
      );
      const block = await getLatestBlock();
      console.log(block,"12321")
      const gas = calculateGas(block);
      const timeAt = timestampToMinutes(block);
      console.log(timeAt,"timeAt")

      const updateChart = () => {
        setGasPriceChart((prevGasPriceChart) => {
          const min = prevGasPriceChart.series[0];
          const max = prevGasPriceChart.series[1];
          const avg = prevGasPriceChart.series[2];

          const update = (
            array: number[],
            newValue: number,
            sliceBy: number = -9
          ): number[] => {
            return [...array.slice(sliceBy), newValue];
          };

          return {
            ...prevGasPriceChart,
            series: [
              { ...min, data: update(min.data, gas.min) },
              { ...max, data: update(max.data, gas.max) },
              { ...avg, data: update(avg.data, gas.avg) },
            ],
            timeAt: [...prevGasPriceChart.timeAt.slice(-9), timeAt],
          };
        });
      };

      const updateStatusCard = () => {
        setCardInfo({
          bnbPrice,
          latestBlock: block.number.toString(),
          txCount: block.transactions.length.toString(),
          blockTime: timeAt,
        });
      };

      const updateTables = async () => {
        setLatestBlocks((prevBlocks) => {
          const blockExistsInTable = prevBlocks.find(
            (blck) => blck.number === block.number
          );

          if (blockExistsInTable) return prevBlocks;
          return [
            {
              number: block.number,
              txs: block.transactions.length,
              timeAt: timeAgo(timeAt),
              validateBy: block.miner,
              bnbPrice: bnbPrice,
              gasUsed: block.gasUsed,
            },
            ...prevBlocks,
          ];
        });
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}internal/txs?page=${currentPage}&limit=${limit}`
        );
        setCurrentPage(response.data.data?.meta.current_page);
        setLimit(response.data.data?.meta?.per_page);
        setTotalTx(response.data.data?.meta?.total);
        setLastPage(response.data.data?.meta?.last_page);

        setLatestTransactions((prevTransactions) => {
          const prevHashes = prevTransactions.map((tx) => tx.hash);
          const newTransactions = response.data.data.transactions
            .filter((tx: any) => !prevHashes.includes(tx.hash))
            .map((tx: any) => {
              let add;
              const checkAddress = () => {
                if (tx.to === "null") {
                  return (add = tx.creates);
                }
                return (add = tx.to);
              };
              checkAddress();
              return {
                hash: tx.transaction_hash,
                from: tx.from,
                to: add,
                value: (tx.value / 10 ** 18).toString(),
              };
            });
          return [...newTransactions, ...prevTransactions];
        });
      };
      updateStatusCard();
      updateChart();
      updateTables();
    };

    updateInfo();

    const updateBlocks = async () => {
      const block = await getLatestBlock();
      const timeAt = timestampToMinutes(block);
      const bnbPrice = await getPrice("BNB", "USDT").then(
        (quote) => Number(quote.price).toFixed(2) + "$"
      );
      setLatestBlocks((prevBlocks) => {
        const blockExistsInTable = prevBlocks.find(
          (blck) => blck.number === block.number
        );
        if (blockExistsInTable) return prevBlocks;

        return [
          {
            number: block.number,
            txs: block.transactions.length,
            timeAt: timeAgo(timeAt),
            validateBy: block.miner,
            bnbPrice: bnbPrice,
            gasUsed: block.gasUsed,
          },
          ...prevBlocks,
        ];
      });
    };
    const cardInfoHandler = setInterval(updateBlocks, 2500);
    return () => clearInterval(cardInfoHandler);
  }, []);

  const [selectedValue, setSelectedValue] = useState<string>("10"); // State for selected value

  const handleChangedropdown = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value); // The value is already a string, no need for casting
  };

  return (
    <div className="layout-inner-wrape">
      {/* <section>
        <div className="top-title-sec">
          <h3 className="top-title">SEM Chain Explorer</h3>
          <div className="title-button-sec">
            <div className="btn-sec">
              <Button
                className="refresh-btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </section> */}
      <div className="d-flex align-center">
        <section className="info w-40">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <div className="card  chart  chart-bg">
                <Chart
                  series={gasPriceChart.series}
                  options={{
                    colors: ["#6ab04c", "#2980b9", "yellow"],

                    xaxis: {
                      categories: gasPriceChart.timeAt,
                    },
                  }}
                  height={"100%"}
                />
              </div>
            </Grid>
          </Grid>
        </section>
        <section className="status-wrape status-bg w-60">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatusCard
                count={"$1.0"}
                // icon="bx bxs-dollar-circle"
                title="SEM Price"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatusCard
                count={cardInfo.latestBlock}
                // icon="bx bxs-data"
                title="Latest Block"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatusCard
                count={cardInfo.blockTime}
                // icon="bx bx-time"
                title="Block Added"
              />
            </Grid>
            
          </Grid>
          <Grid container spacing={3}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatusCard
                count={cardInfo.txCount}
                // icon="bx bx-transfer"
                title="Tx Count"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatusCard
                count={cardInfo.latestBlock}
                // icon="bx bxs-data"
                title="Latest Block"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatusCard
                count={cardInfo.blockTime}
                // icon="bx bx-time"
                title="Block Added"
              />
            </Grid>
          </Grid>
        </section>
      </div>
      <section className="mt-30">
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <div className="card">
              {/* <div className="card__header">
                <Button></Button>
              </div> */}
              <div className="card-header">
                <div className="btn-sec">
                  <Button className="refresh-btn active">Refresh</Button>
                  <Button
                    className="refresh-btn"
                    onClick={() => navigate("/AllTransactions")}
                  >
                    Transactions
                  </Button>
                  <Button
                    className="refresh-btn"
                    onClick={() => navigate("/AllTransactions")}
                  >
                    Blocks
                  </Button>
                  
                  
                  {/* <Button className="refresh-btn">Total wallets</Button> */}
              
                </div>
                <div className="drop-sec"></div>
              </div>
              <div className="card__body api-key-table">
                <div className="gradient-text-sec d-flex">
                  <h5 className="gradient-text">24,049,204</h5>
                  <span className="small-text">+1.23%</span>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} xs={12}>
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
                        <th>Validate By</th>
                        <th>Gas Used</th>
                      </tr>
                    );
                  }}
                  tbody={latestBlocks.map((block) => {
                    return () => {
                      return (
                        <tr key={block.number}>
                          <td>
                            <Link to={`/block/${block.number}`}>
                              {block.number}
                            </Link>
                          </td>
                          <td>{block.txs}</td>
                          <td>{block.timeAt}</td>
                          <td>
                            {block.validateBy.slice(0, 8) +
                              "..." +
                              block.validateBy.slice(-4)}
                          </td>
                          <td>{block.gasUsed} SEM</td>
                        </tr>
                      );
                    };
                  })}
                  limit={10}
                  pagesLimit={5}
                />
                {latestBlocks.length > 0 && (
                  <div className="table__pagination">
                    <h3></h3>
                    <div className="btn-wrape">
                      {true && (
                        <>
                          <button
                            className="btn"
                            onClick={() => navigate("/Blocks")}
                          >
                            View All Blocks
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item lg={6} xs={12}>
            {/* <div className="card"> */}
            <section className="">
              <Grid container spacing={3}>
                <Grid item lg={12} xs={12}>
                  <div className="card">
                    <div className="card__header">
                      <h3>Latest Transactions:</h3>
                    </div>
                    <div className="card__body api-key-table  home-trans-table">
                      <Table
                        thead={() => {
                          return (
                            <tr>
                              <th>Tx</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Value</th>
                            </tr>
                          );
                        }}
                        tbody={latestTransactions.map((tx) => {
                          return () => {
                            return (
                              <tr key={tx.hash}>
                                <td>
                                  <Link to={`tx/${tx.hash}`}>
                                    {tx.hash.slice(0, 8) +
                                      "..." +
                                      tx.hash.slice(-4)}
                                  </Link>
                                </td>
                                <td>
                                  <Link to={`/address/${tx.from}`}>
                                    {tx.from.slice(0, 8) +
                                      "..." +
                                      tx.from.slice(-4)}
                                  </Link>
                                </td>
                                <td>
                                  <Link to={`/address/${tx.to}`}>
                                    {tx.to
                                      ? tx.to.slice(0, 8) +
                                        "..." +
                                        tx.to.slice(-4)
                                      : "-"}
                                  </Link>
                                </td>
                                <td>{tx.value} SEM</td>
                              </tr>
                            );
                          };
                        })}
                        limit={limit}
                        pagesLimit={lastPage}
                      />
                      {latestTransactions.length > 0 && (
                        <div className="table__pagination">
                          <h3></h3>
                          <div className="btn-wrape">
                            {true && (
                              <>
                                <button
                                  className="btn"
                                  onClick={() => navigate("/AllTransactions")}
                                >
                                  View All Transactions
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </section>
            {/* </div> */}
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default Home;

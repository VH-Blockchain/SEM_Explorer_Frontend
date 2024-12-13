import { Box, Button } from "@mui/material";
import { Grid, Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../table/Table";
import Web3 from "web3";
import ContractData from "./ContractData";
import { isContractVerified } from "./address.controller";
import axios from "axios";
import { getWelComeTranscation } from "../../../services/web3";

type MyComponentProps = {
  transactions: any;
  location: any;
  role: any;
  addressDataList: any;
  currentPage: any;
  info: any;
  address: any;
  isverified: boolean;
};

const AddressData: React.FC<MyComponentProps> = ({
  transactions,
  location,
  role,
  isverified,
  addressDataList,
  currentPage,
  info,
  address,
}) => {
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
  const [transactionsList, setTransactionsList] = useState<
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
  const [limit, setLimit] = useState<number>(10);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [totalTx, setTotalTx] = useState<number>(0);
  const [transferData, setTransferData] = useState(true);
  const [contractData, setContractData] = useState(false);
  const [metadata, setMetadata] = useState<any>('');

  const changeTransferInfo = () => {
    setTransferData(true);
    setContractData(false);
  };

  const changeContractInfo = () => {
    setTransferData(false);
    setContractData(true);
  };
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
  useEffect(() => {
    const run = async () => {

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}internal/address/${address}?page=${currentPage}&limit=${limit}`)
      console.log(response, "response")
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
    }
    run()
  }, []);
  React.useEffect(() => {
    console.log(address, "address");

    isContractVerified(
      address,
      process.env.REACT_APP_API_KEY as string
    )
      .then((res: any) => {
        setMetadata(res?.data?.data)
      })
      .catch((err: any) => {
        console.log(err, "Error");
      });
  }, []);
  React.useEffect(() => {
    console.log(address, "address");

    getWelComeTranscation(address).then((tx) => {
      console.log(tx.receipt)
      const prevTrasncation = latestTransactions;
      if (tx?.receipt?.transactionHash) {





        const gasInEther = (Number(21000) * Number(tx.gasPrice)) / 1e18;
        // prevTrasncation.push({
        //   hash: tx?.receipt?.transaction_hash,
        //   blocknumber: tx?.receipt?.blockNumber,
        //   from: tx?.receipt?.from,
        //   to: tx?.receipt?.to,
        //   value: (tx?.receipt?.value / 10 ** 18).toString(),
        //   gasPrice: gasInEther,
        //   age: timeAgo(tx?.receipt?.timestamp)
        // })

        prevTrasncation.push({
          hash: tx?.receipt?.transactionHash,
          blocknumber: tx?.receipt?.blockNumber,
          from: tx?.receipt?.from,
          to: tx?.receipt?.to,
          value: "0.0369",
          gasPrice: gasInEther,
          age: "Airdrop"
        });
      }
      setTransactionsList(prevTrasncation);
    }).catch(() => {
      setTransactionsList(latestTransactions);
    });
  }, [latestTransactions]);
  return (
    <>

      <Box sx={{ marginBottom: "10px" }}>
        <Button
          className="btn btn-primary m-2 first-btn"
          type="submit"
          sx={{ marginRight: "10px" }}
          onClick={changeTransferInfo}
        >
          Transactions
        </Button>
        {role === "USER" ? (
          <></>
        ) : (
          <>
            {" "}
            {isverified ? (
              <Badge color="success" overlap="circular" badgeContent=" ">
                <Button
                  type="reset"
                  className="btn btn-primary reset-btn"
                  onClick={changeContractInfo}
                >
                  Contract
                </Button>
              </Badge>
            ) : (
              <Button
                type="reset"
                className="btn btn-primary reset-btn"
                onClick={changeContractInfo}
              >
                Contract
              </Button>
            )}
          </>
        )}
      </Box>

      {transferData ? (
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="card">
              {/* {["", "#txs", "#transactions"].includes(location) &&
                transactions.normal.find(
                  (list: any) => list.page === currentPage
                ) && ( */}
              <div>
                <div className="card__header">
                  <h3>Transactions: {addressDataList?.length}</h3>
                </div>
                <div className="card__body api-key-table">
                  <Table
                    thead={() => {
                      return (
                        <tr>
                          <th>Hash</th>
                          <th>Age</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Value</th>
                        </tr>
                      );
                    }}
                    tbody={transactionsList?.map((tx: any) => {
                      return () => {
                        return (
                          <tr key={tx?.hash}>
                            <td>
                              <Link
                                target="_blank"
                                to={`/tx/${tx?.hash}`}
                              >
                                {tx?.hash.slice(0, 8) + "..." + tx.hash.slice(-4)}
                              </Link>
                            </td>
                            <td>{tx?.age} </td>
                            <td>
                              <Link
                                target="_blank"
                                to={`/address/${tx?.from}`}
                              >
                                {tx?.from.slice(0, 8) + "..." + tx.from.slice(-4)}
                              </Link>
                            </td>
                            <td>
                              <Link
                                target="_blank"
                                to={`/address/${tx?.to}`}
                              >
                                {tx?.to ? tx?.to.slice(0, 8) + "..." + tx.to.slice(-4) : "-"}
                              </Link>
                            </td>
                            <td>
                              {tx.value} SEM
                            </td>
                          </tr>
                        );
                      };
                    })}
                    limit={20}
                  />
                </div>
              </div>
              {/* )} */}

              {/* <div className="table__pagination">
                            <h3>Page: {currentPage}</h3>
                            <div className="btn-wrape">
                                { currentPage > 1 && (
                                    <button
                                        className="btn"
                                        onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                                    >
                                        <i className="bx bx-left-arrow-alt"></i> Back
                                    </button>
                                )}
                                <button
                                    className="btn"
                                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                                >
                                    Next <i className="bx bx-right-arrow-alt"></i>
                                </button>
                            </div>
                        </div> */}
            </div>


            {info.contract && info.contract !== "0x" && (

              <div className="">
                <div className="card address-info__card contract-code-title">

                  <h1>
                    <span className="theme-color">Contract Code:</span>
                  </h1>
                  {info.contract}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      ) : (
        <ContractData address={address} isverified={isverified} contractData={metadata} />

      )}
    </>
  );
};

export default AddressData;
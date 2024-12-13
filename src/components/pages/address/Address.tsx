import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import useLoading from "../../../hooks/loading";

import {
  getAddressInfo,
  getNormalTransactions,
  getAddressDetails,
  isContractVerified,
} from "./address.controller";

import Loading from "../../loading/Loading";
import NotFound from "../../404/NotFound";
import Table from "../../table/Table";
import "./address.scss";
import Grid from "@mui/material/Grid";
import { Button, Tooltip } from "@mui/material";
import AddressData from "./AddressData";
import copy from '../../../images/copy.svg'

interface TX {
  error: boolean;
  hash: string;
  from: string;
  to: string;
  age: number | string;
  value: number | string;
  token?: string;
  isverified: boolean;
}

const Address: React.FC = () => {
  const { address = "" } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useLoading(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addressDataList, setaddressDataList] = useState<{
    [x: string]: any;
    normal: Array<{ page: number; txs: TX[] }>;
    bep20: Array<{ page: number; txs: TX[] }>;
    internal: Array<{ page: number; txs: TX[] }>;
  }>({
    normal: [],
    bep20: [],
    internal: [],
  });
  const [transactions, setTransactions] = useState<{
    normal: Array<{ page: number; txs: TX[] }>;
    bep20: Array<{ page: number; txs: TX[] }>;
    internal: Array<{ page: number; txs: TX[] }>;
  }>({
    normal: [],
    bep20: [],
    internal: [],
  });
  const [info, setInfo] = useState<{
    SEMPrice: number;
    contract: string;
    balance: string;
    balanceUsd: string;
    txCount: number;
    tokenName: any;
    tokenSymbol: any;
    totalSupply: any;
  }>({
    SEMPrice: 0,
    contract: "",
    balance: "",
    balanceUsd: "",
    txCount: NaN,
    tokenName: "",
    tokenSymbol: "",
    totalSupply: "",
  });

  const [isverified, setIsVerified] = useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getAddressInfo(address).then((info) => setInfo(info));
  }, [address]);

  useEffect(() => {
    fetchTransactions();
    if (location?.state === "USER") {
      getAddressDetails(address, currentPage, rowsPerPage).then((res: any) => {
        console.log(res, "getAddressDetails")
        setaddressDataList(res.data.transactions);
      });
    } else {
      isContractVerified(address, process.env.REACT_APP_API_KEY as string)
        .then((res: any) => {
          setIsVerified(res?.data?.data.verified)
        })
        .catch((err: any) => {
          console.log(err, "Error");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, transactions, address, currentPage, rowsPerPage]);
  useEffect(() => {
    setTransactions({
      normal: [],
      bep20: [],
      internal: [],
    });
  }, [address]);

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };


  const fetchTransactions = async () => {
    console.log("fetch Transaction Function call");

    setLoading(true);
    switch (location.hash) {
      case "":
      case "txs":
      case "transactions":
        if (
          !transactions.normal.find((offset) => offset.page === currentPage)

        ) {
          await getNormalTransactions(currentPage, address).then((txs) => {
            setTransactions((prevTransactions: any) => {
              console.log("set Transaction UseState");

              return {
                ...prevTransactions,
                normal: [
                  ...prevTransactions.normal,
                  { page: currentPage, txs },
                ],
              };
            });
          });
        }
        break;
      default:
        break;
    }
    setLoading(false);
  };

  if (!address || !Web3.utils.isAddress(address))
    return <NotFound message="Address Not Found" />;

  if (loading) return <Loading />;

  return (
    <section className="address-info">
      <div className="add-box">
        <h2 style={{ color: "black" }}>
          <span className="theme-color" style={{ color: "black" }}>Address:</span> {address}
        </h2>
        <Tooltip title="Copy">
          <Button>
            <img src={copy} alt="copy" className="copy-ic" />
          </Button>
        </Tooltip>

      </div>
      <Grid container spacing={3}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <div className="card balance-card">
                <div className="address-info__card">
                  <p className="add-title">Overview</p>
                  <h2>
                    <span className="theme-color">SEM Balance:</span>{" "}<br></br>
                    {info.balance || "?"} SEM ({info.balanceUsd || "?"} $)
                  </h2>
                </div>
              </div>
            </Grid>
            {/* <Grid item lg={6} md={12} sm={12} xs={12}>
              <div className="card balance-card">
                <div className="address-info__card">
                  <p className="add-title">Multichain Info</p>
                  <h2>
                    N/A
                  </h2>
                </div>
              </div>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          {
            location.state == "CONTRACT" ? (
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="card balance-card">
                    <div className="address-info__card">
                      <h2>
                        <span className="theme-color">TotalSupply:</span>{" "}
                        {info.totalSupply} {info.tokenSymbol}
                      </h2>
                      <h2>
                        <span className="theme-color">Token Name:</span>{" "}
                        {info.tokenName}
                      </h2>
                    </div>
                  </div>
                </Grid>
              </Grid>
            ) : (<></>)
          }
        </Grid>
      </Grid>
      <AddressData transactions={transactions} location={location.hash} isverified={isverified} role={location.state} addressDataList={addressDataList && []} currentPage={currentPage} info={info} address={address} />
    </section>
  );
};

export default Address;
function setAccountType(data: { accountResponse: any; }): any {
  throw new Error("Function not implemented.");
}


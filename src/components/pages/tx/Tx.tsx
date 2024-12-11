import Web3 from "web3";
import { Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useLoading from "../../../hooks/loading";

import NotFound from "../../404/NotFound";
import Loading from "../../loading/Loading";

import { Transaction, TransactionReceipt } from "../../../services/web3";
import Tooltip from '@mui/material/Tooltip';
import {
  findSignatures,
  findFunctionByMethod,
  getTransactionDetailed,
} from "./tx.controller.";

import "./tx.scss";

import Grid from "@mui/material/Grid";
import { getBlockByNumber } from "../block/block.controller";

const Tx: React.FC = () => {
  const { hash = "" } = useParams();

  const [loading, setLoading] = useLoading(false);
  const [inputFunction, setInputFunction] = useState("");
  const [transaction, setTransaction] = useState<{
    data: Transaction;
    receipt: TransactionReceipt;
  } | null>(null);
  const [getBlockNumber, setBlockNumber] = useState<number | null>(null);
  const [signatures, setSignatures] = useState<
    Array<{
      event: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);

      await getTransactionDetailed(hash)
        .then((tx) => {
          setTransaction(tx);
          //   const blockNumber: Number = tx?.data?.blockNumber;
          console.log(tx?.data?.blockNumber, "data", tx);
          //   getBlockByNumber( tx?.data?.blockNumber);
          const blockNumber = tx?.data?.blockNumber || 0;
        //   getBlockByNumber(blockNumber).then((blockdata) => {
        //     console.log("blockdata", blockdata?.block?.number);
        //     setBlockNumber(blockdata?.block?.number);
        //   });
          const methodID = tx?.data?.input?.slice(0, 10);
          if (!methodID) return;

          findFunctionByMethod(methodID).then((methodName) => {
            setInputFunction(methodName);
          });
        })
        .catch((_) => {});

      setLoading(false);
    };
    fetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  useEffect(() => {
    if (!transaction?.receipt) return;
    findSignatures(transaction.receipt).then((findedSignatures) => {
      setSignatures(findedSignatures);
    });
  }, [transaction?.receipt]);

  if (loading) return <Loading />;
  if (!hash || !transaction?.data || !transaction.receipt)
    return <NotFound message="Transaction Not Found" />;
  console.log("transaction", transaction);
  return (
    <>
      <Box className="container-wrape">
        {/* <Typography component="h6" className="title-text">
                    Transaction
                </Typography> */}

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="card">
              <div className="card__header">
                <h3>Transaction Details</h3>
              </div>
              <div className="card__body">
                <div className="tx-info">
                  <p>
                  <Tooltip title="A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed." placement="top">
          
                  <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
                  </Tooltip>
                    <span className="theme-color">Hash: </span>
                    {transaction.data.hash}
                  </p>
                  <p>
                  <Tooltip title="The status of the transaction." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Status: </span>
                    {transaction.receipt.status.toString() == "true"
                      ? "Success"
                      : "Failed"}
                  </p>
                  <p>
                  <Tooltip title="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Block: </span>
                    <Link to={`/block/${transaction.data.blockNumber}`}>
                      {transaction.data.blockNumber}
                    </Link>
                  </p>
                  <p className="br-bottom">
                  <Tooltip title="The date and time at which a transaction is produced." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Timestamp: </span>
                    {transaction.data.blockNumber}
                  </p>
                  <p>
                  <Tooltip title="The sending party of the transaction." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">From: </span>
                    <Link to={`/address/${transaction.data.from}`}>
                      {transaction.data.from}
                    </Link>
                  </p>
                  <p className="br-bottom">
                  <Tooltip title="The receiving party of the transaction (could be a contract address)." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">To: </span>
                    <Link to={`/address/${transaction.data.to}`}>
                      {transaction.data.to}
                    </Link>
                  </p>
                  <p>
                  <Tooltip title="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Value: </span>
                    {Web3.utils.fromWei(transaction.data.value, "ether")} SEM
                  </p>
                  <p>
                  <Tooltip title="Amount paid to process the transaction in Ether and fiat value." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Tx Fee: </span>
                    {Web3.utils.fromWei(
                      (
                        Number(transaction.receipt.gasUsed) *
                        Number(transaction.data.gasPrice)
                      ).toString(),
                      "ether"
                    )}{" "}
                    SEM
                  </p>
                  <p className="br-bottom">
                    <Tooltip title="Cost per unit of gas spent for the transaction, in Ether and Gwei." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Gas Price: </span>
                    {Web3.utils.fromWei(transaction.data.gasPrice, "gwei")} Gwei
                  </p>
                  <p>
                    <Tooltip title="Maximum amount of gas allocated for the transaction & the amount eventually used. Normal ETH transfers involve 21,000 gas units while contracts involve higher values." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Gas Limit: </span>
                    {transaction.data.gas}
                  </p>
                  <p>
                    <Tooltip title="Maximum amount of gas allocated for the transaction & the amount eventually used. Normal ETH transfers involve 21,000 gas units while contracts involve higher values." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Gas Used: </span>
                    {transaction.receipt.gasUsed}
                  </p>
                  <p>
                    <Tooltip title="Other data related to this transaction." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Nonce: </span>
                    {transaction.data.nonce}
                  </p>
                  <p className="br-bottom">
                  <Tooltip title="Additional data included for this transaction. Commonly used as part of contract interaction or as a message sent to the recipient." placement="top">
          
          <svg height="512pt" viewBox="0 -4 512.001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m255.835938 503c-13.789063 0-26.5625-6.222656-35.0625-17.089844l-51.140626-64.855468-89.644531-.054688c-44.101562 0-79.988281-35.886719-79.988281-80v-261c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v161c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-161c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v261c0 22.054688 17.945312 40 40 40l99.351562.058594c6.121094.003906 11.902344 2.8125 15.691407 7.617187l57.191406 72.527344c1.167969 1.496094 2.59375 1.796875 3.605469 1.796875h.019531c1.007813-.003906 2.445313-.3125 3.5625-1.761719.035156-.046875.070313-.09375.105469-.136719l56.726562-72.433593c3.792969-4.839844 9.597656-7.667969 15.746094-7.667969h100c22.058594 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-90.257812l-50.679688 64.707031c-8.453125 10.9375-21.21875 17.238281-35.046875 17.292969-.058594 0-.121094 0-.179687 0zm20.164062-198v-108c0-11.046875-8.953125-20-20-20s-20 8.953125-20 20v108c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm-20-197c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0"/></svg>
          </Tooltip>
                    <span className="theme-color">Input: </span>
                    {transaction.data.input === "0x"
                      ? "Transfer"
                      : inputFunction}
                  </p>
                </div>

                <div className="tx-info-card">
                  <p>{transaction.data.input}</p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {(transaction.receipt.logs.length || null) && (
              <div className="card">
                <div className="card__header">
                  <h3>Logs: {transaction.receipt.logs.length}</h3>
                </div>
                <div className="card__body">
                  <div className="">
                    {transaction.receipt.logs.map((log, index) => {
                      const signature = signatures.find(
                        (sig) => sig.event === log.topics[0]
                      );
                      return (
                        <div className="card col-12" key={index}>
                          <div className="card__body">
                            <div className="tx-info">
                              <p>
                                <span className="theme-color">Address:</span>{" "}
                                <Link to={`/address/${log.address}`}>
                                  {log.address}
                                </Link>
                              </p>
                              <p>
                                <span className="theme-color">Log Index:</span>{" "}
                                {log.logIndex}
                              </p>
                              <p>
                                <span className="theme-color">Topics:</span>{" "}
                                {signature?.name}
                              </p>
                              <p>
                                {log.topics.map((topic, topicIndex) => {
                                  return (
                                    <div
                                      className="tx-info-card"
                                      key={topicIndex}
                                    >
                                      [{topicIndex}] {topic}
                                    </div>
                                  );
                                })}
                              </p>
                            </div>
                            <div className="tx-info">
                              <p>Data: </p>
                              <p>
                                <div className="tx-info-card">{log.data}</div>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>

      <div className="row">
        {(transaction.receipt.logs.length || null) && (
          <div className="col-12">
            <div className="card">
              <div className="card__header">
                <h3>Logs: {transaction.receipt.logs.length}</h3>
              </div>
              <div className="card__body">
                <div className="">
                  {transaction.receipt.logs.map((log, index) => {
                    const signature = signatures.find(
                      (sig) => sig.event === log.topics[0]
                    );
                    return (
                      <div className="card col-12" key={index}>
                        <div className="card__body">
                          <div className="tx-info">
                            <p>
                              <span className="theme-color">Address:</span>{" "}
                              <Link to={`/address/${log.address}`}>
                                {log.address}
                              </Link>
                            </p>
                            <p>
                              <span className="theme-color">Log Index:</span>{" "}
                              {log.logIndex}
                            </p>
                            <p>
                              <span className="theme-color">Topics:</span>{" "}
                              {signature?.name}
                            </p>
                            <p>
                              {log.topics.map((topic, topicIndex) => {
                                return (
                                  <div
                                    className="tx-info-card"
                                    key={topicIndex}
                                  >
                                    [{topicIndex}] {topic}
                                  </div>
                                );
                              })}
                            </p>
                          </div>
                          <div className="tx-info">
                            <p>Data: </p>
                            <p>
                              <div className="tx-info-card">{log.data}</div>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tx;

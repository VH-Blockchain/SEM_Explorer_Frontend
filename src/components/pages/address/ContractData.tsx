import {
  Grid,
  Button,
  Typography,
  Box,
  FormControl
} from '@mui/material';
import Accordion from "@mui/material/Accordion";

import { ethers } from 'ethers'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReadInfo, { datareader } from "../../readwrite/readInfo";
import WriteInfo from "../../readwrite/writeInfo";
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';


import React from 'react';
import { json } from 'stream/consumers';



type MyComponentProps = {
  address: any;
  isverified: boolean;
  contractData: any;
};
const ContractData: React.FC<MyComponentProps> = ({ address, isverified, contractData }) => {

  const [contractBytecode, setContractBytecode] = useState('');
  const [displaySection, setDisplaySection] = useState('none');
  const [AbiData, setAbiData] = useState<any>("");
  const [readFunctions, setReadFunctions] = useState([]);
  const [writeFunctions, setWriteFunctions] = useState([]);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [currentAccount, setCurrentAccount] = useState("");


  const fetchContractBytecode = async () => {
    try {
      // Connect to an Ethereum node (replace with your actual node URL)
      const provider = new ethers.providers.JsonRpcProvider('http://localhost:9951');

      // Fetch the contract's bytecode using eth_getCode
      const bytecode = await provider.send('eth_getCode', [address, 'latest']);
      console.log(bytecode, "bytecode");

      console.log("is verified or not?", isverified);
      setContractBytecode(bytecode);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchContractBytecode()
  })

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const Address = currentAccount
    ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-5)}`
    : null;


  const handleButtonClick = async (section: string) => {
    try {
      setDisplaySection(section);
      const fetch_abi = JSON.parse(contractData.response[0].abi_file);
      setAbiData(fetch_abi);
      if (fetch_abi) {
        const readFuncs: any = [];
        const writeFuncs: any = [];
        const eventList: any = [];

        fetch_abi?.forEach((item: any) => {
          if (item.type === "function") {
            const funcData = {
              name: item.name,
              parameters: item.inputs || [],
            };
            if (
              item.stateMutability === "view" ||
              item.stateMutability === "pure"
            ) {
              readFuncs.push(funcData);
            } else if (
              item.stateMutability === "nonpayable" ||
              item.stateMutability === "payable"
            ) {
              writeFuncs.push(funcData);
            }
          } else if (item.type === "event") {
            eventList.push(item.name);
          }
        });

        setReadFunctions(readFuncs);
        console.log("reading functions", readFuncs);
        setWriteFunctions(writeFuncs);
        console.log("writer functions", writeFuncs);

      } else {
        console.log("Could Not fetch Read Write");
      }
    } catch (error) {
      console.error("Error fetching ABI data:", error);
    }
  };
  // console.log("Full_data", contractData.response[0].filename);

  // const handleButtonClick = async (section: string) => {
  //   try {
  //     setDisplaySection(section);
  //     const fetch_abi = contractData.response[0].abi_file;
  //     setAbiData(fetch_abi);
  //   } catch (error) {
  //     console.error("Error fetching ABI data:", error);
  //   }
  // };

  // const handleABIClick = async () => {
  //   try {
  //     const fetch_abi = contractData.response[0].abi_file;
  //     setAbiData(fetch_abi);
  //   } catch (error) {
  //     console.error("Error fetching ABI data:", error);
  //   }
  // };

  const connectWallet = async () => {
    // const chainId = { mainnet: 137, testnet: 80001 }; // Polygon Mainnet
    // const chainId = { mainnet: 1, testnet: 11155111 }; // Sepolia
    const chainId = { mainnet: 151530, testnet: 151530 }; // B4Hit

    const { ethereum }: any = window;
    // const chainId = { mainnet: 1, testnet: 5 }; // Goerli
    console.log("network Versions:", ethereum.networkVersion);
    // let window:any


    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts:", accounts);
      setCurrentAccount(accounts[0]);
    } else {
      return alert("Please install metamask wallet");
    }
    // let providercheck = new ethers.providers.Web3Provider(ethereum);

    // setsigner(signercheck);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {isverified ? (
            <div>
              {/* <div className="card"> */}
              <div style={{ display: "flex" }}>
                <Button
                  type="reset"
                  sx={{ marginRight: "10px" }}
                  className="btn btn-outline-secondary reset-btn"
                  onClick={() => handleButtonClick('code')}
                >
                  Code
                </Button>
                <Button
                  size='small'
                  type="reset"
                  sx={{ marginRight: "10px" }}
                  className="btn btn-outline-secondary reset-btn"
                  onClick={() => handleButtonClick('read')}
                >
                  Read
                </Button>


              </div>
              <Button
                type="reset"
                sx={{ marginRight: "10px" }}
                className="btn btn-outline-secondary reset-btn"
                onClick={() => handleButtonClick('write')}
              >
                Write
              </Button>

              {displaySection === 'read' && (
                <div>
                  <div className="container justify-content-between p-5 mt-3">
                    <div className="card__header">
                      <h3>Read Functions</h3>
                      <Button
                        variant="contained"
                        type="button" endIcon={<WalletIcon />}
                        onClick={connectWallet}
                      >
                        {currentAccount ? Address : "Connect wallet"}
                      </Button>
                    </div>
                    {readFunctions.map((item: any) => (
                      <Accordion
                        expanded={expanded === "panel11"}
                        onChange={handleChange("panel11")}
                      >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box className="input-wrape">
                            <ReadInfo
                              key={item.name}
                              name={item.name}
                              parameters={item.parameters}
                              erc20={AbiData}
                              address={contractData.response[0].contract_address}
                            />
                          </Box>
                        </Grid>
                      </Accordion>
                    ))}
                    <span className="align-middle">
                    </span>
                  </div>
                </div>
              )}

              {displaySection === 'write' && (
                <div className="card">
                  <div className="container justify-content-between p-5 mt-2">
                    <div className="card__header">
                      <h3>Write Functions</h3>
                      <Button
                        variant="contained"
                        type="button" endIcon={<WalletIcon />}
                        onClick={connectWallet}
                      >
                        {currentAccount ? Address : "Connect wallet"}
                      </Button>
                    </div>
                    {writeFunctions.map((writerfunc: any) => (
                      <Accordion
                        expanded={expanded === "panel11"}
                        onChange={handleChange("panel11")}
                      >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box className="input-wrape">
                            <WriteInfo
                              key={writerfunc.name}
                              name={writerfunc.name}
                              parameters={writerfunc.parameters}
                              abi={AbiData}
                              address={contractData.response[0].contract_address}

                            />
                          </Box>
                        </Grid>
                      </Accordion>
                    ))}
                  </div>
                </div>
              )}

              {displaySection === 'code' && (
                <div className="card">
                  <div className="address-info__card">
                    <h6 style={{ marginTop: "-7px" }}>Contract Name: {contractData.response[0].filename} </h6>
                    <h6 >Compiler Version: {contractData.response[0].compilerversion}</h6>
                    <h6 >Other Settings: {contractData.response[0].compiler}</h6>
                    <div className="card">
                      <h6>Contract Source Code:</h6>
                      <div className="address-info__card">
                        <code>{contractData.response[0].contract_code}</code>
                      </div>
                    </div>
                    <div className="card">
                      <h6>Contract ABI</h6>
                      <div className="address-info__card">
                        {contractData.response[0].abi_file}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* </div> */}
            </div>

          ) : (
            <div>
              Are you the contract creator? <Link to="/verify" style={{ color: "lightblue" }}>Verify and Publish</Link> your contract source code today!
            </div>

          )}

          <div className="card">
            Contract ByteCode {contractBytecode}
          </div>
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

          {/* {info.contract && info.contract !== "0x" && (
            <div className="">
              <div className="card address-info__card">
                <h1>
                  <span className="theme-color">Contract Code:</span>
                </h1>
                {info.contract}
              </div>
            </div>
          )} */}
        </Grid>
      </Grid>
    </>
  )
}

export default ContractData

function setClicked(arg0: boolean) {
  throw new Error('Function not implemented.');
}

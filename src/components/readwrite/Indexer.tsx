import React, { useState, useEffect } from "react";
import "./readwrite.scss";
import { ethers } from "ethers";
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SearchIcon from '@mui/icons-material/Search';
import {
  Typography,
  Box,
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  FormHelperText,
  Input,
  Link,
  IconButton
} from "@mui/material";
import erc20abi from "../../utils/ERC20abi.json";
import { parseUnits } from "ethers/lib/utils";
// import Navbar from "../Components/Navbar";
import ReadInfo from "../readwrite/readInfo";
import WriteInfo from "../readwrite/writeInfo";
import abi from "../../utils/DhakadTokenABI.json";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Grid from "@mui/material/Grid";

const Indexer = () => {
  const [readFunctions, setReadFunctions] = useState([]);
  const [contractAddress, setContractAddress] = useState<any>();
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [erc20, seterc20] = useState<any>();
  const [provider, setprovider] = useState<any>();
  const [signer, setsigner] = useState<any>();
  const [supply, setSupply] = useState();
  const [clicked, setClicked] = useState(false);
  const [Balancedata, setBalancedata] = useState({
    address: "0x",
    balance: "**",
  });
  const [writeFunctions, setWriteFunctions] = useState([]);
  const ContractAbi = abi;

  useEffect(() => {
    console.log("object");
    const getprovider = () => {
      let providercheck = new ethers.providers.JsonRpcProvider("http://localhost:9951"); //b4hit provider
      // let providercheck = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com/");
      setprovider(providercheck);
    };
    getprovider();
  }, []);

  const getInfo = async () => {
    setClicked(true);
    if (Array.isArray(ContractAbi)) {
      const readFuncs: any = [];
      const writeFuncs: any = [];
      const eventList: any = [];

      ContractAbi.forEach((item) => {
        console.log(item, "itemwa hai");
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
      setWriteFunctions(writeFuncs);
      var erc20contract = await new ethers.Contract(
        contractAddress,
        abi,
        provider
      );
      seterc20(erc20contract);
    } else {
      console.error("Error: abi is not an array");
    }
  };

  console.log("erc20 mali gayo:", erc20);
  const connectWallet = async () => {
    // const chainId = { mainnet: 137, testnet: 80001 }; // Polygon Mainnet
    //  const chainId = { mainnet: 1, testnet: 11155111 }; // Sepolia
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

  const handleSubmit = async () => {
    // e.preventDefault();
    // const data = new FormData(e.target);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const erc20 = new ethers.Contract(contractAddress, erc20abi, provider);
    console.log(erc20, "erc20waaaaa");

    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    const contractDetails = {
      address: contractAddress,
      tokenName,
      tokenSymbol,
      totalSupply,
    };
    setName(tokenName);
    setSymbol(tokenSymbol);
    setSupply(totalSupply);
    console.log(
      "NAME:",
      tokenName,
      "Symbol:",
      tokenSymbol,
      "Supppppply:",
      totalSupply
    );
    // setInfo(contractDetails);
  };

  const Address = currentAccount
    ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-5)}`
    : null;

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    // <Box>
    //   <Box className="rw-box">
    //     <TextField
    //       className="search-box"
    //       placeholder="Contract Address"
    //       onChange={(e) => setContractAddress(e.target.value)} />
    //     <Button className="search-btn" onClick={getInfo}>Search</Button>
    //   </Box>
    //   <Box>
    //     {clicked ? (
    //       readFunctions.map((item: any) => (
    //         <ReadInfo
    //           key={item.name}
    //           name={item.name}
    //           parameters={item.parameters}
    //           erc20={erc20}
    //           caddress={contractAddress}
    //         />
    //       ))
    //     ) : (<Box></Box>)}
    //   </Box>
    // </Box>
    <Box className="container-wrape">
      <Typography component="h6" align="center" className="title-text">
        <Button
          variant="contained"
          type="button" endIcon={<WalletIcon />}
          onClick={connectWallet}
        >
          {currentAccount ? Address : "Connect wallet"}
        </Button>
        Read / Write Functions
      </Typography>

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div className="card">
            <form>
              <Box className="parent-ctrl-wrape">
                <div className="input-wrape">
                  <Typography>Contract Address</Typography>
                  <Box className="input-pad">
                    <FormControl>
                      <TextField
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setContractAddress(e.target.value);
                        }}
                        // list="datalistOptions"
                        id="exampleDataList"
                        placeholder="Enter ERC20 contract address"
                      />
                    </FormControl>
                    <Button
                      variant="contained" color="success"
                      endIcon={<SearchIcon />}
                      onClick={getInfo}
                    >
                      Search
                    </Button>
                  </Box>
                </div>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      <Box className="container-wrape">
        <Grid container spacing={7}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="card">
              {/* <div className="card__header">
              <h3>Read Functionings</h3>
            </div> */}
              {/* <div className="card__body">
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>
                    Allowance
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Owner
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Spender
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Button className="btn btn-primary m-2 first-btn" type="submit">
                          Query
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography>Balance Of</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Account
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Button className="btn btn-primary m-2 first-btn" type="submit">
                          Query
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="disable-click">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography>
                    Decimals
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="disable-click">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="disable-click">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Symbol</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="disable-click">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Total Supply</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                    amet egestas eros, vitae egestas augue. Duis vel est augue.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className="card">
            <div className="card__header">
              <h3>Write Functions</h3>
            </div>
            <div className="card__body">
              <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Approve</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Spender
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Value
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Button className="btn btn-primary m-2 first-btn" type="submit">
                          Write
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Mint</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            To
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Amount
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Button className="btn btn-primary m-2 first-btn" type="submit">
                          Write
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Transfer</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            To
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Value
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Button className="btn btn-primary m-2 first-btn" type="submit">
                          Write
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography>Transfer From</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            From
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            To
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box className = "input-wrape">
                        <FormControl>
                          <Typography>
                            Value
                          </Typography>
                          <Box className="input-pad">
                            <TextField
                                type="text"
                                placeholder="0x.."
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Button className="btn btn-primary m-2 first-btn" type="submit">
                          Write
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </div> */}
              <div className="container justify-content-between p-5 mt-3">
                <div className="card__header">
                  <h3>Read Functions</h3>
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
                          erc20={erc20}
                          address={contractAddress}
                        />
                      </Box>
                    </Grid>
                  </Accordion>
                ))}
                <span className="align-middle">
                </span>
              </div>

              <div className="container justify-content-between p-5 mt-2">
                <div className="card__header">
                  <h3>Write Functions</h3>
                </div>
                {writeFunctions.map((writerfunc: any) => (
                  <Accordion
                    expanded={expanded === "panel11"}
                    onChange={handleChange("panel11")}
                  >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box className="input-wrape">
                        {/* <WriteInfo
                          key={writerfunc.name}
                          name={writerfunc.name}
                          parameters={writerfunc.parameters}
                          address={contractAddress}
                        /> */}
                      </Box>
                    </Grid>
                  </Accordion>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Indexer;

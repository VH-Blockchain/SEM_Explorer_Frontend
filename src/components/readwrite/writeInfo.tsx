import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import abi from "../../utils/DhakadTokenABI.json";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import {
  AccordionSummary,
  TextField,
  Accordion,
  AccordionDetails,
} from "@mui/material";

export interface writerfunc {
  name: any;
  parameters: any;
  abi: any;
  address: any;
}

const WriteInfo = ({ name, parameters, abi, address }: writerfunc) => {
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [outputs, setOutputs] = useState("");
  const [open, setopen] = useState(false);
  // const [provider, setprovider] = useState()
  // const [signer, setsigner] = useState()
  // const [contract, setcontract] = useState<any>()

  const getInfo = async (name: string, showParameters: any) => {
    const { ethereum }: any = window;
    // const chainId = { mainnet: 1, testnet: 11155111 }; // sepolia
    const chainId = { mainnet: 456789, testnet: 456789 }; // SEMhit
    // let window:any
    try {
      if (ethereum.networkVersion !== chainId.testnet) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId.testnet) }],
        });
      }

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const providers = await provider.send("eth_requestAccounts", []);
        // setprovider(providers);
        const sign: any = provider.getSigner();

        var contract: any = new ethers.Contract(address, abi, sign);
        // setcontract(cont);
      } else {
        return alert("Please install metamask wallet");
      }
    } catch (error) {
      alert("Error while connecting wallet!");
    }

    try {
      // Convert parameter values to an array
      console.log(data, "data");
      const parameterValues = parameters.map((param: any) => data[param.name]);
      console.log("Fetched Values: ", parameterValues);
      console.log(" User Input:", ...parameterValues);

      // Make the contract call with the parameter values
      // console.log(erc20)
      const tx = await contract[name.toString()](...parameterValues)
        .then((result: any) => {
          const dataToShow = result;
          console.log("tx:", dataToShow);
          setOutputs(dataToShow.hash);
        })
        .catch((err: any) => {
          console.error("User Cancelled the transaction:", err);
        });
    } catch (error: any) {
      console.error("Error executing contract function:", error);
    }
  };
  const storevalues = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // console.log("data new",data)
  const toggleParameters = async (names: any) => {
    // console.log("erc20 check",erc20);
    console.log("names", names);
    setopen(!open);
    const params: any[] = [];
    // if(parameters.length == 0){
    //   const tx = await erc20[names.toString()](...Object.values(showParameters))
    //   const datashow = tx.toString();
    //   console.log("tx:",datashow);
    //   setOutputs(datashow);
    //   setShowParameters(!showParameters);
    // }
  };

  return (
    <div>
      {/* 
      <div className="accordion p-2" id="accordionPanelsStayOpenExample">
        <div className="accordion-item"> */}
      {/* <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
              onClick={toggleParameters}
            >
              {name}
            </button>
          </h2> */}
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => toggleParameters(name)}
        >
          {name}
        </AccordionSummary>
        <AccordionDetails>
          {parameters.length > 0 && open && (
            <div className="accordion-body">
              {parameters.map((item: { name: any }) => {
                return (
                  <TextField
                    label={item?.name}
                    type="text"
                    variant="outlined"
                    key={item?.name}
                    id={name}
                    name={item?.name}
                    value={data[item?.name] || ""}
                    onChange={storevalues}
                    placeholder={item?.name}
                    sx={{ width: "30%", my: "5px", mx: "5px" }}
                  />
                );
              })}

              {/* <button className="btn btn-primary"
              style={{ background: "#696969", color: "white", marginLeft: "5px" }}
              onClick={() => getInfo(name, { ...data })} >Write</button> */}
              <Button
                className=""
                variant="contained"
                type="submit"
                size="small"
                onClick={() => getInfo(name, { ...data })}
              >
                Write
              </Button>
            </div>
          )}
          {outputs === "" ? <h5>{outputs}</h5> : <h5>tx hash: {outputs}</h5>}
        </AccordionDetails>
      </Accordion>
    </div>
    // </div>
    // </div>
  );
};

export default WriteInfo;

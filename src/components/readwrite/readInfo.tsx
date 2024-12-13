import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../utils/DhakadTokenABI.json";
import { IndexType } from "typescript";
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
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface datareader {
  name: any;
  parameters: any;
  erc20: any;
  address: any
}

const ReadInfo = ({ name, parameters, erc20, address }: datareader) => {
  const [showParameters, setShowParameters] = useState(false);
  const [outputs, setOutputs] = useState("");
  const [open, setopen] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>({});

  // const [funcName,setFuncName] = useState([]);

  const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RCP_URL as string); //SEMHIT
  // let provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com"); //sepolia

  console.log("provider >>", provider);
  const contract = new ethers.Contract(address, abi, provider);
  console.log(contract, "contractwa l1");

  const getInfo = async (name: string, showParameters: any) => {
    try {
      // Convert parameter values to an array
      console.log(data, "data");
      const parameterValues = parameters.map((param: any) => data[param.name]);
      console.log("parameters Values", parameterValues);
      console.log(" Input", ...parameterValues);
      // console.log(name.toString()," ")

      // Make the contract call with the parameter values
      const tx = await contract[name.toString()](...parameterValues);
      const dataToShow = tx.toString();
      console.log("tx:", dataToShow);
      setOutputs(dataToShow);
    } catch (error) {
      console.error("Error executing contract function:", error);
    }
  };

  const storevalues = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleParameters = async (names: any) => {
    console.log("erc20 check", erc20);
    console.log("function called: ", names);
    setopen(!open);
    const params: any[] = [];
    if (parameters.length == 0) {
      const tx = await erc20[names.toString()](
        ...Object.values(showParameters)
      );
      const datashow = tx.toString();
      console.log("Fetched Data:", datashow);
      setOutputs(datashow);
      setShowParameters(!showParameters);
    }
  };
  console.log("parameters:", parameters);
  return (
    <div>
      {/* <Button size="small" variant="contained" className="btn btn-primary m-5 first-btn" type="submit" 
                onClick={() => getInfo(name, { ...data })}>
                    Query
                </Button> */}
      {/* //   <input
                //   type="text"
                //   key={item.name}
                //   id={name}
                //   name={item.name}
                //   value={data[item.name] || ""}
                //   onChange={storevalues}
                //   placeholder={item.name}
                // /> */}
      {/* <button
                className="btn btn-primary"
                style={{ background: "#696969", color: "white", marginLeft: "5px" }}
                onClick={() => getInfo(name, { ...data })}
              >Query</button> */}

      {/* <div className="accordion p-2">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
              onClick={() => toggleParameters(name)}
            >
              {name}
            </button>
          </h2>
          {parameters.length > 0 && open && (
            <div className="accordion-body">
              {parameters.map((item: { name: string | undefined }) => (
                
                <TextField
                  id=""
                  label={item?.name}
                  variant="outlined"
                  type="text"
                  key={item?.name}
                  id={name}
                  name={item?.name}
                  value={data[item?.name] || ""}
                  onChange={storevalues}
                  placeholder={item?.name}
                  sx={{ width: "30%", my: "5px", mx: "5px" }}
                />
              ))}            
              <Button
                variant="contained"
                size="small"
                onClick={() => getInfo(name, { ...data })}
              >
                Query
              </Button>
            </div>
          )}
          {outputs}
        </div>
      </div> */}

      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => toggleParameters(name)}
        >
          {/* <Button
            className=""
            type="button"
            data-bs-toggle="collapse"
            aria-expanded="false"
            type="contained"
            onClick={() => toggleParameters(name)}
          >
            {name}
          </Button> */}
          {name}
        </AccordionSummary>
        <AccordionDetails>
          {parameters.length > 0 && open && (
            <div className="accordion-body">
              {parameters.map((item: { name: any }) => (
                <TextField
                  id=""
                  label={item?.name}
                  variant="outlined"
                  type="text"
                  key={item?.name}
                  name={item?.name}
                  value={data[item?.name] || ""}
                  onChange={storevalues}
                  placeholder={item?.name}
                  sx={{ width: "30%", my: "5px", mx: "5px" }}
                />
              ))}
              <Button
                variant="contained"
                size="small"
                onClick={() => getInfo(name, { ...data })}
              >
                Query
              </Button>
            </div>
          )}
          {outputs}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ReadInfo;

import React, { useState, ChangeEvent } from 'react'
import { Typography, Box, FormControl, Button, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, TextField, FormHelperText, Input, Link } from "@mui/material";
import './JsonVerify.scss'

const JsonVerify = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [optimizeType, setOptimizeType] = useState("");
  const [compilertype, setCompilertype] = useState("");
  const [compiler, setCompiler] = useState("");

  let optimize = [
    {
      optimize_type: "Yes",
    },
    {
      optimize_type: "No",
    },
  ];

  let compilerType = [
    {
      compiler_type: "1)No License (None)",
    },
    {
      compiler_type: "2)The Unlicense (Unlicense)",
    },
    {
      compiler_type: "3)MIT License (MIT)",
    },
    {
      compiler_type: "4)GNU General Public License v2.0 ",
    },
    {
      compiler_type: "5)GNU General Public License v3.0 (GNU GPLv3)",
    },
    {
      compiler_type: "6)GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
    },
    {
      compiler_type: "7)GNU Lesser General Public License v3.0 (GNU LGPLv3)",
    },
    {
      compiler_type: "8)BSD 2-clause Simplified license (BSD-2-Clause)",
    },
    {
      compiler_type: "9)BSD 3-clause New Or Revised license (BSD-3-Clause)",
    },
    {
      compiler_type: " 10)Mozilla Public License 2.0 (MPL-2.0)",
    },
    {
      compiler_type: "11)Open Software License 3.0 (OSL-3.0)",
    },
    {
      compiler_type: "12)Apache 2.0 (Apache-2.0)",
    },
    {
      compiler_type: "13)GNU Affero General Public License (GNU AGPLv3)",
    },
    {
      compiler_type: "14)Business Source License (BSL 1.1)",
    },
  ];

  let Compiler = [
    {
      compiler_name: "default(compiler defaults)",
    },
    {
      compiler_name: "homestead",
    },
    {
      compiler_name: "tangerineWhistle",
    },
    {
      compiler_name: "spuriousDragon",
    },
    {
      compiler_name: "byzantium",
    },
    {
      compiler_name: "constantinople",
    },
    {
      compiler_name: "petersburg",
    },
    {
      compiler_name: "istanbul",
    },
    {
      compiler_name: "berlin",
    },
    {
      compiler_name: "london",
    },
    {
      compiler_name: "paris",
    },
    {
      compiler_name: "shanghai",
    },
  ];

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };
  return (
    <>
      <Box className="container-wrape">
        <Typography component="h6" className="title-text">
          <b>Verify & Publish Contract Source Code</b>
        </Typography>
        <Box>
          <Typography className='info-line'>
            Info: Standard Json-Input is the recommended way to interface with the Solidity compiler especially for more complex and automated setups.
          </Typography>
        </Box>
        <Box className="card text-center" sx={{ padding: '20px', marginLeft: "-5px" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
            <FormControl sx={{ width: '400px' }}>
              <Typography  >
                Contract Address
              </Typography>
              <TextField id="contractAddress" placeholder="0x..." />
            </FormControl>

            <FormControl sx={{ width: '400px' }}>
              <Typography  >
                Compiler Version
              </Typography>
              <TextField id="compilerVersion" placeholder="v0.8.22+commit.4fc1097e" />
            </FormControl>

            <FormControl sx={{ width: "100px" }}>
              <Typography  >
                Optimize
              </Typography>
              <Select id="optimizeType">
                {optimize.map((ele, index) => (
                  <MenuItem key={index} value={ele.optimize_type}>
                    {ele.optimize_type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Box>
              <Typography className='single-line'>
                <b>Please select the Solidity (*.json) files for upload :</b>
              </Typography>
            </Box>
            <Box className='upload-file'>
              <Typography className='single-line'>
                Step 1 :
              </Typography>
              <Input
                className='file-input'
                type="file"
                id="filesInput"
                inputProps={{ accept: ".json", multiple: true }}
                onChange={handleFilesChange}
              />

            </Box>
            <Box className='upload-file'>
              <Typography className='single-line'>
                Step 2 :
              </Typography>
              <Button
                className='file-input stp-btn'
                onClick={() => {
                  console.log(selectedFiles, "selectfile");
                }}>
                click to upload files
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <Typography className='single-line' >
              <b>Constructor Arguments ABI-encoded (for contracts that were created with constructor parameters):</b>
            </Typography>
            <TextField
              id="solidityContractCode"
              multiline
              rows={10}
              placeholder=""
              fullWidth
            />
          </Box>


          <Box>
            <Box>
              <Typography className='single-line'>
                <p>
                  For additional information on Constructor Arguments{" "}
                  <Link href="https://info.etherscan.com/contract-verification-constructor-arguments/">
                    see KB Entry
                  </Link>
                </p>
              </Typography>
            </Box>
          </Box>


          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="start">
              <Typography variant="h6">
                <b>Misc Settings(RUns,EvmVersion & License Type settings):</b>
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-around" marginBottom="30px">
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">
                  <b>Runs (Optimizer):</b>
                </Typography>
                <TextField type="text" id="Optimizer" defaultValue="200"
                  InputProps={{
                    readOnly: true,
                  }} style={{ width: "98%" }} />
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">
                  <b>EVM Version to target:</b>
                </Typography>
                <Select id="EVMVersion" value={compiler} onChange={(e) => setCompiler(e.target.value)} style={{ width: "281px" }}>
                  {Compiler.map((ele, index) => (
                    <MenuItem key={index} value={ele.compiler_name}>
                      {ele.compiler_name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box display="flex" flexDirection="column" sx={{}}>
                <Typography variant="h6">
                  <b>LicenseType:</b>
                </Typography>
                <Select id="LicenseType" value={compilertype} onChange={(e) => setCompilertype(e.target.value)} style={{ width: "223%" }}>
                  {compilerType.map((ele, index) => (
                    <MenuItem key={index} value={ele.compiler_type}>
                      {ele.compiler_type}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '30px' }}>
            <Button variant="contained" className='py-2 px-4 first-btn' >
              Verify & Publish
            </Button>
            <Button className='py-2 px-4 second-btn'>Reset</Button>
            <Button className='py-2 px-4 third-btn'>Return to Main</Button>
          </Box>
        </Box>      
      </Box>
    </>
  )
}

export default JsonVerify

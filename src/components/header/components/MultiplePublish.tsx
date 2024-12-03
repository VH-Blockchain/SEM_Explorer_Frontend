import { read } from "fs";
import React, { useState } from "react";
import { Typography, Box, FormControl, Button, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, TextField, FormHelperText, Input, Link, TextareaAutosize } from "@mui/material";
import '../components/MultiplePublish.scss';
import Grid from '@mui/material/Grid';
import { useLocation } from "react-router-dom";

const MultiplePublish = () => {
    const [optimizeType, setOptimizeType] = useState("0")
    const [compilertype, setCompilertype] = useState('')
    const [compiler, setCompiler] = useState('')
    // const [selectedFile, setSelectedFile] = useState<any>(null);
    const [fileInputs, setFileInputs] = useState([{ id: 0, files: null }]);
    const [mainSelectedFile, setMainSelectedFile] = useState<any>(null);
    const [fileTestingInputs, setFileTestingInputs] = useState<any>([]);
    
    
        const location = useLocation()
        const stateData:any = location.state as { data: any };
            console.log(stateData)
    let optimize = [
        {
            optimize_type: "Yes"
        },
        {
            optimize_type: "No"
        }
    ]

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
    ]

    let Compiler = [
        {
            compiler_name: 'default(compiler defaults)'
        },
        {
            compiler_name: 'homestead'
        },
        {
            compiler_name: 'tangerineWhistle'
        },
        {
            compiler_name: 'spuriousDragon'
        },
        {
            compiler_name: 'byzantium'
        },
        {
            compiler_name: 'constantinople'
        },
        {
            compiler_name: 'petersburg'
        },
        {
            compiler_name: 'istanbul'
        },
        {
            compiler_name: 'berlin'
        },
        {
            compiler_name: 'london'
        },
        {
            compiler_name: 'paris'
        },
        {
            compiler_name: 'shanghai'
        },
    ]

    const handleMainFileChange = (event: any) => {
        const file = event.target.files[0];
        setMainSelectedFile(file);
    };

    const handleFilesChange = (event: any, inputId: any) => {
        const files = event.target.files[0];
        setFileInputs((prevInputs) =>
            prevInputs.map((input) =>
                input.id === inputId ? { ...input, files } : input
            )
        );
    };

    const handleAddInput = () => {
        setFileInputs((prevInputs) => [...prevInputs, { id: prevInputs.length, files: null }]);
    };

    const handleRemoveInput = (inputId: any) => {
        if (inputId !== 0) {
            setFileInputs((prevInputs) => prevInputs.filter((input) => input.id !== inputId));
        }
    };

    const verifyCode = async () =>{
        const optimize = optimizeType=== "true"?"1":"0";
        const formData = new FormData();
        fileInputs.forEach(({ files }) => {
            if (files) {
                formData.append('files', files);
            }
        });
        formData.append('contractAddress', stateData.textValue);
        formData.append('compilerVersion', stateData.compilerVersion);
        formData.append('licensetype', compilertype);
        formData.append('compiler', compiler);
        formData.append('isoptimized',optimize);

        try {
            const apiKey = 'Ffd0053d-4a7a-4d38-A0d2-E471d88cf6b3'; // Replace 'your_api_key_here' with the actual API key
            const response = await fetch(`http://192.168.1.116:7075/apiauth/multiple`, {
              method: 'POST',
              body: formData,
            }); 
          
            // Handle response as needed
          } catch (error) {
            console.error('Error uploading file:', error);
          }
    }

    return (
        <>
            <Box className="container-wrape">
                <Typography component="h6" className="title-text">
                    <b>Verify & Publish Contract Source Code</b>
                </Typography>

                <Box className="card .address-card" >
                    <Box className="alrt-wrape">
                        <Typography variant="h6" component="h6" align="center">
                            Info: This is an experimental source code verifier which supports verification of multi-part solidity files (imports).
                        </Typography>
                    </Box>
                    <Box className="form-wrape version-card">
                        <Grid container spacing={3}>
                            <Grid item lg={5} md={6} sm={6} xs={12}>
                                <Box className="input-wrape">
                                    <FormControl>
                                        <Typography>
                                            Contract Address
                                        </Typography>
                                        <Box className="input-pad">
                                            <TextField disabled id="contractAddress" value={stateData.textValue} />
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={5} md={6} sm={6} xs={12}>
                                <Box className="input-wrape">
                                    <FormControl>
                                        <Typography>
                                            Compiler Version
                                        </Typography>
                                        <Box className="input-pad">
                                            <TextField id="compilerVersion" placeholder="v0.8.22+commit.4fc1097e" />
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                <Box className="input-wrape">
                                    <FormControl>
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
                            </Grid>
                        </Grid>
                    </Box>

                    <Box className='form-wrape file_card'>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12}>
                                <Box className="sub-text-wrap">
                                    <Typography variant="h6">
                                        Please select the Solidity (*.sol) files for upload :
                                    </Typography>
                                </Box>
                                <Box className="input-wrape">
                                    <Box className="input-pad multiple">                                        
                                        <Typography className='single-line'>
                                            Step 1 :
                                        </Typography>
                                        <Box className='upload-file'>
                                            <Box className="inner-pad">
                                                {fileInputs.map((input) => (
                                                    <div key={input.id} className="upload-pad mb-4">
                                                        <Input
                                                            className='file-input'
                                                            type='file'
                                                            id={`fileInput_${input.id}`}
                                                            inputProps={{ accept: '.sol', multiple: false }}
                                                            onChange={(e) => handleFilesChange(e, input.id)}
                                                        />
                                                        <Button className="browse-btn" >Browse</Button>
                                                        <Box className="btns-wrape">
                                                            <Button onClick={handleAddInput}>+</Button>
                                                            <Button onClick={() => handleRemoveInput(input.id)}>-</Button>
                                                        </Box>
                                                    </div>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="input-pad mt-2">   
                                        <Typography className='single-line'>
                                            Step 2 :
                                        </Typography>                                     
                                        <Box className='upload-file'>
                                            <Button
                                                className='first-btn btn'
                                                onClick={() => {
                                                    console.log(fileInputs, "selectfile");
                                                }}>
                                                click to upload files
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box className="form-wrape ABI_card">
                        <Grid container spacing={3}>
                            {/* <Grid item lg={12} md={12} sm={12}>
                                <Box className="input-wrape">
                                    <Typography>
                                        Constructor Arguments ABI-encoded (for contracts that were created with constructor parameters):
                                    </Typography>
                                    <Box className="input-pad ABI-encoded">
                                        <TextField
                                            id="solidityContractCode"
                                            multiline
                                            rows={10}
                                            placeholder=""
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                            </Grid> */}

                            {/* <Grid item lg={12} md={12} sm={12}>
                                <Box className="sub-text-wrap">
                                    <Typography variant="h6">
                                        For additional information on Constructor Arguments{' '}
                                        <Link href="https://info.etherscan.com/contract-verification-constructor-arguments/" target="_blank" rel="noopener noreferrer">
                                            see KB Entry
                                        </Link>
                                    </Typography>
                                </Box>
                            </Grid> */}

                            <Grid item lg={12} md={12} sm={12}>
                                <Typography className="form-semi-head my-4">
                                    Misc Settings(Runs,EvmVersion & License Type settings):
                                </Typography>
                            </Grid>
                        </Grid>

                    </Box>

                    <Grid container spacing={3} className="ABI_card mb-5">
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Box className="input-wrape">
                                <Typography>
                                    Runs (Optimizer):
                                </Typography>
                                <Box className="input-pad">
                                    <TextField id="Optimizer" defaultValue="200"
                                        InputProps={{
                                            readOnly: true,
                                        }} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Box className="input-wrape">
                                <FormControl>
                                    <Typography>
                                        EVM Version to target:
                                    </Typography>
                                    <Select id="EVMVersion" value={compiler} onChange={(e) => setCompiler(e.target.value)}>
                                        {Compiler.map((ele, index) => (
                                            <MenuItem key={index} value={ele.compiler_name}>
                                                {ele.compiler_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Box className="input-wrape">
                                <FormControl>
                                    <Typography>
                                        LicenseType:
                                    </Typography>
                                    <Select id="LicenseType" value={compilertype} onChange={(e) => setCompilertype(e.target.value)}>
                                        {compilerType.map((ele, index) => (
                                            <MenuItem key={index} value={ele.compiler_type}>
                                                {ele.compiler_type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box className="button_wrap text-end">
                        <Button className="first-btn btn" onClick={verifyCode}>
                            Verify & Publish
                        </Button>
                        <Button className="second-btn btn danger-btn mx-3">Reset</Button>
                        <Button className="third-btn btn">Return to Main</Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default MultiplePublish;
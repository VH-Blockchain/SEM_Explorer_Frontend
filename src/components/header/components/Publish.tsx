import React, { useState } from "react";
import { Typography, Box, FormControl, Button, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, TextField, FormHelperText, Input, Link, TextareaAutosize } from "@mui/material";
import '../components/SingleFile.scss';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "console";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const Publish = () => {
    const [optimizeType, setOptimizeType] = useState("0")
    const [compilertype, setCompilertype] = useState('')
    const [compiler, setCompiler] = useState('')
    const [textValue, setTextValue] = useState('');
    const [error, setError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const stateData: any = location.state as { data: any };
    console.log(stateData)


    let optimize = [
        {
            optimize_type: "true"
        },
        {
            optimize_type: "false"
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

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const reset = () => {
        setTimeout(() => {
            window.location.reload();
        }, 600);
    }

    const verifyCode = async () => {
        const optimize = optimizeType === "true" ? "1" : "0";
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('contractAddress', stateData.textValue);
        formData.append('compilerVersion', stateData.compilerVersion);
        formData.append('licensetype', compilertype);
        formData.append('compiler', compiler);
        formData.append('isoptimized', optimize)

        try {
            setLoading(true)
            const response = await fetch('${process.env.REACT_APP_BASE_URL}apiauth/verify?apikey=7bf546e4-c912-4d84-9fdd-5094cdbc2bbb', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            toast.success(result.message);
            navigate(`/address/${stateData.textValue}`)

        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box className="container-wrape">
                <ToastContainer />
                <Typography component="h6" className="title-text">
                    <b>Verify & Publish Contract Source Code</b>
                </Typography>


                <Box className="card first_Address" >
                    <Box className="alrt-wrape">
                        <Typography variant="h6" component="h6" align="center">
                            Info: A simple and structured interface for verifying smart contracts that fit in a single file
                        </Typography>
                    </Box>
                    <Box className="form-wrape address_card">
                        <Grid container spacing={3}>
                            <Grid item lg={5} md={4} sm={12}>
                                <Box className="input-wrape">
                                    <FormControl>
                                        <Typography  >
                                            Contract Address
                                        </Typography>
                                        <Box className="input-pad">
                                            <TextField disabled id="contractAddress" value={stateData.textValue} />
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={5} md={4} sm={12}>
                                <Box className="input-wrape">
                                    <FormControl>
                                        <Typography  >
                                            Compiler Version
                                        </Typography>
                                        <Box className="input-pad">
                                            <TextField disabled id="compilerVersion" value={stateData.compilerVersion} />
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={2} md={4} sm={12}>
                                <Box className="input-wrape">
                                    <FormControl>
                                        <Typography  >
                                            Optimize
                                        </Typography>
                                        <Box className="input-pad">
                                            <Select id="optimizeType">
                                                {optimize.map((ele, index) => (
                                                    <MenuItem key={index} value={ele.optimize_type}>
                                                        {ele.optimize_type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box className='form-wrap file-card'>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12}>
                                <Box className="sub-text-wrap">
                                    <Typography variant="h6">
                                        Please select the Solidity (*.sol) file for upload:
                                    </Typography>
                                </Box>
                                <Box className="input-wrap">
                                    <Box className="input-pad">
                                        <Typography className='single-line'>
                                            Step 1 :
                                        </Typography>

                                        <Box className="d-flex">
                                            <Box className='upload-file publish-upload'>
                                                <Box className="inner-pad">
                                                    <Box className="upload-pad">
                                                        <input
                                                            type='file'
                                                            id={`fileInput`}
                                                            accept='.sol'
                                                            onChange={handleFileChange}
                                                            className="upload-input"
                                                        />
                                                        <Button className="browse-btn" >Browse</Button>
                                                    </Box>
                                                    <Box className='upload-file'>
                                                        <Button
                                                            className='first-btn btn'
                                                            onClick={() => {
                                                                console.log(selectedFile, "selectfile");
                                                            }}>
                                                            Upload files
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        </Box>
                                        {/* <Button className="browse-btn" >Browse File</Button> */}
                                    </Box>
                                </Box>
                                {/* <Box className="input-pad mt-4">
                                    <Typography className='single-line'>
                                        Step 2 : Submit smart contract for verification
                                    </Typography>
                                    <Box className='upload-file'>
                                        <Button
                                            className='first-btn btn'
                                            onClick={() => {
                                                console.log(selectedFile, "selectfile");
                                            }}>
                                            Upload files
                                        </Button>
                                    </Box>
                                </Box> */}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box className="form-wrape mb-5">
                        <Grid container spacing={3}>
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

                        <Grid container spacing={3} className="">
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
                                    <Typography >
                                        EVM Version to target:
                                    </Typography>
                                    <FormControl>
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
                    </Box>

                    <Box className="button_wrap text-end">
                        <Button className="first-btn btn" onClick={verifyCode} >{loading ? <CircularProgress size={24} /> : "Verify & Pulish"}</Button>
                        <Button className="first-btn btn mx-3" onClick={reset} >Reset</Button>
                        <Button className="third-btn btn" onClick={() => navigate('/verify')}>Return to Main</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Publish;
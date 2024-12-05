import React, { useState } from 'react'
import { Typography, Box, FormControl, Button, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, TextField, FormHelperText, Input, Link } from "@mui/material";
import './vyper.scss'
import Grid from '@mui/material/Grid';

const VyperVerify = () => {
    const [compilerVersion, setCompilerVersion] = useState('')
    const [compilertype, setCompilertype] = useState('')
    const [compiler, setCompiler] = useState('')


    let vyperCompiler = [
        {
            vyper_type: "[Please Select]"
        },
        {
            vyper_type: "vyper:0.3.10"
        },
        {
            vyper_type: "vyper:0.3.10rc4"
        },
        {
            vyper_type: "vyper:0.3.10rc3"
        },
        {
            vyper_type: "vyper:0.3.10rc2"
        },
        {
            vyper_type: "vyper:0.3.9"
        },
        {
            vyper_type: "vyper:0.3.8"
        },
        {
            vyper_type: "vyper:0.3.7"
        },
        {
            vyper_type: "vyper:0.3.6"
        },
        {
            vyper_type: "vyper:0.3.5"
        },
        {
            vyper_type: "vyper:0.3.4"
        },
        {
            vyper_type: "vyper:0.3.3"
        },
        {
            vyper_type: "vyper:0.3.2"
        },
        {
            vyper_type: "vyper:0.3.1"
        },
        {
            vyper_type: "vyper:0.3.0"
        },
        {
            vyper_type: "vyper:0.2.16"
        },
        {
            vyper_type: "vyper:0.2.15"
        },
        {
            vyper_type: "vyper:0.2.13"
        },
        {
            vyper_type: "vyper:0.2.12"
        },
        {
            vyper_type: "vyper:0.2.11"
        },
        {
            vyper_type: "vyper:0.2.8"
        },
        {
            vyper_type: "vyper:0.2.7"
        },
        {
            vyper_type: "vyper:0.2.5"
        },
        {
            vyper_type: "vyper:0.2.4"
        },
        {
            vyper_type: "vyper:0.2.3"
        },
        {
            vyper_type: "vyper:0.2.2"
        },
        {
            vyper_type: "vyper:0.2.1"
        },
        {
            vyper_type: "vyper:0.2.0"
        },
        {
            vyper_type: "vyper:0.1.0b17"
        },
        {
            vyper_type: "vyper:0.1.0b16"
        },
        {
            vyper_type: "vyper:0.1.0b15"
        },
        {
            vyper_type: "vyper:0.1.0b14"
        },
        {
            vyper_type: "vyper:0.1.0b13.hotfix"
        },
        {
            vyper_type: "vyper:0.1.0b13"
        },
        {
            vyper_type: "vyper:0.1.0b12"
        },
        {
            vyper_type: "vyper:0.1.0b11"
        },
        {
            vyper_type: "vyper:0.1.0b10"
        },
        {
            vyper_type: "vyper:0.1.0b9"
        },
        {
            vyper_type: "vyper:0.1.0b8"
        },
        {
            vyper_type: "vyper:0.1.0b7"
        },
        {
            vyper_type: "vyper:0.1.0SEM"
        },

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
    return (
        <div>
            <>
                <Box className="container-wrape">
                    <Typography component="h6" className="title-text">
                        <b>Verify & Publish Contract Source Code</b>
                    </Typography>
                    <Box className="card">
                        <Box className='alrt-wrape'>
                            <Typography>
                                <Typography variant="h6" component="h6" align="center">
                                    Info: This is an experimental source code verifier which supports verification of Vyper Smart Contracts.
                                </Typography>
                            </Typography>
                        </Box>
                        <Box className="form-wrape">
                            <Grid container spacing={3}>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <Box className="input-wrape">
                                        <FormControl>
                                            <Typography  >
                                                Contract Address
                                            </Typography>
                                            <Box className="input-pad">
                                                <TextField id="contractAddress" placeholder="0x..." />
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <Box className="input-wrape">
                                        <FormControl>
                                            <Typography  >
                                                Contract Name
                                            </Typography>
                                            <Box className="input-pad">
                                                <TextField id="contract" placeholder="Contract Name" />
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <Box className="input-wrape">
                                        <FormControl>
                                            <Typography  >
                                                Compiler Version
                                            </Typography>
                                            <Box className="input-pad">
                                                <TextField id="compilerVersion" placeholder="v0.8.22+commit.4fc1097e" />
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box className="input-wrape">
                                        <Typography className='single-line' >
                                            Enter the contract Vyper Source below :
                                        </Typography>
                                        <Box className="input-pad">
                                            <TextField
                                                id="solidityContractCode"
                                                multiline
                                                rows={10}
                                                placeholder=""
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12}>
                                    <Box className="input-wrape">
                                        <Typography className='single-line' >
                                            Constructor Arguments ABI-encoded (for contracts that were created with constructor parameters):
                                        </Typography>
                                        <Box className="input-pad">
                                            <TextField
                                                id="solidityContractCode"
                                                multiline
                                                rows={5}
                                                placeholder=""
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12}>
                                    <Box className="sub-text-wrap">
                                        <Typography className='single-line' variant="h6">
                                            For additional information on Constructor Arguments{" "}
                                            <Link href="https://info.etherscan.com/contract-verification-constructor-arguments/">
                                                see KB Entry
                                            </Link>
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12}>
                                    <Typography className="form-semi-head">
                                        Misc Settings(RUns,EvmVersion & License Type settings):
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>


                        <Grid container spacing={3} className="ABI_card">
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <Box className="input-wrape">
                                    <FormControl>
                                        <Typography>
                                            EVM Version to target:
                                        </Typography>
                                        <Select id="EVMVersion" value={compiler} onChange={(e) => setCompiler(e.target.value)} >
                                            {Compiler.map((ele, index) => (
                                                <MenuItem key={index} value={ele.compiler_name}>
                                                    {ele.compiler_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
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

                        <Box className="button_wrap">
                            <Button variant="contained" className='first-btn btn' >
                                Verify & Publish
                            </Button>
                            <Button variant="contained" className='second-btn btn'>Reset</Button>
                            <Button variant="contained" className='third-btn btn'>Return to Main</Button>
                        </Box>
                    </Box>
                </Box>
            </>
        </div>
    )
}

export default VyperVerify

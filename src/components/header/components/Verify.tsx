import { Typography, Box, FormControl, Button, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, TextField, FormHelperText, Input, Link } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './search.scss';
import './veriify.scss';
import { compile } from "sass";
import Grid from '@mui/material/Grid';




const Verify = () => {
    const [selectFile, setselectFile] = useState('')
    const [compilertype, setCompilertype] = useState('')
    const [compilerVersion, setCompilerVersion] = useState('')
    const [textValue, setTextValue] = useState('');
    const [error, setError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    // const [FormData, setFormData] = useState({
    //     textValue:"",
    //     compilerType:'',
    //     compilerVersion:''
    // });


    const navigate = useNavigate()
    let file = [
        {
            file_type: "[Please Select]",
        },
        {

            file_type: "Soldity(Single File)",
        },
        {
            file_type: "Soldity(Multiple File)",
        },
        {
            file_type: "Solidity(Standard JSON-input)",
        },
        {
            file_type: "Vyper(Experimental)",
        },

    ]

    let compilerType = [
        {
            compiler_type: "[Please Select]",
        },
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

    let compilerversion = [
        {
            version_type: "[Please Select]",
        },
        {
            version_type: "v0.8.24+commit.e11b9ed9",
        },
        {
            version_type: "v0.8.23+commit.f704f362",
        },
        {
            version_type: "v0.8.22+commit.4fc1097e",
        },
        {
            version_type: "v0.8.21+commit.d9974bed",
        },
        {
            version_type: "v0.8.20+commit.a1b79de6",
        },
        {
            version_type: "v0.8.19+commit.7dd6d404",
        },
        {
            version_type: "v0.8.18+commit.87f61d96",
        },
        {
            version_type: "v0.8.17+commit.8df45f5f",
        },
        {
            version_type: "v0.8.16+commit.07a7930e",
        },
        {
            version_type: "v0.8.15+commit.e14f2714",
        },
        {
            version_type: "v0.8.14+commit.80d49f37",
        },
        {
            version_type: "v0.8.13+commit.abaa5c0e",
        },
        {
            version_type: "v0.8.12+commit.f00d7308",
        },
        {
            version_type: "v0.8.11+commit.d7f03943",
        },
        {
            version_type: "v0.8.10+commit.fc410830",
        },
        {
            version_type: "v0.8.9+commit.e5eed63a",
        },
        {
            version_type: "v0.8.8+commit.dddeac2f",
        }, {
            version_type: "v0.8.7+commit.e28d00a7",
        },
        {
            version_type: "v0.8.6+commit.11564f7e",
        },
        {
            version_type: "v0.8.5+commit.a4f2e591",
        },
        {
            version_type: "v0.8.4+commit.c7e474f2",
        },
        {
            version_type: "v0.8.3+commit.8d00100c",
        },
        {
            version_type: "v0.8.2+commit.661d1103",
        },
        {
            version_type: "v0.8.1+commit.df193b15",
        },
        {
            version_type: "v0.8.0+commit.c7dfd78e",
        },
        {
            version_type: "v0.7.6+commit.7338295f",
        },
        {
            version_type: "v0.7.5+commit.eb77ed08",
        },
        {
            version_type: "v0.7.4+commit.3f05b770",
        },
        {
            version_type: "v0.7.3+commit.9bfce1f6",
        },
        {
            version_type: "v0.7.2+commit.51b20bc0",
        },
        {
            version_type: "v0.7.1+commit.f4a555be",
        }, {
            version_type: "v0.7.0+commit.9e61f92b",
        }, {
            version_type: "v0.6.12+commit.27d51765",
        }, {
            version_type: "v0.6.11+commit.5ef660b1",
        }, {
            version_type: "v0.6.10+commit.00c0fcaf",
        }, {
            version_type: "v0.6.9+commit.3e3065ac",
        }, {
            version_type: "v0.6.8+commit.0bbfe453",
        }, {
            version_type: "v0.6.7+commit.b8d736ae",
        }, {
            version_type: "v0.6.6+commit.6c089d02",
        }, {
            version_type: "v0.6.5+commit.f956cc89",
        }, {
            version_type: "v0.6.4+commit.1dca32f3",
        }, {
            version_type: "v0.6.3+commit.8dda9521",
        }, {
            version_type: "v0.6.2+commit.bacdbe57",
        }, {
            version_type: "v0.6.1+commit.e6f7d5a4",
        }, {
            version_type: "v0.6.0+commit.26b70077",
        }, {
            version_type: "v0.5.17+commit.d19bba13",
        }, {
            version_type: "v0.5.16+commit.9c3226ce",
        }, {
            version_type: "v0.5.15+commit.6a57276f",
        }, {
            version_type: "v0.5.14+commit.01f1aaa4",
        }, {
            version_type: "v0.5.13+commit.5b0b510c",
        }, {
            version_type: "v0.5.12+commit.7709ece9",
        }, {
            version_type: "v0.5.11+commit.22be8592",
        }, {
            version_type: "v0.5.11+commit.c082d0b4",
        }, {
            version_type: "v0.5.10+commit.5a6ea5b1",
        }, {
            version_type: "v0.5.9+commit.c68bc34e",
        }, {
            version_type: "v0.5.9+commit.e560f70d",
        }, {
            version_type: "v0.5.8+commit.23d335f2",
        },
        {
            version_type: "v0.5.7+commit.6da8b019",
        },
        {
            version_type: "v0.5.6+commit.b259423e",
        },
        {
            version_type: "v0.5.5+commit.47a71e8f",
        },
        {
            version_type: "v0.5.4+commit.9549d8ff",
        },
        {
            version_type: "v0.5.3+commit.10d17f24",
        },
        {
            version_type: "v0.5.2+commit.1df8f40c",
        },
        {
            version_type: "v0.5.1+commit.c8a2cb62",
        },
        {
            version_type: "v0.5.0+commit.1d4f565a",
        },
        {
            version_type: "v0.4.26+commit.4563c3fc",
        },
        {
            version_type: "v0.4.25+commit.59dbf8f1",
        },
        {
            version_type: "v0.4.24+commit.e67f0147",
        },
        {
            version_type: "v0.4.23+commit.124ca40d",
        },
        {
            version_type: "v0.4.22+commit.4cb486ee",
        },
        {
            version_type: "v0.4.21+commit.dfe3193c",
        },
        {
            version_type: "v0.4.20+commit.3155dd80",
        },
        {
            version_type: "v0.4.19+commit.c4cbbb05",
        }, {
            version_type: "v0.4.18+commit.9cf6e910",
        }, {
            version_type: "v0.4.17+commit.bdeb9e52",
        }, {
            version_type: "v0.4.16+commit.d7661dd9",
        }, {
            version_type: "v0.4.15+commit.8b45bddb",
        }, {
            version_type: "v0.4.15+commit.bbb8e64f",
        }, {
            version_type: "v0.4.14+commit.c2215d46",
        }, {
            version_type: "v0.4.13+commit.0fb4cb1a",
        }, {
            version_type: "v0.4.12+commit.194ff033",
        }, {
            version_type: "v0.4.11+commit.68ef5810",
        },
    ]

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
            vyper_type: "vyper:0.1.0b4"
        },


    ]

    const handleInputChange = (event: any) => {
        setTextValue(event.target.value);
        setError(textValue.trim() === '');
    };

    const handlefile = (event: any) => {
        setselectFile(event.target.value);
        setError(selectFile.trim() === '');
    };

    const handlecompiler = (event: any) => {
        setCompilerVersion(event.target.value);
        setError(compilerVersion.trim() === '');
    };

    const handleCompilerType = (event :any) =>{
        setCompilertype(event.target.value);
        setError(compilertype.trim() === '');
    }

    const data:any = {
        textValue: textValue,
        compilerType: compilertype,
        compilerVersion: compilerVersion
    }

    const handleContinue = () => {
        if (textValue.trim() === '' || selectFile === '' || compilerVersion === '' || compilertype === '') {
            setAddressError(textValue.trim() === '');
            setError(selectFile === '' || compilerVersion === '' || compilertype === '');
        } else {
            setError(false);
            setAddressError(false);
            if (selectFile === "Soldity(Single File)") {
                navigate("/pubilsh", {state: data});
            } else if (selectFile === "Soldity(Multiple File)") {
                navigate("/multiple-file", {state: data});
            } else if (selectFile === "Solidity(Standard JSON-input)") {
                navigate("/standardjsoninput")
            } else if (selectFile === "Vyper(Experimental)") {
                navigate("/vyper")
            }
            console.log(selectFile, "selectfile");
        }
    }

    return (
        <>
            <Box className="container-wrape">
                <Typography component="h6" align="center" className="title-text verify-title">
                    Verify & Publish Contract Source Code
                </Typography>
                <Box className="inner-wrape">
                    <Box className="left-wrape">
                        <Box className = "img_card">
                            <img
                                src="https://sepolia.etherscan.io/images/undraw/undraw_Security_on_s9ym.svg"
                                className="card-img"
                                alt="user"
                                width="100"
                                height="100"
                            />
                        </Box>
                        
                        <Box className="content">
                            <Typography variant="h6" component="h6" align="center" >
                                COMPILER TYPE AND VERSION SELECTION
                            </Typography>
                            <Typography align="center">
                                Source code verification provides <b>transparency</b> for users interacting with smart contracts. By uploading the source code, Etherscan will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.
                            </Typography>
                            <Typography align="center">
                                Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed via Solidity (Standard-Json-Input) verification method. More information can be found under Solidity's "Compiler Input and Output JSON Description" documentation section.
                            </Typography>
                        </Box>
                    </Box>

                    <Box className="right-wrape verify-right-wrap">
                        <Box className="form-wrape center-wrap">
                            <Grid container spacing={3}>
                                <Grid item lg={12} md={6} sm={12}>
                                    <Box className = "input-wrape">
                                        <FormControl>
                                            <Typography>
                                                Please enter the Contract Address you would like to verify*
                                            </Typography>
                                            <Box className="input-pad">
                                                <TextField
                                                    id="requiredField"
                                                    type="text"
                                                    placeholder="0x.."
                                                    value={textValue}
                                                    error={addressError}
                                                    helperText={addressError ? 'Field cannot be empty' : ' '}
                                                    required
                                                    onChange={handleInputChange}
                                                />
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={6} sm={12}>
                                    <Box className = "input-wrape">
                                        <FormControl >
                                            <Typography>
                                                Please select Compiler Type
                                            </Typography>
                                            <Select
                                                value={selectFile}
                                                onChange={handlefile}
                                                error={error}
                                            >
                                                {file.map((ele, index) => (
                                                    <MenuItem key={index} value={ele.file_type}>
                                                        {ele.file_type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                {selectFile && (
                                    <Grid item  lg={12} md={6} sm={12}>
                                        <Box className = "input-wrape">
                                            {selectFile !== 'Vyper(Experimental)' ? (
                                                <FormControl >
                                                    <Typography >Please select Compiler Version</Typography>
                                                    <Select
                                                        value={compilerVersion}
                                                        onChange={handlecompiler}
                                                        error = {error}
                                                    >
                                                        {compilerversion.map((ele, index) => (
                                                            <MenuItem key={index} value={ele.version_type}>
                                                                {ele.version_type}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            ) : (
                                                <FormControl >
                                                    <Typography>Select Vyper Compiler Version</Typography>
                                                    <Select
                                                        value={compilerVersion}
                                                        onChange={handlecompiler}
                                                        error ={error}
                                                    >
                                                        {vyperCompiler.map((ele, index) => (
                                                            <MenuItem key={index} value={ele.vyper_type}>
                                                                {ele.vyper_type}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Box>
                                    </Grid>
                                )}

                                <Grid item lg={12} md={6} sm={12}>
                                    <Box className = "input-wrape">
                                        <FormControl >
                                            <Typography>Please select Open Source License Type</Typography>
                                            <Select
                                                value={compilertype}
                                                onChange={handleCompilerType}
                                                error = {error}
                                            >
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
                        
                        <Box className="other-control verify-other-control">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="autoSizingCheck"
                                        required
                                    />
                                }
                                label={
                                    <>
                                        I agree to the{' '}
                                        <Link href="https://www.google.com" target="_blank">
                                            terms of services
                                        </Link>
                                    </>
                                }
                            />

                            <div className="invalid-feedback">You must agree before submitting.</div>
                            <div className="button-wrape">
                                <Button
                                    className="btn btn-primary m-2 first-btn"
                                    type="submit"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </Button>
                                <Button type="reset" className="btn btn-primary m-2 first-btn">
                                    Reset
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>


    )
}
export default Verify;
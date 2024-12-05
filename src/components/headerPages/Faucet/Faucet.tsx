import React, { useState, useEffect } from "react";
import { Box, Typography, Button, FormControl, TextField, Modal } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cross from '../../../images/cross.svg'

const Faucet = () => {
    const [address, setFaucetAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const handleOpenModal = () => {
        setErrorModalOpen(true);
    };

    const handleCloseModal = () => {
        setErrorModalOpen(false);
    };
    const sendFaucet = async () => {
        try {

            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/sendFaucetToken`, { address: address });
            console.log("result", response);

            if (response.status == 200) {
                toast.success("Send SEMSuccessFully")
            }
        } catch (error: any) {
            console.error("Error:", error.response.data);
            setErrorMessage(error.response.data)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="container-wrape">
            <ToastContainer />
            <Typography component="h6" align="center" className="title-text">
                SEM  Testnet Faucet
            </Typography>
            <p style={{ color: "white", fontSize: " 1.5rem", textAlign: "center", textShadow: " 1px 1px 1px rgba(0, 0, 0, 0.5)" }}>Fast and reliable 1 SEMTestnet SEM/day.</p>

            <Box className="d-flex justify-content-center">
                <Box className="fauset-alert">
                    <Typography sx={{ color: "white", textAlign: "center" }}>{errorMessage}</Typography>
                    <Button className="alert-close-btn"><img src={cross} alt="cross" className="cross-ic" /></Button>
                </Box>
            </Box>
            <Box className="d-flex justify-content-center">
                <div className="card-deck wallet-add-sec">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center">
                                <FormControl>
                                    <Box>
                                        <TextField
                                            id="requiredField"
                                            type="text"
                                            placeholder="Enter Your Wallet Address"
                                            required sx={{ width: "600px" }}
                                            value={address}
                                            onChange={(e) => setFaucetAddress(e.target.value)}
                                        />
                                    </Box>
                                </FormControl>
                                <Button
                                    className="btn btn-primary ms-4 first-btn"
                                    type="submit"
                                    onClick={sendFaucet}
                                >
                                    Send me 
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </Box>

            <Box>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <div className="button-wrape plan-box">
                                <h3 className="card-title mb-3">FAQs</h3>
                                <div className="quis-sec">
                                    <h5>How do I use this?</h5>
                                    <p>To request funds, simply enter your wallet address and hit “Send Me SEM”. We support wallets as received addresses but not smart contracts.</p>
                                </div>
                                <div className="quis-sec">
                                    <h5>How does it work?</h5>
                                    <p>You can request 0.2 SEMTestnet SEMevery 24h without any authentication. Then create a wallet Address to start building!</p>
                                </div>
                                <div className="quis-sec">
                                    <h5>What is a testnet token?</h5>
                                    <p>Testnet tokens are a test currency that allows you to test your SEMapplication before going live on mainnet. Testnet tokens can be used in place of mainnet SEMtokens on testnets like SEM.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default Faucet;
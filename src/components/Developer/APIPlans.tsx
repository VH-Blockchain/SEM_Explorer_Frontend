import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import "../Developer/APIPlan.scss";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const APIPlans = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [apiKeyData, setApiKeyData] = useState<any[]>([]);
    const [activeplan, setactiveplan] = useState(0);
    const [userinfo, setuserinfo] = useState<any>("");
    const [token, settoken] = useState(localStorage.getItem("mytoken"));

    useEffect(() => {
        try {
            getplandata();
            if (token) {
                // Optionally, you can perform actions like redirecting to the login page
                // Navigator("/login");
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + token);

                var requestOptions: any = {
                    method: "GET",
                    headers: myHeaders,
                    body: null,
                    redirect: "follow",
                };

                fetch(`${process.env.REACT_APP_BASE_URL}user/activePlan`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        const information = JSON.parse(result).data;
                        console.log(information, "information");
                        setuserinfo(information);
                        setactiveplan(information.subscription_id);
                        console.log(information.plan_name, "activePlan");

                    })
                    .catch((error) => console.log("error", error));

                fetch(`${process.env.REACT_APP_BASE_URL}user/get-userapikeydata`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        const information = JSON.parse(result).data;
                        if (information.length > 0) {
                            setApiKeyData(information);
                        }
                    })
                    .catch((error) => console.log("error", error));
            }
        } catch (error) {
            console.log(error);
        }
    }, [token]);


    async function getplandata() {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}internal/subscriptions`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setData(result.data);
                return result.data;
            });
    }

    const scrollToDiv = () => {
        const targetDiv = document.getElementById("targetDiv");
        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: "smooth" });
        }
    };

    const GetStartedPlan = (plan: any) => {
        if (userinfo.plan_name == plan) {
            navigate('/apiplans')
        } else {
            navigate('/payment')
        }
    }


    return (
        <Box className="container-wrape ">
            <Typography className="container-wrape title-text" variant="h4" component="h6" align="center" >
                <b>Build Precise & Reliable Apps with SEMAPIs</b>
            </Typography>
            <Box>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Data from the leading SEMSmart Chain Block Explorer catered to your needs.</h5>
                            <div className="button-wrape plan-box">
                                <Button
                                    className="btn btn-primary m-2 first-btn"
                                    type="submit"
                                    onClick={scrollToDiv}

                                >
                                    API Pricing
                                </Button>
                                <a href="https://paritas-organization.gitbook.io/SEM/" target="_blank">
                                    API Documentation
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>

            <Box>
                <div className="card-deck" id="targetDiv">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title plan-card">Ready to get started?</h5>
                            <p className="plan-card">Select the plan that best suits you or contact us for a custom option.</p>
                            <div className="gridder">
                                {data.map((item) => {

                                    return (
                                        <>
                                            <div className="card">
                                                <h5 className="card-header m-2">
                                                    $ {item.price}/month
                                                </h5>
                                                <h6 className="card-subtitle m-2 text-muted">
                                                    {" "}
                                                    {item.plan_name}
                                                </h6>
                                                <ul className=" list-group list-group-flush">
                                                    {item.features.map((feature: any) => {
                                                        return (
                                                            <li className="list-group-item">{feature}</li>
                                                        );
                                                    })}
                                                </ul>
                                                <button
                                                    className="m-4 btn btn-primary"
                                                    onClick={() => GetStartedPlan(item.plan_name)}
                                                >
                                                    Get Started Now
                                                </button>
                                            </div>
                                        </>
                                    );

                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Box>

            <Box>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title plan-card">Frequently Asked Questions</h5>
                            <div className="button-wrape plan-box">
                                <div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography>How do I subscribe to SEMScan API services?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Kindly visit the API self-checkout section above ,select the plan that fits you best and follow the steps accordingly.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography>How do I Upgrade or Cancel an account?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Please Contact Us should you wish to upgrade or cancel your account. We will assist you accordingly.
                                                We accept major credit cards that are supported by Stripe.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            <Typography>
                                                What are the Payment Options available?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                We accept major credit cards that are supported by Stripe.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            <Typography>
                                                What is your refund policy?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Payments made are non-refundable and we do not provide refunds or credits for any services already paid for.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            <Typography>
                                                When will Account Activation occur?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                API Pro accounts will be activated within 24 hours after username and email has been received.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            <Typography>
                                                How does Renewal work for API Pro accounts?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Stripe billing is auto-renewed by default. Unless you cancel your subscription plan before your billing date, you authorise us to automatically charge the subscription fee for the next billing cycle to your account.
                                            </Typography>

                                            <Typography>
                                                The billing portal will provide an auto-billing date where information such as a renewal subscription term that will begin automatically after the initial subscription term or another renewal term will be reflected in your account unless you cancel or terminate prior to the commencement of new term.
                                            </Typography>

                                            <Typography>
                                                Kindly contact us should you wish to turn the auto-renewal option off.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>

            <Box>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title plan-card">Contact Us</h5>
                            <p className="plan-card">If you have any questions on the SEMScan APIs, ask them here!</p>

                            <Box className="form-wrape address_card">
                                <Grid container spacing={3}>
                                    <Grid item lg={6} md={4} sm={12}>
                                        <Box className="input-wrape">
                                            <FormControl>
                                                <Typography  >
                                                    Contact Name
                                                </Typography>
                                                <Box className="input-pad ">
                                                    <TextField id="contractAddress" placeholder="Ex: John" />
                                                </Box>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={12}>
                                        <Box className="input-wrape">
                                            <FormControl>
                                                <Typography >
                                                    Company Email
                                                </Typography>
                                                <Box className="input-pad">
                                                    <TextField id="compilerVersion" placeholder="Ex: jeheje8609@haikido.com" />
                                                </Box>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <Box className=" ABI_card" >
                                            <Box className="input-wrape">
                                                <FormControl>
                                                    <Typography >
                                                        Message
                                                    </Typography>
                                                    <Box className="input-pad">
                                                        <TextField
                                                            id="solidityContractCode"
                                                            multiline
                                                            rows={3}
                                                            placeholder=""
                                                            fullWidth
                                                        />
                                                    </Box>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Grid>

                                </Grid>
                            </Box>



                            <Box>
                                <div className="button-wrape sendmessage-btn">
                                    <Button
                                        className="btn btn-primary m-2 first-btn"
                                        type="submit"
                                    >
                                        Contact Us
                                    </Button>

                                </div>
                            </Box>
                        </div>
                    </div>
                </div>


            </Box>


        </Box>
    );
};

export default APIPlans;

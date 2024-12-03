import React, { useState, useEffect } from "react";
import "./plans.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Table from "../../table/Table";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Plans = () => {
  const [data, setData] = useState<any[]>([]);
  const [apiKeyData, setApiKeyData] = useState<any[]>([]);
  const [token, settoken] = useState(localStorage.getItem("mytoken"));
  const [message, setMessage] = useState(
    "'User is not login Please login again !'"
  );
  const [userinfo, setuserinfo] = useState<any>("");
  const [appName, setAppName] = useState<any>("");
  const [activeplan, setactiveplan] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          })
          .catch((error) => console.log("error", error));

        fetch(`${process.env.REACT_APP_BASE_URL}user/get-userapikeydata`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const information = JSON.parse(result).data;
            if (information.length > 0) {
              console.log("informationgetvgh", information);
              setApiKeyData(information);
            }
          })
          .catch((error) => console.log("error", error));
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const createAPIKey = async () => {
    try {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var raw = JSON.stringify({
        appname: appName,
      });
      var requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/setuserapikeydata`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((error) => console.log(error));
      if (response.message == "Data inserted successfully") {
        toast.success(`⛏️ ${response.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 600);
      } else {
        toast.success('You can only add 3 rows of data');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

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
        console.log(result.data, "result");
        setData(result.data);
        return result.data;
      });
  }

  async function updatePlan(update_id: any) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      plan_id: update_id,
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}user/updatePlan`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result, "result"))
      .catch((error) => console.log("error", error));

    setTimeout(() => {
      window.location.reload();
    }, 600);
  }

  return (
    <Box className="container-wrape">
      <div className="auth-wrapper">
        {token ? (
          <>
            <ToastContainer />
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{userinfo.email_id}</h5>
                  <p className="card-text">{userinfo.plan_name}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="card">
                  <Box className="card-body">
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottom: "1px solid #524e4e",
                        paddingBottom: "10px",
                      }}
                    >
                      <Typography>API KEYS</Typography>
                      <Button
                        className="btn btn-primary first-btn"
                        type="submit"
                        onClick={handleOpen}
                      >
                        + Add
                      </Button>
                    </Box>
                    <Typography sx={{ mt: 2, mb: 5 }}>
                      For developers interested in building applications using
                      our API Service, please create an API-Key Token which you
                      can then use with all your API requests.
                    </Typography>

                    <Box className="api-key-table">
                      <Table
                        thead={() => {
                          return (
                            <tr>
                              <th>App Name</th>
                              <th>API Key Token</th>
                              <th>API Statistics </th>
                              <th>Action</th>
                            </tr>
                          );
                        }}
                        tbody={apiKeyData?.map((data: any) => {
                          return () => {
                            return (
                              <tr key={data?.id}>
                                <td>{data?.appname}</td>
                                <td>{data?.appapikey}</td>
                                <td>---</td>
                                <td>Update</td>
                              </tr>
                            );
                          };
                        })}
                        limit={20}
                      />
                    </Box>
                  </Box>
                </div>
              </Grid>
              <Modal
                open={open}
                className="modal-withdraw"
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={style}
                  className="modal-withdraw-inner modal-deposite-inner"
                >
                  <Typography
                    id="modal-modal-title "
                    variant="h6"
                    component="h2"
                    className="withdraws-title"
                    sx={{ textAlign: "left" }}
                  >
                    Create API Key
                  </Typography>
                  <CloseIcon onClick={handleClose} className="closebutton" />

                  <Box
                    sx={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "20px",
                      borderBottom: "1px solid #524e4e",
                    }}
                  >
                    <Typography sx={{ mb: 1 }}>App Name</Typography>
                    <TextField
                      fullWidth
                      id="fullWidth"
                      placeholder="Project Name"
                      sx={{ marginBottom: "20px" }}
                      onChange={(e) => setAppName(e.target.value)}
                      value={appName}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      flexDirection: "row",
                      width: "100%",
                      padding: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Button variant="text" onClick={handleClose} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={createAPIKey}>
                      {loading ? <CircularProgress size={24} /> : "Create New API Key"}
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Grid>
            <br></br>
            <div className="card">
              <div className="card-body">
            <div className="gridder">
              {data.map((item) => {
                if (item.id == activeplan) {
                  return (
                    <>
                      <div className="card bg-success text-white">
                        <h5 className="card-header m-2 text-white">
                          $ {item.price}/month
                        </h5>
                        <h6 className="card-subtitle m-2 text-white">
                          {" "}
                          {item.plan_name}
                        </h6>
                        <ul className=" list-group list-group-flush">
                          {item.features.map((feature: any) => {
                            return (
                              <li className="list-group-item bg-success text-white">
                                {feature}
                              </li>
                            );
                          })}
                        </ul>
                        <button className="m-4 btn btn-dark" disabled>
                          Active Plan
                        </button>
                      </div>
                    </>
                  );
                } else if (item.id < activeplan) {
                  return (
                    <>
                      <div className="card text-white  bg-secondary text-white">
                        <h5 className="card-header m-2 text-white">
                          $ {item.price}/month
                        </h5>
                        <h6 className="card-subtitle m-2 text-white">
                          {" "}
                          {item.plan_name}
                        </h6>
                        <ul className=" list-group list-group-flush">
                          {item.features.map((feature: any) => {
                            return (
                              <li className="list-group-item bg-transparent text-white">
                                {feature}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div className="card text-white bg-secondary">
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
                              <li className="list-group-item text-white bg-transparent">{feature}</li>
                            );
                          })}
                        </ul>
                        <button
                          className="m-4 btn"
                          onClick={() => updatePlan(item.id)}
                        >
                          Upgrade Plan
                        </button>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            </div>
            </div>
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </Box>
  );
};

export default Plans;

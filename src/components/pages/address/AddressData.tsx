import { Box, Button } from "@mui/material";
import { Grid, Badge } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../table/Table";
import Web3 from "web3";
import ContractData from "./ContractData";
import { isContractVerified } from "./address.controller";

type MyComponentProps = {
  transactions: any;
  location: any;
  role: any;
  addressDataList: any;
  currentPage: any;
  info: any;
  address: any;
  isverified: boolean;
};

const AddressData: React.FC<MyComponentProps> = ({
  transactions,
  location,
  role,
  isverified,
  addressDataList,
  currentPage,
  info,
  address,
}) => {
  const [transferData, setTransferData] = useState(true);
  const [contractData, setContractData] = useState(false);
  const [metadata, setMetadata] = useState<any>('');

  const changeTransferInfo = () => {
    setTransferData(true);
    setContractData(false);
  };

  const changeContractInfo = () => {
    setTransferData(false);
    setContractData(true);
  };

  React.useEffect(() => {
    isContractVerified(
      address,
      process.env.REACT_APP_API_KEY as string
    )
      .then((res: any) => {
        setMetadata(res?.data?.data)
        console.log(res, "Res");
      })
      .catch((err: any) => {
        console.log(err, "Error");
      });
  }, []);

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Button
          className="btn btn-primary m-2 first-btn"
          type="submit"
          sx={{ marginRight: "10px" }}
          onClick={changeTransferInfo}
        >
          Transactions
        </Button>
        {role === "USER" ? (
          <></>
        ) : (
          <>
            {" "}
            {isverified ? (
              <Badge color="success" overlap="circular" badgeContent=" ">
                <Button
                  type="reset"
                  className="btn btn-primary reset-btn"
                  onClick={changeContractInfo}
                >
                  Contract
                </Button>
              </Badge>
            ) : (
              <Button
                type="reset"
                className="btn btn-primary reset-btn"
                onClick={changeContractInfo}
              >
                Contract
              </Button>
            )}
          </>
        )}
      </Box>

      {transferData ? (
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="card">
              {["", "#txs", "#transactions"].includes(location) &&
                transactions.normal.find(
                  (list: any) => list.page === currentPage
                ) && (
                  <div>
                    <div className="card__header">
                      <h3>Transactions: {addressDataList?.length}</h3>
                    </div>
                    <div className="card__body api-key-table">
                      <Table
                        thead={() => {
                          return (
                            <tr>
                              <th>Hash</th>
                              <th>Age</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Value</th>
                            </tr>
                          );
                        }}
                        tbody={addressDataList?.map((tx: any) => {
                          return () => {
                            return (
                              <tr key={tx?.transaction_hash}>
                                <td>
                                  <Link
                                    target="_blank"
                                    to={`/tx/${tx?.transaction_hash}`}
                                  >
                                    {tx?.transaction_hash.slice(0, 10) + "..."}
                                  </Link>
                                </td>
                                <td>{tx?.timestamp} ago</td>
                                <td>
                                  <Link
                                    target="_blank"
                                    to={`/address/${tx?.from}`}
                                  >
                                    {tx?.from.slice(0, 20) + "..."}
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    target="_blank"
                                    to={`/address/${tx?.to}`}
                                  >
                                    {tx?.to ? tx?.to.slice(0, 20) + "..." : "-"}
                                  </Link>
                                </td>
                                <td>
                                  {Web3.utils.fromWei(
                                    tx?.value.toString(),
                                    "ether"
                                  )}
                                </td>
                              </tr>
                            );
                          };
                        })}
                        limit={20}
                      />
                    </div>
                  </div>
                )}

              {/* <div className="table__pagination">
                            <h3>Page: {currentPage}</h3>
                            <div className="btn-wrape">
                                { currentPage > 1 && (
                                    <button
                                        className="btn"
                                        onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                                    >
                                        <i className="bx bx-left-arrow-alt"></i> Back
                                    </button>
                                )}
                                <button
                                    className="btn"
                                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                                >
                                    Next <i className="bx bx-right-arrow-alt"></i>
                                </button>
                            </div>
                        </div> */}
            </div>

                
            {info.contract && info.contract !== "0x" && (
              
              <div className="">
                  <div className="card address-info__card contract-code-title">

                    <h1>
                      <span className="theme-color">Contract Code:</span>
                    </h1>
                    {info.contract}
                  </div>
                </div>
            )}
          </Grid>
        </Grid>
      ) : (
        <ContractData address={address} isverified={isverified} contractData={metadata}/>
        
      )}
    </>
  );
};

export default AddressData;
import { Grid } from "@mui/material";
import React from "react";
import SupplyChart from "../../Chart/SupplyChart";

function Supply() {
  return (
    <>
      <div className="supply-main">
        <h5 className="supply-title-text">
          SEM Scanner Total Supply and Market Capitalization Chart
        </h5>
        <div className="card">
          <p className="common-text">
            The table and pie chart shows the distribution of SEM Scanner from reward
            of both block and uncle block mining to arrive at the current total
            SEM Scanner supply. The SEM Scanner (ETH) price both in USD and BTC is also
            shown in the table below. With both the total supply of SEM Scanner and
            the current price in USD, we can arrive at the market capitalization
            as shown in the pie chart.
          </p>
        </div>

        <div className="distrubution-sec">
          <Grid container spacing={3}>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="card">
                    <div className="card__header">
                      <h3>SEM Scanner Distribution Overview</h3>
                    </div>
                    <div className="card__body">
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                    Genesis (60M Crowdsale 12M Other):
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0  text-right">72,009,990.50 Ether</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                + Mining Block Rewards:
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0 text-right">47,223,894.59 Ether</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                + Mining Uncle Rewards:
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0 text-right">3,139,986.13 Ether</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                + Eth2 Staking Rewards:
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0 text-right">2,574,381.39 Ether</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                - Burnt Fees:
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0 text-right">4,503,374.11 Ether</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                <strong>= Current Total Supply</strong>
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0 text-right"><strong>120,444,878.50 Ether</strong></p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={12}>
                                <p className="common-text mb-0">Data Source: <a href="">SEM Scanner Supply API Docs</a></p>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                  </div>
                </Grid>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="card">
                    <div className="card__header">
                      <h3>Price per SEM Scanner </h3>
                    </div>
                    <div className="card__body">
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                In USD:
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0  text-right">$3,692.33</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={7}>
                                <p className="common-text mb-0">
                                In BTC
                                </p>
                                </Grid>
                                <Grid item lg={5}>
                                <p className="common-text mb-0 text-right">
                                0.0376937679131649</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="dist-sec">
                            <Grid container>
                                <Grid item lg={12}>
                                <p className="common-text mb-0">Data Source: <a href="#">CryptoCompare</a></p>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                  </div>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item lg={7} md={12} sm={12} xs={12}>
              <div className="card">
                <div className="inner-card-sec">
                  <div className="inner-card">
                    <h6>120,444,878.50</h6>
                    <p>Total SEM Supply</p>
                  </div>
                  <div className="inner-card">
                    <h6>$443,269,816,998.00</h6>
                    <p>Market Capitalization</p>
                  </div>
                </div>
                <div className="supply-chart-sec">
                  <SupplyChart />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Supply;

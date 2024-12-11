import { Grid } from '@mui/material'
import React from 'react'
import SupplyChart from '../../Chart/SupplyChart';

function Supply() {
  return (
    <>
      <div className="supply-main">
        <h5 className="supply-title-text">
          Ether Total Supply and Market Capitalization Chart
        </h5>
        <div className="card">
          <p className="common-text">
            The table and pie chart shows the distribution of Ether from reward
            of both block and uncle block mining to arrive at the current total
            Ether supply. The Ether (ETH) price both in USD and BTC is also
            shown in the table below. With both the total supply of Ether and
            the current price in USD, we can arrive at the market capitalization
            as shown in the pie chart.
          </p>
        </div>

        <div className="distrubution-sec">
          <Grid container spacing={3}>
            <Grid item lg={5} md={6} sm={6} xs={5}>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="card">1</div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="card">2</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={7} md={6} sm={6} xs={7}>
              <div className="card">
                <div className="inner-card-sec">
                    <div className="inner-card">
                        <h6>120,444,878.50</h6>
                        <p>Total Ether Supply</p>
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

export default Supply
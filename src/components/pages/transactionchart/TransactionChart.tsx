import { Grid } from '@mui/material'
import React from 'react'
import TxChart from '../../Chart/TxChart'
import IdeaIc from '../../../images/idea.png'

function TransactionChart() {
  return (
    <>
     <div className="supply-main tx-chart-page">
        <h5 className="supply-title-text">
           SEM Scanner Chain Daily Transactions Chart
        </h5>
    <Grid container spacing={3}>
    <Grid item lg={8} md={7} sm={12} xs={12}>
        <div className='tx-chart-sec'>
            <div className="card">
                <div className="card__header">
                <h3 className="supply-title-text">SEM Scanner Chain Daily Transactions Chart</h3>
                <p className='zoom-text'>Click and drag in the plot area to zoom in</p>
                </div>
                <div className="card__body">
                    <TxChart />
                </div>
            </div>
        </div>
    </Grid>
    <Grid item lg={4} md={5} sm={12} xs={12}>
        <div className='card about-sec'>
        <h5 className="h6">About</h5>
        <p className='about-content'>The chart highlights the total number of transactions on the Polygon PoS Chain blockchain with daily individual breakdown for average difficulty, estimated hash rate, average block time and size, total block and uncle block count and total new address seen.</p>
        <div className="highlight-sec">
            <h6><img src={IdeaIc} alt="idea" className='idea-img' /> highlight</h6>
            <p>Highest number of 16,449,264 transactions on <br></br> Thursday, November 16, 2023</p>
        </div>
        <div className="highlight-sec">
            <h6><img src={IdeaIc} alt="idea" className='idea-img' /> highlight</h6>
            <p>Lowest number of 1 transactions on Tuesday,<br></br> June 16, 2020</p>
        </div>
        </div>
    </Grid>
    </Grid>
    </div>
    </>
  )
}

export default TransactionChart
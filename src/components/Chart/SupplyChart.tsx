import React from 'react'
import Chart from 'react-apexcharts';

function SupplyChart() {
    const options = {
        chart: {
          type: 'pie' as const, // Fix here by typing "pie" as const
        },
        labels: [
          'Genesis: Crowd Sale (60,000,000 ETH)',
          'Block Rewards - Burnt Fees (42,720,520.47974 ETH)',
          'Eth2 Staking Rewards (2,574,381.392121363 ETH)',
          'Genesis: Other (12,009,990.49948 ETH)',
          'Uncle Rewards (3,139,986.1250 ETH)',
        ],
        legend: {
          position: 'bottom',
        },
      };
    
      const series = [
        60000000, // Genesis: Crowd Sale
        42720520.47974, // Block Rewards - Burnt Fees
        2574381.392121363, // Eth2 Staking Rewards
        12009990.49948, // Genesis: Other
        3139986.1250, // Uncle Rewards
      ];
    
  return (
    <>
      <div>
      <h2 className='chart-title'>Breakdown by Supply Types</h2>
      <Chart options={options} series={series} type="pie" width="500" className="chart-main" />
    </div>
    </>
  )
}

export default SupplyChart
import React from "react";
import Chart from "react-apexcharts";

function SupplyChart() {
  const options: any = {
    chart: {
      type: "pie" as const, 
    },
    labels: [
      "Genesis: Crowd Sale (60,000,000 ETH)",
      "Block Rewards - Burnt Fees (42,720,520.47974 ETH)",
      "Eth2 Staking Rewards (2,574,381.392121363 ETH)",
      "Genesis: Other (12,009,990.49948 ETH)",
      "Uncle Rewards (3,139,986.1250 ETH)",
    ],
    legend: {
      show: false,
    },
  };

  const series = [
    60000000, // Genesis: Crowd Sale
    42720520.47974, // Block Rewards - Burnt Fees
    2574381.392121363, // Eth2 Staking Rewards
    12009990.49948, // Genesis: Other
    3139986.125, // Uncle Rewards
  ];

  return (
    <>
      <div className="chart-container">
        <h2 className="chart-title">Breakdown by Supply Types</h2>
        <div className="center-chart">
          <Chart
            options={options}
            series={series}
            type="pie"
            width="500"
            className="chart-main"
          />
        </div>

        <div>
          <div className="custom-legend">
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#008FFB" }}
            ></span>{" "}
            Genesis: Crowd Sale (60,000,000 ETH)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#00E396" }}
            ></span>{" "}
            Block Rewards - Burnt Fees (42,720,520.47974 ETH)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#FEB019" }}
            ></span>{" "}
            Eth2 Staking Rewards (2,574,381.392121363 ETH)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#FF4560" }}
            ></span>{" "}
            Genesis: Other (12,009,990.49948 ETH)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#775DD0" }}
            ></span>{" "}
            Uncle Rewards (3,139,986.1250 ETH)
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default SupplyChart;
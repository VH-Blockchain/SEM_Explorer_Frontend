import React from "react";
import Chart from "react-apexcharts";

function SupplyChart() {

  
  const options: any = {
    chart: {
      type: "pie" as const,
     
    },
    labels: [
      "Staking Rewards (63%)",
      "Free Minting Assets (18%)",
      "Mission Task Rewards (9%)",
      "DAO Advisors (4.5)",
      "Mission Development Fund (1.5%)",
      "Trade Fund (1.5%)",
      "Sustainable Fund (1.2%)",
      "Mission Team (1%)",
      "Charity (0.3%)",
    ],
    tooltip: {
      enabled: true,
      // Custom tooltip formatter to only show label without the ":"
      y: {
        formatter: () => undefined, // Return undefined to avoid showing value or ":"
        title: {
          // Remove the colon by ensuring the title is returned as-is
          formatter: (seriesName: string) => seriesName
        }
      }
    },
    colors: [
      "#50c04e",  // Staking Rewards
      "#fc0161",  // Block Rewards
      "#03cdfc",  // Eth2 Staking Rewards
      "#cec137",  // Genesis: Other
      "#cbc032",  // Uncle Rewards
      "#284771",  // Uncle Rewards
      "#d82722",  // Uncle Rewards
      "#af088b",  // Uncle Rewards
      "#423e56",  // Uncle Rewards
    ],
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          chart: {
            width: "385px", // Adjust the chart width for smaller screens
          },
          legend: {
            position: "bottom", // Adjust legend position for smaller screens
          },
        },
      },
    ],
  };
  

  const series = [
    75880273.4527, // Staking Rewards (63%)
    21680078.1293, // Free Minting Asset (18%)
    10840039.0647, // Mission Task Rewards (9%)
    5420019.5323,  // DAO Advisors (4.5%)
    1806673.1774,  // Mission Development Fund (1.5%)
    1806673.1774,  // Trade Fund (1.5%)
    1445338.5420,  // Sustainable Fund (1.2%)
    1204448.7850,  // Mission Team (1%)
    361334.6355    // Charity (0.3%)
  ]

  return (
    <>
      <div className="chart-container">
        <h2 className="chart-title">Distribution of the Assets</h2>
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
              style={{ background: "#50c04e" }}
            ></span>{" "}
            Staking Rewards (63%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#fc0161" }}
            ></span>{" "}
            Free Minting Assets (18%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#03cdfc" }}
            ></span>{" "}
           Mission Task Rewards (9%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#cec137" }}
            ></span>{" "}
            DAO Advisors (4.5)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#cbc032" }}
            ></span>{" "}
            Mission Development Fund (1.5%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#284771" }}
            ></span>{" "}
            Trade Fund (1.5%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#d82722" }}
            ></span>{" "}
            Sustainable Fund (1.2%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#af088b" }}
            ></span>{" "}
            Mission Team (1%)
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ background: "#423e56" }}
            ></span>{" "}
            Charity (0.3%)
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default SupplyChart;
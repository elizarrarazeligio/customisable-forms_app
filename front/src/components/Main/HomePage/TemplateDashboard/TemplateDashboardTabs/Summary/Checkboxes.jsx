import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
Chart.register(CategoryScale);

function Checkboxes({ answers }) {
  const [chartData, setChartData] = useState({
    labels: answers.map((answer) => answer.option),
    datasets: [
      {
        label: "Votes",
        data: answers.map((answer) => answer.count),
        backgroundColor: [
          "rgba(175, 172, 168, 0.83)",
          "rgba(95, 92, 92, 0.74)",
          "rgba(60, 61, 60, 0.85)",
          "rgba(255, 255, 255, 0.85)",
          "rgba(214, 212, 214, 0.85)",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="col-12 col-md-10 col-lg-8 d-flex flex-column align-items-center">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default Checkboxes;

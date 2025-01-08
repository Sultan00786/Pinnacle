"use client";
import React from "react";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
   const data = {
      datasets: [
         {
            label: "$",
            data: [2000, 5400, 895, 893, 440, 3903, 3330, 3000],
            // i want bg color theme in purple
            backgroundColor: [
               "rgb(152, 78, 216, 1)",
               "rgb(152, 78, 217, 0.9)",
               "rgb(152, 78, 218, 0.8)",
               "rgb(152, 78, 219, 0.7)",
               "rgb(152, 78, 220, 0.6)",
               "rgb(152, 78, 221, 0.5)",
               "rgb(152, 78, 222, 0.4)",
               "rgb(152, 78, 223, 0.3)",
            ],
            hoverOffset: 12,
            cutout: "68%",
         },
      ],
   };
   return (
      <div>
         <Doughnut data={data} />
      </div>
   );
}

export default DoughnutChart;

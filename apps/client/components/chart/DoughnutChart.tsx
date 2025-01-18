"use client";
import React, { useEffect, useState } from "react";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AccountType } from "@repo/interface/interface";
import { set } from "react-hook-form";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: { accounts: AccountType[] }) {
   const [balance, setBalance] = useState<number[]>([] as number[]);
   const [color, setColor] = useState<string[]>([] as string[]);
   useEffect(() => {
      setBalance(accounts.map((acc, index) => acc.balance));
      setColor(
         accounts.map((acc, index) => `rgb(152, 78, 216, ${1 - index / 10})`)
      );
   }, [accounts]);
   const data = {
      datasets: [
         {
            label: "$",
            data: balance,
            // i want bg color theme in purple
            // backgroundColor: accounts.map(
            //    (acc, index) => `rgb(152, 78, 216, ${1 - index / 10})`
            // ),
            backgroundColor: color,
            hoverOffset: 8,
            cutout: "65%",
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

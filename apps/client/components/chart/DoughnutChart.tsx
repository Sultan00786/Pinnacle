"use client";
import { AccountType } from "@repo/interface/interface";
import {
   ArcElement,
   Chart as ChartJS,
   Legend,
   Tooltip
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: { accounts: AccountType[] }) {
   const [balance, setBalance] = useState<number[]>([] as number[]);
   const [color, setColor] = useState<string[]>([] as string[]);
   useEffect(() => {
      setBalance(accounts.map((acc) => acc.balance / 100));
      setColor(
         accounts.map((acc, index) => `rgb(152, 78, 216, ${1 - index / 10})`)
      );
   }, [accounts]);
   const data = {
      datasets: [
         {
            label: "$",
            data: balance,
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

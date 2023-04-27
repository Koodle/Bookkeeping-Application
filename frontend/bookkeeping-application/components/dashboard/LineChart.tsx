"use client";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";

export function LineChart() {
  
  const ledgers = useAppSelector((state) => state.transactions.ledgers);

  let statements = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
  }

  //Find bank ledger, filter by month, tally balance
  Object.values(ledgers).map((ledger : any) => {

    if (ledger.nominalAccount.accountName === "Bank account") {

      //loop for each month
      for (let currentMonth = 0; currentMonth < 12; currentMonth++) {

        let debitBalance = 0;
        let creditBalance = 0;

        if (ledger.Debit.length > 0) {
          //filter based on month
          ledger.Debit.filter((e : any) => {            
            var month = parseInt(e.transactionDate.split('-')[1]) - 1;
            return currentMonth === +month;
          }).forEach((transaction: any) => {
            debitBalance += parseFloat(transaction.amount);
          });
        }

        if (ledger.Credit.length > 0) {
          //filter based on month
          ledger.Credit.filter((e: any) => {
            var month = parseInt(e.transactionDate.split('-')[1]) - 1;
            return currentMonth === month;
          }).forEach((transaction: any) => {
            creditBalance += parseFloat(transaction.amount);
          });
        }

        let balance = debitBalance - creditBalance;

        // console.log("bank balance - Month", currentMonth );
        // console.log(balance);
      
          if (currentMonth === 0){
            statements["0"] = balance
          }
          else if (currentMonth === 1){
            statements["1"] = statements["0"] + balance
          }
          else if (currentMonth === 2){
            statements["2"] = statements["1"] + balance
          }
          else if (currentMonth === 3){
            statements["3"] = statements["2"] + balance
          }
          else if (currentMonth === 4){
            statements["4"] = statements["3"] + balance
          }
          else if (currentMonth === 5){
            statements["5"] = statements["4"] + balance
          }
          else if (currentMonth === 6){
            statements["6"] = statements["5"] + balance
          }
          else if (currentMonth === 7){
            statements["7"] = statements["6"] + balance
          }
          else if (currentMonth === 8){
            statements["8"] = statements["7"] + balance
          }
          else if (currentMonth === 9){
            statements["9"] = statements["8"] + balance
          }
          else if (currentMonth === 10){
            statements["10"] = statements["9"] + balance
          }
          else if (currentMonth === 11){
            statements["11"] = statements["10"] + balance 
          }

      }
    }
  })

  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const data = {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: [statements["0"], statements["1"], statements["2"], statements["3"], statements["4"], statements["5"], statements["6"], statements["7"], statements["8"], statements["9"], statements["10"], statements["11"]],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return <Line options={options} data={data} />;
}

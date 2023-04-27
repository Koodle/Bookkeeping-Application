"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker"; //fake data

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { current } from "@reduxjs/toolkit";


// export function App() {

//   return <Bar options={options} data={data} />;
// }

export default function BarChart() {

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

  Object.values(ledgers).map((ledger : any) => {

    //expenses
    if (ledger.nominalAccount.groupName === "Cost of sales" || ledger.nominalAccount.groupName === "Expense") {

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

        // console.log("expenses balance - Month", currentMonth );        
        // console.log(balance);

        //if positive then subtract
        if (balance > 0) {

          if (currentMonth === 0){
            statements["0"] -= balance
          }
          else if (currentMonth === 1){
            statements["1"] -= balance
          }
          else if (currentMonth === 2){
            statements["2"] -= balance
          }
          else if (currentMonth === 3){
            statements["3"] -= balance
          }
          else if (currentMonth === 4){
            statements["4"] -= balance
          }
          else if (currentMonth === 5){
            statements["5"] -= balance
          }
          else if (currentMonth === 6){
            statements["6"] -= balance
          }
          else if (currentMonth === 7){
            statements["7"] -= balance
          }
          else if (currentMonth === 8){
            statements["8"] -= balance
          }
          else if (currentMonth === 9){
            statements["9"] -= balance
          }
          else if (currentMonth === 10){
            statements["10"] -= balance
          }
          else if (currentMonth === 11){
            statements["11"] -= balance
          }
          
        }else{ //if negative add

          balance = Math.abs(balance)

          if (currentMonth === 0){
            statements["0"] += balance
          }
          else if (currentMonth === 1){
            statements["1"] += balance
          }
          else if (currentMonth === 2){
            statements["2"] += balance
          }
          else if (currentMonth === 3){
            statements["3"] += balance
          }
          else if (currentMonth === 4){
            statements["4"] += balance
          }
          else if (currentMonth === 5){
            statements["5"] += balance
          }
          else if (currentMonth === 6){
            statements["6"] += balance
          }
          else if (currentMonth === 7){
            statements["7"] += balance
          }
          else if (currentMonth === 8){
            statements["8"] += balance
          }
          else if (currentMonth === 9){
            statements["9"] += balance
          }
          else if (currentMonth === 10){
            statements["10"] += balance
          }
          else if (currentMonth === 11){
            statements["11"] += balance
          }
      }
      }
    }

    //reveue
    if (ledger.nominalAccount.groupName === "Income") {

      // console.log("ledger", ledger.nominalAccount.accountName);

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
            // console.log("current month", currentMonth);
            // console.log("filter month", month);
            return currentMonth === month;
          }).forEach((transaction: any) => {
            
            // if(currentMonth === 0){
            //   console.log("month one transactions");
            //   console.log(transaction);
            // }
            
            
            creditBalance += parseFloat(transaction.amount);
          });
        }

        let balance = debitBalance - creditBalance;

        // console.log("Income balance - Month", currentMonth );
        // console.log(balance);

        //if negative then add
        if (balance < 0) {

          balance = Math.abs(balance)

          if (currentMonth === 0){
            statements["0"] += balance
          }
          else if (currentMonth === 1){
            statements["1"] += balance
          }
          else if (currentMonth === 2){
            statements["2"] += balance
          }
          else if (currentMonth === 3){
            statements["3"] += balance
          }
          else if (currentMonth === 4){
            statements["4"] += balance
          }
          else if (currentMonth === 5){
            statements["5"] += balance
          }
          else if (currentMonth === 6){
            statements["6"] += balance
          }
          else if (currentMonth === 7){
            statements["7"] += balance
          }
          else if (currentMonth === 8){
            statements["8"] += balance
          }
          else if (currentMonth === 9){
            statements["9"] += balance
          }
          else if (currentMonth === 10){
            statements["10"] += balance
          }
          else if (currentMonth === 11){
            statements["11"] += balance
          }

        }else{ //if positive deduct

          if (currentMonth === 0){
            statements["0"] -= balance
          }
          else if (currentMonth === 1){
            statements["1"] -= balance
          }
          else if (currentMonth === 2){
            statements["2"] -= balance
          }
          else if (currentMonth === 3){
            statements["3"] -= balance
          }
          else if (currentMonth === 4){
            statements["4"] -= balance
          }
          else if (currentMonth === 5){
            statements["5"] -= balance
          }
          else if (currentMonth === 6){
            statements["6"] -= balance
          }
          else if (currentMonth === 7){
            statements["7"] -= balance
          }
          else if (currentMonth === 8){
            statements["8"] -= balance
          }
          else if (currentMonth === 9){
            statements["9"] -= balance
          }
          else if (currentMonth === 10){
            statements["10"] -= balance
          }
          else if (currentMonth === 11){
            statements["11"] -= balance
          }
        }
      }
  }})

  // console.log("statements");
  // console.log(statements);

  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart",
      // },
    },
  };
  
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const data = {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: [statements["0"], statements["1"], statements["2"], statements["3"], statements["4"], statements["5"], statements["6"], statements["7"], statements["8"], statements["9"], statements["10"], statements["11"]],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };


  return (
    // <div className="">
    <Bar data={data} options={options} />
    // </div>
  );
}

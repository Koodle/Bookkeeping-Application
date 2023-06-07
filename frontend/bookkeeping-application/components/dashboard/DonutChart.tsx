"use client";
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTransactions } from "../../store/slices/transactionsSlice";

export default function DonutChart() {

  const ledgers = useAppSelector((state) => state.transactions.ledgers);

  let statements = {
    "revenue": 0,
    "liabilities": 0,
    "expenses": 0,
    "assets": 0
  }

  Object.values(ledgers).map((ledger : any) => {
    
    //calculate Balances:
    let debitBalance = 0;
    let creditBalance = 0;

    if (ledger.Debit.length > 0) {
      ledger.Debit.forEach((transaction: any) => {
        debitBalance += parseFloat(transaction.amount);
      });
    }

    if (ledger.Credit.length > 0) {
      ledger.Credit.forEach((transaction: any) => {
        creditBalance += parseFloat(transaction.amount);
      });
    }
    
    let balance = Math.abs(debitBalance - creditBalance);

    //append values
    if (ledger.nominalAccount.groupName === "Current assets"){    
      statements.assets = statements.assets + balance
    }
    else if (ledger.nominalAccount.groupName === "Long term assets"){
      statements.assets = statements.assets + balance
    }
    else if (ledger.nominalAccount.groupName === "Long-term liabilities"){
      statements.liabilities = statements.liabilities + balance
    }
    else if (ledger.nominalAccount.groupName === "Current liabilities"){
      statements.liabilities = statements.liabilities + balance
    }
    else if (ledger.nominalAccount.groupName === "Income"){
      statements.revenue = statements.revenue + balance
    }
    else if (ledger.nominalAccount.groupName === "Cost of sales"){
      statements.expenses = statements.expenses + balance
    }
    else if (ledger.nominalAccount.groupName === "Cost of sales"){
      statements.expenses = statements.expenses + balance
    }

  })
  
  const data = {
    labels: ["Revenue", "Liabilities", "Expenses", "Assets"],
    datasets: [
      {
        label: "# of Votes",
        // data: [12, 19, 10, 22],
        data: [statements.revenue, statements.liabilities, statements.expenses, statements.assets],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  
  return <Doughnut data={data} options={options} />;
}

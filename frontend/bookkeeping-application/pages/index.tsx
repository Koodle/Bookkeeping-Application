import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
//components
import SideBar from "../components/Layout/SideBar";
import DonutChart from "../components/Dashboard/DonutChart";
import TransactonsTable from "../components/Dashboard/TransactionsTable";
import BarChart from "../components/Dashboard/BarChart";
import { LineChart } from "../components/Dashboard/LineChart";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//API
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../services/authService";

//TODO: get data for year end, get data for charts & table, filter and searching.
//TODO: improve ui for year end (billy)

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    AuthService.login({
      //FIXME: get from the login page once built
      email: "kazim@prisma.io",
      password: "password",
    }).then((res) => {
      console.log(res);
      setTransactions(res.transactions);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-slate-100 h-screen scroll-smooth">
        <div className="bg-white h-14 ml-44 text-black flex justify-between items-center">
          <p className="pl-4 font-semibold">Dashboard</p>
          {/* <p className="ml-auto">Year End:</p>
          <input className="pr-4" type="date" value="2017-06-01" /> */}
          <p className="ml-auto mr-2">Year End:</p>
          <input type="month" min={"2018-03"} defaultValue={"2018-05"} />
        </div>
        <div className="flex">
          <SideBar />
        </div>

        <div className="ml-44 mt-4">
          <div className="grid grid-cols-3 ml-3 mr-3">
            <div className="bg-white h-60 shadow-sm rounded-lg">
              <p className="text-center pb-4 pt-2">Account Balances</p>
              <DonutChart />
            </div>
            <div className="bg-white h-60 ml-6 shadow-sm rounded-lg">
              <p className="text-center pb-4 pt-2">Total Money In & Out</p>
              <BarChart />
            </div>
            <div className="bg-white h-60 ml-6 shadow-sm rounded-lg">
              <p className="text-center pb-4 pt-2">Bank Balance</p>
              <LineChart />
            </div>
          </div>

          <div className="">
            <TransactonsTable transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  );
}

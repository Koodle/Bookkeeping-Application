import SideBar from "../components/Layout/SideBar";
import LedgersTable from "../components/Ledgers/LedgersTable";
import TAccounts from "../components/Ledgers/TAccounts";

//API
import axios from "axios";
import { useEffect, useState } from "react";
import TransactionsService from "../services/transactionsService";

import Link from "next/link";
import { log } from "console";

export default function Ledgers() {
  //TODO: form validation

  const [date1, setDate1] = useState<any>(new Date().toJSON().slice(0, 10));
  const [ref1, setRef1] = useState<any>(1); //TODO: calculate this value
  const [description1, setDescription1] = useState<any>();
  const [account1, setAccount1] = useState<any>("1000");
  const [amount1, setAmount1] = useState<any>();
  const [debit1, setDebit1] = useState<any>(0);
  const [credit1, setCredit1] = useState<any>(0);

  const [date2, setDate2] = useState<any>(new Date().toJSON().slice(0, 10));
  const [ref2, setRef2] = useState<any>(1);
  const [description2, setDescription2] = useState<any>();
  const [account2, setAccount2] = useState<any>("1000");
  const [amount2, setAmount2] = useState<any>();
  const [debit2, setDebit2] = useState<any>(0);
  const [credit2, setCredit2] = useState<any>(0);

  // useEffect(() => {
  //   //TODO: Get last ref so you can append
  //   //TODO: if you have come from
  // }, []);

  function submitJournals() {
    console.log("submit");

    //When you hit submit you read each table row and add to an array of double entry or single entry transactions.

    //TODO: validate data

    // create json object

    let transactions = {
      data: [
        {
          nominalAccountID: account1,
          entryType: debit1 == 1 ? "Debit" : "Credit",
          transactionDate: date1,
          description: description1,
          amount: amount1,
        },
        {
          nominalAccountID: account2,
          entryType: debit2 == 1 ? "Debit" : "Credit",
          transactionDate: date2,
          description: description2,
          amount: amount2,
        },
      ],
    };

    console.log(transactions);

    TransactionsService.create(
      //FIXME: get from the login page once built
      transactions
    ).then((res) => {
      // console.log(res.ledgers);
      //   setLedgers(res.ledgers);
      console.log(res);
    });

    // array.forEach(element => {

    // });
  }

  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      <div className="ml-44 box-border h-screen bg-gray-200 pt-12">
        <div className="bg-white ml-6 mr-6 h-60 ">
          <table className="table-fixed text-center mt-10 w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-sm font-medium text-gray-900 py-2 border-r">
                  Ref
                </th>
                <th className="text-sm font-medium text-gray-900 py-2 border-r">
                  Date
                </th>
                <th className="text-sm font-medium text-gray-900 py-2 border-r">
                  Details
                </th>
                <th className="text-sm font-medium text-gray-900 py-2 border-r px-2">
                  Account
                </th>
                <th className="text-sm font-medium text-gray-900 py-2 border-r px-2 ">
                  Debit
                </th>
                <th className="text-sm font-medium text-gray-900 py-2 border-r px-2 ">
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="border-b">
              <tr className="px-2 py-2 text-gray-900 font-light border-r">
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <p>{ref1}</p>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    onChange={(e) => setDate1(e.target.value)}
                    type="date"
                    id="start"
                    name="trip-start"
                    defaultValue={new Date().toJSON().slice(0, 10)}
                  ></input>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => setDescription1(e.target.value)}
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <select
                    className="block w-full p-1"
                    name="cars"
                    id="cars"
                    onChange={(e) => setAccount1(e.target.value)}
                  >
                    <option value="1000">Bank - 1000</option>
                    <option value="3000">Capital - 3000</option>
                    <option value="4400">Purchases - 4400</option>
                    <option value="5020">Advertising - 5020</option>
                  </select>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit1(1);
                      setCredit1(0);
                      setAmount1(e.target.value);
                    }}
                    disabled={
                      credit1 != 0 && amount1 != "" && debit1 == 0
                        ? true
                        : false
                    }
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit1(0);
                      setCredit1(1);
                      setAmount1(e.target.value);
                    }}
                    disabled={
                      credit1 == 0 && amount1 != "" && debit1 != 0
                        ? true
                        : false
                    }
                  />
                </td>
              </tr>
              <tr className="px-2 py-2 text-gray-900 font-light border-r">
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <p>{ref1}</p>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    onChange={(e) => setDate2(e.target.value)}
                    type="date"
                    id="start"
                    name="trip-start"
                    defaultValue={new Date().toJSON().slice(0, 10)}
                  ></input>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => setDescription2(e.target.value)}
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <select
                    className="block w-full p-1"
                    name="cars"
                    id="cars"
                    onChange={(e) => setAccount2(e.target.value)}
                  >
                    <option value="1000">Bank - 1000</option>
                    <option value="3000">Capital - 3000</option>
                    <option value="4400">Purchases - 4400</option>
                    <option value="5020">Advertising - 5020</option>
                  </select>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit2(1);
                      setCredit2(0);
                      setAmount2(e.target.value);
                    }}
                    disabled={
                      credit2 != 0 && amount2 != "" && debit2 == 0
                        ? true
                        : false
                    }
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit2(0);
                      setCredit2(1);
                      setAmount2(e.target.value);
                    }}
                    disabled={
                      credit2 == 0 && amount2 != "" && debit2 != 0
                        ? true
                        : false
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submitJournals}
          >
            Button
          </button>
        </div>
      </div>

      {/* <div className="ml-44 box-border h-screen bg-gray-200 pl-4">
        <div className="">
          <table className="border-t-4 text-center table-auto ">
            <thead className="border-b">
              <tr>
                <th className="text-sm font-medium text-gray-900 py-2 border-r">
                  Date
                </th>
                <th className="text-sm font-medium text-gray-900 px-2 py-2 border-r">
                  Ref
                </th>
                <th className="text-sm font-medium text-gray-900 px-2 py-2 border-r">
                  Details
                </th>
                <th className="text-sm font-medium text-gray-900 px-2 py-2 border-r">
                  Account
                </th>
                <th className="text-sm font-medium text-gray-900 px-2 py-2">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className=" text-xs px-2 py-2 text-gray-900 font-light border-r ">
                  hi
                </td>
                <td className="text-xs text-gray-900 font-light px-2 py-2 border-r ">
                  hi
                </td>
                <td className="text-xs text-gray-900 font-light px-2 py-2  border-r">
                  hi
                </td>
                <td className="text-xs text-gray-900 font-light px-2 py-2 border-r">
                  TODO-DoubleEntry
                </td>
                <td className="text-xs text-gray-900 font-light px-2 py-2 ">
                  hi
                </td>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                ></input>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}

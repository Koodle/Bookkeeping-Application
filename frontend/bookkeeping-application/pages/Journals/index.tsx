"use client";

import SideBar from "../../components/Layout/SideBar";

//API
import axios from "axios";
import { useEffect, useState } from "react";
import TransactionsService from "../../services/transactionsService";

import Link from "next/link";
import { log } from "console";

//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { editTransactions, getTransactions } from "../../store/slices/transactionsSlice";

export default function Journals() {
  //TODO: form validation

  const transactionsFromState = useAppSelector((state: any) => state.transactions);

  useEffect(() => {

    setRef1(getlatestRef(transactionsFromState)+1)
    setRef2(getlatestRef(transactionsFromState)+2)


  }, [transactionsFromState]);

  function getlatestRef(transactions: any){
    // console.log("ref");
    console.log(transactions.transactions.slice(-1)); 
    if(transactions.transactions.slice(-1).pop() === undefined){
      return -1
    }
    return transactions.transactions.slice(-1).pop().reference
  }

  const [date1, setDate1] = useState<any>(new Date().toJSON().slice(0, 10));
  const [ref1, setRef1] = useState<any>(transactionsFromState != null ? getlatestRef(transactionsFromState)+1 : -20); //TODO: calculate this value
  const [description1, setDescription1] = useState<any>();
  const [account1, setAccount1] = useState<any>("1000");
  const [amount1, setAmount1] = useState<any>();
  const [debit1, setDebit1] = useState<any>(0);
  const [credit1, setCredit1] = useState<any>(0);

  const [date2, setDate2] = useState<any>(new Date().toJSON().slice(0, 10));
  const [ref2, setRef2] = useState<any>(transactionsFromState != null ? getlatestRef(transactionsFromState)+2 : -20);
  const [description2, setDescription2] = useState<any>();
  const [account2, setAccount2] = useState<any>("1000");
  const [amount2, setAmount2] = useState<any>();
  const [debit2, setDebit2] = useState<any>(0);
  const [credit2, setCredit2] = useState<any>(0);

  const dispatch = useAppDispatch();

  function clearInputs(){
    setDate1(new Date().toJSON().slice(0, 10))
    setRef1(ref1+2); 
    setDescription1("");
    setAccount1("1000");
    setAmount1("");
    setDebit1(0);
    setCredit1(0);

    setDate2(new Date().toJSON().slice(0, 10));
    setRef2(ref2+2);
    setDescription2("");
    setAccount2("1000");
    setAmount2("");
    setDebit2(0);
    setCredit2(0);
  }


  function submitJournals() {
    console.log("submit");
    let transactions = {
      data: [
        {
          nominalAccountID: account1,
          entryType: debit1 == 1 ? "Debit" : "Credit",
          transactionDate: date1,
          description: description1,
          amount: amount1,
          reference: ref1
        },
        {
          nominalAccountID: account2,
          entryType: debit2 == 1 ? "Debit" : "Credit",
          transactionDate: date2,
          description: description2,
          amount: amount2,
          reference: ref2
        },
      ],
    };

    console.log(transactions);

    TransactionsService.create(
      transactions
    ).then((res) => {
      console.log(res);
      //update store 
      dispatch(getTransactions())
      console.log("transactionsFromState", transactionsFromState);
    });
  }

  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      <div className="ml-44 box-border h-screen bg-gray-200 pt-12">

        <div>
          <h1 className="ml-6 text-5xl font-bold">Journal Entries</h1>
        </div>

        <div className="bg-white ml-6 mr-6 h-fit ">
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
                    value={date1}
                  ></input>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {setDescription1(e.target.value); setDescription2(e.target.value)}}
                    value={description1}
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <select
                    className="block w-full p-1"
                    name="cars"
                    id="cars"
                    onChange={(e) => setAccount1(e.target.value)}
                    defaultValue={account1}
                  >
                    {/* drop down options */}
                    {Object.values(transactionsFromState.ledgers).map((ledger: any)=>{
                      console.log("ledger");
                      console.log(ledger);
                      
                      return (
                        <option key={ledger.nominalAccount.code} value={ledger.nominalAccount.code}>{ledger.nominalAccount.accountName + " - " + ledger.nominalAccount.code}</option>
                      )
                    })}
                  </select>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit1(1);
                      setDebit2(0);
                      setCredit1(0);
                      setCredit2(1);
                      setAmount1(e.target.value);
                      setAmount2(e.target.value);
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
                      setDebit2(1);
                      setCredit1(1);
                      setCredit2(0);
                      setAmount1(e.target.value);
                      setAmount2(e.target.value);
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
                  <p>{ref2}</p>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    onChange={(e) => setDate2(e.target.value)}
                    type="date"
                    id="start"
                    name="trip-start"
                    defaultValue={new Date().toJSON().slice(0, 10)}
                    value={date2}
                  ></input>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    disabled={true}
                    value={description2}
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <select
                    className="block w-full p-1"
                    name="cars"
                    id="cars"
                    onChange={(e) => setAccount2(e.target.value)}
                    defaultValue={account2}
                  >
                    {/* drop down options */}
                    {Object.values(transactionsFromState.ledgers).map((ledger: any)=>{                      
                      return (
                        <option key={ledger.nominalAccount.code} value={ledger.nominalAccount.code}>{ledger.nominalAccount.accountName + " - " + ledger.nominalAccount.code}</option>
                      )
                    })}
                  </select>                
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit2(1);
                      setDebit1(0);
                      setCredit2(0);
                      setCredit1(1);
                      setAmount2(e.target.value);
                      setAmount1(e.target.value);
                    }}
                    disabled={true}
                    value={ debit2==1 ? amount2 : ""}
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {
                      setDebit1(1);
                      setDebit2(0);
                      setCredit2(1);
                      setCredit1(0);
                    }}
                    disabled={true}
                    value={ credit2==1 ? amount2 : ""}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      <div className="ml-auto w-fit mr-6 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 "
            onClick={submitJournals}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );


  
}

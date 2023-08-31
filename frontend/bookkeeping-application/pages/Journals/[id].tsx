"use client";

//components
import SideBar from "../../components/Layout/SideBar";

//hooks
import { useState } from "react";
import TransactionsService from "../../services/transactionsService";
import { useRouter } from "next/router";

//redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTransactions } from "../../store/slices/transactionsSlice";

function findTransactionsFromID(id: any, transactions: any) {
  let Id = parseInt(id);

  let trans1: any = null;
  let trans2: any = null;

  transactions.forEach((element: any) => {
    if (element.id === Id) {
      console.log("tranaction 1: ", element);
      trans1 = element;
    }
  });

  if (trans1 != null && trans1.doubleEntryID != null) {
    transactions.forEach((element: any) => {
      if (element.id === trans1.doubleEntryID) {
        console.log("tranaction 2: ", element);
        trans2 = element;
      }
    });
  }
  return [trans1, trans2];
}

export default function Ledgers() {
  //dynamic routes
  const router = useRouter();
  const { id } = router.query;

  //transactions Redux store
  const transactionsFromState = useAppSelector(
    (state) => state.transactions.transactions
  );
  const ledgersFromState = useAppSelector(
    (state) => state.transactions.ledgers
  );

  //two trans
  const [trans1, setTrans1] = useState<any>(
    findTransactionsFromID(id, transactionsFromState)[0]
  );
  const [trans2, setTrans2] = useState<any>(
    findTransactionsFromID(id, transactionsFromState)[1]
  );

  //form
  const [date1, setDate1] = useState<any>(
    trans1
      ? new Date(trans1.transactionDate).toJSON().slice(0, 10)
      : new Date().toJSON().slice(0, 10)
  );
  
  const [ref1, setRef1] = useState<any>(
    trans1 ? trans1.reference : 1 //TODO: calculate this value
  );
  const [description1, setDescription1] = useState<any>(
    trans1 ? trans1.description : ""
  );
  const [account1, setAccount1] = useState<any>(
    trans1 ? trans1.nominalAccountID.toString() : "1000"
  );
  const [amount1, setAmount1] = useState<any>(
    trans1 ? trans1.amount : ""
  );
  const [debit1, setDebit1] = useState<any>(
    trans1 ? trans1.entryType === "Debit" ? 1 : 0 : 0
  );
  const [credit1, setCredit1] = useState<any>(
    trans1 ? trans1.entryType === "Credit" ? 1 : 0 : 0
  );

  const [date2, setDate2] = useState<any>(
    trans2
      ? new Date(trans2.transactionDate).toJSON().slice(0, 10)
      : new Date().toJSON().slice(0, 10)
  );
  const [ref2, setRef2] = useState<any>(
    trans2 ? trans2.reference : 1 //TODO: calculate this value
  );
  const [description2, setDescription2] = useState<any>(
    trans2 ? trans2.description : ""
  );
  const [account2, setAccount2] = useState<any>(
    trans2 ? trans2.nominalAccountID.toString() : "1000"
  );
  const [amount2, setAmount2] = useState<any>(
    trans2 ? trans2.amount : ""
  );
  const [debit2, setDebit2] = useState<any>(
    trans2 ? trans2.entryType === "Debit" ? 1 : 0 : 0
  );
  const [credit2, setCredit2] = useState<any>(
    trans2 ? trans2.entryType === "Credit" ? 1 : 0 : 0
  );

  const dispatch = useAppDispatch();

  function submitJournals(id : any) {
    console.log("submit");

    // create json object
    let transactions = {
      transactions: [
        {
          id: trans1.id,
          nominalAccountID: parseInt(account1),
          entryType: debit1 == 1 ? "Debit" : "Credit",
          transactionDate: new Date(date1),
          description: description1,
          amount: parseFloat(amount1),
        },
        {
          id: trans2.id,
          nominalAccountID: parseInt(account2),
          entryType: debit2 == 1 ? "Debit" : "Credit",
          transactionDate: new Date(date2),
          description: description2,
          amount: parseFloat(amount2),
        },
      ],
    };

    console.log(transactions);

    //make api request
    TransactionsService.edit(
      transactions
    ).then((res) => {
      //update store
      dispatch(getTransactions()).then( () => {

        //navigate to transaction
        router.push("/Ledgers#"+""+id)

      })
    });
  }

  function deleteJournals(id: any) {
    console.log("delete");
    

    // create json object
    let transactions = {
      transactions: [
        {
          id: trans1.id,
        },
        {
          id: trans2.id,
        },
      ],
    };

    console.log(transactions);

    TransactionsService.delete(
      transactions
    ).then((res) => {
      //update store
      dispatch(getTransactions())

      //navigate to ledger
      router.push("/Ledgers#"+""+parseInt(account1))
    });

  }

  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      <div className="ml-44 box-border h-screen bg-gray-200 pt-12">

        <div>
          <h1 className="ml-6 text-5xl font-bold">Edit Journals</h1>
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
                    defaultValue={date1}
                  ></input>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    onChange={(e) => {setDescription1(e.target.value); setDescription2(e.target.value);}}
                    defaultValue={description1}
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
                    {Object.values(ledgersFromState).map((ledger: any)=>{
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
                    defaultValue={debit1 === 1 ? amount1 : ""}
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
                    defaultValue={credit1 === 1 ? amount1 : ""}
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
                    defaultValue={date2}
                  ></input>
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <input
                    className="block w-full p-1"
                    type="text"
                    value={description2}
                    disabled={true}
                  />
                </td>
                <td className="px-2 py-2 text-gray-900 font-light border-r border-b">
                  <select
                    className="block w-full p-1"
                    name="cars"
                    id="cars"
                    onChange={(e) => {setAccount2(e.target.value)}}
                    defaultValue={(account2)}
                  >
                    {/* drop down options */}
                    {Object.values(ledgersFromState).map((ledger: any)=>{
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
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-20 mr-9"
            onClick={() => deleteJournals(id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20"
            onClick={() => submitJournals(id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

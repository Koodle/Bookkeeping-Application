import SideBar from "../../components/Layout/SideBar";
import LedgersTable from "../../components/Ledgers/LedgersTable";
import TAccounts from "../../components/Ledgers/TAccounts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

//API
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../../services/authService";

//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTransactions } from "../../store/slices/transactionsSlice";

import Link from "next/link";
import { log } from "console";

export default function Ledgers() {
  const ledgersFromState = useAppSelector(
    (state) => state.transactions.ledgers
  );

  const transactionsFromState = useAppSelector(
    (state) => state.transactions.transactions
  );


  const [ledgers, setLedgers] = useState<any[]>(ledgersFromState);
  const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);

  const [searchBarText, setSearchBarText] = useState<any>("");

  useEffect(() => {
    // AuthService.login({
    //   //FIXME: get from the login page once built
    //   email: "kazim@prisma.io",
    //   password: "password",
    // }).then((res) => {
    //   // console.log(res.ledgers);
    //   setLedgers(res.ledgers);
    // });
  }, []);

  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      <div className="ml-44 box-border h-screen bg-gray-200 pl-4">
        <div className="mr-12 flex h-full space-x-4">

          <div className="my-8 w-1/4 overflow-y-scroll overflow-x-hidden bg-teal-50">

            {/* searchbar */}
            <div className="flex justify-center bg-white">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon1" 
                    onChange={(e)=> setSearchBarText(e.target.value)}
                    />                 
                </div>
            </div>
            
            {/*Account Names List*/}
            {Object.values(ledgers).length > 0 ? (
              Object.values(ledgers).filter((ledger)=>{
                return searchBarText.toLowerCase() === "" ? ledger : ledger.nominalAccount.accountName.toLowerCase().includes(searchBarText)
              }).map((ledger) => {
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
                let balance = (debitBalance - creditBalance).toFixed(2);

                return (
                  <Link
                    href={"#" + ledger.nominalAccount.code.toString()}
                    onClick={() => {
                      setSelectedAccounts((selectedAccounts) => [
                        ...selectedAccounts,
                        ledger.nominalAccount.code,
                      ]);
                    }}
                    key={ledger.id}
                  >
                    <div
                      className="flex p-2 border"
                      key={ledger.nominalAccount.code}
                    >
                      {/* FIXME: add sub headers for "each: group name" */}
                      {/* <div className=""></div> */}
                      <div className="flex">
                        {ledger.nominalAccount.accountName}
                      </div>
                      <div className="ml-auto pr-2">
                        {balance > 0
                          ? String(balance) + " D"
                          : String((balance *= -1)) + " C"}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div></div>
            )}
          </div>

          {/* TAccounts */}
          {/* TODO:balance B/D needs to be implemented */}
          <div className="my-4 w-full overflow-y-scroll bg-white">
            {Object.values(ledgers).length > 0 ? (
              Object.values(ledgers).map((ledger) => {
                //TODO: change visibility of ledgers based on Filter

                return (
                  <div
                    key={ledger.nominalAccount.code}
                    className="mb-10 p-2"
                    id={ledger.nominalAccount.code}
                  >
                    <div className="flex bg-teal-50">
                      <p className="text-left pt-2 pb-2 pl-2 w-1/3">Dr</p>
                      <h1 className=" text-center text-xl font-semibold leading-norma pt-2 pb-2 w-2/3">
                        {ledger.nominalAccount.accountName +
                          " - " +
                          ledger.nominalAccount.code}
                      </h1>
                      <p className="text-right pt-2 pb-2 pr-2 w-1/3">Cr</p>
                    </div>
                    <div className=" bg-white flex">
                      <div className="flex flex-col w-1/2 overflow-hidden border-r-2 border-black">
                        {/* <div className="text-center bg-teal-50">Dr</div> */}
                        <table className="border-t-4 text-center table-auto ">
                          <thead className="border-b">
                            <tr>
                              <th className="text-sm font-medium text-gray-900 py-2 border-r border-l">
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
                              <th className="text-sm font-medium text-gray-900 px-2 py-2 border-r">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ledger.Debit.map((transaction: any) => {
                              let getDate = (strDate: string) => {
                                let date = new Date(Date.parse(strDate));
                                return (
                                  date.getDate().toString() +
                                  "/" +
                                  (date.getMonth()+1).toString() +
                                  "/" +
                                  date.getFullYear().toString()
                                );
                              };

                              //find double entrys                            
                              let double_entry_info = -1
                              Object.values(transactionsFromState).forEach((transactionState: any) => {
                                // console.log(transactionState.reference);
                                if (transactionState.reference == transaction.doubleEntryID){
                                  double_entry_info = transactionState.reference
                                }
                              })
                              
                              
                              return (
                                <tr className="border-b" key={transaction.id} id={transaction.id}>
                                  <td className=" text-xs px-2 py-2 text-gray-900 font-light border-r border-l">
                                    {getDate(transaction.transactionDate)}
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2  border-r ">
                                    {transaction.id}
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2  border-r">
                                    {transaction.description}
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2 border-r">
                                    {/* TODO-DoubleEntry */}
                                    <Link href={"/Ledgers#" + transaction.doubleEntryID}>
                                    <td className="px-2 pt-2">
                                      {double_entry_info}
                                    </td>
                                  </Link>
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2 border-r">
                                    {transaction.amount}
                                  </td>
                                  <Link href={"/Journals/" + transaction.id}>
                                    <td className="px-2 pt-2">
                                      <FontAwesomeIcon
                                        icon={faPencil}
                                        className="w-3"
                                      />
                                    </td>
                                  </Link>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col w-1/2 overflow-hidden border-l-2 border-black">
                        {/* <div className="text-center bg-teal-50">Cr</div> */}
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
                              <th className="text-sm font-medium text-gray-900 px-2 py-2 border-r">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ledger.Credit.map((transaction: any) => {
                              let getDate = (strDate: string) => {
                                let date = new Date(Date.parse(strDate));
                                return (
                                  date.getDate().toString() +
                                  "/" +
                                  (date.getMonth()+1).toString() +
                                  "/" +
                                  date.getFullYear().toString()
                                );
                              };

                              //find double entrys                            
                              let double_entry_info = -1
                              Object.values(transactionsFromState).forEach((transactionState: any) => {
                                // console.log(transactionState.reference);
                                if (transactionState.reference == transaction.doubleEntryID){
                                  double_entry_info = transactionState.reference
                                }
                              })

                              return (
                                <tr className="border-b" key={transaction.id} id={transaction.id}>
                                  <td className=" text-xs px-2 py-2 text-gray-900 font-light border-r ">
                                    {getDate(transaction.transactionDate)}
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2  border-r ">
                                    {transaction.id}
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2  border-r">
                                    {transaction.description}
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2 border-r">
                                    {/* TODO-DoubleEntry */}
                                    <Link href={"/Ledgers#" + transaction.doubleEntryID}>
                                      {double_entry_info}
                                    </Link>
                                  </td>
                                  <td className="text-xs text-gray-900 font-light px-2 py-2 border-r ">
                                    {transaction.amount}
                                  </td>
                                  <Link href={"/Journals/" + transaction.id}>
                                    <td className="px-2 pt-2">
                                      <FontAwesomeIcon
                                        icon={faPencil}
                                        className="w-3"
                                      />
                                    </td>
                                  </Link>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

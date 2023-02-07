import SideBar from "../components/Layout/SideBar";
import LedgersTable from "../components/Ledgers/LedgersTable";
import TAccounts from "../components/Ledgers/TAccounts";

//API
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../services/authService";

import Link from "next/link";
import { log } from "console";

export default function Ledgers() {
  const [ledgers, setLedgers] = useState<any[]>([]);

  useEffect(() => {
    AuthService.login({
      //FIXME: get from the login page once built
      email: "kazim@prisma.io",
      password: "password",
    }).then((res) => {
      // console.log(res.ledgers);
      setLedgers(res.ledgers);
    });
  }, []);

  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      {/* <div className="ml-44 mt-4">
        <div className="grid grid-cols-3 ml-3 mr-3">
          <div className="bg-white h-60 shadow-sm rounded-lg">
            <p className="text-center pb-4 pt-2 font-semibold">asdf</p>
          </div>
        </div>
      </div> */}

      {/* <div className="ml-44">
        <LedgersTable></LedgersTable>
      </div> */}

      {/* <div className="flex flex-row ml-44">
        <div className=""><LedgersTable></LedgersTable></div>

        <div className="flex-grow bg-slate-200">
          <TAccounts></TAccounts>
        </div>
      </div> */}
      {/* 
      <div className="flex flex-row ml-44">
        <div className="basis-4/12 bg-slate-400">sidebar</div>

        <div className="basis-11/12 bg-red-200">T accounts scrollable</div>
      </div> */}

      <div className="ml-44 box-border h-screen bg-gray-200 pl-4">
        <div className="sticky mr-12 flex h-full space-x-4">
          {/* <div className="h-screen w-1/4 bg-green-200">
            <div className="mt-2 pt-2 pb-2 text-center">
              <Link href="/">Dashboard</Link>
            </div>
            <div className="pt-2 pb-2 text-center">
              <Link href="/Journals">Journals</Link>
            </div>
            <div className="pt-2 pb-2 text-center">
              <Link href="/Ledgers/Ledgers">Ledgers</Link>
            </div>
            <div className="pt-2 pb-2 text-center">
              <Link href="/Reporting">Reporting</Link>
            </div>
            <div className="pt-2 pb-2 text-center">
              <Link href="/">Trial Balance</Link>
            </div>
            <div className="pt-2 pb-2 text-center">
              <Link href="/">User</Link>
            </div>
            <div className="pt-2 pb-2 text-center">
              <Link href="/">Organization</Link>
            </div>
          </div> */}

          {/*Account Names List*/}
          <div className="my-8 w-1/4 overflow-y-scroll bg-red-200">
            {Object.values(ledgers).length > 0 ? (
              Object.values(ledgers).map((ledger) => {
                //calculate Balances:
                let debitBalance = 0;
                let creditBalance = 0;

                if (ledger.Debit.length > 0) {
                  ledger.Debit.forEach((transaction: any) => {
                    debitBalance += parseInt(transaction.amount);
                  });
                }

                if (ledger.Credit.length > 0) {
                  ledger.Credit.forEach((transaction: any) => {
                    creditBalance += parseInt(transaction.amount);
                  });
                }
                let balance = debitBalance - creditBalance;

                return (
                  <div className="flex p-2 border">
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
                );
              })
            ) : (
              <div></div>
            )}
          </div>

          {/* TAccounts */}
          <div className="my-4 w-full space-y-44 overflow-y-scroll bg-teal-200">
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
          </div>
        </div>
      </div>
    </div>
  );
}

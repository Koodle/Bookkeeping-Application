//API
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../../services/authService";

//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTransactions } from "../../store/slices/transactionsSlice";

import Link from "next/link";


export default function Ledgers() {
  const userFromState = useAppSelector(
    (state) => state.authentication.user
  );
  const businessFromState = useAppSelector(
    (state) => state.authentication.business
  );

  // const [ledgers, setLedgers] = useState<any[]>(ledgersFromState);
  // const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);

    


  return (
    <div>

      <div className=" box-border h-screen bg-gray-200 pt-12">
{/* 
        <div className="ml-6 mr-6">
          <h1 className="text-4xl font-bold text-center">Login</h1>
        </div> */}

        <div className="ml-6 mr-6 h-fit">
            <div className="flex flex-col items-center justify-center ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="kazim@prizma.com" required={true}></input>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true}></input>
                            </div>
                            <button type="submit" className="w-full text-gray-900">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>   
        </div>


      </div>      
    </div>
  );
}

import SideBar from "../../components/Layout/SideBar";

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
  const userFromState = useAppSelector(
    (state) => state.authentication.user
  );
  const businessFromState = useAppSelector(
    (state) => state.authentication.business
  );

  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>



      <div className="ml-44 box-border h-screen bg-gray-200 pt-12">

        <div>
          <h1 className="ml-6 text-5xl font-bold">User</h1>
        </div>

        <div className="bg-white ml-6 mr-6 h-fit ">
            <div className="mt-10">
                <div className="mb-4">
                    <label className="font-bold text-gray-700">
                    Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>

                <div className="mb-4">
                    <label className=" text-gray-700 text-sm font-bold mb-2" for="username">
                    First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>
            </div>
        </div>

        <div className="bg-white ml-6 mr-6 h-fit ">
            <div className="mt-10 w-full">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>
            </div>
        </div>

      </div>      
    </div>
  );
}

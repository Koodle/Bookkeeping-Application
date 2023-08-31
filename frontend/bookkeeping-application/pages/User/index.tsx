//Components
import SideBar from "../../components/Layout/SideBar";

//redux
import { useAppSelector } from "../../store/hooks";

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
          <h1 className="ml-6 text-5xl font-bold mb-10">User</h1>
        </div>

        <div className="bg-white ml-6 mr-6 h-3/4 w-1/4 rounded-md px-2 py-2 float-left inline-block">
            <div className="">
                <div className="mb-4">
                    <label className="font-bold text-gray-700">
                    Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={userFromState.email}></input>
                </div>

                <div className="mb-4">
                    <label className=" text-gray-700 text-sm font-bold mb-2">
                    First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={userFromState.fname}></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={userFromState.lname}></input>
                </div>
            </div>
        </div>

        <div className="bg-white ml-6 mr-6 h-3/4 w-1/4 rounded-md px-2 py-2 inline-block">
            <div className="">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={businessFromState.companyName}></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={businessFromState.address}></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Telephone
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={businessFromState.telephone}></input>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Currency
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={businessFromState.currency}></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Financial Year end
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={businessFromState.financialYearEnd}></input>
                </div>
            </div>
        </div>

      </div>      
    </div>
  );
}

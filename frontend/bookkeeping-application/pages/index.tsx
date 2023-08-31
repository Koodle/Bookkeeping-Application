//Hooks
import { useRouter } from "next/router";
import { useState } from "react";

//redux
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/authSlice";

export default function Ledgers() {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState<any>("kazim@prizma.com");
  const [password, setPassword] = useState<any>("password");

  async function signIn(){    
    dispatch(login()).then(()=>{
      router.push("/Dashboard")
    })
  }

  return (
    <div>
      <div className=" box-border h-screen bg-gray-200 pt-12">
        <div className="ml-6 mr-6 h-fit">
            <div className="flex flex-col items-center justify-center ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" id="email" defaultValue="kazim@prizma.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} onChange={(e)=>setEmail(e.target.value)}></input>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" defaultValue="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} onChange={(e)=>setPassword(e.target.value)}></input>
                            </div>
                            <button type="submit" className="w-full text-gray-900" onClick={() => signIn()}>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>   
        </div>


      </div>      
    </div>
  );
}

//import { BsPlus } from "react-icons";
import { FaFire } from "react-icons/fa";
import Link from "next/link";

//TODO: change user & organization to have icons and position them at bottom
//TODO: add selected background colour change
//TODO: change layout to add dropdowns for categories if needed
//FIXME: fix links

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-44 flex flex-col text-white shadow-lg bg-cyan-600">
      {/* <div className="pt-4 pb-4 text-center bg-black">Bookkeeper</div> */}
      <div className="mt-2 pt-2 pb-2 text-center">
        <Link href="/Dashboard">Dashboard</Link>
      </div>
      <div className="pt-2 pb-2 text-center">
        <Link href="/Journals">Journals</Link>
      </div>
      <div className="pt-2 pb-2 text-center">
        <Link href="/Ledgers">Ledgers</Link>
      </div>

      <div className="pt-2 pb-2 text-center">
        <Link href="/Reporting">Reporting</Link>
      </div>

      <div className="pt-2 pb-2 text-center">
        <Link href="/User">User</Link>
      </div>
      {/* <div className="pt-2 pb-2 text-center">
        <Link href="/">Organization</Link>
      </div> */}

      
    </div>
  );
}

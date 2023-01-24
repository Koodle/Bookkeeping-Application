//import { BsPlus } from "react-icons";
import { FaFire } from "react-icons/fa";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-44 flex flex-col text-white shadow-lg bg-cyan-600">
      {/* <div className="pt-4 pb-4 text-center bg-black">Bookkeeper</div> */}
      <div className="mt-2 pt-2 pb-2 text-center">
        <Link href="/">Dashboard</Link>
      </div>
      <div className="pt-2 pb-2 text-center">Business</div>
      <div className="pt-2 pb-2 text-center">Journals</div>
      <div className="pt-2 pb-2 text-center">
        <Link href="/Ledgers/Ledgers">Ledgers</Link>
      </div>
      {/* <SideBarIcon icon={<FaFire size="28" />} /> */}
    </div>
  );
}

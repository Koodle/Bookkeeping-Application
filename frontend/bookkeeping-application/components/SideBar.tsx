//import { BsPlus } from "react-icons";
import { FaFire } from "react-icons/fa";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-44 flex flex-col text-white shadow-lg bg-gray-600">
      <div className="pt-4 pb-4 text-center bg-black">Bookkeeper</div>
      <div className="pt-1 pb-1 text-center text-red-400">Dashboard</div>
      <div className="pt-1 pb-1 text-center">Business</div>
      <div className="pt-1 pb-1 text-center">Journals</div>
      {/* <SideBarIcon icon={<FaFire size="28" />} /> */}
    </div>
  );
}

// const SideBarIcon = ({ icon }) => {
//   return <div className="sidebar-icon">{icon}</div>;
// };

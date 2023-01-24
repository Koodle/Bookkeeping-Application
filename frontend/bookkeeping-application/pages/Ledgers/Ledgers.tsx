import SideBar from "../../components/Layout/SideBar";
import LedgersTable from "../../components/Ledgers/LedgersTable";

export default function Ledgers() {
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

      <div className="ml-44">
        <LedgersTable></LedgersTable>
      </div>
    </div>
  );
}

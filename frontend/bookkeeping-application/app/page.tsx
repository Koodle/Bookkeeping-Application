//components
import SideBar from "../components/Layout/SideBar";
import PieChart from "../components/Dashboard/DonutChart";

export default function HomePage() {
  return (
    <div>
      <div className="bg-primary h-14 ml-44"></div>
      <div className="flex">
        <SideBar />
      </div>
      <div className="bg-slate-400 ml-44 h-screen">
        <div className="grid grid-cols-3">
          <PieChart />
          <div>hi</div>
          <div>hi</div>
        </div>
      </div>
    </div>
  );
}

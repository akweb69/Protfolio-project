import { Outlet } from "react-router-dom";
import DashboardAsideBar from "./DashboardAsideBar";

const Dashboard = () => {
    return (
        <div className="w-full min-h-screen max-h-screen overflow-y-scroll py-4 md:grid md:grid-cols-6 gap-4">
            {/* aside bar */}
            <div className="col-span-1">
                <DashboardAsideBar></DashboardAsideBar>
            </div>
            <div className="col-span-5 p-6 rounded-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] shadow-lg">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
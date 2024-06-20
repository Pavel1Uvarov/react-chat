import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-slate-100 flex items-center justify-center py-10 flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;

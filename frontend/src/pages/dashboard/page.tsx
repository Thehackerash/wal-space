import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
const page = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3 bg-blue-200 rounded-br-3xl  h-[100vh]">
          <Sidebar />
        </div>

        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default page;

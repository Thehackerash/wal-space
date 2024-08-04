import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sidebar = () => {
  const navigate = useNavigate();
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };
  return (
    <>
      <div className="flex justify-center p-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7nFdX1g_CVR4WyP5LgKOGytP0J8PE53_RQ&s"
          alt="user"
          className="rounded-full border-2 border-zinc-700 w-40 h-40"
        />
      </div>
      <div
        className={`px-5 py-2 flex justify-center hover:bg-blue-300  mx-2 rounded-lg mb-2 cursor-pointer ${
          isActive("/dashboard/profile") ? "bg-blue-300" : ""
        }`}
        onClick={() => {
          navigate("/dashboard/profile");
        }}
      >
        <CgProfile className=" mr-2 w-6 h-6" /> Profile
      </div>
      <div
         className={`px-5 py-2 flex justify-center hover:bg-blue-300  mx-2 rounded-lg mb-2 cursor-pointer ${
          isActive("/dashboard/transport") ? "bg-blue-300" : ""
        }`}
        onClick={() => {
          navigate("/dashboard/transport");
        }}
      >
        <FaTruck className=" mr-2 w-6 h-6" /> Transport
      </div>
      <div
        className={`px-5 py-2 flex justify-center hover:bg-blue-300 rounded-lg mb-2 mx-2 cursor-pointer ${
          isActive("/dashboard/booking") ? "bg-blue-300" : ""
        }`}
        onClick={() => {
          navigate("/dashboard/booking");
        }}
      >
        <CiMoneyCheck1 className=" mr-2 w-6 h-6" /> Booking
      </div>
      <div
        className="px-5 py-2 flex justify-center hover:bg-blue-300 cursor-pointer"
        onClick={() => {
          navigate("/logout");
        }}
      >
        <BiLogOut className=" mr-2 w-6 h-6" /> Logout
      </div>
    </>
  );
};

export default sidebar;


import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const page = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <div
            className="p-5 flex justify-center hover:text-zinc-500 cursor-pointer"
            onClick={() => {
              navigate("/logout");
            }}
          >
            <BiLogOut className=" mr-2 w-7 h-7" /> Logout
          </div>
        </div>

        <div className="col-span-9">WELCOME TO THE DASHBOARD</div>
      </div>
    </>
  );
};

export default page;

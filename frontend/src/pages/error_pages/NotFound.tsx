import { Avatar, Button, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RxCaretSort } from "react-icons/rx";
import Cookies from "js-cookie";
function NotFound() {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <Link to="/logout">Logout</Link>,
    },
  ];
  const token = Cookies.get("accessToken");
  const username = Cookies.get("username");
  return (
    <>
      {/* Navbar */}
      <div className="dark:bg-black min-h-[100vh]">
        <div className="w-full flex justify-between bg-white border-slate-200 dark:bg-black dark:text-zinc-300">
          <div className="flex p-3 items-center"></div>
          <div className="flex p-3 items-center">
            <Button
              className="font-medium"
              onClick={() => {
                window.open("https://amareshh.vercel.app/contact", "_blank");
              }}
            >
              Feedback
            </Button>
            {token ? (
              <>
                <Link to="/account">
                  <div className="mr-4 py-0.5 ml-2 hover:cursor-pointer hover:opacity-70">
                    Account
                  </div>
                </Link>
                <div className="mr-4 py-0.5 hover:cursor-pointer">
                  {" "}
                  <Dropdown menu={{ items: items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Avatar
                        src={`https://avatar.iran.liara.run/public/boy?username=${username}`}
                        size="default"
                        className="dark:text-black dark:bg-white"
                      />
                    </a>
                  </Dropdown>
                </div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <RxCaretSort className="hover:cursor-pointer" />
                  </a>
                </Dropdown>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* body */}
        <div className="flex justify-center items-center h-[80vh] p-4">
          <div className="max-w-[30rem] mx-auto">
            <div className="text-4xl md:text-5xl xl:text-6xl font-bold">
              Page Not Found
            </div>
            <div className="mt-4 text-[#4F4D55] dark:text-zinc-400">
              The page you're looking for doesn't exist anymore or has been
              moved or archived
            </div>
            <div className="mt-6">
              <button
                className="rounded-md w-full text-center  bg-blue-700 text-white p-2 hover:bg-blue-800"
                onClick={() => {
                  navigate("/my-chatbots");
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className="fixed text-xs md:text-base bottom-0 left-0 right-0 dark:bg-black flex justify-center items-center dark:text-zinc-300 text-zinc-600 py-4">
          <div className="mx-5 hover:cursor-pointer text-nowrap">&copy; 2024 AmaVerse</div>
          <div className="mx-5 hover:cursor-pointer">Cookie policy</div>
          <div className="mx-5 hover:cursor-pointer">Privacy Policy</div>
          <div className="mx-5 hover:cursor-pointer">Terms & Conditions</div>
        </footer>
      </div>
    </>
  );
}

export default NotFound;

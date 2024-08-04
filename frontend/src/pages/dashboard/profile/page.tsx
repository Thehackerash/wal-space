import Cookies from "js-cookie";
const page = () => {
  const username = Cookies.get("username");
  return (
    <div className="p-5">
      <div className="text-3xl font-semibold">Welcome {username}</div>
    </div>
  );
};

export default page;

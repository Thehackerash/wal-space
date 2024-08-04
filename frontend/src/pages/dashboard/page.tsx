import { Button } from "antd";

const page = () => {
  return (
    <>
      <div>Dashboard</div>
      <Button type="dashed" href="/logout">
        {" "}
        Logout
      </Button>
    </>
  );
};

export default page;

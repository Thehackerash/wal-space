import { Steps } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const page = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (window.location.pathname === "/dashboard/booking") {
      navigate("/dashboard/booking/1");
    }
    if (window.location.pathname === "/dashboard/booking/1") {
      setCurrent(0);
    } else if (window.location.pathname === "/dashboard/booking/2") {
      setCurrent(1);
    } else if (window.location.pathname === "/dashboard/booking/3") {
      setCurrent(2);
    }
  }, [navigate]);
  return (
    <div className="p-5">
      <div className="text-center text-lg mb-4 font-bold">Assignment </div>
      <div className="mb-6 px-5">
        <Steps
          size="small"
          current={current}
          items={[
            {
              title: "Assign Truck and Driver",
              onClick: () => {
                navigate("/dashboard/booking/1");
              },
              className: "hover:cursor-pointer",
            },
            {
              title: "Generate Estimate Time",
              onClick: () => {
                navigate("/dashboard/booking/2");
              },
              className: "hover:cursor-pointer",
            },
            {
              title: "Get QR Code",
              onClick: () => {
                navigate("/dashboard/booking/3");
              },
              className: "hover:cursor-pointer",
            },
          ]}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default page;

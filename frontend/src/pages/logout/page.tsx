import { Spin } from "antd";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const page = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  }, []);
  return <Spin fullscreen size="large" spinning></Spin>;
};

export default page;

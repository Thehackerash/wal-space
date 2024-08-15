import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import {message, Form, Input, Button } from "antd";
const Page: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSignin = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login/`,
        {
          username: values.username,
          password: values.password,
        }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;
        Cookies.set("accessToken", access, { expires: 1 });
        Cookies.set("refreshToken", refresh, { expires: 7 });
        Cookies.set("username", values.username, { expires: 7 });
        setLoading(false);
        message.success("Signin successfull");
        navigate("/dashboard/profile");
      } else {
        setLoading(false);
        message.error("Wrong credentials");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response.status >= 400 && error.response.status < 500) {
        message.error("Invalid credentials");
      } else {
        console.error("Error during login:", error);
        message.error("Error during login");
      }
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, []);
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="hidden md:block col-span-5 h-full">
        <img
          src="/images/side.jpg"
          alt="Sidebar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-span-12 md:col-span-7">
        <div className="lg:pt-[10%] lg:px-[30%] 2xl:pt-[9%] min-h-[100%]">
          <div className="text-center font-bold text-2xl">Welcome</div>
          <div className="text-center text-[#717179] mb-14 dark:text-zinc-300">
           Please login to your account.
          </div>
          <div className="flex justify-center w-full">
          </div>
         

          <Form form={form} onFinish={handleSignin} layout="vertical">
            <div className="font-semibold mb-1 text-base">Email</div>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email here"
                className="p-1.5 text-base"
              />
            </Form.Item>
            <div className="font-semibold mb-1 text-base">Password</div>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="p-1.5 text-base"
              />
            </Form.Item>
            <Form.Item>
              <div className="text-center">
                <Button
                  htmlType="submit"
                  type="default"
                  size="large"
                  className="hover:opacity-80"
                  loading={loading}
                  style={{
                    background: "rgb(59 130 246)",
                    width: "100%",
                    color: "white",
                  }}
                >
                  Log In
                </Button>
              </div>
            </Form.Item>
          </Form>
          <div className="text-center mt-4 underline underline-offset-2 hover:cursor-pointer">
            <Link to="/signup">I don't have an account</Link>
          </div>
          <div className="text-center mt-4 underline underline-offset-2 hover:cursor-pointer">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

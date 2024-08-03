import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Login from "./pages/login/page";
import Signup from "./pages/signup/page";
import { ConfigProvider, message, theme } from "antd";
import NotFound from "./pages/error_pages/NotFound";
function App() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const mode = localStorage.getItem("mode") || "light";
  useEffect(() => {
    if (accessToken) {
      const fetchStatus = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/kipps/user-profile`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 401) {
            navigate("/login");
          } else {
            const { onboarding_status } = response.data;
            if (!onboarding_status) {
              navigate("/onboarding");
            }
          }
        } catch (e: any) {
          console.log(e);
          if (e.response.status === 401) {
            message.error("Session Expired! Kindly login again.");
            navigate("/login");
          }
        }
      };
      fetchStatus();
    }
    if (!accessToken) {
      if (
        window.location.pathname.startsWith("/iframe") ||
        window.location.pathname === "/" ||
        window.location.pathname === "/404" ||
        window.location.pathname === "/logout"
      ) {
        return;
      } else if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      )
        navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <div className={`${mode} h-[100%]`}>
      <ConfigProvider
        theme={{
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Dropdown: {
              colorBgElevated: `${mode === "dark" ? "#1E1E1E" : "#ffffff"}`,
              colorText: `${mode === "dark" ? "white" : "rgba(0, 0, 0, 0.88)"}`,
              controlItemBgActive: `${
                mode === "dark" ? "#E3E3E3" : "rgba(18, 18, 18, 0.1)"
              }`,
              controlItemBgActiveHover: `${
                mode === "dark"
                  ? "rgba(227,227,227,1)"
                  : "rgba(18, 18, 18, 0.1)"
              }`,
              colorPrimary: `${mode === "dark" ? "#000000" : "#000000"}`,
              controlItemBgHover: `${
                mode === "dark" ? "#080808" : "rgba(0, 0, 0, 0.04)"
              }`,
            },
          },
        }}
      >
        <Routes>
          <Route
            path="*"
            element={
              <div className={`${mode}`}>
                <div className="dark:bg-black dark:text-white">
                  <NotFound />
                </div>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className={`${mode}`}>
                <div className="dark:bg-black dark:text-white">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className={`${mode}`}>
                <div className="dark:bg-black dark:text-white">
                  <Signup />
                </div>
              </div>
            }
          />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;

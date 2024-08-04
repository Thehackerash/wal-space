import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

const page = () => {
  const username = Cookies.get("username");
  const [ email, setEmail ] = useState("");
  const [ Firstname, setFirstname ] = useState("");
  const [ Lastname, setLastname ] = useState("");

  useEffect(() => {
    // Fetch user data from an API
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get("http://localhost:8000/api/manager", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setEmail(response.data.email);
        setFirstname(response.data.first_name);
        setLastname(response.data.last_name);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome, {username}</h1>
      </div>
      <div className="mb-4">
        <div className="text-lg font-medium text-gray-600">Email</div>
        <div className="text-xl font-semibold text-gray-800">{email}</div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-medium text-gray-600">Full Name</div>
        <div className="text-xl font-semibold text-gray-800">{Firstname} {Lastname}</div>
      </div>
      <div className="mt-6 text-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none">Edit Profile</button>
      </div>
    </div>
  </div>
  );
};

export default page;

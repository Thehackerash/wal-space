import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Page = () => {
  const token = Cookies.get("accessToken");

  const [driverName, setDriverName] = useState("");
  const [truckLicense, setTruckLicense] = useState("");

  const handleAddDriver = (e) => {
    e.preventDefault();
    // Add driver logic here
    console.log("Adding driver:", driverName);
  };

  const handleAddTruck = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/truck", {
      license: truckLicense,
    }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Adding truck:", truckLicense);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-5">
        <div className="col-span-12 text-3xl font-semibold mb-4">Transport Management</div>

        <div className="col-span-12 md:col-span-6 p-4 bg-white shadow rounded-lg">
          <div className="text-2xl font-semibold mb-4">Add New Driver</div>
          <form onSubmit={handleAddDriver}>
            <div className="mb-4">
              <label htmlFor="driverName" className="block text-lg font-medium text-gray-700">
                Driver Name
              </label>
              <input
                type="text"
                id="driverName"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
            >
              Add Driver
            </button>
          </form>
        </div>

        <div className="col-span-12 md:col-span-6 p-4 bg-white shadow rounded-lg">
          <div className="text-2xl font-semibold mb-4">Add New Truck</div>
          <form onSubmit={handleAddTruck}>
            <div className="mb-4">
              <label htmlFor="truckLicense" className="block text-lg font-medium text-gray-700">
                Truck License
              </label>
              <input
                type="text"
                id="truckLicense"
                value={truckLicense}
                onChange={(e) => setTruckLicense(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
            >
              Add Truck
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;

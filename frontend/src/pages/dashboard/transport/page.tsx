import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Page = () => {
  const token = Cookies.get("accessToken");

  const [driverName, setDriverName] = useState("");
  const [contact, setContact] = useState("");
  const [licenseId, setlicenseId] = useState("");
  const [truckLicense, setTruckLicense] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const handleAddDriver = async (e) => {
    e.preventDefault();
    const token = Cookies.get("accessToken");
    try {
      const response = await axios.post("http://localhost:8000/api/drivers/", {
        name: driverName,
        contact: contact,
        license_id: licenseId,
        street: street,
        city: city,
        state: state,
        zip_code: zipCode,
        country: country
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Driver created successfully:', response.data);
    } catch (error) {
      console.error('Error creating driver:', error);
    }
  };

  const handleAddTruck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/trucks/", {
        license: truckLicense,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Truck created successfully:", response.data);
    } catch (error) {
      console.error('Error creating truck:', error);
    }
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
            <div className="mb-4">
              <label htmlFor="contact" className="block text-lg font-medium text-gray-700">
                Driver Contact
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="licenseId" className="block text-lg font-medium text-gray-700">
                Driver LicenseId
              </label>
              <input
                type="text"
                id="licenseId"
                value={licenseId}
                onChange={(e) => setlicenseId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="street" className="block text-lg font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-lg font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-lg font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zipCode" className="block text-lg font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-lg font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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

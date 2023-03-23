import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="max-w-screen-md mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:mx-4 dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8 md:grid md:grid-cols-2 md:gap-x-6">
        <div className="flex flex-col items-center justify-center bg-white border border-gray-300 p-6 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Manage Shipments</h3>
          <button
            onClick={() => navigateTo("/manage-shipments")}
            className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Manage Shipments
          </button>
        </div>
        <div className="flex flex-col items-center justify-center bg-white border border-gray-300 p-6 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Manage Countries</h3>
          <button
            onClick={() => navigateTo("/country")}
            className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Manage Countries
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
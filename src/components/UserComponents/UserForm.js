import React from "react";
import Select from "react-select";
import countriesList from "../../countries.json";

const UserForm = ({ handleSubmit, buttonName, user, handleChange }) => {
  const countriesOptions = countriesList.map((country) => ({
    value: country.country,
    label: country.country,
  }));

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-md mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:mx-4 dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8 md:grid md:grid-cols-2 md:gap-x-6"
      >
        <div>
          <label htmlFor="firstName" className="font-medium text-gray-700 dark:text-gray-300">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="font-medium text-gray-700 dark:text-gray-300">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-medium text-gray-700 dark:text-gray-300">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="font-medium text-gray-700 dark:text-gray-300">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="font-medium text-gray-700 dark:text-gray-300">
              Country:
            </label>
            <Select
              id="country"
              name="country"
              value={countriesOptions.find((option) => option.value === user.country)}
              onChange={(selectedOption) =>
                handleChange({ target: { name: "country", value: selectedOption.value } })
              }
              options={countriesOptions}
              className="mt-1 dark:text-gray-300"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="font-medium text-gray-700 dark:text-gray-300">
              Zip Code:
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={user.zipCode}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="font-medium text-gray-700 dark:text-gray-300">
              Contact Number:
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={user.contactNumber}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <button
            type="submit"
            className="col-span-2 mt-4 inline-flex justify-center items-center w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {buttonName}
          </button>
        </form>
      </div>
    );
  };
  
  export default UserForm;
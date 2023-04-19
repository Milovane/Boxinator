import React from "react";
import Select from "react-select";
import countriesList from "../../countries.json";
import countriesImage from "../../../src/images/countries-gc27441807_1280.png";

const CountryForm = ({ handleSubmit, buttonName, country, handleChange }) => {
  const countriesOptions = countriesList.map((country) => ({
    value: country.country,
    label: country.country,
  }));

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-md mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:mx-4 dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8 md:grid md:grid-cols-1"
      >
        <img
          src={countriesImage}
          alt="Country"
          className="w-80 h-30 mb-4 mx-auto"
        />
        <div className="md:grid md:grid-cols-2 md:gap-x-6">
          <div>
            <label
              htmlFor="name"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="font-bold">Country Name:</span>
            </label>
            <Select
              id="name"
              name="name"
              value={countriesOptions.find(
                (option) => option.value === country.name
              )}
              onChange={(selectedOption) =>
                handleChange({
                  target: { name: "name", value: selectedOption.value },
                })
              }
              options={countriesOptions}
              className="mt-1 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="countryMultiplier"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="font-bold">Country Multiplier:</span>
            </label>
            <input
              type="number"
              id="countryMultiplier"
              name="countryMultiplier"
              value={country.countryMultiplier}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex justify-center items-center w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default CountryForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
    zipCode: "",
    contactNumber: "",
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/v1/users/${user.Id}`, user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
      <select
        id="country"
        name="country"
        value={user.country}
        onChange={handleChange}
        className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
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
      Update Information
    </button>
  </form>
</div>
);
};

export default UserPage;
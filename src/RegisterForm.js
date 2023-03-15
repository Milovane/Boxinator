import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    country: '',
    zipCode: '',
    contactNumber: ''

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUser = { ...user, typeOfUser: "Registered" };
  
    if (registeredUser.countryOfResidence.trim() === '') {
      alert('Country is required');
      return;
    }
  
    axios.post('http://localhost:8080/api/v1/users', registeredUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <form onSubmit={handleSubmit} class="max-w-screen-md mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:mx-4 dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8 md:grid md:grid-cols-2 md:gap-x-6">
    <div class="sm:col-span-2">
      <label htmlFor="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> First name</label>
      <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} class="w-full" />
    </div>
    <div class="sm:col-span-2">
      <label htmlFor="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Last name</label>
      <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} class="w-full" />
    </div>
    <div class="sm:col-span-2">
      <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
      <input type="text" id="email" name="email" value={user.email} onChange={handleChange} class="w-full" />
    </div>
    <div class="sm:col-span-2">
      <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password</label>
      <input type="password" id="password" name="password" value={user.password} onChange={handleChange} class="w-full" />
    </div>
    <div class="sm:col-span-2">
      <label htmlFor="dateOfBirth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Birthday</label>
      <input type="text" id="birthday" name="birthday" value={user.dateOfBirth} onChange={handleChange} class="w-full" />
    </div>
    <div class="sm:col-span-2">
      <label htmlFor="countryOfResidence" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Country of residence</label>
      <input type="text" id="countryOfResidence" name="countryOfResidence" value={user.country} onChange={handleChange} class="w-full" />
    </div>
    <div class="sm:col-span-1">
      <label htmlFor="zipCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Zipcode</label>
      <input type="number" id="zipCode" name="zipCode" value={user.zipCode} onChange={handleChange} class="w-full" />
    </div>
      <div>
        <label htmlFor="contactNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
        <input type="text" id="contactNumber" name="contactNumber" value={user.contactNumber} onChange={handleChange} />
      </div>
      <button type="submit">Register</button>

    </form>


    
    </div>
  );
};

export default RegisterForm;




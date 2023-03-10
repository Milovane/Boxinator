import React from "react";
import { useState } from "react";
import { HyperLink } from "../components/login-components/HyperLink";
import { Logo } from "../components/login-components/Logo";
import { LoginFormFields } from "../components/login-components/LoginFormFields";

export const LoginFormPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}\nPassword: ${password}`);
    //Request /login endpoint.
  };

  return (
    <section>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo w="w-12" h="h-12" textColor={"text-white"} />
        <form className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <LoginFormFields />
          <div className="flex flex-col space-y-2">
            <HyperLink
              message="Don't have an account?"
              actionName="Signup"
              url=""
            />
            <HyperLink message="Continue as guest?" actionName="Guest" url="" />
          </div>
        </form>
      </div>
    </section>
  );
};

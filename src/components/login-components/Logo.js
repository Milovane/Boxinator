import React from "react";

export const Logo = ({ w, h, textColor }) => {
  return (
    <a
      href="/"
      className={`flex items-center mb-2 text-2xl font-semibold ${textColor} dark:text-white`}
    >
      <img
        className={`${w} ${h} mr-3`}
        src="https://res.cloudinary.com/divyeb9ec/image/upload/v1678268144/package_1_jhvlr9.png"
        alt="logo"
      />
      Boxinator
    </a>
  );
};

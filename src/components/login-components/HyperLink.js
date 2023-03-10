import React from "react";

export const HyperLink = ({ message, actionName, url }) => {
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      {message}{" "}
      <a
        href={`${url.length == 0 ? "#" : url}`}
        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        {actionName}
      </a>
    </p>
  );
};

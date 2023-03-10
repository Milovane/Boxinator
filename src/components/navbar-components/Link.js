import React from "react";

const Link = ({ link, name }) => {
  return (
    <li>
      <a
        href={`${link}`}
        class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      >
        {name}
      </a>
    </li>
  );
};

export default Link;

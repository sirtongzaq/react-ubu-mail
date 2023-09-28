import React from "react";
import { useNavigate } from "react-router-dom";

function HeaderNav({ text }) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="px-3 py-10">
      <div class="flex items-center text-5xl font-extrabold dark:text-white">
        <button className="pr-3" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span class="text-5xl font-extrabold dark:text-white">{text}</span>
        <span class="bg-blue-100 text-indigo-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800 ml-2">
          MAIL
        </span>
      </div>
    </div>
  );
}

export default HeaderNav;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccessToast } from "./toastFunctions";
function Nav({ user, onLogout }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchDataUserOnline = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/test");
      const user = response.data.data.user;
      if (user === null) {
        // console.log(user);
      } else {
        // console.log(response.data);
        showSuccessToast(`${user} is online`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/mail");
      const filteredData = response.data.mails
        .filter((item) => item.to_email === user.email)
        .filter((item) => item.read === false);
      setData(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const UnreadBadge = ({ count }) =>
    count > 0 ? (
      <span className="bg-red-500 text-white font-bold rounded-full px-1 py-0 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
        {count}
      </span>
    ) : null;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDataUserOnline();
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className=" bg-white h-full">
        <div
          onClick={navigateToHome}
          className="flex justify-center py-10 shadow-sm pr-4 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14 text-indigo-600 hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>

          <div className="pl-2">
            <p className="text-2xl font-bold text-indigo-600 hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
              UBU
            </p>
            <span className="text-xs block text-gray-800 hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
              MAIL
            </span>
          </div>
        </div>
        <div className="pl-10">
          <ul className="space-y-8 pt-10">
            <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-indigo-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>

              <a href="/create">Create</a>
            </li>
            <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
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
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                />
              </svg>
              <a href="/inbox" className="relative">
                Inbox
                <UnreadBadge count={data.length} />
              </a>
            </li>
            <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
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
                  d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                />
              </svg>
              <a href="/sent">Sent</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-transparent flex items-center space-x-4 pl-10 pb-10 hover:text-indigo-600 cursor-pointer hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>

        <button className="uppercase" onClick={navigateToProfile}>
          {user?.username || "User"}
        </button>
      </div>
      <div className="bg-transparent flex items-center space-x-4 pl-10 pb-10 hover:text-indigo-600 cursor-pointer hover:cursor-pointer transform hover:scale-105 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Nav;

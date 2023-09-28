import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import MailPage from "../pages/MailPage";

function InboxListView({ user }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return format(date, "MMMM dd, yyyy HH:mm:ss");
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/mail");
      const filteredData = response.data.mails.filter(
        (item) => item.to_email === user.email
      );
      setData(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user.email]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen">
          <LoadingScreen />
        </div>
      ) : (
        <main className="flex w-screen h-screen">
          <section className="flex flex-col pt-10 w-full pl-64 bg-gray-50 h-full">
            <HeaderNav text={"INBOX"} />
            {/* INBOX LIST */}
            <label className="px-3">
              <input
                className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
            <div className="overflow-hidden">
              <div className="max-h-full overflow-auto">
                <ul className="mt-10">
                  {searchQuery === ""
                    ? data.map((item) => (
                        <li
                          key={item._id}
                          className="py-5 border-b px-3 transition ease-in-out hover:-translate-y-1 hover: scale-x-70 hover:bg-indigo-100 duration-300"
                        >
                          {item.reply_id === "" ? (
                            <Link to={`/mail/${item._id}`}>
                              <a
                                href="#"
                                className="flex justify-between items-center"
                              >
                                {item.read === false ? (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span>{item.title}</span>
                                  </h3>
                                ) : (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-100"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span>{item.title}</span>
                                  </h3>
                                )}
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.email}
                              </div>
                            </Link>
                          ) : (
                            <Link to={`/mail/${item.reply_id}`}>
                              <a
                                href="#"
                                className="flex justify-between items-center"
                              >
                                {item.read === false ? (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span className="text-indigo-600 mr-2">
                                      [REPLY]
                                    </span>
                                    <span>{item.title}</span>
                                  </h3>
                                ) : (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-100"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span className="text-indigo-600 mr-2">
                                      [REPLY]
                                    </span>
                                    <span>{item.title}</span>
                                  </h3>
                                )}
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.email}
                              </div>
                            </Link>
                          )}
                        </li>
                      ))
                    : filteredData.map((item) => (
                        <li
                          key={item._id}
                          className="py-5 border-b px-3 transition ease-in-out hover:-translate-y-1 hover: scale-x-70 hover:bg-indigo-100 duration-300"
                        >
                          {item.reply_id === "" ? (
                            <Link to={`/mail/${item._id}`}>
                              <a
                                href="#"
                                className="flex justify-between items-center"
                              >
                                {item.read === false ? (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span>{item.title}</span>
                                  </h3>
                                ) : (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-100"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span>{item.title}</span>
                                  </h3>
                                )}
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.email}
                              </div>
                            </Link>
                          ) : (
                            <Link to={`/mail/${item.reply_id}`}>
                              <a
                                href="#"
                                className="flex justify-between items-center"
                              >
                                {item.read === false ? (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span className="text-indigo-600 mr-2">
                                      [REPLY]
                                    </span>
                                    <span>{item.title}</span>
                                  </h3>
                                ) : (
                                  <h3 className="flex flex-row text-lg font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 mr-2 text-indigo-100"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                      />
                                    </svg>
                                    <span className="text-indigo-600 mr-2">
                                      [REPLY]
                                    </span>
                                    <span>{item.title}</span>
                                  </h3>
                                )}
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.email}
                              </div>
                            </Link>
                          )}
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      )}
    </Layout>
  );
}

export default InboxListView;

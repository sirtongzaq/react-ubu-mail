import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import Layout from "../Layout";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { showErrorToast, showSuccessToast } from "./toastFunctions";

function SentListView({ user }) {
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

  const handleDeleteMail = async (mailId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-mail/${mailId}`);
      console.log("Mail deleted successfully");
      showSuccessToast("Mail deleted successfully");
      setSearchQuery("");
      fetchData();
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/mail");
      const filteredData = response.data.mails.filter(
        (item) => item.email === user.email
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
          <section className="flex flex-col pt-10 pl-64 bg-gray-50 h-full w-full">
            <HeaderNav text={"SENT"} />
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
                              <a className="flex justify-between items-center cursor-pointer">
                                <h3 className="text-lg font-semibold">
                                  {item.reply_id === "" ? (
                                    item.title
                                  ) : (
                                    <div className="flex flex-row">
                                      <span className="mr-3 text-indigo-600">
                                        [REPLY]
                                      </span>
                                      <span>{item.title}</span>
                                    </div>
                                  )}
                                </h3>
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.to_email}
                              </div>
                            </Link>
                          ) : (
                            <Link to={`/mail/${item.reply_id}`}>
                              <a className="flex justify-between items-center cursor-pointer">
                                <h3 className="text-lg font-semibold">
                                  {item.reply_id === "" ? (
                                    item.title
                                  ) : (
                                    <div className="flex flex-row">
                                      <span className="mr-3 text-indigo-600">
                                        [REPLY]
                                      </span>
                                      <span>{item.title}</span>
                                    </div>
                                  )}
                                </h3>
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.to_email}
                              </div>
                            </Link>
                          )}

                          <div className="flex flex-row justify-end items-center pt-2">
                            <button
                              type="button"
                              onClick={() => {}} // Pass a callback function
                              className="bg-orange-600 text-white px-2 py-2 rounded-xl mr-2 hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
                            >
                              <Link to={`/update/${item._id}`}>Update</Link>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMail(item._id)} // Pass a callback function
                              className="bg-red-600 text-white px-2 py-2 rounded-xl mr hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))
                    : filteredData.map((item) => (
                        <li
                          key={item._id}
                          className="py-5 border-b px-3 transition ease-in-out hover:-translate-y-1 hover: scale-x-70 hover:bg-indigo-100 duration-300"
                        >
                          {item.reply_id === "" ? (
                            <Link to={`/mail/${item._id}`}>
                              <a className="flex justify-between items-center cursor-pointer">
                                <h3 className="text-lg font-semibold">
                                  {item.reply_id === "" ? (
                                    item.title
                                  ) : (
                                    <div className="flex flex-row">
                                      <span className="mr-3 text-indigo-600">
                                        [REPLY]
                                      </span>
                                      <span>{item.title}</span>
                                    </div>
                                  )}
                                </h3>
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.to_email}
                              </div>
                            </Link>
                          ) : (
                            <Link to={`/mail/${item.reply_id}`}>
                              <a className="flex justify-between items-center cursor-pointer">
                                <h3 className="text-lg font-semibold">
                                  {item.reply_id === "" ? (
                                    item.title
                                  ) : (
                                    <div className="flex flex-row">
                                      <span className="mr-3 text-indigo-600">
                                        [REPLY]
                                      </span>
                                      <span>{item.title}</span>
                                    </div>
                                  )}
                                </h3>
                                <p className="text-md text-gray-400">
                                  {formatDate(item.date)}
                                </p>
                              </a>
                              <div className="text-md italic text-gray-400">
                                {item.to_email}
                              </div>
                            </Link>
                          )}
                          <div className="flex flex-row justify-end items-center pt-2">
                            <button
                              type="button"
                              className="bg-orange-600 text-white px-2 py-2 rounded-xl mr-2 hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
                            >
                              <Link to={`/update/${item._id}`}>Update</Link>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteMail(item._id)}
                              className="bg-red-600 text-white px-2 py-2 rounded-xl mr hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
                            >
                              Delete
                            </button>
                          </div>
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

export default SentListView;

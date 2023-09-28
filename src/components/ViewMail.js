import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { showErrorToast, showSuccessToast } from "./toastFunctions";

function MailView({ user, mail_id }) {
  const [data, setData] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [collectedData, setCollectedData] = useState({});

  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateMail = () => {
    const mailId = mail_id;
    const updatedData = {
      read: true,
    };

    updateMail(mailId, updatedData);
  };

  const updateMail = async (mailId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/updatemail/${mailId}`,
        updatedData
      );

      console.log("Mail updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating mail:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectedData = {
        username: user.username,
        email: user.email,
        to_email: data[0].email,
        title: data[0].title,
        message: formData.message,
        imgurl: user.imgurl,
        reply_id: mail_id,
      };
      setCollectedData(collectedData);
      console.log(collectedData);
      await axios.post("http://localhost:5000/api/create", collectedData);
      setFormData({
        message: "",
      });
      console.log("Mail sent successfully");
      showSuccessToast("Reply sent successfully");
      fetchDataComment();
    } catch (error) {
      console.error("Error sending mail:", error);
      showErrorToast(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy HH:mm:ss");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/mail");
      const filteredData = response.data.mails.filter(
        (item) => item._id === mail_id
      );
      setData(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchDataComment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/mail");
      const filteredData = response.data.mails.filter(
        (item) => item.reply_id === mail_id
      );
      setDataComment(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleUpdateMail();
  }, []);

  useEffect(() => {
    fetchData();
    fetchDataComment();
  }, [mail_id]);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen">
          <LoadingScreen />
        </div>
      ) : (
        <main className="flex w-screen h-screen">
          <section className="flex flex-col pt-10 w-full pl-64 bg-gray-50 h-full">
            {data.map((item) => (
              <>
                <HeaderNav text={item.title} />
                {/* INBOX LIST */}
                <section class="w-12/12 px-4 flex flex-col bg-white rounded-r-3xl overflow-auto">
                  {/* INBOX DETAIL HEADER*/}
                  <article class="p-6 mt-10 first-letter:text-base rounded-lg bg-gray-100 ">
                    <footer class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <div className="mr-3">
                            {item.imgurl === "" ? (
                              <div class="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                                <span class="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase">
                                  {item.username.slice(0, 2)}
                                </span>
                              </div>
                            ) : (
                              <div class="h-12 w-12 rounded-full overflow-hidden ">
                                <img src={item.imgurl}></img>
                              </div>
                            )}
                          </div>
                          {item.email}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(item.date)}
                        </p>
                      </div>
                    </footer>
                    <p class="mt-8 text-gray-500 leading-7 tracking-wider whitespace-pre-wrap">
                      {item.message}.
                    </p>
                  </article>
                  {/*REPLY*/}
                  <div className="">
                    <div className="px-3 py-10">
                      <div class="flex items-center text-5xl font-extrabold dark:text-white">
                        <span class="text-5xl font-extrabold dark:text-white">
                          REPLY
                        </span>
                        <span class="bg-blue-100 text-indigo-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800 ml-2">
                          MAIL
                        </span>
                      </div>
                    </div>
                    <label className="">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
                        placeholder="Type your message here..."
                        rows="10"
                        required
                      ></textarea>
                      <div className="flex justify-end p-2">
                        <button
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                          type="button"
                          class="flex items-center text-sm shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-2  hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
                        >
                          <svg
                            class="mr-1.5 w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                            />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </label>
                  </div>
                  {/*COMMENT*/}
                  <div className="">
                    <div className="px-3 py-10">
                      <div class="flex items-center text-5xl font-extrabold dark:text-white">
                        <span class="text-5xl font-extrabold dark:text-white">
                          COMMENT
                        </span>
                        <span class="bg-blue-100 text-indigo-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800 ml-2">
                          MAIL
                        </span>
                      </div>
                    </div>
                  </div>
                  {dataComment.length > 0 ? (
                    dataComment.map((item) => (
                      <article
                        onClick={() => {
                          const mailId = item._id;
                          const updatedData = {
                            read: true,
                          };
                          updateMail(mailId, updatedData);
                        }}
                        class="p-6 mb-10 first-letter:text-base rounded-lg bg-gray-100 transition ease-in-out hover:-translate-y-1 hover: scale-x-70 hover:bg-gray-100 duration-300 cursor-pointer"
                      >
                        <footer class="flex justify-between items-center mb-2">
                          <div class="flex items-center">
                            {item.imgurl !== "" ? (
                              <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img
                                  class="mr-2 w-6 h-6 rounded-full"
                                  src={item.imgurl}
                                  alt="Avatar"
                                />
                              </p>
                            ) : (
                              <div class="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-white rounded-full mr-2">
                                <span class="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                                  {user.username.slice(0, 2)}
                                </span>
                              </div>
                            )}
                            <p className="text-sm text-gray-600 mr-2">
                              {item.email}
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(item.date)}
                            </p>
                          </div>
                        </footer>
                        <p class="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                          {item.message}
                        </p>
                      </article>
                    ))
                  ) : (
                    <h1>
                      <article class="p-6 mb-10 first-letter:text-base rounded-lg bg-gray-100 transition ease-in-out hover:-translate-y-1 hover: scale-x-70 hover:bg-gray-100 duration-300">
                        <p class="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                          NO COMMENT
                        </p>
                      </article>
                    </h1>
                  )}
                </section>
              </>
            ))}
          </section>
        </main>
      )}
    </Layout>
  );
}

export default MailView;

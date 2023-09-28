import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { showErrorToast, showSuccessToast } from "./toastFunctions";

function CreateMailScreen({ user }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    to_email: "",
    title: "",
    message: "",
    imgurl: user.imgurl,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "to_email") {
      fetchUserSuggestions(value);
    }
  };

  const fetchUserSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users?query=${input}`
      );
      setSuggestions(response.data.users);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching user suggestions:", error);
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputClick = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (selectedUser) => {
    setFormData({
      ...formData,
      to_email: selectedUser.email,
    });

    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/create", formData);
      setFormData({
        username: user.username,
        email: user.email,
        to_email: "",
        title: "",
        message: "",
        imgurl: user.imgurl,
      });
      console.log("Mail sent successfully");
      showSuccessToast("Mail sent successfully");
      navigate("/sent");
    } catch (error) {
      console.error("Error sending mail:", error);
      showErrorToast(error.message);
    }
  };

  return (
    <Layout>
      <main className="flex-col w-screen h-screen bg-gray-50">
        <section className="flex flex-col pt-10 w-full pl-64 bg-gray-50 h-full">
          {/* INBOX LIST */}
          <HeaderNav text={"CREATE"} />
          <label className="px-3 mb-6 relative">
            <input
              type="text"
              name="to_email"
              value={formData.to_email}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onClick={handleInputClick}
              className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
              placeholder="To"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute mt-2 border border-gray-100 bg-white rounded-lg shadow-md p-4">
                {suggestions.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => handleSuggestionClick(user)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
            )}
          </label>
          <label className="px-3 mb-6">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
              placeholder="Title"
              required
            />
          </label>
          <label className="px-3 mb-6">
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
                Sent
              </button>
            </div>
          </label>
        </section>
      </main>
    </Layout>
  );
}

export default CreateMailScreen;

// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import axios from "axios";
import Nav from "./components/Nav";
import InboxPage from "./pages/InboxPage";
import CreateMailScreen from "./components/CreateMailScreen";
import SendPage from "./pages/SentPage";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "./components/toastFunctions";
import MailPage from "./pages/MailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdatePage from "./pages/๊UpdatePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check if the user has a valid token on page load
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        const response2 = await axios.post("http://localhost:5000/api/test", {
          user: user.username,
        });
        console.log(token);
        console.log(user.username);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        showSuccessToast("Login success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      showErrorToast("Login failed");
      alert("Login failed:", error);
      console.error("Login failed");
    }
  };
  const handleLogout = () => {
    showErrorToast("Logout success");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <div>
                <HomePage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <div>
                <HomePage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/inbox"
          element={
            isLoggedIn ? (
              <div>
                <InboxPage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/create"
          element={
            isLoggedIn ? (
              <div>
                <CreateMailScreen user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/update/:mail_id"
          element={
            isLoggedIn ? (
              <div>
                <UpdatePage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/sent"
          element={
            isLoggedIn ? (
              <div>
                <SendPage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <div>
                <ProfilePage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/mail/:mail_id"
          element={
            isLoggedIn ? (
              <div>
                <MailPage user={user} onLogout={handleLogout} />
                <Nav user={user} onLogout={handleLogout} />
                <ToastContainer />
              </div>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <RegisterPage />
              <ToastContainer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

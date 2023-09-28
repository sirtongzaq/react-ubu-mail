// HomePage.js
import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage({ onLogin }) {
  return <LoginForm onLogin={onLogin} />;
}

export default LoginPage;

// Layout.js
import React from "react";
import Nav from "./components/Nav";

function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
}

export default Layout;

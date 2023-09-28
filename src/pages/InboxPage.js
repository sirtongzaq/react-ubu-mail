// HomePage.js
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import InboxListView from "../components/InboxListView";

function InboxPage({ user, onLogout }) {
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <main class="flex w-screen h-screen ">
        <InboxListView user={user}/>
      </main>
    </Layout>
  );
}

export default InboxPage;

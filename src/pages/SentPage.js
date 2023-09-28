// HomePage.js
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import SentListView from "../components/SentListVIew";

function SendPage({ user, onLogout }) {
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <main class="flex w-screen h-screen">
        <SentListView user={user} />
      </main>
    </Layout>
  );
}

export default SendPage;

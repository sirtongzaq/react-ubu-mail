// HomePage.js
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import UpdateMail from "../components/UpdateMail";
import { useParams } from "react-router-dom";

function UpdatePage({ user }) {
  const { mail_id } = useParams();
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <main class="flex w-screen h-screen">
        <UpdateMail user={user} mail_id={mail_id} />
      </main>
    </Layout>
  );
}

export default UpdatePage;

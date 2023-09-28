// HomePage.js
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import MailView from "../components/ViewMail";
import { useParams } from "react-router-dom";

function MailPage({ user }) {
  const { mail_id } = useParams();
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <main class="flex w-screen h-screen">
        <MailView user={user} mail_id={mail_id} />
      </main>
    </Layout>
  );
}

export default MailPage;

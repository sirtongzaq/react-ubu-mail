import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";
import CreateMailScreen from "../components/CreateMailScreen";

function CreatePage({ user, onLogout }) {
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <main class="flex w-screen h-screen ">
        <CreateMailScreen user={user} />
      </main>
    </Layout>
  );
}

export default CreatePage;

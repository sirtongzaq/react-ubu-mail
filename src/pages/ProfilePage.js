// HomePage.js
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../Layout";

function ProfilePage({ user, onLogout }) {
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div class="flex-col w-screen h-screen bg-gray-50">
        <div class="flex items-center justify-center pl-56 pt-48">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 mx-72">
            <div class="px-6">
              <div class="flex items-center justify-center mt-12">
                <div class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span class="text-6xl font-bold text-gray-600 dark:text-gray-300 uppercase">
                    {user.imgurl === "" ? (
                      user.username.slice(0, 2)
                    ) : (
                      <img src={user.imgurl}></img>
                    )}
                  </span>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 uppercase">
                  {user.username}
                </h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user.email}
                </div>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user.address}
                </div>
                <div class="mb-2 text-blueGray-600 mt-10">
                  <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {user.bio}
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;

import React, { useState, useEffect } from "react";
import API from "../utilities/API";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get("me");
        setUserData(response.data);
      } catch (error) {
        console.log("Failed to fetch user data:", error);
        alert("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-lavender via-blue-light to-white/80 overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="p-8 bg-white/30 rounded-3xl shadow-2xl backdrop-blur-md border border-white/30 transition-shadow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-400"></div>
              <p className="mt-6 text-lg font-medium tracking-wide text-indigo-900">
                Loading your profile...
              </p>
            </div>
          ) : userData ? (
            <>
              <h2 className="mb-8 text-4xl font-extrabold text-center text-indigo-900 drop-shadow">
                User Profile
              </h2>
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 flex items-center justify-center text-5xl text-white font-extrabold shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-200">
                    {userData.username
                      ? userData.username.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                  {userData.isAdmin &&
                    <div className="absolute bottom-0 right-0 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow group-hover:bg-indigo-700 transition-colors">
                      Admin
                    </div>
                  }
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-6 mb-6 shadow flex flex-col gap-4">
                <h3 className="text-lg font-semibold mb-2 text-indigo-800 border-b border-indigo-200 pb-1">
                  Account Details
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-28 text-indigo-700 font-medium">
                      Username:
                    </span>
                    <span className="font-semibold text-indigo-900">
                      {userData.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-28 text-indigo-700 font-medium">
                      Email:
                    </span>
                    <span className="font-semibold text-indigo-900 break-all">
                      {userData.email}
                    </span>
                  </div>
                  {userData.createdAt && (
                    <div className="flex items-center gap-2">
                      <span className="w-28 text-indigo-700 font-medium">
                        Joined:
                      </span>
                      <span className="font-semibold text-indigo-900">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-6 bg-red-500/30 rounded-xl shadow">
              <p className="text-lg font-semibold mb-2">
                Could not load profile information.
              </p>
              <button
                className="mt-2 bg-white/30 hover:bg-white/50 text-red-700 font-bold py-2 px-6 rounded-lg transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

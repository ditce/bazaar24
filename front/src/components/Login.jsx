import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utilities/API";

const Login = () => {
  const nav = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("login", userData);
      console.log(response.data);
      nav("/profile");
    } catch (error) {
      console.log("Password reset failed:", error);
      alert("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray/20 items-center bg-radial from-sky-200/20 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-8 bg-white/10 rounded-3xl shadow-2xl backdrop-blur-md transition-shadow hover:shadow-3xl flex flex-col gap-5"
      >
        <h2 className="mb-6 text-4xl font-extrabold text-center text-indigo-900 drop-shadow">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-light bg-white placeholder-gray-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-light bg-white placeholder-gray-500"
        />

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow transition-colors"
        >
          Login
        </button>

        <div className="text-center mt-2">
          <p className="text-sm text-indigo-900">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        <div className="text-center mt-2">
          <p className="text-sm text-indigo-900">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

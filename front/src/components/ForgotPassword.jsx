import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utilities/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("forgot-password", { email });
      console.log(response.data);
      alert(response.data.message || "Password reset link sent!");
    } catch (error) {
      console.log("Password reset failed:", error);
      alert("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-radial from-sky-200/20 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-8 bg-white/20 rounded-3xl shadow-2xl backdrop-blur-md transition-shadow flex flex-col gap-5"
      >
        <h2 className="mb-6 text-4xl font-extrabold text-center text-indigo-900 drop-shadow">
          Forgot Password
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-light bg-white placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow transition-colors"
        >
          Reset Password
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-indigo-900">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

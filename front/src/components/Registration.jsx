import React, { useState } from "react";
import API from "../utilities/API";
import { Link } from "react-router-dom";

const Registration = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("register", userData);
      alert(response.data.message || "Registration successful!");
      console.log(response.data);
      alert(response.data.message || "Registration successful!");
    } catch (error) {
      console.log("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray/20 items-center bg-radial from-sky-200/20 to-blue-500">
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 p-8 bg-white/20 rounded-3xl shadow-2xl backdrop-blur-md transition-shadow hover:shadow-3xl flex flex-col gap-5"
    >
      <h2 className="mb-6 text-4xl font-extrabold text-center text-indigo-900 drop-shadow">
        Create a New Account
      </h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
        className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-white placeholder-gray-500"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Surname"
        onChange={handleChange}
        required
        className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-white placeholder-gray-500"
      />

      <div className="flex gap-4">
        <select
          name="day"
          onChange={handleChange}
          required
          className="flex-1 p-3 text-lg rounded-xl border border-gray-300 bg-white"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="month"
          onChange={handleChange}
          required
          className="flex-1 p-3 text-lg rounded-xl border border-gray-300 bg-white"
        >
          <option value="">Month</option>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          name="year"
          onChange={handleChange}
          required
          className="flex-1 p-3 text-lg rounded-xl border border-gray-300 bg-white"
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => 2025 - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="inline-flex flex-row flex-nowrap items-center space-x-4">
        <span className="font-medium whitespace-nowrap">
          Gender:
        </span>
        <label className="inline-flex items-center whitespace-nowrap">
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            required
            style={{ width: "auto", height: "auto" }}
          />
          <span className="ml-1">Male</span>
        </label>
        <label className="inline-flex items-center whitespace-nowrap">
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            required
            style={{ width: "auto", height: "auto" }}
          />
          <span className="ml-1">Female</span>
        </label>
      </div>

      <input
        type="text"
        name="phone"
        placeholder="Mobile Number"
        onInput={(e) =>
          (e.target.value = e.target.value.replace(/[^0-9+]/g, ""))
        }
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
        className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-white placeholder-gray-500"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
        className="p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-white placeholder-gray-500"
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow transition-colors"
      >
        Register
      </button>

      <div className="text-center mt-4">
        <p className="text-sm text-indigo-900">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
    </div>
  );
};

export default Registration;

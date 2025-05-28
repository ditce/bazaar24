import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utilities/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await API.post("forgot-password", { email });
      console.log(response.data);
      setIsSubmitted(true);
      alert(response.data.message || "Linku per rivendosjen e fjalekalimit u dergua ne email!");
    } catch (error) {
      console.log("Password resetj failed:", error);
      alert("Dergimi i emailit deshtoi. Ju lutem provoni perseri.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 pt-8 pb-8 mb-4">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
              <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7 6h-2m-6 0H9a6 6 0 017-6V7a2 2 0 11-4 0M9 7a2 2 0 012 2m0 0V9a2 2 0 012 2m-2-2a2 2 0 012 2m0 0V7a2 2 0 012-2m-2 2V5a2 2 0 012-2m-4 0a2 2 0 012 2v2a2 2 0 01-2 2m-2 0V5a2 2 0 012-2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isSubmitted ? "Emaili u dergua" : "Harruat fjalekalimin?"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSubmitted 
                ? "Kontrolloni emailin tuaj per instruksionet e rivendosjes"
                : "Shkruani adresen tuaj te emailit dhe ne do t'ju dergojme nje link per ta rivendosur fjalekalimin"
              }
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="emri@example.com"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Duke derguar...
                    </>
                  ) : (
                    "Dergo linkin e rivendosjes"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Emaili u dergua me sukses ne {email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Nuk e moret emailin? Kontrolloni dosjen spam ose provoni perseri me vone.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Provo perseri
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ose</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Kthehu ne kycje
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Nuk keni llogari?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Regjistrohuni ketu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
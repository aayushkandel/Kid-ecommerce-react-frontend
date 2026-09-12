
import React, { useState } from "react";
import { userLogin } from "../../api/apiRouter";

const LoginForm = ({
  isOpen,
  setIsOpen,
  onRegister,
  onLoginSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await userLogin(loginData);

      console.log("Login response:", response.data);

      // Get token from FastAPI response
      const token = response.data.token;

      // Save token in localStorage
   localStorage.setItem("token", token);
localStorage.setItem("username", response.data.username);

onLoginSuccess();

console.log("Login successful");
      console.log("Token:", token);

      // Clear form
      setLoginData({
        email: "",
        password: "",
      });

      // Close login modal
      setIsOpen(false);

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(
          error.response.data?.detail ||
          "Login failed. Please check your email and password."
        );
      } else {
        setError(
          "Unable to connect to the server. Please make sure FastAPI is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Title + Register */}
        <div className="flex justify-between">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Log In
          </h2>

          <button
            type="button"
            onClick={onRegister}
            className="mr-10 mb-2 text-sm font-medium text-gray-500 underline cursor-pointer hover:text-gray-800"
          >
            Register Here
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-50 px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "🙈" : "👁"}
              </button>

            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">

            <label className="flex items-center text-sm text-gray-500">
              <input
                type="checkbox"
                className="h-4 w-4"
              />

              <span className="ml-2">
                Remember Me
              </span>
            </label>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              Forgot Password?
            </a>

          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;


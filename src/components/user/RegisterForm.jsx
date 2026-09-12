
import React, { useState } from "react";
import { userRegister } from "../../api/apiRouter";

const RegisterForm = ({
  isOpen,
  setIsOpen,
  onBackToLogin,
}) => {
  if (!isOpen) {
    return null;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    billing_address: "",
    shipping_address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });

    // Remove old error when user starts typing again
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await userRegister(registerData);

      console.log("Register response:", response.data);

      setSuccess(response.data.message || "Register Successful");

      // Clear form
      setRegisterData({
        username: "",
        email: "",
        password: "",
        name: "",
        phone: "",
        billing_address: "",
        shipping_address: "",
      });

      // After successful registration, go back to login
      setTimeout(() => {
        setSuccess("");
        onBackToLogin();
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        // FastAPI validation error
        if (error.response.status === 422) {
          const detail = error.response.data?.detail;

          if (Array.isArray(detail)) {
            setError(
              detail.map((item) => item.msg).join(", ")
            );
          } else {
            setError("Please check your input.");
          }
        } 
        // Username/email/phone already exists
        else {
          setError(
            error.response.data?.detail ||
            "Registration failed. Please try again."
          );
        }
      } else {
        setError(
          "Unable to connect to the server. Please make sure FastAPI is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-8 shadow-2xl"
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

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pr-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Account
          </h2>

          <button
            type="button"
            onClick={onBackToLogin}
            className="text-sm font-medium text-gray-500 underline hover:text-gray-800"
          >
            Already have an account?
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-5 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Register Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Username + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={registerData.username}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter email"
              />
            </div>

          </div>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={registerData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-500"
              >
                Phone
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={registerData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter phone number"
              />
            </div>

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
                value={registerData.password}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-50 px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter password"
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

          {/* Billing Address */}
          <div>
            <label
              htmlFor="billing_address"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              Billing Address
            </label>

            <textarea
              id="billing_address"
              name="billing_address"
              value={registerData.billing_address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Enter billing address"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label
              htmlFor="shipping_address"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              Shipping Address
            </label>

            <textarea
              id="shipping_address"
              name="shipping_address"
              value={registerData.shipping_address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full rounded-md bg-gray-50 px-4 py-3 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Enter shipping address"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;


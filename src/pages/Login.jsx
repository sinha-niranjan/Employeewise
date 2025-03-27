import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://reqres.in/api";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // removing all the previous errors
      setError("");
      setEmailError("");
      setPasswordError("");

      // validating the email and password
      if (!email) {
        setEmailError("Email is required");
        return;
      }
      // if (!validateEmail(email)) {
      //   setEmailError("Enter a valid email address");
      //   return;
      // }
      if (!password) {
        setPasswordError("Password is required");
        return;
      }
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md space-y-4 w-4/5 sm:w-3/5 md:w-1/4">
        <h2 className="w-full flex items-center justify-center text-2xl font-bold mb-4">
          Login
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full mb-2 p-2 border-2 focus:outline-none rounded-lg "
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full mb-2 p-2 border-2  focus:outline-none rounded-lg"
        />
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

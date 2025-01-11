import React, { useState } from "react";
import InputField from "../components/input"; // Adjust path as needed
import Button from "../components/button"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      username,
      password,
      email,
    };

    try {
      const response = await fetch("http://localhost:5173/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        navigate("/signin");
      }
    } catch (e) {
      console.log("somethine went");
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Sign Up
        </h2>
        <form
          id="signupForm"
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col"
        >
          <InputField
            label="Name"
            type="text"
            id="name"
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Username"
            type="text"
            id="username"
            placeholder={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            label="Sign Up"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen"style={{ background: 'linear-gradient(to bottom, #87CEEB, #1E90FF)' }}>
      <form className="w-96 p-4 rounded-sm text-center bg-white">
        <h1 className="text-4xl font-bold text-gray-800 py-4 border-b-2">
          Login Form
        </h1>
        <div className="p-3">
          <div className="mb-4">
            <label className="text-2xl  font-semibold text-left block m-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-sm w-80 h-8 p-2 border-2 border-sky-900 text-gray-700"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-2xl  font-semibold text-left block m-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-sm w-80 h-8 p-2 border-2 border-sky-900 text-gray-700"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="bg-sky-400 text-lg font-semibold text-white py-2 px-4 w-80 rounded-md hover:bg-sky-500">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
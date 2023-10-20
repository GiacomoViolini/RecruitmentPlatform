"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import supabase from "../../../../utils/supabase";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function signInWithEmail() {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (data?.user != null) {
        console.log(data);
        router.push("/");
      }
      if (error) {
        console.log(error);
      }
    }
    signInWithEmail();
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ background: "linear-gradient(to bottom, #87CEEB, #3399ff)" }}
    >
      <form
        onSubmit={handleSubmit}
        className=" w-96 py-12 rounded-lg text-center bg-white flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 py-4 border-b-2">
          Sign up Form
        </h1>
        <div className="py-4">
          <div className="mb-4">
            <label
              className="text-2xl  font-semibold text-left block m-1 text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="rounded-sm w-80 h-8 p-2 border-2 border-sky-900 text-gray-700"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-10">
            <label
              className="text-2xl  font-semibold text-left block m-1 text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="rounded-sm w-80 h-8 p-2 border-2 border-sky-900 text-gray-700"
              type="password"
              name="password"
              id="password"
              minLength={6}
              required
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-sky-400 text-lg font-semibold text-white py-2 px-4 w-80 rounded-md hover:bg-sky-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
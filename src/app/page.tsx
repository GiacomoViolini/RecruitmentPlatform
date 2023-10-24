"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import supabase from "../../utils/supabase";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    async function signInWithEmail() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data?.user != null) {
        console.log(data);
        router.push("/User");
      }
      if (error) {
        console.log(error);
        setError(true);
      }
    }
    signInWithEmail();
    setIsDisabled(false);
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ background: "linear-gradient(to bottom, #87CEEB, #3399ff)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="lg:w-96 w-80 lg:py-12 py-6 rounded-lg text-center bg-white flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 py-4 border-b-2">
          Login Form
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
              required
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {!isDisabled ? (
            <button
              type="submit"
              className="bg-sky-400 text-lg font-semibold text-white py-2 px-4 w-80 rounded-md hover:bg-sky-500 "
              disabled={!email || !password}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-sky-400 opacity-40 text-lg font-semibold text-white py-2 px-4 w-80 rounded-md hover:bg-sky-500 "
              disabled={true}
            >
              Logging in...
            </button>
          )}
          <Link href="User/SignUp">
            <h2 className="text-sky-600 mt-5 text-lg font-semibold hover:underline">
              Sign Up
            </h2>
          </Link>
        </div>
        {error && (
          <h1 className="text-lg font-semibold text-red-600 mb-4">
            Invalid email or password
          </h1>
        )}
      </form>
    </div>
  );
}

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="bg-sky-400 mx-auto my-48 w-96 py-5 px-5 border-2 border-sky-500 rounded-xl">
      <form className="flex-col justify-center">
        <h1 className="text-3xl mb-6 text-center">Login</h1>
        <h2 className="text-xl">Email</h2>
        <input
          className="mb-4 rounded-sm w-52"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <h2 className="text-xl">Password</h2>
        <input
          className="text-lg rounded-sm w-52"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </form>
    </div>
  );
}
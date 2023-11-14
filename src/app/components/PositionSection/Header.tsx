"use client";
import { FormEvent, useState } from "react";
import Positions from "./Positions";

const gradientText = {
  background: "linear-gradient(45deg,  #0074E4, #00A3E1, #00C9FF)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
};

export default function Header() {
  const [search, setSearch] = useState("");
  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center py-48 gap-4">
      <h1
        className="2xl:text-6xl lg:text-5xl text-4xl  font-bold"
        style={gradientText}
      >
        Our Free Positions
      </h1>
      <h1 className="2xl:text-xl text-lg   extrabold text-black-500 py-1">
        Explore our career opportunities
      </h1>
      <div className="flex justify-center w-full pt-16 lg:px-20 px-5">
        <input
          className="rounded-l-lg w-full h-10 px-2 border border-slate-300 hover:border-sky-500 focus:outline-sky-500 text-gray-700"
          type="text"
          name="job offer"
          id="job offer"
          placeholder="Search our Positions"
          value={search}
          onChange={handleSeachChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          Search
        </button>
      </div>
      <Positions searchPosition={search} />
    </div>
  );
}

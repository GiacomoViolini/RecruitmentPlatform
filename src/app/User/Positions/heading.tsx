"use client";
import { FormEvent, useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center py-48 gap-4">
      <h1 className="2xl:text-5xl lg:text-3xl font-semibold text-sky-700">
        Our Free Positions
      </h1>
      <h1 className="2xl:text-xl lg:text-lg extrabold text-black-500 py-1">
        Explore our career opportunities
      </h1>
      <div className="flex justify-center w-full pt-16 px-20">
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
    </div>
  );
}

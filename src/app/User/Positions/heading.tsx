"use client";
import { FormEvent, useState } from "react";

export default function Header() {

    const [search, setSearch] = useState("");
    const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };

    return (
        <div className="flex flex-col justify-center items-center py-28 gap-4">
        <h1 className="2xl:text-5xl lg:text-3xl extrabold text-sky-700">
          Our Free Positions
        </h1>
        <h1 className="2xl:text-xl lg:text-lg extrabold text-black-500 py-1">
          Explore our career opportunities
        </h1>
        <div className="flex justify-center items-center w-100 pt-16">
            <input
                className="rounded-sm w-80 h-10 p-2 border-2 border-sky-900 text-gray-700"
                type="text"
                name="job offer"
                id="job offer"
                placeholder="Search our Positions"
                value={search}
                onChange={handleSeachChange}
            />
        </div>
      </div>
    );
}
"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  return (
    <div
      className="flex w-full h-16 justify-evenly items-center"
      style={{ background: "linear-gradient(to bottom, #1E90FF,#1a8cff)" }}
    >
      <div className=" font-bold w-30 h-max">
        <button
          className={`text-2xl bold ${
            selected ? "text-white underline decoration-" : "text-white"
          }`}
          onClick={() => {
            setSelected(true);
            setSelected2(false);
            setSelected3(false);
          }}
        >
          Home
        </button>
      </div>
      <div className=" font-bold w-30 h-max">
        <button
          className={`text-2xl ${
            selected2 ? "text-white underline decoration-" : "text-white"
          }`}
          onClick={() => {
            setSelected(false);
            setSelected2(true);
            setSelected3(false);
          }}
        >
          Challenges
        </button>
      </div>
      <div className=" font-bold w-30 h-max">
        <button
          className={`text-2xl ${
            selected3 ? "text-white underline decoration-" : "text-white"
          }`}
          onClick={() => {
            setSelected(false);
            setSelected2(false);
            setSelected3(true);
          }}
        >
          Profile
        </button>
      </div>
    </div>
  );
}

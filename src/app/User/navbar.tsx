'use client'
import React, { useState } from 'react';

export default function Navbar() {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  return (
    <div className="flex w-full h-20 justify-evenly items-center bg-sky-400">
        <div className=" font-bold w-30 h-max">
            <button
                className={`text-2xl bold ${selected ? 'text-sky-200 underline decoration-sky-200 brightness-200 drop-shadow-2xl' : 'text-sky-200'}`}
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
            className={`text-2xl ${selected2 ? 'text-sky-200 shadow-lg underline decoration-sky-200 drop-shadow-2xl' : 'text-sky-200'}`}
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
                className={`text-2xl ${selected3 ? 'text-sky-200 underline decoration-sky-200 brightness-200 drop-shadow-2xl' : 'text-sky-200 '}`}
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

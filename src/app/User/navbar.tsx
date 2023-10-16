'use client'
import React, { useState } from 'react';

export default function Navbar() {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  return (
    <div className="flex justify-between items-center bg-sky-400">
      <div className="flex justify-between items-center">
        <button
          className={`text-xl ml-5 ${selected ? 'text-sky-200' : 'text-sky-100'}`}
          onClick={() => {
            setSelected(true);
            setSelected2(false);
            setSelected3(false);
          }}
        >
          Home
        </button>
        <button
          className={`text-xl ml-5 ${selected2 ? 'text-sky-200' : 'text-sky-100'}`}
          onClick={() => {
            setSelected(false);
            setSelected2(true);
            setSelected3(false);
          }}
        >
          Challenges
        </button>
        <button
          className={`text-xl ml-5 ${selected3 ? 'text-sky-200' : 'text-sky-100'}`}
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

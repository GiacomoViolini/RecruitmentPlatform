import React, { useState } from 'react';

export default function Navbar() {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  return (
    <div className="flex justify-between items-center bg-sky-400">
      <div className="flex justify-between items-center">
        {selected ? (
          <button className="text-xl ml-5 text-sky-200 " onClick={() => setSelected(true)}>
            Home
          </button>
        ) : (
          <button className="text-xl ml-5 text sky-100 " onClick={() => setSelected(true)}>
            Home
          </button>
        )}
        {selected2 ? (
          <button className="text-xl ml-5 text-sky-200 " onClick={() => setSelected2(true)}>
            Challenges
          </button>
        ) : (
          <button className="text-xl ml-5 text sky-100 " onClick={() => setSelected2(true)}>
            Challenges
          </button>
        )}
        {selected3 ? (
          <button className="text-xl ml-5 text-sky-200 " onClick={() => setSelected3(true)}>
            Profile
          </button>
        ) : (
          <button className="text-xl ml-5 text sky-100 " onClick={() => setSelected3(true)}>
            Profile
          </button>
        )}
        </div>
    </div>      
  );
}
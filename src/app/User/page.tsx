"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import supabase from "../../../utils/supabase";
import Stepper from "./Stepper";

const gradientText = {
  background: "linear-gradient(45deg,  #0074E4, #00A3E1, #00C9FF)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
};

interface Applications {
  id: number;
  title: string;
  descrption: string;
  ral: string;
  position: string;
  images: string[];
  experience: number;
  type: string;
  steps: number;
}
interface Info {
  title: string;
  steps: number;
}

interface App {
  email: string;
  obj: Info[];
}

export default function user() {
  const [applications, setApplications] = useState<Info[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("Home_Positions")
        .select("*")
        .single();
      if (data) {
        setApplications(data.applications.applications);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="pt-36 ml-32 text-6xl font-bold" style={gradientText}>
        Welcome!
      </h1>
      <div className="bg-white flex mt-20 ml-32 w-8/12 rounded-md overflow-hidden shadow">
        <div className="mx-5 flex flex-col items-center">
          <div className="mt-3 mr-5">
            <h2 className="text-3xl mb-3 font-bold text-sky-800">
              My Applications
            </h2>
            {applications.map((c: Info) => (
              <div className="flex items-center" key={c.title}>
                <h2 className="text-2xl mb-3 font-bold text-sky-700 ">
                  {c.title}
                </h2>
                <h2 className="text-2xl mx-8 mb-3 font-bold text-sky-700 ">
                  Step Completed:
                </h2>
                <Stepper steps={c.steps} />
                <div className=" ml-96">
                  <h2 className="text-lg mb-3 font-bold text-sky-700 ml-10">
                    {c.steps}/5
                  </h2>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <h1 className="text-lg font-semibold text-gray-800 mb-4">
                No applications yet
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

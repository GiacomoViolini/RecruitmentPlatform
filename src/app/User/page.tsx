"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import supabase from "../../../utils/supabase";

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
      console.log(data);
      if (data) {
        const applicationsData = (Array.isArray(data.applications) ? data.applications : [data]);
        setApplications(
          applicationsData.map((c: Info) => ({
            title: c.title,
            steps: c.steps,
          }))
        );
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
      <div className="bg-white flex mt-20 mb-10 ml-32 w-10/12 rounded-md overflow-hidden shadow">
        <div className="mx-5 flex flex-col items-center">
          <div className="mt-5 mr-5">
            <h2 className="text-2xl mb-8 font-bold text-sky-800">
              My Applications
            </h2>
            {applications.map((c: Info) => (
              <div className="flex" key={c.title}>
                <h2 className="text-2xl m-3 font-bold text-sky-700 ">{c.title}</h2>
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

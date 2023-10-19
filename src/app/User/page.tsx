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

export default function user() {
  const [applications, setApplications] = useState<Info[]>([]);
  const [challenges, setChallenges] = useState<Info[]>([]);
  const [user, setUser] = useState<string>();

  async function fetchPositions() {
    const { data ,error} = await supabase
      .from("Home_Positions")
      .select("*")
      .eq("email", user)
      .maybeSingle();
    if (data) {
      setApplications(data.applications.applications);
    }
    if(error){
      console.log(error);
    }
  }
  async function fetchChallenges() {
    const { data,error } = await supabase
      .from("Home_Challenges")
      .select("*")
      .eq("email", user)
      .maybeSingle();
    if (data) {
      setChallenges(data.challenges);
    }
    if(error){
      console.log(error);
    }
  }
  async function fetchUser() {
    const { data } = await supabase.auth.getSession();
    if (data && data.session?.user) {
      setUser(data.session.user.email);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await fetchUser();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCards() {
      console.log(user); // This will log the updated 'user' when it changes
      await fetchChallenges();
      await fetchPositions();
    }
    fetchCards();
  }, [user]);

  return (
    <div className="bg-slate-50 pb-20">
      <Navbar />
      <h1 className="pt-36 ml-32 text-6xl font-bold" style={gradientText}>
        Welcome!
      </h1>
      <div className="bg-white flex mt-20 ml-32 w-8/12 rounded-md overflow-hidden shadow">
        <div className="mx-5 flex flex-col items-center">
          <div className="mt-3 mr-5">
            <h2 className="text-3xl mb-12 font-bold text-sky-800">
              My Applications
            </h2>
            {applications.map((c: Info) => (
              <div className="grid grid-cols-4 items-center" key={c.title}>
                <div className="text-3xl mb-3 font-bold text-sky-700">
                  {c.title}
                </div>
                <h2 className="text-2xl mr-8 mb-3 font-bold text-sky-700">
                  Steps Completed:
                </h2>
                <Stepper steps={c.steps} />
                <div className=" ml-20">
                  <h2 className="text-lg mb-3 font-bold text-sky-700 ml-32">
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
      <div className="bg-white flex mt-20 ml-32 w-8/12 rounded-lg overflow-hidden shadow">
        <div className="mx-5 flex flex-col items-center">
          <div className="mt-3 mr-5">
            <h2 className="text-3xl mb-12 font-bold text-sky-800">
              My Challenges
            </h2>
            {challenges.map((c: Info) => (
              <div className="grid grid-cols-4 items-center" key={c.title}>
                <div className="text-3xl mb-3 font-bold text-sky-700">
                  {c.title}
                </div>
                <h2 className="text-2xl mr-8 mb-3 font-bold text-sky-700">
                  Steps Completed:
                </h2>
                <Stepper steps={c.steps} />
                <div className=" ml-20">
                  <h2 className="text-lg mb-3 font-bold text-sky-700 ml-32">
                    {c.steps}/3
                  </h2>
                </div>
              </div>
            ))}
            {challenges.length === 0 && (
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

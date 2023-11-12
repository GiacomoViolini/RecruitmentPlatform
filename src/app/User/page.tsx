"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import supabase from "../../../utils/supabase";
import Stepper from "./Stepper";
import Stepper2 from "./Stepper2";
import Link from "next/link";
import Image from "next/image";

const gradientText = {
  background: "linear-gradient(45deg,  #0074E4, #00A3E1, #00C9FF)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
};

interface Info {
  title: string;
  steps: number;
  page_id: number;
}

export default function User() {
  const [applications, setApplications] = useState<Info[]>([]);
  const [challenges, setChallenges] = useState<Info[]>([]);
  const [user, setUser] = useState<string>();
  const [isWindow, setIsWindow] = useState<number | undefined>();
  const [applicationsNumber, setApplicationsNumber] = useState<number>(0);
  const [challengesNumber, setChallengesNumber] = useState<number>(0);

  useEffect(() => {
    setApplicationsNumber(applications.length);
    setChallengesNumber(challenges.length);
  }, [applications, challenges]);

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user.email);
      }
      if (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchPositions() {
      const { data, error } = await supabase
        .from("Home_Positions")
        .select("*")
        .eq("email", user)
        .maybeSingle();
      if (data) {
        setApplications(data.applications);
      }
      if (error) {
        console.log(error);
      }
    }
    async function fetchChallenges() {
      const { data, error } = await supabase
        .from("Home_Challenges")
        .select("*")
        .eq("email", user)
        .maybeSingle();
      if (data) {
        setChallenges(data.challenges);
      }
      if (error) {
        console.log(error);
      }
    }
    async function fetchCards() {
      await fetchChallenges();
      await fetchPositions();
    }
    fetchCards();
  }, [user]);

  return (
    <div className="bg-slate-100 h-full pb-20">
      <Navbar />
      <div className="flex flex-col justify-center sm:items-start items-center pt-8 lg:px-12 px-5 py-8">
        <h1
          className="pt-40 xl:ml-44 lg:ml-32 sm:ml-10 lg:text-6xl text-4xl font-bold"
          style={gradientText}
        >
          Welcome!
        </h1>
      </div>
      <div className="flex flex-col justify-center sm:justify-start sm:items-start items-center pt-8 lg:px-12 px-1 py-8">
        <div className="bg-white flex mt-20 lg:ml-32 sm:ml-10 justify-center lg:w-8/12 w-10/12 pb-2 rounded-md shadow">
          <div className="flex flex-col justify-center sm:items-start items-center pt-8 lg:px-12 px-5 py-8">
            <h2 className="lg:text-4xl text-2xl pb-12 font-bold text-sky-800">
              My Applications
            </h2>
            {applications.length === 0 ? (
              <h1 className="text-lg font-semibold text-gray-800 mb-4">
                No applications yet
              </h1>
            ) : (
              <>
                {isWindow!! >= 1500 ? (
                  <div className="grid grid-cols-4 w-full rounded-tl-md rounded-tr-md bg-sky-500 divide-white items-center">
                    <div className="items-center px-12 flex justify-center rounded-tl-md h-20 lg:text-2xl text-xl  font-bold text-white">
                      Positions
                    </div>
                    <div className="items-center px-8 flex justify-center lg:text-2xl h-20 text-xl font-bold text-white">
                      Steps Completed
                    </div>
                    <div className="items-center px-12 flex justify-center lg:text-2xl h-20 text-xl font-bold text-white">
                      Progress
                    </div>
                    <div className="items-center px-12 flex justify-center rounded-tr-md h-20 lg:text-2xl text-xl font-bold text-white">
                      Feedback
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 w-full rounded-tl-md rounded-tr-md bg-sky-500 divide-white items-center">
                    <div className="items-center sm:px-16 flex justify-center rounded-tl-md h-20 lg:text-2xl text-sm font-bold text-white">
                      Positions
                    </div>
                    <div className="items-center sm:px-16 flex justify-center lg:text-2xl text-sm font-bold text-white">
                      Progress
                    </div>
                    <div className="items-center sm:px-16 flex justify-center lg:text-2xl rounded-tr-md h-20 text-sm font-bold text-white">
                      Feedback
                    </div>
                  </div>
                )}
              </>
            )}
            {isWindow!! >= 1500 ? (
            applications.map((c: Info) => (
              <div key={c.title} className="grid grid-cols-4 w-full hover:bg-sky-50 bg-white items-center">
                {applications.indexOf(c) === applicationsNumber-1 ? (
                  <div className="lg:text-2xl text-md underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s rounded-bl-md border-sky-500 h-20 sm:px-8 flex justify-start font-bold text-sky-700">
                    <Link href={`/User/Positions/${c.page_id}`}>
                      {c.title}
                    </Link>
                  </div>
                ) : (
                  <div className="lg:text-2xl text-md underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s border-sky-500 h-20 sm:px-8 flex justify-start font-bold text-sky-700">
                    <Link href={`/User/Positions/${c.page_id}`}>
                      {c.title}
                    </Link>
                  </div>
                )}
                <div className="px-12 flex justify-center h-20 border-b  border-sky-500">
                  <Stepper steps={c.steps} />
                </div>
                <div className="lg:text-xl text-xs font-bold h-20 border-b border-sky-500 text-sky-700 text-md items-center sm:px-12 flex justify-center">
                  {c.steps}/5
                </div>
                {applications.indexOf(c) === applicationsNumber-1 ? (
                  <div className=" lg:text-xl rounded-br-md font-bold border-b hover:text-sky-400 border-e border-sky-500 text-sky-700 text-md h-20 items-center sm:px-12 flex justify-center">
                    <Link href={`/User/${c.title}`}>
                      View Feedback
                    </Link>
                  </div>
                ) : (
                  <div className=" lg:text-xl font-bold border-b border-e hover:text-sky-400 border-sky-500 text-sky-700 text-md h-20 items-center sm:px-12 flex justify-center">
                    <Link href={`/User/${c.title}`}>
                      View Feedback
                    </Link>
                  </div>
                )}
              </div>
            ))):(
              applications.map((c: Info) => (
                <div key={c.title} className="grid grid-cols-3 w-full hover:bg-sky-50 bg-white items-center">
                  {applications.indexOf(c) === applicationsNumber-1 ? (
                    <div className="lg:text-xl underline decoration-sky-600 hover:decoration-sky-300 text-sm items-center border-b border-s rounded-bl-md border-sky-500 h-20 sm:px-16 px-4 flex justify-start font-bold text-sky-700">
                      <Link href={`/User/Positions/${c.page_id}`}>
                        {c.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="lg:text-xl text-sm underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s border-sky-500 h-20 sm:px-16 px-4 flex justify-start font-bold text-sky-700">
                      <Link href={`/User/Positions/${c.page_id}`}>
                        {c.title}
                      </Link>
                    </div>
                  )}
                  <div className="lg:text-xl text-xs font-bold h-20 border-b border-sky-500 text-sky-700 text-md items-center sm:px-16 px-4 flex justify-center">
                    {c.steps}/5
                  </div>
                  {applications.indexOf(c) === applicationsNumber-1 ? (
                    <div className=" lg:text-xl rounded-br-md font-bold border-b hover:text-sky-400 border-e border-sky-500 text-sky-700 text-sm h-20 items-center sm:px-16 px-4 flex justify-center">
                      <Link href={`/User/${c.title}`}>
                        View Feedback
                      </Link>
                    </div>
                  ) : (
                    <div className=" lg:text-xl font-bold border-b border-e hover:text-sky-400 border-sky-500 text-sky-700 text-sm h-20 items-center sm:px-16 px-4 flex justify-center">
                      <Link href={`/User/${c.title}`}>
                        View Feedback
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
      </div>
      </div>
      <div className="flex flex-col justify-center sm:items-start items-center pt-8 lg:px-12 px-1 py-8">
      <div className="bg-white flex mt-20 lg:ml-32 sm:ml-10 justify-center lg:w-8/12 w-10/12 rounded-md shadow">
          <div className="flex flex-col justify-center sm:items-start items-center pt-8 lg:px-12 px-5 py-8">
            <h2 className="lg:text-4xl text-2xl mb-12 font-bold text-sky-800">
              My Challenges
            </h2>
            {challenges.length === 0 ? (
              <h1 className="text-lg font-semibold text-gray-800 mb-4">
                No Challenge yet
              </h1>
            ) : (
              <>
                {isWindow!! >= 1500 ? (
                  <div className="grid grid-cols-4 w-full rounded-tl-md rounded-tr-md bg-sky-500 divide-white items-center">
                    <div className="items-center px-12 flex justify-center rounded-tl-md h-20 lg:text-2xl text-xl  font-bold text-white">
                      Challenges
                    </div>
                    <div className="items-center px-8 flex justify-center lg:text-2xl h-20 text-xl font-bold text-white">
                      Steps Completed
                    </div>
                    <div className="items-center px-12 flex justify-center lg:text-2xl h-20 text-xl font-bold text-white">
                      Progress
                    </div>
                    <div className="items-center px-12 flex justify-center rounded-tr-md h-20 lg:text-2xl text-xl font-bold text-white">
                      Feedback
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 w-full rounded-tl-md rounded-tr-md bg-sky-500 divide-white items-center">
                    <div className="items-center sm:px-16 flex justify-center rounded-tl-md h-20 lg:text-2xl text-sm font-bold text-white">
                      Challenges
                    </div>
                    <div className="items-center sm:px-16 flex justify-center lg:text-2xl text-sm font-bold text-white">
                      Progress
                    </div>
                    <div className="items-center sm:px-16 flex justify-center lg:text-2xl rounded-tr-md h-20 text-sm font-bold text-white">
                      Feedback
                    </div>
                  </div>
                )}
              </>
            )}
            {isWindow!! >= 1500 ? (
            challenges.map((c: Info) => (
              <div key={c.title} className="grid grid-cols-4 w-full hover:bg-sky-50 bg-white items-center">
                {challenges.indexOf(c) === challengesNumber-1 ? (
                  <div className="lg:text-2xl text-md underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s rounded-bl-md border-sky-500 h-20 sm:px-8 flex justify-start font-bold text-sky-700">
                    <Link href={`/User/Challenge/${c.page_id}`}>
                      {c.title}
                    </Link>
                  </div>
                ) : (
                  <div className="lg:text-2xl text-md underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s border-sky-500 h-20 sm:px-8 flex justify-start font-bold text-sky-700">
                    <Link href={`/User/Challenge/${c.page_id}`}>
                      {c.title}
                    </Link>
                  </div>
                )}
                <div className="px-12 flex justify-center h-20 border-b  border-sky-500">
                  <Stepper2 steps={c.steps} />
                </div>
                <div className="lg:text-xl text-xs font-bold h-20 border-b border-sky-500 text-sky-700 text-md items-center sm:px-12 flex justify-center">
                  {c.steps}/3
                </div>
                {challenges.indexOf(c) === challengesNumber-1 ? (
                  <div className=" lg:text-xl rounded-br-md font-bold hover:text-sky-400 border-b border-e border-sky-500 text-sky-700 text-md h-20 items-center sm:px-12 flex justify-center">
                    <Link href={`/User/${c.title}`}>
                      View Feedback
                    </Link>
                  </div>
                ) : (
                  <div className="  lg:text-xl font-bold border-b border-e hover:text-sky-400 border-sky-500 text-sky-700 text-md h-20 items-center sm:px-12 flex justify-center">
                    <Link href={`/User/${c.title}`}>
                      View Feedback
                    </Link>
                  </div>
                )}
              </div>
            ))):(
              challenges.map((c: Info) => (
                <div key={c.title} className="grid grid-cols-3 w-full hover:bg-sky-50 bg-white items-center">
                  {challenges.indexOf(c) === challengesNumber-1 ? (
                    <div className="lg:text-xl underline decoration-sky-600 hover:decoration-sky-300 text-sm items-center border-b border-s rounded-bl-md border-sky-500 h-20 sm:px-16 px-4 flex justify-start font-bold text-sky-700">
                      <Link href={`/User/Challenge/${c.page_id}`}>
                        {c.title}
                      </Link>
                    </div>
                  ) : (
                    <div className="lg:text-xl text-sm underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s border-sky-500 h-20 sm:px-16 px-4 flex justify-start font-bold text-sky-700">
                      <Link href={`/User/Challenge/${c.page_id}`}>
                        {c.title}
                      </Link>
                    </div>
                  )}
                  <div className="lg:text-xl text-xs font-bold h-20 border-b border-sky-500 text-sky-700 text-md items-center sm:px-16 px-4 flex justify-center">
                    {c.steps}/3
                  </div>
                  {challenges.indexOf(c) === challengesNumber-1 ? (
                    <div className=" lg:text-xl rounded-br-md font-bold border-b hover:text-sky-400 border-e border-sky-500 text-sky-700 text-sm h-20 items-center sm:px-16 px-4 flex justify-center">
                      <Link href={`/User/${c.title}`}>
                        View Feedback
                      </Link>
                    </div>
                  ) : (
                    <div className="  lg:text-xl font-bold border-b border-e hover:text-sky-400 border-sky-500 text-sky-700 text-sm h-20 items-center sm:px-16 px-4 flex justify-center">
                      <Link href={`/User/${c.title}`}>
                        View Feedback
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
    </div>
    </div>
  );
}

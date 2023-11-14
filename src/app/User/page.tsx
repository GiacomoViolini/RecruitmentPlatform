"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navigation/navbar";
import supabase from "../../../utils/supabase";
import Stepper from "../components/HomeSection/Stepper";
import Stepper2 from "../components/HomeSection/Stepper2";
import Link from "next/link";

const gradientText = {
  background: "linear-gradient(45deg,  #0074E4, #00A3E1, #00C9FF)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
};

interface Challenge {
  title: string;
  steps: number;
  page_id: number;
  date: string;
}

interface Position {
  title: string;
  steps: number;
  page_id: number;
  points: number;
}

export default function User() {
  const [applications, setApplications] = useState<Position[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
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
    <div className="bg-slate-100 h-fit pb-20">
      <Navbar />
      <h1
        className="pt-40 lg:ml-32 ml-10  lg:text-6xl text-4xl font-bold"
        style={gradientText}
      >
        Welcome!
      </h1>
      <div className="bg-white flex justify-center mt-20 lg:ml-32 sm:ml-10 sm:px-0 mx-4 sm:w-10/12 w-11/12 rounded-xl shadow-xl">
        <div className="flex flex-col sm:items-start lg:p-7 p-4">
          <h2 className="lg:text-4xl text-2xl mb-10 font-bold text-sky-800">
            My Applications
          </h2>
          {applications.length === 0 ? (
            <h1 className="text-lg font-semibold text-gray-800 mb-6">
              No applications yet
            </h1>
          ) : (
            <div
              className={`grid ${
                isWindow && isWindow >= 1000 ? "grid-cols-4" : "grid-cols-3"
              } w-full rounded-t-md bg-sky-500 divide-white items-center justify-between`}
            >
              <div className="items-center justify-center flex h-20 lg:text-3xl text-xl font-bold text-white">
                Positions
              </div>
              {isWindow && isWindow >= 1000 && (
                <div className="items-center justify-center  flex lg:text-3xl text-xl h-20 font-bold text-white">
                  Steps Completed
                </div>
              )}
              <div className="items-center justify-center flex lg:text-3xl text-xl h-20 font-bold text-white">
                Progress
              </div>
              <div className="items-center justify-center  flex h-20 lg:text-3xl text-xl font-bold text-white">
                Feedback
              </div>
            </div>
          )}
          {applications.map((c: Position) => (
            <div
              key={c.title}
              className={`grid ${
                isWindow && isWindow >= 1000 ? "grid-cols-4" : "grid-cols-3"
              } w-full hover:bg-sky-50 bg-white items-center`}
            >
              <div
                className={`lg:text-2xl text-md underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s ${
                  applications.indexOf(c) === applicationsNumber - 1
                    ? "rounded-bl-md"
                    : ""
                } border-sky-500 h-20 justify-center flex font-bold text-sky-700 pl-2`}
              >
                <Link href={`/User/Positions/${c.page_id}`}>{c.title}</Link>
              </div>
              {isWindow && isWindow >= 1000 && (
                <div className="px-12 flex justify-center h-20 border-b  border-sky-500">
                  <Stepper steps={c.steps} />
                </div>
              )}
              <div className="lg:text-xl text-xs font-bold h-20 border-b border-sky-500 text-sky-700 text-md items-center flex justify-center">
                {c.steps}/5
              </div>
              <div
                className={`lg:text-xl ${
                  applications.indexOf(c) === applicationsNumber - 1
                    ? "rounded-br-md"
                    : ""
                } font-bold border-b hover:text-sky-400 border-e border-sky-500 text-sky-700 text-sm h-20 items-center  flex justify-center`}
              >
                <Link href={`/User/${c.title}`}>View Feedback</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white justify-center flex mt-20 lg:ml-32 sm:ml-10 sm:px-0 mx-4 sm:w-10/12 w-11/12 rounded-xl shadow-xl">
        <div className="flex flex-col sm:items-start lg:p-7 p-4">
          <h2 className="lg:text-4xl text-2xl mb-10 font-bold text-sky-800">
            My Challenges
          </h2>
          {challenges.length === 0 ? (
            <h1 className="text-lg font-semibold text-gray-800 mb-4">
              No Challenge yet
            </h1>
          ) : (
            <div
              className={`grid ${
                isWindow && isWindow >= 1000 ? "grid-cols-4" : "grid-cols-3"
              } w-full rounded-t-md bg-sky-500 divide-white items-center justify-between`}
            >
              <div className="items-center justify-center px-4 lg:px-8 flex h-20 text-lg lg:text-3xl font-bold text-white">
                Challenges
              </div>
              {isWindow && isWindow >= 1000 && (
                <div className="items-center justify-center px-8 flex h-20 text-lg lg:text-3xl font-bold text-white">
                  Steps Completed
                </div>
              )}
              <div className="items-center justify-center px-4 lg:px-8 flex h-20 text-lg lg:text-3xl font-bold text-white">
                Progress
              </div>
              <div className="items-center justify-center px-4 lg:px-8 flex h-20 text-lg lg:text-3xl font-bold text-white">
                Starting Date
              </div>
            </div>
          )}
          {challenges.map((c: Challenge) => (
            <div
              key={c.title}
              className={`grid ${
                isWindow && isWindow >= 1000 ? "grid-cols-4" : "grid-cols-3"
              } w-full hover:bg-sky-50 bg-white items-center`}
            >
              <div
                className={`lg:text-2xl text-md underline decoration-sky-600 hover:decoration-sky-300 items-center border-b border-s ${
                  challenges.indexOf(c) === challengesNumber - 1
                    ? "rounded-bl-md"
                    : ""
                } border-sky-500 h-20 justify-center flex font-bold text-sky-700`}
              >
                <Link href={`/User/Challenge/${c.page_id}`}>{c.title}</Link>
              </div>
              {isWindow && isWindow >= 1000 && (
                <div className="px-12 flex justify-center h-20 border-b  border-sky-500">
                  <Stepper2 steps={c.steps} />
                </div>
              )}
              <div className="lg:text-xl text-xs font-bold h-20 border-b border-sky-500 text-sky-700 text-md items-center sm:px-12 flex justify-center">
                {c.steps}/3
              </div>
              <div
                className={`lg:text-xl ${
                  challenges.indexOf(c) === challengesNumber - 1
                    ? "rounded-br-md"
                    : ""
                } font-bold border-b hover:text-sky-400 border-e border-sky-500 text-sky-700 text-sm h-20 items-center  flex justify-center`}
              >
                {c.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

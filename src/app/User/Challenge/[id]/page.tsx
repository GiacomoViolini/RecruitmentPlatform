"use client";

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import supabase from "../../../../../utils/supabase";
import { MouseEvent } from "react";

interface ChallengeProps {
  id: number;
  title: string;
  img: string;
  desc: string;
  prize: string;
}

interface ChallengeParams {
  params: {
    id: number;
  };
}

export default function Challenge({ params: { id } }: ChallengeParams) {
  const [challenge, setChallenge] = useState<ChallengeProps>();
  const [user, setUser] = useState<string>();
  const [applied, setApplied] = useState<boolean>(false);
  const [alreadyApplied, setAlreadyApplied] = useState<boolean>(false);

  console.log(id);
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Challenges")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      setChallenge(data);
    }
    async function fetchUser() {
      const { data } = await supabase.auth.getSession();
      if (data && data.session?.user) {
        setUser(data.session.user.email);
      }
    }
    fetchData();
    fetchUser();
  }, [id]);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    setApplied(true);
    const { data: existingData } = await supabase
      .from("Home_Challenges")
      .select("*")
      .eq("email", user)
      .single();
    if (existingData == null) {
      const { data } = await supabase
        .from("Home_Challenges")
        .insert({
          email: user,
          challenges: [
            { steps: "1", title: challenge?.title, page_id: challenge?.id },
          ],
        })
        .select();
    } else {
      for(let i = 0; i < existingData.challenges.length; i++) {
        if(existingData.challenges[i].title === challenge?.title) {
          setAlreadyApplied(true);
          return;
        }
      }
      const { data, error } = await supabase
        .from("Home_Challenges")
        .update({
          challenges: [
            ...existingData.challenges,
            { steps: "1", title: challenge?.title, page_id: challenge?.id },
          ],
        })
        .eq("email", user);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <Navbar />
      <div
        key={challenge?.title}
        className="bg-white flex lg:mt-56 mt-28 lg:mb-28  mx-auto w-11/12 rounded-md overflow-hidden shadow"
      >
        <div className="hidden w-full h-full sm:block">
          <img
            src={challenge?.img || ""}
            alt={`${id}`}
            className="object-cover border-l-4 border-sky-600 mr-4 h-full w-full"
            width={550}
            height={96}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="sm:hidden w-full">
            <Image
              src={challenge?.img || ""}
              alt={`${id}`}
              className="object-fill border-l-4 border-sky-600 w-full h-full "
              width={550}
              height={96}
              loading="lazy"
            />
          </div>
          <div className="lg:my-8 my-3 mx-5">
            <h2 className="text-4xl mb-5 font-bold text-sky-800 text-center">
              {challenge?.title}
            </h2>
            <h3 className="text-lg text-gray-500">{challenge?.desc}</h3>
            <h3 className="text-2xl font-semibold text-center text-sky-700 mt-8"> Prize: {challenge?.prize}</h3>
          </div>
          {applied ? (
            <button
              className="bg-emerald-400 px-8 py-2 mt-auto mb-5 rounded-md text-white text-xl font-semibold"
              disabled={applied}
            >
              {alreadyApplied ? "Already Applied!" : "Applied!"}
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="bg-sky-500 px-8 py-2 mt-auto mb-5 rounded-md text-white text-xl font-semibold hover:bg-white hover:text-sky-500 hover:border-sky-500 border-2 border-sky-500"
              disabled={applied}
            >
              Join!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
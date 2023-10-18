"use client";

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import supabase from "../../../../../utils/supabase";

interface ChallengeProps {
  id: number;
  title: string;
  img: string;
  desc: string;
}

interface ChallengeParams {
  params: {
    id: number;
  };
}

export default function Challenge({ params: { id } }: ChallengeParams) {
  const [challenge, setChallenge] = useState<ChallengeProps>();
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
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 pb-24 flex flex-col">
      <Navbar />
      <div
        key={challenge?.title}
        className="bg-white flex mt-48 mb-16 mx-auto h-96 w-10/12 rounded-md overflow-hidden shadow"
      >
        <Image
          src={challenge?.img || ""}
          alt={`${id}`}
          className="object-cover border-l-4 border-sky-600 mr-4"
          width={550}
          height={96}
        />
        <div className="mx-5 flex flex-col items-center">
          <div className="mt-5 mr-5">
            <h2 className="text-2xl mb-3 font-bold text-sky-800">
              {challenge?.title}
            </h2>
          </div>
          <h3 className="text-lg text-gray-500">{challenge?.desc}</h3>
          <button className="bg-sky-500 px-8 py-2 mt-auto mb-5 rounded-md text-white text-xl font-semibold hover:bg-sky-600">
            Unisciti!
          </button>
        </div>
      </div>
    </div>
  );
}

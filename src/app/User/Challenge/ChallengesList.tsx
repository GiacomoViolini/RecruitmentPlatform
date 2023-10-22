"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "../../../../utils/supabase";

interface Challenge {
  title: string;
  desc: string;
  img: string;
  id: number;
}

export default function ChallengesList() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    async function fetchData(){
      const { data } = await supabase.from("Challenges").select("*");
      if (data) {
        setChallenges(data);
      }
    }
    fetchData();
  }, []);

  const [isWindow, setIsWindow] = useState<number | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isWindow && isWindow >= 1000 ? (
        challenges.map(
          (c: { title: string; desc: string; img: string; id: number }) => (
            <div
              key={c.title}
              className="bg-white my-12 mx-auto h-60 w-9/12 rounded-lg overflow-hidden shadow border-transparent border-2 hover:shadow-xl hover:border-sky-600" 
            >
              <Link href={`Challenge/${c.id}`}>
                <div className="flex">
                  <Image
                    src={c.img}
                    alt={`${c.id}`}
                    className=" object-cover"
                    width={430}
                    height={80}
                    loading="lazy"
                    quality={80}
                  />
                  <div className="mx-5 mt-5">
                    <h2 className="text-2xl mb-3 font-bold text-sky-800 ">
                      {c.title}
                    </h2>
                    <h3 className="text-lg text-gray-500">
                      {c.desc.slice(0, 400)}...
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          )
        )
      ) : (
        challenges.map(
          (c: { title: string; desc: string; img: string; id: number }) => (
            <div
              key={c.title}
              className="bg-white my-12 pb-5 mx-auto h-full w-9/12 rounded-lg overflow-hidden shadow border-transparent border-2 hover:shadow-xl hover:border-sky-600" 
            >
              <Link href={`Challenge/${c.id}`}>
                <div className="flex flex-col">
                  <Image
                    src={c.img}
                    alt={`${c.id}`}
                    className=" object-cover"
                    width={1030}
                    height={80}
                  />
                  <div className="mx-5 mt-5">
                    <h2 className="text-2xl mb-3 font-bold text-sky-800 ">
                      {c.title}
                    </h2>
                    <h3 className="text-lg text-gray-500">
                      {c.desc.slice(0, 100)}...
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          )
        )
      )}
      {challenges.length === 0 && (
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          No challenges yet
        </h1>
      )}
    </>
  );
}

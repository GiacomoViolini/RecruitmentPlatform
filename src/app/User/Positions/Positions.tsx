"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import supabase from "../../../../utils/supabase";
import logo from "/public/logo.svg";

interface Position {
    id: number;
    title: string;
    description: string;
    ral: string;
    position: string;
    images: string[];
    experience: number;
    type: string;
}

interface PositionsProps {
    searchPosition: string;
}

export default function Positions( search: PositionsProps ) {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
      async function fetchData() {
        try {
            if(search.searchPosition===""){
            const { data } = await supabase.from("Positions").select("*");
                setPositions(data!);
            }else {
                const { data } = await supabase.from("Positions").select("*").filter("title", "ilike", `%${search.searchPosition}%`);
                setPositions(data!);
            }
        } catch (error) {
          console.error("Error fetching data:", error);
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

    const [layout, setLayout] = useState("");
    useEffect(() => {
        if (isWindow && isWindow >= 1400) {
            setLayout("grid grid-cols-3 gap-28 px-8");
        } else if (isWindow && isWindow >= 900) {
            setLayout("grid grid-cols-2 gap-20 px-8");
        }
        else {
            setLayout("grid grid-cols-1 gap-28 px-8");
        }
    }, [isWindow]);


    return (
        <div className="flex justify-evenly pt-32 items-center  cursor:pointer">
            <div className={"grid " + layout + " gap-28 pb-8 "}>
                {positions.map((position) => (
                    <Link href={`Positions/${position.id}`}>
                        <div
                            key={position.id}
                            className="max-w-lg rounded overflow-hidden shadow-xl shadow-sky-50 hover:shadow-sky-100 px-6 py-4 bg-white justify-self-stretch"
                        >
                            <div className="flex flex-row justify-between items-center pt-2">
                                <div className="flex flex-row justify-start items-center gap-4 pt-1">
                                    <Image src={logo} alt="logo" width={30} height={30} className="mb-2"/>
                                    <div className="font-bold text-xl mb-2">{position.title}</div>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Apply
                                </button>
                            </div>
                            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-25 dark:opacity-50" />
                            <div className="py-4 text-left">
                                <div className="px-6 py-4">
                                    <div className="text-bold text-mb mb-4">{position.description.slice(0, 200)+"..." }</div>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-sky-200 rounded-md px-3 py-1 text-sm font-semibold text-sky-700 mr-2 mb-2">
                                        {"💸 RAL "+position.ral}
                                    </span>
                                    <span className="inline-block bg-sky-200 rounded-md px-3 py-1 text-sm font-semibold text-sky-700 mr-2 mb-2">
                                        {"📍"+position.position}
                                    </span>
                                    <span className="inline-block bg-sky-200 rounded-md px-3 py-1 text-sm font-semibold text-sky-700 mr-2 mb-2">
                                        {"👨🏽‍💻 "+position.experience} years of experience
                                    </span>
                                    <span className="inline-block bg-sky-200 rounded-md px-3 py-1 text-sm font-semibold text-sky-700 mr-2 mb-2">
                                        {position.type.includes("hybrid"&&"Hybrid")?"🏠"+"🏬"+position.type:position.type==="Full remote"?"🏠"+position.type:"🏬"+position.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
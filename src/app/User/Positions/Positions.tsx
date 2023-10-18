"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import supabase from "../../../../utils/supabase";
import logo from "/public/logo.svg";

interface Position {
    id: number;
    title: string;
    descrption: string;
    ral: string;
    position: string;
    images: string[];
    experience: number;
    type: string;
}

export default function Positions() {
    const [positions, setPositions] = useState<Position[]>([]);
    const [positionsIcon, setPositionsIcon] = useState("");

    useEffect(() => {
      async function fetchData() {
        try {
          const { data } = await supabase.from("Positions").select("*");
            setPositions(data!);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, []);
    return (
        <div className="flex justify-evenly items-center shadow-sky-200 cursor:pointer">
            <div className="grid grid-cols-3 gap-28 pb-8 px-8">
                {positions.map((position) => (
                    <Link href={`Positions/${position.title}`}>
                        <div
                            key={position.id}
                            className="max-w-2xl rounded overflow-hidden shadow px-6 py-4 bg-white justify-self-stretch"
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
                                {position.images && position.images.map((image) => (
                                    <Image key={image} src={image} alt="photo" width={100} height={100} />
                                ))}
                            <div className="py-4 text-left">
                                <div className="px-6 py-4">
                                    <div className="text-bold text-mb mb-4">{position.descrption.slice(0, 200)+"..." }</div>
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
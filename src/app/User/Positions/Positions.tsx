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

export default function Positions({ searchPosition }: PositionsProps) {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let { data } = await supabase.from("Positions").select("*");
                if (searchPosition) {
                    data = data!!.filter(position =>
                        position.title.toLowerCase().includes(searchPosition.toLowerCase())
                    );
                }
                setPositions(data!);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [searchPosition]);

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
        <div className="flex justify-evenly lg:pt-32 pt-10 items-center  cursor:pointer">
            <div className={"grid " + layout + " gap-28 pb-8 "}>
                {positions.map((position) => (
                    <Link href={`Positions/${position.id}`}>
                        <div
                            key={position.id}
                            className=" w-12/12 max-h- rounded-lg overflow-hidden shadow-xl  hover:shadow-2xl border-2 hover:border-sky-700 px-6 py-4 bg-white justify-self-stretch"
                        >
                            <div className="flex flex-row justify-between items-center pt-2">
                                <div className="flex flex-row justify-start items-center gap-4 pt-1">
                                    <Image src={logo} alt="logo" width={30} height={30} className="mb-2"/>
                                    <div className="font-bold text-2xl mb-2">{position.title}</div>
                                </div>
                            </div>
                            <hr className="my-10 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-25 dark:opacity-50" />
                            <div className=" text-left">
                                <div className="px-6">
                                    <div className="text-bold text-xl mb-4">{position.description.slice(0, 200)+"..." }</div>
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
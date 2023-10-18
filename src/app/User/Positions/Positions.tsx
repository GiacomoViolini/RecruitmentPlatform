"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import supabase from "../../../../utils/supabase";

interface Position {
    id: number;
    title: string;
    images: string[];
    description: string;
    ral: string;
    position: string;
    yearsOfExperience: number;
    typeOfPositions: string;
}

export default function Positions() {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await supabase.from("Positions").select("*");
                if (data) {
                    setPositions(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <div className="flex justify-evenly items-center ">
            <div className="grid grid-cols-3 gap-28 pb-8">
                {positions.map((position) => (
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
                                <div className="text-bold text-mb mb-4">{position.description}</div>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {position.ral}
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {position.position}
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {position.yearsOfExperience} years of experience
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {position.typeOfPositions}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

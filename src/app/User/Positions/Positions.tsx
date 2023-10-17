"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

interface Position {
    id: number;
    title: string;
    images: string[];
    description: string;
    role: string;
    position: string;
    yearsOfExperience: number;
    typeOfPositions: string;
}

export default function Positions() {
    const [positions, setPositions] = useState<Position[]>([]);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

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
            <div className="grid grid-cols-3 gap-28 ">
                {positions.map((position) => (
                    <div
                        key={position.id}
                        className="max-w-2xl rounded overflow-hidden shadow px-6 py-4 justify-self-stretch"
                    >
                        {position.images && position.images.map((image) => (
                            <Image key={image} src={image} alt="photo" width={1000} height={1000} />
                        ))}
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{position.title}</div>
                            <p className="text-gray-700 text-base">{position.description}</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {position.role}
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
                ))}
            </div>
        </div>
    );
}

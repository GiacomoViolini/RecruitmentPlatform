"use client";

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import supabase from "../../../../../utils/supabase";

interface PositionProps {
    id: number;
    title: string;
    description: string;
    ral: string;
    position: string;
    images: string[];
    experience: number;
    type: string;
}

interface PositionParams {
  params: {
    id: string;
  };
}

export default function Position({ params: { id } }: PositionParams) {
    const [Position, setPosition] = useState<PositionProps>();
    console.log(id);
    useEffect(() => {
        async function fetchData() {
        const { data, error } = await supabase
            .from("Positions")
            .select("*")
            .eq("id", id)
            .single();
            console.log(data);
        if (error) {
            console.error(error);
            return;
        }
        setPosition(data);
        }
        fetchData();
    }, []);
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        if (Position && Array.isArray(Position.images)) {
            const interval = setInterval(() => {
                setCounter(prevCounter => (prevCounter + 1) % Position.images.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [Position?.images]);

return (
    <>
    <div className="bg-slate-100 h-full">
        <Navbar />
        <div className="bg-slate-100 p-40 rounded-md ">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div id="carousel" className="relative w-full" >
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <Image src={Position?.images[counter] ?? ""} alt="photo" layout="fill" objectFit="cover" />
                    </div>
                </div>
                <div className="p-5">
                    <h5 className="pb-2 text-2xl font-bold tracking-tight">Noteworthy technology acquisitions 2021</h5>
                    <p className="pb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    </a>
                </div>
            </div>
        </div>
    </div>
    </>
);
}
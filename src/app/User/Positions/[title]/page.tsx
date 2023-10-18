"use client";

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import supabase from "../../../../../utils/supabase";

interface PositionProps {
    id: number;
    title: string;
    descrption: string;
    ral: string;
    position: string;
    images: string[];
    experience: number;
    type: string;
}

interface PositionParams {
  params: {
    title: string;
  };
}

export default function Position({ params: { title } }: PositionParams) {
  const [Position, setPosition] = useState<PositionProps>();
  console.log(title);
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Positions")
        .select("*")
        .eq("title", title)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      setPosition(data);
    }
    fetchData();
  }, []);

return (
    <>
        <Navbar />
        <div className="bg-light-bg h-full pb-3 flex flex-col items-center">
            <div className="pt-8 bg-white border border-gray-200 rounded-lg shadow">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </>
);
}
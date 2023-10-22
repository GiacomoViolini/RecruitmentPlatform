"use client";

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import supabase from "../../../../../utils/supabase";
import logo from "/public/logo.svg";
import Link from "next/link";
import { MouseEvent } from "react";


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

interface ApplicationProps {
    email: string;
    applications: {
        steps: string;
        title: string;
        page_id: number;
    }[];
    status: string;
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

    const [isWindow, setIsWindow] = useState<number | undefined>();
    const [user, setUser] = useState<string | undefined>();

    useEffect(() => {
        async function fetchUser() {
            const { data } = await supabase.auth.getSession();
            if (data && data.session?.user) {
              setUser(data.session.user.email);
            }
          }
        fetchUser();
    }, []);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
            const { data: existingData } = await supabase
              .from("Home_Positions")
              .select("*")
              .eq("email", user)
              .single();
            if (existingData == null) {
              const { data } = await supabase
                .from("Home_Positions")
                .insert({
                  email: user,
                  applications: [{ steps: "1", title: Position?.title, page_id: Position?.id, }],
                })
                .select();
            } else {
              const { data, error } = await supabase
                .from("Home_Positions")
                .update({
                  applications: [
                    ...existingData.applications,
                    { steps: "1", title: Position?.title, page_id: Position?.id,},
                  ],
                })
                .eq("email", user);
            }
          };

    useEffect(() => {
      const handleResize = () => {
        setIsWindow(window.innerWidth);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [logoLayout, setLogoLayout] = useState("");
    const [dimensions, setDimensions] = useState(0);
    const [layoutText, setLayoutText] = useState("");
    const [ralRange, setRalRange] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (Position?.ral.length!! > 8) {
            setRalRange(true);
          }
        };
        handleResize();
      }, [Position?.ral]);

    useEffect(() => {
    if (isWindow && isWindow >= 1280) {
        setLogoLayout("items-center w-44 h-44  rounded-full justify-center -translate-y-32 translate-x-32 bg-white");
        setDimensions(100);
        setLayoutText("text-4xl font-bold text-center pt-4 px-8 text-white -translate-y-20 translate-x-32");
    } else if (isWindow && isWindow >= 1000) {
        setLogoLayout("items-center w-32 h-32  rounded-full justify-center -translate-y-24 translate-x-16 bg-white");
        setDimensions(80);
        setLayoutText("text-xl font-bold text-center pt-4 px-8 text-white -translate-y-16 translate-x-24");
    } else if(isWindow && isWindow >= 600) {
        setLogoLayout("items-center w-24 h-24  rounded-full justify-center -translate-y-8 translate-x-8 bg-white");
        setDimensions(40);
        setLayoutText("text-md font-bold text-left pt-4 px-8 text-white -translate-y-32 translate-x-4");
    }else {
        setLogoLayout("items-center w-24 h-24  rounded-full justify-center -translate-y-8 translate-x-8 bg-white");
        setDimensions(40);
        setLayoutText("text-sm font-bold text-left pt-4 px-8 text-white -translate-y-40 translate-x-1");
    }
    }, [isWindow]);
    
return (
    <>
    <div className="bg-slate-100 h-full z-0">
        <Navbar />
        <div className="bg-slate-100 pt-28 pb-8 px-8 rounded-md z-0 ">
            <div className="p-4 bg-white border border-gray-200 rounded-lg ">
            <div className=" h-48 rounded-lg bg-blue-500">
            </div>
                <div className="flex flex-row z-0">
                    <div className={"flex items-center justify-center" + logoLayout}>
                        <Image src={logo} height={dimensions} width={dimensions} alt="Rounded logo"/>
                    </div>
                    <div className={"text-4xl font-bold text-center pt-8 px-8 text-white -translate-y-20 translate-x-32"+layoutText}>{Position?.title ?? ""}</div>
                </div>
                    <div className="relative aspect-video rounded-2xl w-full h-10 py-48  lg:-translate-y-20 ">
                        <Image src={Position?.images[counter] ?? ""} alt="photo" layout={"fill"} className={"rounded-2xl"} objectFit={"cover"} />
                    </div>
                <div className="p-8 lg:-translate-y-10">
                    <h5 className="pb-2 text-2xl font-bold tracking-tight">{"📍"+Position?.position}</h5>
                    <p className="py-16 font-normal text-gray-700 ">{Position?.description}</p>
                    <p className="pb-8 text-2xl font-bold tracking-tight" >RAL</p>
                    {ralRange ? (
                        <span className="inline-block bg-sky-200 h-10 w-60 flex justify-center items-center shadow-md  rounded-md px-3 py-4 text-md font-semibold text-sky-700 mr-2 mb-2">
                            {"💸 RAL "+Position?.ral}
                        </span>) : (
                        <span className="inline-block bg-sky-200 h-10 w-40 flex justify-center items-center shadow-md rounded-md px-3 py-4 text-md font-semibold text-sky-700 mr-2 mb-2">
                            {"💸 RAL "+Position?.ral}
                        </span>)
                    }
                    <p className="pt-8 pb-8 text-2xl font-bold tracking-tight">Experience</p>
                    <span className="inline-block bg-sky-200 flex justify-center items-center h-10 w-56 shadow-md rounded-md px-3 py-4 text-md font-semibold text-sky-700 mr-2 mb-2">
                        {"👨🏽‍💻 "+Position?.experience} years of experience
                    </span>
                    <p className="pt-8 pb-8 text-2xl font-bold tracking-tight">Type of contract</p>
                    <span className="inline-block bg-sky-200 flex justify-center items-center sm:20 md:h-10 sm:80 md:w-96 shadow-md rounded-md px-3 py-4 text-md font-semibold text-sky-700 mr-2 mb-2">
                        {Position?.type.includes("hybrid"&&"Hybrid")?"🏠"+"🏬"+Position?.type:Position?.type==="Full remote"?"🏠"+Position?.type:"🏬"+Position?.type}
                    </span>
                    <div className="flex flex-row justify-start items-center gap-4 pt-16">
                        <Link href={`/User/Positions/Application?title=${Position?.title}`}>
                            <button onClick={handleClick} className=" cursor-pointer inline-flex items-center px-3 py-2 text-xl w-60 h-10 justify-center shadow-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                                Apply
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
);
}
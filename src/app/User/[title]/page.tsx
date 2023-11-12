"use client";
import Navbar from "../navbar";
import supabase from "../../../../utils/supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./header";
import feedback from "../../../../public/feedback.svg";

interface PositionParams {
  params: {
    title: string;
  };
}

interface Info2 {
  title: string;
  steps: number;
  page_id: number;
  points: number;
}

export default function FeedbackPage({ params: { title } }: PositionParams) {
  const [steps, setSteps] = useState<number>();
  const [isWindow, setIsWindow] = useState<number>();
  const [logoLayout, setLogoLayout] = useState<string>();
  const [dimensions, setDimensions] = useState<number>();
  const [layoutText, setLayoutText] = useState<string>();
  const [user, setUser] = useState<string>();
  const [applications, setApplications] = useState<Info2[]>([]);
  const DataArray: number[] = Array(5).fill(0);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getSession();
      if (data && data.session?.user) {
        setUser(data.session.user.email);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
      async function fetchPositions() {
        const { data, error } = await supabase
          .from("Home_Positions")
          .select("*")
          .eq("email", user)
          .maybeSingle();
        if (data) {
          setApplications(data.applications);
        }
        if (error) {
          console.log(error);
        }
      }
      fetchPositions();
    }, [user]);

    useEffect(() => {
      async function fetchSteps() {
        const stringa = title;
        const deleteSpace = stringa.replace("%20", " ");
        console.log(deleteSpace);
        for (let i = 0; i < 5; i++) {
          if (applications[i] && applications[i].title === deleteSpace) {
            console.log(applications[i].steps);
            setSteps(applications[i].steps);
            console.log(applications[i].title);
          }
        }
      }
      fetchSteps();

    }, [applications]);

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isWindow && isWindow >= 990) {
      setLogoLayout(
        "items-center w-44 h-44 rounded-full justify-center -translate-y-24 translate-x-16 bg-white"
      );
      setDimensions(90);
      setLayoutText(
        "text-4xl font-bold text-center pt-4 px-8 text-white -translate-y-20 translate-x-32"
      );
    } else if (isWindow && isWindow >= 600) {
      setLogoLayout(
        "items-center w-24 h-24 pb-4 sm:pb-2 rounded-full justify-center -translate-y-16 translate-x-8 bg-white"
      );
      setDimensions(70);
      setLayoutText(
        "text-md font-bold text-left pt-4 px-8 text-white -translate-y-32 translate-x-4"
      );
    } else if (isWindow && isWindow >= 500) {
      setLogoLayout(
        "items-center w-24 h-24 pb-4 sm:pb-2 rounded-full justify-center -translate-y-16 translate-x-8 bg-white"
      );
      setDimensions(60);
      setLayoutText(
        "text-md font-bold text-left pt-4 px-8 text-white -translate-y-32 translate-x-4"
      );
    } else {
      setLogoLayout(
        "items-center w-24 pb-8 sm:pb-4 h-24 rounded-full justify-center -translate-y-8 translate-x-8 bg-white"
      );
      setDimensions(40);
      setLayoutText(
        "text-sm font-bold text-left pt-4 px-8 text-white -translate-y-40 translate-x-1"
      );
    }
  }, [isWindow]);

  var str = title;
  var replacedTitle = str.replace("%20", " ");

  const stepProcess: {[key: number]: string} = {
    1: "Technical Assessment",
    2: "Technical Interview",
    3: "Behavioral Interview",
    4: "Team Work Session Simulation"
  }

  return (
    <>
      <div className="bg-slate-100 h-full z-0">
        <Navbar />
        <div className="bg-slate-100 h-full pt-28 pb-8 px-4 rounded-md z-0 ">
          <div className="p-4 bg-white h-full border border-gray-200 rounded-lg ">
            <div className=" h-48 rounded-lg bg-blue-500"></div>
            <div className="flex flex-row z-0">
              <div className={"flex items-center justify-center" + logoLayout}>
                <Image
                  src={feedback}
                  alt="Rounded logo"
                  height={dimensions}
                  width={dimensions}
                  loading="lazy"
                  quality={80}
                />
              </div>
              <div
                className={
                  "text-4xl font-bold text-center pt-8 px-8 text-white -translate-y-20 translate-x-32" +
                  layoutText
                }
              >
                {replacedTitle ?? ""}
              </div>
            </div>
              <div className="flex flex-col justify-center md:justify-start w-full">
                <div className="text-2xl font-bold text-center md:text-start pt-2 px-8 -translate-y-10 text-blue-500">
                  Feedback review on your {stepProcess[steps ?? 0]}
                </div>
                <Header steps={steps ?? 0}/>
                <div className="flex flex-row h-80 justify-center items-center gap-4">
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
"use client";

import { use, useCallback, useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import supabase from "../../../../../utils/supabase";
import logo from "/public/logo.png";
import { ChangeEvent } from "react";
import React from "react";
import { useRouter } from "next/navigation";

interface PositionProps {
  id: number;
  title: string;
  description: string;
  ral: string;
  position: string;
  images: string[];
  livingcost: string;
  experience: number;
  type: string;
  technologies: string[];
  benefits: string[];
  events: string[];
}

interface PositionParams {
  params: {
    id: string;
  };
}

export default function Position({ params: { id } }: PositionParams) {
  const [Position, setPosition] = useState<PositionProps>();
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [isWindow, setIsWindow] = useState<number | undefined>();
  const [user, setUser] = useState<string | undefined>();
  const [logoLayout, setLogoLayout] = useState("");
  const [dimensions, setDimensions] = useState(0);
  const [layoutText, setLayoutText] = useState("");
  const [ralRange, setRalRange] = useState(false);
  const [benefits, setBenefits] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [buttonSwitch, setButtonSwitch] = useState(true);

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
  }, [id]);

  useEffect(() => {
    if (Position && Array.isArray(Position.images)) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => (prevCounter + 1) % Position.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [Position]);

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
          applications: [
            {
              steps: "1",
              title: Position?.title,
              page_id: Position?.id,
              points: Math.round(Math.random() * 100),
            },
          ],
        })
        .select();
      if (data) {
        setButtonSwitch(false);
      }
    } else {
      const { data, error } = await supabase
        .from("Home_Positions")
        .update({
          applications: [
            ...existingData.applications,
            {
              steps: "1",
              title: Position?.title,
              page_id: Position?.id,
              points: Math.round(Math.random() * 100),
            },
          ],
        })
        .eq("email", user);
    }
    router.push("/User");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isWindow && isWindow >= 1000) {
      setLogoLayout(
        "items-center w-44 h-44  rounded-full justify-center -translate-y-32 translate-x-32 bg-white"
      );
      setDimensions(100);
      setLayoutText(
        "text-4xl font-bold text-center text-white -translate-y-20 translate-x-32"
      );
    } else if (isWindow && isWindow >= 600) {
      setLogoLayout(
        "items-center w-24 h-24 sm:pb-2 rounded-full justify-center -translate-y-8 translate-x-8 bg-white"
      );
      setDimensions(30);
      setLayoutText(
        "text-md font-bold text-left text-white -translate-y-32 translate-x-4"
      );
      }
  }, [isWindow]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined;
    if (e.target.files) {
      file = e.target.files[0];
    }
    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("cv")
          .upload(`cv/${file.name}`, file, {
            cacheControl: "3600",
          });
        if (data) {
          console.log(data);
          setDisabled(false);
        }
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpload2 = async (e1: ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined;
    if (e1.target.files) {
      file = e1.target.files[0];
    }
    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("coverletter")
          .upload(`coverletter/${file.name}`, file, {
            cacheControl: "3600",
          });
        if (data) {
          console.log(data);
        }
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ref1 = React.createRef<HTMLInputElement>();
  const ref = React.createRef<HTMLInputElement>();

  const handlecoverletter = () => {
    if (ref1.current) {
      ref1.current.click();
    }
  };

  const handlecv = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <>
      <div className="bg-slate-100 h-full z-0">
        <Navbar />
        <div className="bg-slate-100 pt-28 pb-8 px-2 lg:px-8 rounded-md z-0 ">
          <div className="p-4 bg-white border border-gray-200 rounded-lg ">
            <div className=" h-48 rounded-lg bg-blue-500"></div>
            <div className="flex flex-row z-0">
              <div className={"flex items-center justify-center" + logoLayout}>
                <Image
                  src={logo}
                  height={dimensions}
                  width={dimensions}
                  alt="Rounded logo"
                  loading="lazy"
                  quality={100}
                />
              </div>
              <div
                className={
                  "text-4xl font-bold text-center pt-8 px-8 text-white -translate-y-20 translate-x-32" +
                  layoutText
                }
              >
                {Position?.title ?? ""}
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl w-full h-10 py-48  lg:-translate-y-20 ">
              <Image
                src={Position?.images[counter] ?? ""}
                alt="photo"
                layout={"fill"}
                className={"rounded-2xl"}
                objectFit={"cover"}
                loading="lazy"
                quality={100}
              />
            </div>
            <div className="p-8 lg:-translate-y-10">
              <h5 className="text-2xl font-bold tracking-tight">
                {"📍" + Position?.position}
              </h5>
              <p className="py-4 text-lg text-gray-700 ">
                {Position?.description}
              </p>
              <p className="py-4 text-2xl font-bold tracking-tight">BS</p>
              {ralRange ? (
                <span className="bg-sky-200 h-12 w-60 flex justify-center items-center shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                  {"💸 " + Position?.ral}
                </span>
              ) : (
                <span className="bg-sky-200 h-12 w-40 flex justify-center items-center shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                  {"💸 " + Position?.ral}
                </span>
              )}
              <p className="py-4 text-2xl font-bold tracking-tight">
                Experience
              </p>
              <span className=" bg-sky-200 flex justify-center items-center h-12 w-56 shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                {"👨🏽‍💻 " + Position?.experience} years of experience
              </span>
              <p className="py-4 text-2xl font-bold tracking-tight">
                Type of contract
              </p>
              <span className=" bg-sky-200 flex justify-center items-center sm:20 md:h-12 sm:80 md:w-96 shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                {Position?.type.includes("hybrid" && "Hybrid")
                  ? "🏠" + "🏬" + Position?.type
                  : Position?.type === "Full remote"
                  ? "🏠" + Position?.type
                  : "🏬" + Position?.type}
              </span>
              <p className="py-4 text-2xl font-bold tracking-tight">
                Average living cost per person for this location
              </p>
              <span className=" bg-sky-200 flex justify-center items-center h-12 w-56 shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                {"💸 " + Position?.livingcost}
              </span>
              <p className="py-4 text-2xl font-bold tracking-tight">
                Tools/Skill required
              </p>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {Position?.technologies?.map((tech,i) => (
                  <span key={i} className="bg-sky-200 h-12 w-40 justify-center text-center items-center flex shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                    {[
                      "java",
                      "python",
                      "r",
                      "javascript",
                      "html",
                      "css",
                      "swift",
                      "kotlin",
                      "typescript",
                      "node.js",
                      "ruby",
                      "sql",
                    ].some((lang) => tech.toLowerCase().includes(lang))
                      ? "👨‍💻 " + tech
                      : "🔧 " + tech}
                  </span>
                ))}
              </div>
              <p className="py-4 text-2xl font-bold tracking-tight">Benefits</p>
              <div className="flex justify-start w-full items-center gap-2 flex-wrap">
                {Position?.benefits?.map((benefit,i) => (
                  <span key={i}
                    className={`${
                      benefits
                        ? "bg-sky-200 h-12 text-center w-60 flex justify-center items-center shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700"
                        : "bg-sky-200 h-12 text-center w-40 flex justify-center items-center shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700"
                    }`}
                  >
                    {benefit.toLowerCase().includes("insurance")
                      ? "🏥 " + benefit
                      : benefit.toLowerCase().includes("schedule")
                      ? "🗓 " + benefit
                      : benefit.toLowerCase().includes("remote")
                      ? "🏠 " + benefit
                      : benefit}
                  </span>
                ))}
              </div>
              <h2 className=" text-2xl font-bold tracking-tight">Events</h2>
              <div className="flex flex-row justify-start items-center gap-2 flex-wrap">
                {Position?.events?.map((event,i) => (
                  <span key={i} className="bg-sky-200 h-12 w-50 flex justify-center items-center shadow-md rounded-md px-3 py-1 text-sm font-semibold text-sky-700">
                    {"🎉 " + event}
                  </span>
                ))}
              </div>
              <div className="flex flex-row justify-start items-center pt-16 ">
                <div className="flex flex-row justify-start items-center">
                  <div className="flex flex-row justify-start items-center gap-8 pb-2 sm:pb-0 ">
                    <button
                      onClick={handleClick}
                      className={`
                          ${
                            disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "opacity-100 cursor-pointer"
                          }
                          bg-blue-700 hover:bg-blue-800 inline-flex items-center px-1 sm:px-3 py-1 text-xl w-36 sm:w-60 h-10 justify-center shadow-md font-medium text-center text-white rounded-lg `}
                      disabled={disabled}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="flex flex-row justify-evenly items-center ml-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="">
                        <div
                          onClick={handlecv}
                          className="cursor-pointer inline-flex items-center px-3 text-xl w-10 sm:w-20 h-10 justify-center shadow-md hover:shadow-blue-200 font-medium text-center text-white bg-none rounded-full border-blue-600 border-2 hover:border-blue-800"
                        >
                          <Image
                            src="/cv.svg"
                            alt="cv"
                            width={20}
                            height={20}
                          />
                          <input
                            type="file"
                            className="hidden"
                            ref={ref}
                            onChange={(e) => handleUpload(e)}
                          />
                        </div>
                      </div>
                      <h3 className="text-xs sm:text-md text-center sm:text-start font-bold tracking-tight text-blue-600">
                        Upload your CV
                      </h3>
                    </div>
                    <div className=" flex flex-col items-center gap-2 ml-4">
                      <div className="">
                        <div
                          onClick={handlecoverletter}
                          className="cursor-pointer inline-flex items-center  text-xl w-10 sm:w-20 h-10 justify-center shadow-md hover:shadow-blue-200 font-medium text-center text-white bg-none rounded-full border-blue-600 border-2 hover:border-blue-800"
                        >
                          <Image
                            src="/letter.svg"
                            alt="coverletter"
                            width={20}
                            height={20}
                          />
                          <input
                            type="file"
                            className="hidden"
                            ref={ref1}
                            onChange={(e1) => handleUpload2(e1)}
                          />
                        </div>
                      </div>
                      <h3
                        className="text-xs sm:text-md text-center sm:text-start font-bold         
                    tracking-tight text-blue-600"
                      >
                        Upload your Cover Letter
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "./drawer";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isWindow, setIsWindow] = useState<number | undefined>();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isWindow && isWindow >= 800 ? (
        <div
          className="fixed flex w-full h-24 justify-evenly items-center"
          style={{ background: "linear-gradient(#1E90FF,#00A3E1)", zIndex: 1000 }}
        >
          <div className=" font-bold w-30 h-max">
            <Link
              href="/User"
              className={
                pathname == "/User"
                  ? "2xl:text-3xl lg:text-2xl bold text-white underline decoration-white divide-opacity-100"
                  : "2xl:text-3xl lg:text-2xl bold text-white"
              }>
              Home
            </Link>
          </div>
          <div className=" font-bold w-30 h-max">
            <Link
              href="/User/Challenge"
              className={
                pathname == "/User/Challenge"
                  ? "2xl:text-3xl lg:text-2xl bold text-white underline decoration-white divide-opacity-100"
                  : "2xl:text-3xl lg:text-2xl bold text-white"
              }
            >
              Challenges
            </Link>
          </div>
          <div className=" font-bold w-30 h-max">
            <Link
              href="/User/Positions"
              className={
                pathname == "/User/Positions"
                  ? "2xl:text-3xl lg:text-2xl bold text-white underline decoration-white divide-opacity-100"
                  : "2xl:text-3xl lg:text-2xl bold text-white"
              }
            >
              Positions
            </Link>
          </div>
        </div>
      ) : (
        <Drawer/>
      )}
    </>
  );
}
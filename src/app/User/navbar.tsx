"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const [menu, setMenu] = useState(false);

  return (
    <>
      {isWindow && isWindow >= 800 ? (
        <div
          className="flex w-full h-24 justify-evenly items-center fixed"
          style={{ background: "linear-gradient(#1E90FF,#00A3E1)" }}
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
        <div
          className="flex w-full h-24 justify-between items-center fixed"
          style={{ background: "linear-gradient(to bottom, #1E90FF,#00A3E1)" }}
        >
          <h1 className="font-bold w-30 h-max pl-10 text-2xl text-white">
            ZUCCHETTI
          </h1>
          <div className="w-30 h-max pr-10">
            <Image
              src="/drawer.svg"
              alt="drawer menù"
              width={30}
              height={30}
              onClick={() => {
                setMenu(!menu);
              }}
            />
            {menu && (
              <div
                className="fixed top-0 right-0 w-80 h-full bg-opacity-50"
                style={{
                  background: "linear-gradient(to bottom, #1E90FF,#1a8cff)",
                }}
              >
                <div className="flex flex-col h-full justify-evenly items-center start bg-opacity-50">
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

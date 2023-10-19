import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Drawer() {
    const pathname = usePathname();
    const [menu, setMenu] = useState(false);
    const [visibility, setVisibility] = useState("");

    return (
        <>
            <div
                className="fixed flex w-full h-24 justify-between items-center fixed"
                style={{ background: "linear-gradient(to bottom, #1E90FF,#00A3E1)", zIndex: 1000 }}
            >
                <h1 className="font-bold w-30 h-max pl-10 text-2xl text-white">ZUCCHETTI</h1>
                <div className="w-30 h-30 pr-10">
                    <Image
                        src="/drawer.svg"
                        alt="drawer menù"
                        width={30}
                        height={30}
                        onClick={() => {
                            setMenu(!menu);
                            setVisibility("invisible");
                        }}
                        className={"cursor-pointer " + visibility}
                    />
                </div>
            </div>
            {menu && (
                <>
                    <div className="fixed top-0 w-full h-full bg-black opacity-50" style={{ zIndex: 1000 }} />
                    <div
                        className="fixed top-0 right-0 h-screen p-4 overflow-y-auto transition-transform translate-x-30 w-72 "
                        style={{ background: "linear-gradient(#00A3E1, #1E90FF)", zIndex: 1001 }}
                    >
                        <div className="flex flex-col h-full justify-evenly items-center start bg-opacity-50">
                            <div className="font-bold w-30 h-30">
                                <Link
                                    href="/User"
                                    className={
                                        pathname == "/User"
                                            ? "2xl:text-3xl lg:text-2xl bold text-white underline decoration-white divide-opacity-100"
                                            : "2xl:text-3xl lg:text-2xl bold text-white"
                                    }
                                >
                                    Home
                                </Link>
                            </div>
                            <div className="font-bold w-30 h-30">
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
                            <div className="font-bold w-30 h-30">
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
                </>
            )}
        </>
    );
}

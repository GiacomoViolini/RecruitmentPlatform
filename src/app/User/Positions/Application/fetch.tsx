"use client";

import supabase from "../../../../../utils/supabase";
import { useEffect, useState } from "react";

export default function Application() {
    const [user, setUser] = useState<string>();
    const [application, setApplication] = useState<ApplicationProcess | null>(null);

    interface ApplicationProcess{
        steps: string,
        title: string,
        page_id: number
    }

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
        async function fetchData() {
            if (user) {
                const { data, error } = await supabase
                    .from("Home_Positions")
                    .select("Applications")
                    .eq("email", user)
                    .maybeSingle();
                if (error) {
                    console.error(error);
                    return;
                }
                if (data && data.Applications && data.Applications.length > 0) {
                    const lastApplication = data.Applications[data.Applications.length - 1];
                    setApplication(lastApplication);
                }
            }
        }
        fetchData();
    }, []);

    return(
        <div className="flex py-40 px-8 justify-center items-center">
            <div className="flex flex-col rounded-xl w-full h-screen bg-white ">
                <div className="flex justify-start pt-16 items-top pl-16">
                    <h1 className="text-4xl font-bold text-sky-700">{application?.title}</h1>
                </div>
            </div>
        </div>
    );
}
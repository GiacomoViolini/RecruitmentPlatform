"use client";
import Navbar from "../navbar";
import Header from "./header";
import supabase from "../../../../utils/supabase";
import {useState, useEffect} from "react";

interface PositionParams {
  params: {
    title: string;
  };
}

interface Info {
  title: string;
  steps: number;
  page_id: number;
}

export default function Feedback({ params: { title } }: PositionParams) {
  const [steps, setSteps] = useState<number>();
  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await supabase
          .from("Home_Challenges")
          .select("*")
          .eq("title",title) 
          setSteps(data!![0].steps)     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  var str = title;   
  var replacedTitle = str.replace("%20", " ");
  const divStyle = {
    width : '75%'
  };
  return (
    
    <div className="bg-slate-50 h-full text-center">
      <Navbar />
      <h1 className = "2xl:text-8xl text-3xl font-bold text-center pt-40 pb-14 border-b-4">{replacedTitle}</h1>
      <Header />
      <div className="bg-white flex mt-20 lg:ml-32 ml-10 lg:w-9/15 w-9/12 rounded-md overflow-hidden shadow border-2 border-transparent hover:border-sky-600 hover:shadow-2xl">
      <div className="mx-5 flex flex-col items-center">
        <div className="mt-3 mr-5">
          <h2 className="lg:text-4xl text-2xl mb-12 font-bold text-sky-800">
            Statistics
          </h2>
        </div>
        <div className="mt-3 mr-5">
          <p className="lg:text-4xl text-2xl mb-12 font-bold text-sky-800">
             Steps Completed: ${steps}
          </p>
        </div>
        
      </div>
      </div>
    </div>
  );
}

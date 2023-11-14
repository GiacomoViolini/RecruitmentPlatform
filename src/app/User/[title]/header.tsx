"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import supabase from "../../../../utils/supabase";

interface HeaderProps {
  steps: number;
  points: number;
  title: string;
}

interface questionsObject {
  questions: string[];
}

export default function Header({ steps, points, title }: HeaderProps) {
  const chartRef = useRef<Chart>();
  const chartRef2 = useRef<Chart>();
  const chartRef3 = useRef<Chart>();
  const [DataArray, setDataArray] = useState<number[]>(Array(5).fill(0));
  const [Positioning, setPositioning] = useState<number[]>(Array(5).fill(0));
  const [questions, setQuestions] = useState<questionsObject[]>();
  const percentage = Math.round((points / 140) * 100).toString() + "%";
  const [isWindow, setIsWindow] = useState<number>();

  useEffect(() => {
    async function fetchQuestions(title: string) {
      const { data, error } = await supabase
        .from("PossibleQuestions")
        .select("*")
        .eq("title", title)
        .maybeSingle();
      if (error) {
        console.error(error);
      }
      console.log("title: " + title);
      console.log(data);
      setQuestions(data.questions);
    }
    fetchQuestions(title);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWindow(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isWindow]);

  useEffect(() => {
    async function fetchDataforGraph(points: number) {
      for (let i = 0; i < steps!!; i++) {
        DataArray[i] = points;
      }
      setDataArray(DataArray);
      for (let j = 0; j < steps!!; j++) {
        if (points == 100) {
          Positioning[j] = 100;
        } else Positioning[j] = Math.round((points / 105) * 100);
      }
    }
    fetchDataforGraph(points);
  }, [steps]);

  const [feedback, setFeedback] = useState<string>("nothing");

  useEffect(() => {
    async function fetchFeedback() {
      const feedbackMessages: { [key: number]: { [key: number]: string } } = {
        1: {
          0: "Your performance in the technical assignment did not meet the expected standards. There is a significant gap in your understanding of foundational concepts, and improvements are essential in various areas. Further focused efforts and a deeper commitment to learning are required to bring your skills up to the desired level.",
          1: "In the technical assignment, your foundational understanding was evident, showcasing a commendable effort. However, there's an opportunity for growth in certain areas. Encouraging further development in these specific aspects will undoubtedly enhance your overall skills and performance. Your commitment to understanding the foundational concepts is notable, and with focused efforts, you can build a robust skill set that goes beyond expectations.",
          2: "Your performance in the technical assignment was notable, revealing a solid grasp of key concepts. While some areas displayed proficiency, there's room for a deeper understanding in others. Your commendable effort in this assignment sets a positive foundation with clear potential for growth. The clarity of your presentation and the depth of your understanding in certain areas demonstrate a promising capability that can be further honed for excellence.",
          3: "Impressive doesn't quite cover it. Your performance in the technical assignment not only met but exceeded our expectations. Your high level of competence and nuanced understanding of the task stood out. Well done on a task exceptionally executed. The precision and ingenuity you demonstrated in solving complex problems showcased an advanced level of understanding that deserves recognition and appreciation.",
          4: "Consider your work on the technical assignment nothing short of exceptional. Your mastery of the concepts and the solutions provided surpassed our expectations. Your analytical prowess and problem-solving skills are not just commendable but truly outstanding. Your dedication to excellence is highly commendable. Your ability to tackle challenges with innovative solutions sets a standard for excellence that goes above and beyond.",
        },
        2: {
          0: "Your performance in the technical interview did not meet the expected standards. There is a significant gap in your understanding of technical concepts, and improvements are essential in various areas. Further focused efforts and a deeper commitment to learning are required to bring your skills up to the desired level.",
          1: "In the technical interview, your basic understanding was apparent, but certain aspects proved challenging. Your responses indicated a foundation, but focused improvement in specific areas is recommended for a more confident performance. Your ability to navigate through technical challenges demonstrates promise, and with targeted improvement, you can elevate your performance to a more advanced level.",
          2: "Your performance in the technical interview was positive, showcasing a solid grasp of key technical concepts. While some responses were strong, there's an opportunity for additional depth in others. Overall, it was a commendable performance, and there's clear potential for growth. Your proficiency in handling technical questions is evident, and with a deeper exploration of certain topics, you can enhance your overall technical expertise.",
          3: "The technical interview was nothing short of excellent. Your strong understanding of complex technical topics, coupled with clear and insightful responses, truly impressed us. Your problem-solving skills were particularly noteworthy. Well done on a task exceptionally executed. Your ability to articulate complex technical concepts and provide insightful solutions showcased an advanced level of expertise that goes beyond expectations.",
          4: "Consider your performance in the technical interview outstanding. Not only did you meet expectations, but you exceeded them. Your exceptional depth of knowledge and the ability to articulate complex concepts and solve problems in real-time set you apart from the rest. Your confidence and expertise left a lasting positive impression. Your ability to tackle advanced technical challenges with ease and clarity is a testament to your exceptional technical acumen.",
        },
        3: {
          0: "Your performance in the behavioral interview did not meet the expected standards. There is a significant gap in your understanding of behavioral concepts, and improvements are essential in various areas. Further focused efforts and a deeper commitment to learning are required to bring your skills up to the desired level.",
          1: "In the behavioral interview, you demonstrated basic competencies. However, some responses lacked depth, suggesting areas for improvement in articulating experiences and achievements more comprehensively. Your experiences and achievements provide a solid foundation, and with a more detailed exploration of your journey, you can offer a richer understanding of your skills and capabilities.",
          2: "Your performance in the behavioral interview was positive, displaying good communication and interpersonal skills. While examples illustrated your experiences well, there's room for enhancement in providing more detailed insights. Overall, it was a promising interaction with clear potential for growth. Your ability to communicate effectively and showcase your experiences is commendable, and with a more detailed exploration of specific instances, you can provide a more comprehensive view of your skills.",
          3: "The behavioral interview was truly impressive. Your exhibited strong communication skills, problem-solving abilities, and clear alignment with our company's values were evident. This positive interaction showcased your potential for seamless integration into our team. Your ability to align your experiences with our company values is commendable, and with continued emphasis on detailed storytelling, you can offer a more vivid picture of your journey.",
          4: "Exceptional doesn't quite capture it. Your performance in the behavioral interview not only met but exceeded expectations. Your detailed and insightful responses, conveying experiences, values, and teamwork, were outstanding and left a lasting positive impression. Your communication skills and cultural alignment make you an ideal fit for our team. Your ability to articulate experiences with depth and insight is remarkable and sets a high standard for effective communication.",
        },
        4: {
          0: "Your performance in the teamwork simulation did not meet the expected standards. There is a significant gap in your understanding of collaborative dynamics, and improvements are essential in various areas. Further focused efforts and a deeper commitment to learning are required to bring your skills up to the desired level.",
          1: "In the teamwork simulation, your grasp of collaborative dynamics was apparent, but there's an opportunity for more in-depth knowledge. Further exposure and collaboration with the team could enhance your integration and understanding of our unique teamwork dynamics. Your awareness of collaborative dynamics is evident, and with more exposure and collaboration, you can contribute more deeply to the success of the team. Your potential to thrive in a collaborative environment is clear, and with a deeper understanding, you can play a more integral role in achieving team goals.",
          2: "Your participation in the teamwork simulation was positive, demonstrating an understanding of collaborative dynamics and effective contribution to the discussion. Some areas could be refined, but overall, it was a promising collaborative effort, indicating potential for growth. Your ability to contribute effectively to team discussions is commendable, and with refinement in certain areas, you can become an even more valuable team member. Your collaborative instincts and contributions during the simulation showcase a strong foundation, and with targeted improvements, you can elevate your teamwork skills.",
          3: "The teamwork simulation was excellent. You seamlessly integrated into the team, showcasing strong collaboration and communication skills. Your contributions were valuable, and you demonstrated a clear understanding of our team's collaborative culture. Your positive impact on teamwork dynamics was evident, and we look forward to seeing how you continue to contribute. Your ability to integrate seamlessly into the team is commendable, and with sustained efforts, you can continue to make meaningful contributions to our collaborative culture. Your teamwork skills, combined with a nuanced understanding of team dynamics, make you an asset to any collaborative environment.",
          4: "Consider your performance in the teamwork simulation exceptional. You not only integrated seamlessly but also became a valuable contributor from the outset. Your enthusiasm and collaborative spirit make you an ideal fit for our team, and we're excited about the prospect of working together. Your proactive engagement and positive influence on teamwork dynamics set a high standard for collaboration. Your ability to bring enthusiasm and a collaborative spirit to the team is truly exceptional and sets you apart as a valuable team member. Your leadership potential in a collaborative setting is evident, and we see great potential for your continued impact on the success of the team.",
        },
      };

      const range = DataArray[steps - 1];
      let ranges;
      console.log(range);
      if (range >= 50 && range < 65) ranges = 1;
      else if (range >= 65 && range < 80) ranges = 2;
      else if (range >= 80 && range < 90) ranges = 3;
      else if (range >= 90 && range <= 100) ranges = 4;
      else ranges = 0;

      const feedback = feedbackMessages[steps]?.[ranges] || "nothing";
      setFeedback(feedback);
    }
    fetchFeedback();
  }, [steps]);

  useEffect(() => {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Technical Assesment",
          "Technical Interview",
          "Behavioral Interview",
          "Team Work Session Simulation",
        ],
        datasets: [
          {
            label: "Performance",
            data: DataArray,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
          },
        },
        maintainAspectRatio: false,
      },
    });
  }, [steps]);

  useEffect(() => {
    const canvas = document.getElementById(
      "PositioningChart"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    chartRef2.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Technical Assesment",
          "Technical Interview",
          "Behavioral Interview",
          "Team Work Session Simulation",
        ],
        datasets: [
          {
            indexAxis: "y",
            label: "Ranking",
            data: Positioning,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            min: 0,
            max: 100,
          },
        },
        maintainAspectRatio: false,
      },
    });
  }, [steps]);

  useEffect(() => {
    const canvas = document.getElementById(
      "PositioningChart2"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef3.current) {
      chartRef3.current.destroy();
    }

    chartRef3.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Technical Assesment",
          "Technical Interview",
          "Behavioral Interview",
          "Team Work Session Simulation",
        ],
        datasets: [
          {
            label: "Percentage of candidates beated",
            data: Positioning,
            backgroundColor: [
              "rgba(20,78,240, 0.2)",
              "rgba(20,78,240, 0.2)",
              "rgba(20,78,240, 0.2)",
              "rgba(20,78,240, 0.2)",
              "rgba(20,78,240, 0.2)",
            ],
            borderColor: [
              "rgba(20,78,240, 1)",
              "rgba(20,78,240, 1)",
              "rgba(20,78,240, 1)",
              "rgba(20,78,240, 1)",
              "rgba(20,78,240, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
          },
        },
        maintainAspectRatio: false,
      },
    });
  }, [steps]);

  return (
    <div className="flex flex-col w-full pb-4">
      <div className="flex md:flex-row flex-col justify-between">
        <div className="2xl:text-lg text-md font-bold text-center md:text-start pt-8 px-8 text-gray-500">
          {feedback}
        </div>
        <div className="container w-full md:w-6/12 md:h-80 h-96 md:pt-4 lg:pt-0 md:px-8 pr-8 rounded-md my-10">
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div className="flex flex-col w-full md:pt-24 ">
        <div className="text-3xl font-bold text-center md:text-start px-8  text-blue-500">
          Your positioning relative to the other candidates
        </div>
        { isWindow && isWindow > 1000 && <div className="flex w-full lg:flex-row flex-col items-center sm:pt-16 justify-between">
          <div className="container w-full lg:w-6/12 md:visible invisible md:h-80 pt-12 md:pt-8 lg:pt-0 px-8 rounded-md">
            <canvas id="PositioningChart"></canvas>
          </div>
          <div className="h-full md:pt-8 flex flex-col justify-center px-8 md:visible invisible  lg:pr-24 xl:pr-32 pr-0 ">
            <div className="relative z-0 h-full">
              <svg width={450} height={250} className="pt-2 pr-2 lg:pt-0 z-1">
                <defs>
                  <linearGradient
                    id="progressive-bg"
                    x1="0.5"
                    y1="1"
                    x2="0.5"
                    y2="0"
                  >
                    <stop
                      offset="0%"
                      stopOpacity="1"
                      stopColor="rgba(54, 162, 235, 0.2)"
                    />
                    <stop
                      offset={percentage}
                      stopOpacity="1"
                      stopColor="rgba(54, 162, 235, 0.2)"
                    />
                    <stop
                      offset={percentage}
                      stopOpacity="0"
                      stopColor="rgba(0, 0, 255, 1)"
                    />
                    <stop
                      offset="100%"
                      stopOpacity="0"
                      stopColor="rgba(0, 0, 255, 1)"
                    />
                  </linearGradient>
                </defs>
                <rect width={350} height={250} fill="url(#progressive-bg)" />
                <image href="/Subtract.svg" width={400} height={320} />
              </svg>
            </div>
            <div className="sm:text-lg text-md font-bold text-start pt-4 px-8 text-gray-500">
              You beated the {Positioning[steps - 1]}% of the candidates
            </div>
          </div>
        </div>}
        {isWindow && isWindow <= 1000 && <div className="container w-full md:w-6/12 h-96 md:px-8 my-4 flex justify-center rounded-md ">
          <canvas id="PositioningChart2"></canvas>
        </div>}
      </div>
      <div className="flex flex-col w-full pt-0 md:pt-24 ">
        <div className="text-3xl font-bold text-center md:text-start mb-14 px-8  text-blue-500">
          Possible questions on the next interview
        </div>
        <div className="grid grid-cols-2 justify-start items-start gap-4 lg:gap-14">
          {questions?.map((q, i) => (
            <div className="flex flex-col gap-6 flex-wrap items-center" key={i}>
              <h2 className="bg-sky-100 h-24 w-full lg:w-1/2 flex justify-center items-center shadow-xl rounded-3xl px-3 py-2 text-2xl font-bold text-sky-800 mb-5">{"Step: " + (i+1)}</h2>
              {q.questions.map((question,j) => (
                <span className="bg-sky-200  h-60 lg:h-20 w-full flex justify-center items-center shadow-md rounded-md  px-2 lg:px-5 py-2 text-base font-semibold text-sky-700" key={j}>
                  {"❓ " + question} 
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

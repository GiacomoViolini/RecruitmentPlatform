import Navbar from "../../navbar";
import Image from "next/image";

interface ChallengeProps {
  params: {
    id: string;
    title: string;
    img: string;
    desc: string;
  };
}

async function getChallenge(id: string) {
  const res = await fetch("http://localhost:4000/challenges/" + id, {
    next: {
      revalidate: 120,
    },
  });

  return res.json();
  
}

export default async function challenge({ params: { id } }: ChallengeProps) {
  const challenge = await getChallenge(id);
  return (
    <div className="bg-light-bg h-full pb-3 flex flex-col items-center">
      <Navbar />
      <div
        key={challenge.title}
        className="bg-white flex my-32 mx-auto h-96 w-10/12 rounded-xl overflow-hidden shadow border-transparent border-2"
      >
        <Image
          src={"/" + challenge.img}
          alt={id}
          className="object-contain"
          width={500}
          height={96}
        />
        <div className="ml-5 mt-5 flex flex-col items-center justify-between">
          <div>
            <h2 className="text-2xl mb-3 font-bold text-sky-800">
              {challenge.title}
            </h2>
            <h3 className="text-lg text-gray-500">{challenge.desc}</h3>
          </div>
          <button className="bg-sky-500 px-8 py-2 mb-3 rounded-md text-white text-xl font-semibold hover:bg-sky-400">
            Unisciti!
          </button>
        </div>
      </div>
    </div>
  );
}

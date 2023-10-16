import Image from "next/image"

async function getChallenges() {
  const res = await fetch("http://localhost:4000/challenges");

  return res.json();
}

export default async function ChallengesList() {
  const challenges = await getChallenges();

  return (
    <>
      {challenges.map((c: { title: string, desc: string, img: string }) => (
        <div
          key={c.title}
          className="bg-white flex my-12 mx-auto h-48 w-9/12 rounded-xl overflow-hidden shadow border-transparent border-2"
        >
          <Image src={"/" +c.img} alt={c.title} className="object-fit" width={300} height={70}/>
          <div className="ml-5 mt-5">
            <h2 className="text-2xl mb-3 font-bold text-sky-800">{c.title}</h2>
            <h3 className="text-lg text-gray-500">{c.desc.slice(0, 300)}...</h3>
          </div>
        </div>
      ))}
    </>
  );
}

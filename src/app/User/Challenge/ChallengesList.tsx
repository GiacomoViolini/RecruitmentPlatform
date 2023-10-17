import Image from "next/image";
import Link from "next/link";

async function getChallenges() {
  const res = await fetch("http://localhost:4000/challenges", {
    next: {
      revalidate: 120,
    },
  });
  return res.json();
}

export default async function ChallengesList() {
  const challenges = await getChallenges();

  return (
    <>
      {challenges.map(
        (c: { title: string; desc: string; img: string; id: string }) => (
          <div
            key={c.title}
            className="bg-white my-12 mx-auto h-48 w-9/12 rounded-xl overflow-hidden shadow border-transparent border-2 hover:shadow-xl hover:border-sky-800"
          >
            <Link href={`Challenge/${c.id}`}>
              <div className="flex">
                <Image
                  src={"/" + c.img}
                  alt={c.id}
                  className="object-fit"
                  width={300}
                  height={70}
                />
                <div className="ml-5 mt-5">
                  <h2 className="text-2xl mb-3 font-bold text-sky-800">
                    {c.title}
                  </h2>
                  <h3 className="text-lg text-gray-500">
                    {c.desc.slice(0, 300)}...
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        )
      )}
      {challenges.length === 0 && (
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          No challenges yet
        </h1>
      )}
    </>
  );
}

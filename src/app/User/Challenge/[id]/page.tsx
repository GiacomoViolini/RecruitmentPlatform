import Navbar from "../../navbar";

interface ChallengeProps {
  params: {
    id: string;
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
  const ticket = await getChallenge(id);
  return (
    <div className="bg-light-bg h-full pb-3 flex flex-col items-center">
      <Navbar />
      <div className="bg-cyan-600 p-20 mt-20">
        <h1 className="text-black">aaaaaaaaaaa{id}</h1>
      </div>
    </div>
  );
}

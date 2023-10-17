import Navbar from "../../navbar";

interface ChallengeProps {
  params: {
    id: string;
  };
}

async function getChallenge(id: string) {
  const res = await fetch("http://localhost:4000/challenges", {
    next: {
      revalidate: 120,
    },
  });

  return res.json();
}

export default async function challenge({ params: { id } }: ChallengeProps) {
    const ticket = await getChallenge(id);
    return (
        <>
            <Navbar />
            <div>{id}</div>
        </>
    );
}

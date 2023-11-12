import Navbar from "../navbar";
import ChallengesList from "./ChallengesList";

const gradientText = {
  background: "linear-gradient(45deg,  #0074E4, #00A3E1, #00C9FF)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
};


export default function challenge() {
  return (
    <div className="bg-gray-100 h-full pb-3 flex flex-col items-center">
      <Navbar />
      <h1 className="2xl:text-6xl text-3xl  font-bold text-center pt-40 pb-14 border-b-4" style={gradientText}>
        Join our Competitions!
      </h1>
      <ChallengesList />
    </div>
  );
}
import Navbar from "../navbar";
import ChallengesList from "./ChallengesList";

export default function challenge() {
  return (
    <div className=" bg-slate-50 h-full pb-3 flex-col justify-center items-center">
      <Navbar />
      <h1 className="2xl:text-5xl lg:text-3xl font-semibold text-sky-700 text-center my-28">
        Join our Challenges!
      </h1>
      <ChallengesList />
    </div>
  );
}

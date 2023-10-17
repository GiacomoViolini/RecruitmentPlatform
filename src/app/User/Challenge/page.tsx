import Navbar from "../navbar";
import ChallengesList from "./ChallengesList";

export default function challenge() {
  return (
    <div className="bg-light-bg h-full pb-3 flex flex-col items-center">
      <Navbar />
      <h1 className="2xl:text-5xl lg:text-3xl font-semibold text-sky-700 text-center my-28">
        Join our Competitions!
      </h1>
      <ChallengesList />
    </div>
  );
}

import Navbar from "../navbar";
import ChallengesList from "./ChallengesList";

export default function challenge() {
  return (
    <div className="bg-gray-100 h-full pb-3 flex-col justify-center items-center">
      <Navbar />
      <ChallengesList/>
    </div>
  );
}

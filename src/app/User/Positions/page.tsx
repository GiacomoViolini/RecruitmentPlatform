import Navbar from "../navbar";
import Heading from "./heading";
import PositionsFromSupabase from "./Positions";

export default function Positions() {
  return (
    <div className="bg-slate-50 h-full">
      <Navbar />
      <Heading />
    </div>
  );
}
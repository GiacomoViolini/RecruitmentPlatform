import Navbar from "../navbar";
import Heading from "./heading";
import PositionsFromSupabase from "./Positions";

interface Position {
  id: number;
  title: string;
  images: string[];
  description: string;
  role: string;
  position: string;
  yearsOfExperience: number;
  typeOfPositions: string;
}

interface PositionsProps {
  positions: Position[];
}

export default function Positions() {
  return (
    <div className="bg-slate-50 h-full">
      <Navbar />
      <Heading />
      <PositionsFromSupabase/>
    </div>
  );
}
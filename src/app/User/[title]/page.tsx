import Navbar from "../navbar";
import Header from "./header";

interface PositionParams {
  params: {
    title: string;
  };
}


export default function Feedback({ params: { title } }: PositionParams) {
  const divStyle = {
    width : '75%'
  };
  return (
    <div className="bg-slate-50 h-full">
      <Navbar />
      <Header />
    </div>
  );
}

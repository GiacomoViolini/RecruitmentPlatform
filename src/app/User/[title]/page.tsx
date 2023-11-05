import Navbar from "../navbar";

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
      <div className="flex flex-col items-center justify-center h-full">   
          <div className="h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500" style={{width: '75%'}}>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">75%</span>
          </div>          
      </div>
    </div>
  );
}

export default function Header() {
    const divStyle = {
      width : '75%'
    };
    return (
      <div className="flex flex-row justify-center items-center w-full rounded-lg pt-20">
        <div className="animate-pulse h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500" style={{width:'50%'}}>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">75%</span>
        </div>
      </div>    
    );
  }
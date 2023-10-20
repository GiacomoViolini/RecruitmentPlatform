import Navbar from "../../navbar";
import Fetch from "./fetch";

    export default function Application() {
     
        
        return(
        <div className="bg-slate-100 h-full">
            <Navbar />
            <Fetch />
        </div>
    );
    }
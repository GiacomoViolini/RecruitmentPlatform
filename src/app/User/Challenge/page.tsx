import Navbar from "../navbar";

export default function challenge() {
  return (
    <div className="bg-gray-100 h-screen flex-col justify-center items-center">
      <Navbar />
      <div className="bg-white flex my-12 mx-auto h-48 w-9/12 rounded-xl overflow-hidden shadow border-transparent border-2">
        <img src="../prova.jpg" alt="image" className="w-80 object-fit" />
        <div className="ml-5 mt-5">
          <h2 className="text-2xl mb-3 font-bold text-sky-900">Title</h2>
          <h3 className="text-lg text-gray-600">Description</h3>
        </div>
      </div>
      <div className="bg-white flex my-12 mx-auto h-48 w-9/12 rounded-xl overflow-hidden shadow border-transparent border-2">
        <img src="../prova.jpg" alt="image" className="w-80 object-fit" />
        <div className="ml-5 mt-5">
          <h2 className="text-2xl mb-3 font-bold text-sky-900">Title</h2>
          <h3 className="text-lg text-gray-600">Description</h3>
        </div>
      </div>
    </div>
  );
}

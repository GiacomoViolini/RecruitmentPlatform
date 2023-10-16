

export default function Home() {
  return ( 
    <div className= "bg-slate-300 mx-auto my-48 w-96 py-10 px-5 border-2 border-slate-400 rounded-xl">
      <form className ="flex-col justify-center">
        <h1 className = "text-3xl mb-6 text-center">Login</h1>
        <h2 className = "text-lg">Email</h2>
        <input className= "mb-4 rounded-sm" type="text" name="email" />
        <h2 className = "text-lg">Password</h2>
        <input className = "text-lg rounded-sm" type="text" name="password" />
      </form>
    </div>
  );
}

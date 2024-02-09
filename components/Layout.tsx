import NavBar from "@/components/NavBar";
import { useSession, signIn } from "next-auth/react";
import React, { ReactNode } from "react";
import Loader from "./Loader";

 const Layout = ({ children }: { children: ReactNode }) => {
  const {data:session, status} = useSession();

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">
           <Loader/>
           </div>;
  }


  if (!session || status !== "authenticated") {
    return (
      <main className='bg-gray-200 h-screen w-screen flex items-center'>
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-sky-400 p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-bgGray min-w-full flex">
      <div className="w-1/5 p-4 min-h-screen">
      <NavBar />
      </div>
      <div className="bg-gray-100 drop-shadow-xl p-4 w-4/5 my-3 mr-3 rounded-lg">
      {children}
      </div>   
    </main>
  );
};

export default Layout
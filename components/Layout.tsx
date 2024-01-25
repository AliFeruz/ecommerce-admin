import NavBar from "@/components/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { ReactNode } from "react";

 const Layout = ({ children }: { children: ReactNode }) => {
  const {data:session, status} = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }


  if (!session || status !== "authenticated") {
    return (
      <main className='bg-sky-900 h-screen w-screen flex items-center'>
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-sky-400 p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-sky-600 min-h-screen w-screen flex">
      <NavBar />
      <div className="bg-sky-100 p-4 flex-grow my-3 mr-3 rounded-lg">
      {children}
      </div>   
    </main>
  );
};

export default Layout
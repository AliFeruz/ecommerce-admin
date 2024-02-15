import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ['aliferuzfox@gmail.com']
const adapter = MongoDBAdapter(clientPromise) as any; 

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter,
  callbacks: {
    session: ({ session} : any) => {
      if (adminEmails.includes(session?.user?.email)){
        return {
          ...session,
        };
      } else {
        return false
      }
    },
  },
}

export default NextAuth(authOptions);

export async function isAdminRequest({req, res} : any){
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)){
    throw 'You are not an admin!';
  }
}
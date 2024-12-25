"use client"
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
const Home = () => {
  const { user } = useUser();
  redirect((user) ? "/home" : "/guess")
}

export default Home;
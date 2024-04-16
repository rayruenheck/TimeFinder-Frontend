'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";


export default function Home() {
  const {data : session } = useSession()

  if(session){
  console.log(session)
}
  return (
    
    <div>
      Access Token
    </div>
    
  );
}

"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession()

  // checking if sessions exists
  if (session) {
    console.log(session.user)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
        <Image
          src={session.user?.image as string}
          fill
          alt=""
          className="object-cover rounded-full"
        />
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  // rendering components for not logged in users
  return (
   
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <a href="/startscreen">startscreen</a>
      <a href="/googleconnect">googleconnect</a>
      <a href="/taskscreen">taskscreen</a>
        <p className="text-2xl mb-2">Not Signed In</p>
        <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>Sign in with google</button>
    </div>
  )

}
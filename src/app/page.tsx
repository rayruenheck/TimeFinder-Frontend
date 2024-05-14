"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "./components/header";



export default function Home() {
  
    const router = useRouter();

    return (
        <div className='mx-auto p-4 w-[393px]'>
        <Header progressBarNumber={0}/>
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
        <Image unoptimized width={300} height={300} src="/images/Demo.gif" alt="TimeFinder Image" className="w-64 h-auto mb-4" />
          <h2 className="text-heading-2 mt-[64px]">Scheduling the right task at the right time for you</h2>
          <p className="text-subhead-1 mt-[16px]">
           TimeFinder helps you complete your tasks by scheduling them for you. Matching tasks to open times and your peak concentration increases your success!
          </p>
          <button onClick={()=>{router.push('/googleconnect')}} className="button-1 mt-[40px]">get started</button>
          <h3 className="button-2 mt-[16px]">Already have and account? Sign in here.</h3>
          </div>
        </div>
        
      );

}
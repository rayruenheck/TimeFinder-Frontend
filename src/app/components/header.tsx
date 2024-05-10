import Image from "next/image"
export default function Header() {
  
    return (  
    <Image
        src="/images/logo.png"
        alt="Time Finder Logo"
        width={193}
        height={60}
        className="object-contain"
      />
    
  )
}

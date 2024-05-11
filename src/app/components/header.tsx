import Image from "next/image";

interface HeaderProps {
  progressBarNumber: number; // Updated to accept 0 as a possible value
}

export default function Header({ progressBarNumber }: HeaderProps) {
  // Map the progress bar number to the correct image file
  const progressBarImage = progressBarNumber > 0 ? `/images/Progress Bar ${progressBarNumber}.png` : null;

  return (
    <div className="flex flex-col ">
      {/* Logo with justify-start */}
      <div className="flex justify-start w-full">
        <Image
          src="/images/logo.png"
          alt="Time Finder Logo"
          width={193}
          height={16}
          className="object-contain mb-[16px]"
        />
      </div>

      {/* Progress Bar with justify-center */}
      <div className="flex flex-col items-center mb-[40px]">
      {progressBarImage && (
        <Image
          src={progressBarImage}
          alt={`Progress Bar ${progressBarNumber}`}
          width={173}
          height={8}
          className="object-contain"
        />
      )}
      </div>
    </div>
  );
}

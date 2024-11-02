import Image from "next/image";
import Link from "next/link";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">

      {/* Left Sidebar Navigation */}
      {/* <nav className="fixed left-0 top-0 flex flex-col justify-between w-28 h-full bg-black bg-opacity-60 z-20 p-4">
 */}
        {/* Flex container for links */}
        {/* <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col flex-grow justify-around">
          <Link href="/apod" className="text-white text-center px-2 py-2">APOD Astronomy Picture of the Day </Link>
          <Link href="/mars" className="text-white text-center px-2 py-2">Mars Rover Photos</Link>
          <Link href="/asteroids" className="text-white text-center px-2 py-2">Asteroids</Link>
        </div>
        </div>
      </nav>
 */}
      {/* Main Content Area */}
      {/* <div className="flex-1 flex flex-col items-center justify-center relative p-8 pb-20 gap-16 sm:p-20 ml-28"> */}

        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black opacity-40 z-10"></div> */}

          <main className="z-20 flex flex-col gap-8 items-center text-white">
            <h1 className={`text-4xl sm:text-5xl font-bold ${spaceMono.className}`}>
              Find Your Universe
            </h1>
          </main>

        {/* <footer className="absolute bottom-8 flex gap-6 flex-wrap items-center justify-center w-full z-10"> */}
          {/* Footer content */}
        {/* </footer> */}
      </div>
    // </div>
  );
}

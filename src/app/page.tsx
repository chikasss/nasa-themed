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

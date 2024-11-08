

import { metadata } from "./metadata";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { APODProvider } from './apod/APODContext';
import { MarsRoverProvider } from './mars/MarsRoverContext';
import { SearchProvider } from './contexts/SearchContext';
import SearchBar from './components/SearchBar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <APODProvider>
          <MarsRoverProvider>
            <SearchProvider>
              <div className="relative flex min-h-screen font-sans bg-landing-main bg-cover bg-center">

                {/* Navigation Bar */}
                <nav className="fixed left-0 top-0 flex flex-col justify-between w-32 h-full bg-black bg-opacity-70 z-20 p-4">
                  <div className="flex flex-col justify-around h-full">
                    <Link href="/apod" className="text-white text-center px-2 py-2">APOD</Link>
                    <Link href="/mars" className="text-white text-center px-2 py-2">Mars Rover Photos</Link>
                    <Link href="/asteroids" className="text-white text-center px-2 py-2">Asteroids</Link>
                  </div>
                </nav>

                {/* Main Content */}
                <main className="relative z-30 flex-1 ml-32 flex flex-col items-center justify-center p-4">

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-10 pointer-events-none" />

                  {/* Page Content */}
                  <div className="relative z-20">
                   {children}
                  </div>
                </main>
              </div>
            </SearchProvider>
          </MarsRoverProvider>
        </APODProvider>
      </body>
    </html>
  );
}

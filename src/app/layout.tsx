import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { APODProvider } from './apod/APODContext';

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <APODProvider>
        <div className="relative flex min-h-screen font-sans bg-landing-main bg-cover bg-center">

          {/* Left Sidebar Navigation */}
          <nav className="fixed left-0 top-0 flex flex-col justify-between w-32 h-full bg-black bg-opacity-50 z-20 p-4">
            <div className="flex flex-col justify-around h-full">
              <Link href="/apod" className="text-white text-center px-2 py-2">APOD Astronomy Picture of the Day</Link>
              <Link href="/mars" className="text-white text-center px-2 py-2">Mars Rover Photos</Link>
              <Link href="/asteroids" className="text-white text-center px-2 py-2">Asteroids</Link>
            </div>
          </nav>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

          {/* Main Content Area */}
          <main className="flex-1 ml-32 flex flex-col items-center justify-center p-8">
            {children}
          </main>
        </div>
        </APODProvider>
      </body>
    </html>
  );
}

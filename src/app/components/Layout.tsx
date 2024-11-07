import React from "react";
import Link from "next/link";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex items-center justify-start p-4 z-10">
        <Link
          href="/"
          className="bg-white bg-opacity-90 text-black p-2 rounded-md shadow-md hover:bg-blue-150"
        >
          Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-1">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

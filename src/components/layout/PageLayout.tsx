
import React from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-white/90 border-b border-purple-100 shadow-sm">
        <div className="flex h-16 items-center px-4 lg:px-6">
          <MobileNav />
          <Navbar />
        </div>
      </div>
      <main className="flex-1 relative">
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[250px] w-[250px] rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;

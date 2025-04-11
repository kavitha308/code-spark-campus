
import React from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex h-16 items-center px-4 border-b lg:px-6">
        <MobileNav />
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default PageLayout;

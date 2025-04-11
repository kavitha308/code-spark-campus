
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Code,
  PenTool,
  Menu,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
              Campus Bridge
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-4">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={handleNavigation}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/courses"
              className={`nav-link ${isActive("/courses") ? "active" : ""}`}
              onClick={handleNavigation}
            >
              <BookOpen className="h-5 w-5" />
              Courses
            </Link>
            <Link
              to="/coding"
              className={`nav-link ${isActive("/coding") ? "active" : ""}`}
              onClick={handleNavigation}
            >
              <Code className="h-5 w-5" />
              Coding
            </Link>
            <Link
              to="/assignments"
              className={`nav-link ${isActive("/assignments") ? "active" : ""}`}
              onClick={handleNavigation}
            >
              <PenTool className="h-5 w-5" />
              Assignments
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

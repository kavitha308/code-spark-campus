
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BookOpenText,
  Code,
  BarChart,
  ListChecks,
  CalendarDays,
  UserCircle,
  Trophy,
  Briefcase,
  Menu,
  Home,
  GraduationCap,
  Users,
  MessageSquare,
  Code2,
  FileCode,
  GitBranch,
  MapPin,
} from "lucide-react";

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const MobileNav = () => {
  const [open, setOpen] = React.useState(false);

  const closeSheet = () => {
    setOpen(false);
  };

  const academicItems: NavItem[] = [
    {
      title: "Courses",
      path: "/courses",
      icon: BookOpenText,
    },
    {
      title: "Assignments",
      path: "/assignments",
      icon: ListChecks,
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: CalendarDays,
    },
    {
      title: "Attendance",
      path: "/attendance",
      icon: BarChart,
    },
    {
      title: "Faculty",
      path: "/faculty",
      icon: Users,
    },
    {
      title: "Discussions",
      path: "/discussions",
      icon: MessageSquare,
    },
  ];

  const codingItems: NavItem[] = [
    {
      title: "Practice",
      path: "/coding",
      icon: Code,
    },
    {
      title: "Challenges",
      path: "/coding-challenges",
      icon: Code2,
    },
    {
      title: "Live Coding",
      path: "/live-coding",
      icon: FileCode,
    },
    {
      title: "Learning Paths",
      path: "/learning-paths",
      icon: GitBranch,
    },
  ];

  const careerItems: NavItem[] = [
    {
      title: "Performance",
      path: "/performance",
      icon: BarChart,
    },
    {
      title: "Leaderboard",
      path: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Job Matches",
      path: "/job-matches",
      icon: Briefcase,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-lg"
              onClick={closeSheet}
            >
              <Home className="h-5 w-5 text-campus-purple" />
              <span className="bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
                Home
              </span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-semibold"
              onClick={closeSheet}
            >
              <BarChart className="h-5 w-5 text-campus-blue" />
              Dashboard
            </Link>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="academics">
              <AccordionTrigger className="flex items-center gap-2 font-semibold text-left">
                <GraduationCap className="h-5 w-5 text-campus-purple" />
                Academic
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  {academicItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="flex items-center gap-2 hover:text-campus-purple py-1"
                      onClick={closeSheet}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="coding">
              <AccordionTrigger className="flex items-center gap-2 font-semibold text-left">
                <Code className="h-5 w-5 text-campus-blue" />
                Coding
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  {codingItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="flex items-center gap-2 hover:text-campus-blue py-1"
                      onClick={closeSheet}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="career">
              <AccordionTrigger className="flex items-center gap-2 font-semibold text-left">
                <MapPin className="h-5 w-5 text-campus-green" />
                Career
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  {careerItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="flex items-center gap-2 hover:text-campus-green py-1"
                      onClick={closeSheet}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 font-semibold"
              onClick={closeSheet}
            >
              <UserCircle className="h-5 w-5 text-campus-orange" />
              Profile
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

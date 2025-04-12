
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  BookOpenText,
  Code,
  BarChart,
  ListChecks,
  CalendarDays,
  UserCircle,
  Trophy,
  Briefcase,
  LucideIcon,
  Users,
  GraduationCap,
  MessageSquare,
  Code2,
  FileCode,
  GitBranch,
  MapPin,
  Home
} from "lucide-react";

interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

const NavigationMenuDemo = () => {
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
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <GraduationCap className="mr-2 h-4 w-4" />
            Academic
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {academicItems.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-campus-purple" />
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Access and manage your {item.title.toLowerCase()}.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Code className="mr-2 h-4 w-4" />
            Coding
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {codingItems.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-campus-blue" />
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.title === "Practice"
                          ? "Practice coding with interactive challenges."
                          : item.title === "Challenges"
                          ? "Test your skills with competitive challenges."
                          : item.title === "Live Coding"
                          ? "Collaborate and code in real-time."
                          : "Follow structured paths to improve your skills."}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MapPin className="mr-2 h-4 w-4" />
            Career
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {careerItems.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-campus-green" />
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.title === "Performance"
                          ? "Track your academic and coding performance."
                          : item.title === "Leaderboard"
                          ? "See how you rank among your peers."
                          : "Find job opportunities matching your skills."}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/profile">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;

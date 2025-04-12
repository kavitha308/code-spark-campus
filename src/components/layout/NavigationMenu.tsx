
import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  LayoutDashboard,
  BookOpen,
  Code,
  PenTool,
  Trophy,
  UserPlus,
  BarChart3,
  Users,
  Calendar,
  FileCheck,
  MessageSquare,
  Briefcase,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationMenuDemo = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={cn(
            navigationMenuTriggerStyle(),
            isActive("/") ? "bg-purple-100 text-campus-purple" : ""
          )}>
            <Home className="w-4 h-4 mr-1" /> Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={isActive("/dashboard") ? "bg-purple-100 text-campus-purple" : ""}
          >
            <LayoutDashboard className="w-4 h-4 mr-1" /> Dashboard
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/dashboard"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-blue/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                  >
                    <LayoutDashboard className="h-6 w-6 text-campus-purple" />
                    <div className="mb-2 mt-4 text-lg font-medium">Overview</div>
                    <p className="text-sm text-muted-foreground">
                      View your academic and coding progress at a glance
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/performance"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-green/20 to-campus-blue/20 p-6 no-underline outline-none focus:shadow-md"
                  >
                    <BarChart3 className="h-6 w-6 text-campus-blue" />
                    <div className="mb-2 mt-4 text-lg font-medium">Performance Analytics</div>
                    <p className="text-sm text-muted-foreground">
                      Detailed insights into your academic and coding metrics
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/calendar"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-yellow/20 to-campus-orange/20 p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Calendar className="h-6 w-6 text-campus-orange" />
                    <div className="mb-2 mt-4 text-lg font-medium">Calendar</div>
                    <p className="text-sm text-muted-foreground">
                      View upcoming classes, deadlines and events
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/attendance"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-pink/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                  >
                    <FileCheck className="h-6 w-6 text-campus-pink" />
                    <div className="mb-2 mt-4 text-lg font-medium">Attendance</div>
                    <p className="text-sm text-muted-foreground">
                      Monitor your attendance records and history
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={isActive("/courses") ? "bg-purple-100 text-campus-purple" : ""}
          >
            <BookOpen className="w-4 h-4 mr-1" /> Academics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/courses" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <BookOpen className="h-5 w-5 text-campus-green" />
                    <div>
                      <div className="font-medium">Courses</div>
                      <p className="text-sm text-muted-foreground">Access all your enrolled courses</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/assignments" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <PenTool className="h-5 w-5 text-campus-purple" />
                    <div>
                      <div className="font-medium">Assignments</div>
                      <p className="text-sm text-muted-foreground">View and submit assignments</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/faculty" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <Users className="h-5 w-5 text-campus-blue" />
                    <div>
                      <div className="font-medium">Faculty</div>
                      <p className="text-sm text-muted-foreground">Connect with professors and instructors</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/discussions" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <MessageSquare className="h-5 w-5 text-campus-orange" />
                    <div>
                      <div className="font-medium">Discussions</div>
                      <p className="text-sm text-muted-foreground">Participate in course discussions</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={isActive("/coding") ? "bg-purple-100 text-campus-purple" : ""}
          >
            <Code className="w-4 h-4 mr-1" /> Coding
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/coding" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <Code className="h-5 w-5 text-campus-blue" />
                    <div>
                      <div className="font-medium">Code Editor</div>
                      <p className="text-sm text-muted-foreground">Practice coding with our online editor</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/coding-challenges" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <PenTool className="h-5 w-5 text-campus-green" />
                    <div>
                      <div className="font-medium">Challenges</div>
                      <p className="text-sm text-muted-foreground">Solve coding challenges and problems</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/leaderboard" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <Trophy className="h-5 w-5 text-campus-orange" />
                    <div>
                      <div className="font-medium">Leaderboard</div>
                      <p className="text-sm text-muted-foreground">See how you rank among peers</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/job-matches" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                    <Briefcase className="h-5 w-5 text-campus-pink" />
                    <div>
                      <div className="font-medium">Job Matches</div>
                      <p className="text-sm text-muted-foreground">Find job opportunities that match your skills</p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/leaderboard" className={cn(
            navigationMenuTriggerStyle(),
            isActive("/leaderboard") ? "bg-purple-100 text-campus-purple" : ""
          )}>
            <Trophy className="w-4 h-4 mr-1" /> Leaderboard
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;

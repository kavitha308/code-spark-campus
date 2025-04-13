
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
  User,
  GraduationCap,
  ChartBar,
  FileText,
  BarChart,
  Database,
  Flag,
  Database as DatabaseIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const NavigationMenuDemo = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const userRole = profile?.role || "student";

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
        
        {/* Student Dashboard */}
        {userRole === "student" && (
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
        )}
        
        {/* Faculty Dashboard */}
        {userRole === "teacher" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={isActive("/faculty-dashboard") ? "bg-purple-100 text-campus-purple" : ""}
            >
              <LayoutDashboard className="w-4 h-4 mr-1" /> Faculty Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/faculty-dashboard"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-blue/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <LayoutDashboard className="h-6 w-6 text-campus-purple" />
                      <div className="mb-2 mt-4 text-lg font-medium">Dashboard</div>
                      <p className="text-sm text-muted-foreground">
                        Manage your courses and monitor student progress
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/attendance"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-green/20 to-campus-blue/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <FileCheck className="h-6 w-6 text-campus-blue" />
                      <div className="mb-2 mt-4 text-lg font-medium">Attendance</div>
                      <p className="text-sm text-muted-foreground">
                        View and mark student attendance
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/assignments"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-yellow/20 to-campus-orange/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <FileText className="h-6 w-6 text-campus-orange" />
                      <div className="mb-2 mt-4 text-lg font-medium">Assignments</div>
                      <p className="text-sm text-muted-foreground">
                        Create and grade student assignments
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/calendar"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-pink/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Calendar className="h-6 w-6 text-campus-pink" />
                      <div className="mb-2 mt-4 text-lg font-medium">Schedule</div>
                      <p className="text-sm text-muted-foreground">
                        Manage your teaching schedule and events
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        
        {/* Admin Dashboard */}
        {userRole === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={isActive("/admin-dashboard") ? "bg-purple-100 text-campus-purple" : ""}
            >
              <LayoutDashboard className="w-4 h-4 mr-1" /> Admin Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/admin-dashboard"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-blue/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <LayoutDashboard className="h-6 w-6 text-campus-purple" />
                      <div className="mb-2 mt-4 text-lg font-medium">Dashboard</div>
                      <p className="text-sm text-muted-foreground">
                        Overview of system metrics and activity
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/admin-dashboard?tab=users"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-green/20 to-campus-blue/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Users className="h-6 w-6 text-campus-blue" />
                      <div className="mb-2 mt-4 text-lg font-medium">User Management</div>
                      <p className="text-sm text-muted-foreground">
                        Manage students and faculty accounts
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/admin-dashboard?tab=courses"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-yellow/20 to-campus-orange/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <BookOpen className="h-6 w-6 text-campus-orange" />
                      <div className="mb-2 mt-4 text-lg font-medium">Course Management</div>
                      <p className="text-sm text-muted-foreground">
                        Manage courses and educational content
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/admin-dashboard?tab=reports"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-pink/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <BarChart className="h-6 w-6 text-campus-pink" />
                      <div className="mb-2 mt-4 text-lg font-medium">Reports</div>
                      <p className="text-sm text-muted-foreground">
                        Generate and export platform analytics
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Academics section - for both students and faculty */}
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

        {/* Coding section - only for students */}
        {userRole === "student" && (
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
        )}

        {/* Admin-specific menus */}
        {userRole === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <ChartBar className="w-4 h-4 mr-1" /> Advanced Analytics
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin-dashboard?tab=skills" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <ChartBar className="h-5 w-5 text-campus-blue" />
                      <div>
                        <div className="font-medium">Skill Metrics</div>
                        <p className="text-sm text-muted-foreground">Analyze student skill data</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin-dashboard?tab=reports" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <FileText className="h-5 w-5 text-campus-green" />
                      <div>
                        <div className="font-medium">Export Reports</div>
                        <p className="text-sm text-muted-foreground">Generate and download reports</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin-dashboard?tab=overview" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <DatabaseIcon className="h-5 w-5 text-campus-orange" />
                      <div>
                        <div className="font-medium">System Overview</div>
                        <p className="text-sm text-muted-foreground">View overall platform performance</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin-dashboard" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <Flag className="h-5 w-5 text-campus-pink" />
                      <div>
                        <div className="font-medium">Plan Events</div>
                        <p className="text-sm text-muted-foreground">Schedule contests and mock tests</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        
        {/* Faculty-specific menus */}
        {userRole === "teacher" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <GraduationCap className="w-4 h-4 mr-1" /> Student Progress
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/faculty-dashboard?tab=academic" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <ChartBar className="h-5 w-5 text-campus-blue" />
                      <div>
                        <div className="font-medium">Academic Progress</div>
                        <p className="text-sm text-muted-foreground">Track student academic performance</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/faculty-dashboard?tab=coding" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <Code className="h-5 w-5 text-campus-green" />
                      <div>
                        <div className="font-medium">Coding Progress</div>
                        <p className="text-sm text-muted-foreground">Monitor student coding skills</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/faculty-dashboard?tab=attendance" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <FileCheck className="h-5 w-5 text-campus-orange" />
                      <div>
                        <div className="font-medium">Attendance</div>
                        <p className="text-sm text-muted-foreground">View and mark student attendance</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/faculty-dashboard?tab=submissions" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                      <FileText className="h-5 w-5 text-campus-pink" />
                      <div>
                        <div className="font-medium">Submissions</div>
                        <p className="text-sm text-muted-foreground">Review and grade assignments</p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Leaderboard - visible to students and faculty */}
        {(userRole === "student" || userRole === "teacher") && (
          <NavigationMenuItem>
            <Link to="/leaderboard" className={cn(
              navigationMenuTriggerStyle(),
              isActive("/leaderboard") ? "bg-purple-100 text-campus-purple" : ""
            )}>
              <Trophy className="w-4 h-4 mr-1" /> Leaderboard
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;

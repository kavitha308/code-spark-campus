
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  GraduationCap,
  FileText,
  Upload,
  Folder,
  BookOpen,
  PenTool,
  Users,
  MessageSquare,
  Trophy,
  Home,
  Plus,
  Video,
  BarChart3,
  CheckCircle,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

export const TeacherNavItems: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <NavigationMenuItem>
        <Link to="/" className={cn(
          navigationMenuTriggerStyle(),
          isActive("/") ? "bg-purple-100 text-campus-purple" : ""
        )}>
          <Home className="w-4 h-4 mr-1" /> Home
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link to="/faculty-dashboard" className={cn(
          navigationMenuTriggerStyle(),
          isActive("/faculty-dashboard") ? "bg-purple-100 text-campus-purple" : ""
        )}>
          <GraduationCap className="w-4 h-4 mr-1" /> Faculty Dashboard
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={isActive("/assignments") ? "bg-purple-100 text-campus-purple" : ""}
        >
          <FileText className="w-4 h-4 mr-1" /> Assignments
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white">
          <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/assignment/create"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-green/20 to-campus-blue/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <Plus className="h-6 w-6 text-campus-blue" />
                  <div className="mb-2 mt-4 text-lg font-medium">Create Assignment</div>
                  <p className="text-sm text-muted-foreground">
                    Create and assign new assignments to students
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/assignment/review"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-yellow/20 to-campus-orange/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <CheckCircle className="h-6 w-6 text-campus-orange" />
                  <div className="mb-2 mt-4 text-lg font-medium">Review Submissions</div>
                  <p className="text-sm text-muted-foreground">
                    Review and grade student submissions
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/quiz/create"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-purple/20 to-campus-pink/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <ClipboardList className="h-6 w-6 text-campus-purple" />
                  <div className="mb-2 mt-4 text-lg font-medium">Create Quiz</div>
                  <p className="text-sm text-muted-foreground">
                    Create quizzes and tests for students
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
                    <p className="text-sm text-muted-foreground">Manage your courses</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link to="/course/create" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                  <Plus className="h-5 w-5 text-campus-blue" />
                  <div>
                    <div className="font-medium">Create Course</div>
                    <p className="text-sm text-muted-foreground">Create a new course</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link to="/course/addlecture" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                  <Video className="h-5 w-5 text-campus-purple" />
                  <div>
                    <div className="font-medium">Add Lecture</div>
                    <p className="text-sm text-muted-foreground">Add lecture to a course</p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link to="/teacher/analytics" className="flex p-3 items-start gap-3 rounded-md hover:bg-muted">
                  <BarChart3 className="h-5 w-5 text-campus-orange" />
                  <div>
                    <div className="font-medium">Analytics</div>
                    <p className="text-sm text-muted-foreground">View student progress</p>
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
                    <p className="text-sm text-muted-foreground">Manage assignments</p>
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
                    <p className="text-sm text-muted-foreground">Connect with other faculty members</p>
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
                    <p className="text-sm text-muted-foreground">Manage course discussions</p>
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
    </>
  );
};

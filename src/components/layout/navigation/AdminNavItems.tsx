
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
  UserCog,
  Trophy,
  BarChart3,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminNavItems: React.FC = () => {
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
        <Link to="/admin-dashboard" className={cn(
          navigationMenuTriggerStyle(),
          isActive("/admin-dashboard") ? "bg-purple-100 text-campus-purple" : ""
        )}>
          <UserCog className="w-4 h-4 mr-1" /> Admin Dashboard
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={isActive("/leaderboard") ? "bg-purple-100 text-campus-purple" : ""}
        >
          <Trophy className="w-4 h-4 mr-1" /> Analytics
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white">
          <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/leaderboard"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-blue/20 to-campus-purple/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <Trophy className="h-6 w-6 text-campus-purple" />
                  <div className="mb-2 mt-4 text-lg font-medium">Coding Leaderboard</div>
                  <p className="text-sm text-muted-foreground">
                    View top performing students in coding challenges
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/admin/academic-progress"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-campus-green/20 to-campus-blue/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <BarChart3 className="h-6 w-6 text-campus-blue" />
                  <div className="mb-2 mt-4 text-lg font-medium">Academic Progress</div>
                  <p className="text-sm text-muted-foreground">
                    Monitor students' academic performance
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );
};

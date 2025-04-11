
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BellRing,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import NavigationMenuDemo from "./NavigationMenu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would handle the logout process here
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from your account.",
    });
    
    navigate("/auth");
  };

  const handleNotificationClick = () => {
    toast({
      title: "New notifications",
      description: "You have 3 unread notifications.",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
              Campus Bridge
            </span>
          </Link>
        </div>

        <NavigationMenuDemo />

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative animate-hover"
            aria-label="Notifications"
            onClick={handleNotificationClick}
          >
            <BellRing className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-campus-red text-white text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full animate-hover"
              >
                <Avatar>
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-purple text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar>
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-purple text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">john.doe@university.edu</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

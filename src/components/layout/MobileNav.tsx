
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Code,
  PenTool,
  Menu,
  User,
  LogOut,
  Settings,
  Trophy,
  Bell,
  BarChart3,
  Calendar,
  FileCheck,
  Users,
  MessageSquare,
  Briefcase,
  Home,
  Layers,
  Video,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  const handleLogout = () => {
    // In a real app, you would handle the logout process here
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from your account.",
    });
    
    navigate("/auth");
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
        <SheetContent side="left" className="w-[280px] sm:w-[300px] p-0">
          <div className="h-full flex flex-col">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
                Campus Bridge
              </SheetTitle>
            </SheetHeader>
            
            <div className="px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-purple text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">john.doe@university.edu</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto px-2 py-4">
              <Button 
                variant="ghost" 
                className={`w-full justify-start px-4 py-2 ${isActive("/") ? "bg-purple-100 text-campus-purple" : ""}`}
                onClick={() => handleNavigation("/")}
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Button>
            
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dashboard">
                  <AccordionTrigger className={`px-4 py-2 rounded-md ${isActive("/dashboard") ? "bg-purple-100 text-campus-purple" : ""}`}>
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Dashboard</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 space-y-1">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/dashboard")}
                      >
                        Overview
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/performance")}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Performance Analytics
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/calendar")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Calendar
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/attendance")}
                      >
                        <FileCheck className="h-4 w-4 mr-2" />
                        Attendance
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="academics">
                  <AccordionTrigger className={`px-4 py-2 rounded-md ${isActive("/courses") ? "bg-purple-100 text-campus-purple" : ""}`}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Academics</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 space-y-1">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/courses")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Courses
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/assignments")}
                      >
                        <PenTool className="h-4 w-4 mr-2" />
                        Assignments
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/faculty")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Faculty
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/discussions")}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Discussions
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="coding">
                  <AccordionTrigger className={`px-4 py-2 rounded-md ${isActive("/coding") ? "bg-purple-100 text-campus-purple" : ""}`}>
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      <span>Coding</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 space-y-1">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/coding")}
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Code Editor
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/coding-challenges")}
                      >
                        <PenTool className="h-4 w-4 mr-2" />
                        Challenges
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/live-coding")}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Live Coding
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/learning-paths")}
                      >
                        <Layers className="h-4 w-4 mr-2" />
                        Learning Paths
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/leaderboard")}
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        Leaderboard
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => handleNavigation("/job-matches")}
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        Job Matches
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-2">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start px-4 py-2 ${isActive("/leaderboard") ? "bg-purple-100 text-campus-purple" : ""}`}
                  onClick={() => handleNavigation("/leaderboard")}
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Leaderboard
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2 px-4">
                  Account
                </div>
                <nav className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className={`justify-start px-4 py-2 ${isActive("/profile") ? "bg-purple-100 text-campus-purple" : ""}`}
                    onClick={() => handleNavigation("/profile")}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-4 py-2"
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                    <Badge className="ml-auto bg-campus-red">3</Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-4 py-2"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                </nav>
              </div>
            </div>
            
            <SheetFooter className="p-6 border-t">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

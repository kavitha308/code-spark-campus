
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
  ChartBar,
  GraduationCap,
  FileText,
  Database,
  Flag
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
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, profile, signOut } = useAuth();
  const userRole = profile?.role || "student";
  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      setOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
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
                  <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "User"} />
                  <AvatarFallback className="bg-gradient-purple text-white">
                    {profile?.full_name ? profile?.full_name.split(' ').map(n => n[0]).join('') : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{profile?.full_name || user?.email?.split('@')[0] || 'User'}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto px-2 py-4">
              <nav className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${isActive("/") ? "bg-purple-100 text-campus-purple" : ""}`}
                  onClick={() => handleNavigation("/")}
                >
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </Button>
              </nav>
              
              <Accordion type="single" collapsible className="w-full">
                {/* Student Dashboard */}
                {userRole === "student" && (
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
                )}
                
                {/* Faculty Dashboard */}
                {userRole === "teacher" && (
                  <AccordionItem value="faculty-dashboard">
                    <AccordionTrigger className={`px-4 py-2 rounded-md ${isActive("/faculty-dashboard") ? "bg-purple-100 text-campus-purple" : ""}`}>
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Faculty Dashboard</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-9 space-y-1">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard")}
                        >
                          Overview
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=attendance")}
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          Student Attendance
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=submissions")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Submissions
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=academic")}
                        >
                          <ChartBar className="h-4 w-4 mr-2" />
                          Academic Progress
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=coding")}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Coding Progress
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                
                {/* Admin Dashboard */}
                {userRole === "admin" && (
                  <AccordionItem value="admin-dashboard">
                    <AccordionTrigger className={`px-4 py-2 rounded-md ${isActive("/admin-dashboard") ? "bg-purple-100 text-campus-purple" : ""}`}>
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Admin Dashboard</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-9 space-y-1">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard")}
                        >
                          Overview
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=users")}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          User Management
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=courses")}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Courses
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=skills")}
                        >
                          <ChartBar className="h-4 w-4 mr-2" />
                          Skill Metrics
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=reports")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Reports
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                
                {/* Academics section - for all users */}
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
                
                {/* Coding section - only for students */}
                {userRole === "student" && (
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
                )}
                
                {/* Admin-specific features */}
                {userRole === "admin" && (
                  <AccordionItem value="admin-features">
                    <AccordionTrigger className={`px-4 py-2 rounded-md`}>
                      <div className="flex items-center gap-2">
                        <ChartBar className="h-5 w-5" />
                        <span>Advanced Analytics</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-9 space-y-1">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=skills")}
                        >
                          <ChartBar className="h-4 w-4 mr-2" />
                          Skill Metrics
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=reports")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export Reports
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard?tab=overview")}
                        >
                          <Database className="h-4 w-4 mr-2" />
                          System Overview
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/admin-dashboard")}
                        >
                          <Flag className="h-4 w-4 mr-2" />
                          Plan Events
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                
                {/* Faculty-specific features */}
                {userRole === "teacher" && (
                  <AccordionItem value="faculty-features">
                    <AccordionTrigger className={`px-4 py-2 rounded-md`}>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        <span>Student Progress</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-9 space-y-1">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=academic")}
                        >
                          <ChartBar className="h-4 w-4 mr-2" />
                          Academic Progress
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=coding")}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Coding Progress
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=attendance")}
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          Attendance
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation("/faculty-dashboard?tab=submissions")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Submissions
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
              
              {/* Leaderboard - visible to students and faculty */}
              {(userRole === "student" || userRole === "teacher") && (
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
              )}
              
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

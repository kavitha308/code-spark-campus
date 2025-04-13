
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, BookOpen, FileText, BarChart3, UserPlus, Trash2, Download, 
  Edit, Search, PlusCircle, Calendar, TrendingUp, Flag, Upload as UploadIcon, Video
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [contestDialogOpen, setContestDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Mock user data
  const userData = [
    {
      id: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student",
      joinDate: "2025-01-15",
      avatar: "https://via.placeholder.com/40",
      status: "active",
    },
    {
      id: "user2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "student",
      joinDate: "2025-01-20",
      avatar: "https://via.placeholder.com/40",
      status: "active",
    },
    {
      id: "user3",
      name: "Dr. Michael Brown",
      email: "michael.brown@example.com",
      role: "teacher",
      joinDate: "2024-11-05",
      avatar: "https://via.placeholder.com/40",
      status: "active",
    },
    {
      id: "user4",
      name: "Jessica Williams",
      email: "jessica.williams@example.com",
      role: "student",
      joinDate: "2025-02-10",
      avatar: "https://via.placeholder.com/40",
      status: "inactive",
    },
    {
      id: "user5",
      name: "Prof. Robert Garcia",
      email: "robert.garcia@example.com",
      role: "teacher",
      joinDate: "2024-12-15",
      avatar: "https://via.placeholder.com/40",
      status: "active",
    },
  ];
  
  // Mock course data
  const courseData = [
    {
      id: "course1",
      title: "Data Structures & Algorithms",
      instructor: "Dr. Michael Brown",
      students: 68,
      created: "2024-12-10",
      status: "active",
    },
    {
      id: "course2",
      title: "Advanced Web Development",
      instructor: "Prof. Robert Garcia",
      students: 52,
      created: "2025-01-05",
      status: "active",
    },
    {
      id: "course3",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Emily Taylor",
      students: 76,
      created: "2025-01-15",
      status: "active",
    },
    {
      id: "course4",
      title: "Database Management Systems",
      instructor: "Prof. Robert Garcia",
      students: 61,
      created: "2024-11-20",
      status: "active",
    },
    {
      id: "course5",
      title: "Cybersecurity Principles",
      instructor: "Dr. James Wilson",
      students: 48,
      created: "2025-02-01",
      status: "draft",
    },
  ];
  
  // Mock skill metrics data
  const skillMetricsData = [
    {
      name: "JavaScript",
      average: 75,
      top: 95,
    },
    {
      name: "Python",
      average: 68,
      top: 92,
    },
    {
      name: "Java",
      average: 62,
      top: 88,
    },
    {
      name: "SQL",
      average: 70,
      top: 90,
    },
    {
      name: "Data Structures",
      average: 65,
      top: 91,
    },
    {
      name: "Algorithms",
      average: 60,
      top: 89,
    },
    {
      name: "Web Development",
      average: 73,
      top: 94,
    },
  ];
  
  // Mock user activity data
  const userActivityData = [
    {
      date: "Apr 5",
      active: 210,
      newUsers: 12,
    },
    {
      date: "Apr 6",
      active: 220,
      newUsers: 8,
    },
    {
      date: "Apr 7",
      active: 235,
      newUsers: 15,
    },
    {
      date: "Apr 8",
      active: 225,
      newUsers: 10,
    },
    {
      date: "Apr 9",
      active: 240,
      newUsers: 13,
    },
    {
      date: "Apr 10",
      active: 255,
      newUsers: 18,
    },
    {
      date: "Apr 11",
      active: 270,
      newUsers: 20,
    },
  ];
  
  // Form state for new user
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });
  
  // Form state for new contest/test
  const [contestForm, setContestForm] = useState({
    title: "",
    description: "",
    date: "",
    duration: "60",
    type: "coding",
    difficulty: "medium",
  });
  
  // Handle creating a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, create user in Supabase Auth
      // and add user profile
      await new Promise(res => setTimeout(res, 1000));
      
      toast.success(`New ${userForm.role} account created successfully!`);
      setUserDialogOpen(false);
      setUserForm({
        name: "",
        email: "",
        role: "student",
        password: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle creating a new contest/test
  const handleCreateContest = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, create contest in database
      await new Promise(res => setTimeout(res, 1000));
      
      toast.success(`New ${contestForm.type} event created successfully!`);
      setContestDialogOpen(false);
      setContestForm({
        title: "",
        description: "",
        date: "",
        duration: "60",
        type: "coding",
        difficulty: "medium",
      });
    } catch (error) {
      console.error("Error creating contest:", error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, fetch all users, courses, etc.
        await new Promise(res => setTimeout(res, 1000));
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage users, courses, and system-wide analytics
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="default" 
              className="bg-campus-purple hover:bg-campus-purple/90"
              onClick={() => setUserDialogOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" /> 
              Add User
            </Button>
            <Button 
              variant="outline" 
              className="border-campus-purple text-campus-purple hover:bg-campus-purple/10"
              onClick={() => setContestDialogOpen(true)}
            >
              <Flag className="mr-2 h-4 w-4" /> 
              Plan Contest
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="skills">Skill Metrics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Users</CardTitle>
                  <CardDescription>Students and faculty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Users className="h-8 w-8 text-campus-purple" />
                    <span className="text-3xl font-bold">325</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                    <span>Students: 280</span>
                    <span>Faculty: 45</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Courses</CardTitle>
                  <CardDescription>Current semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-8 w-8 text-campus-blue" />
                    <span className="text-3xl font-bold">18</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span>Most enrolled: Data Structures (76)</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Assignments</CardTitle>
                  <CardDescription>Active and pending</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <FileText className="h-8 w-8 text-campus-orange" />
                    <span className="text-3xl font-bold">48</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                    <span>Active: 32</span>
                    <span>Submitted: 16</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Grade</CardTitle>
                  <CardDescription>All courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <BarChart3 className="h-8 w-8 text-campus-green" />
                    <span className="text-3xl font-bold">84.2%</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span>2.5% increase from last semester</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Active users in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={userActivityData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="active" name="Active Users" fill="#8884d8" />
                        <Bar dataKey="newUsers" name="New Registrations" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                        <UserPlus className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">5 New Students Registered</p>
                        <p className="text-xs text-gray-500">Today at 9:42 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">New Course Added: Machine Learning</p>
                        <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-700 p-2 rounded-full">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Assignment Deadline Extended: Web Dev Project</p>
                        <p className="text-xs text-gray-500">Yesterday at 11:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 text-orange-700 p-2 rounded-full">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Coding Contest Scheduled: April 20</p>
                        <p className="text-xs text-gray-500">Apr 10, 2025 at 4:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-pink-100 text-pink-700 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Leaderboard Updated: 3 New Students in Top 10</p>
                        <p className="text-xs text-gray-500">Apr 9, 2025 at 6:20 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage students and faculty accounts</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setUserDialogOpen(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">User</th>
                          <th className="py-3 px-4 text-left font-medium">Email</th>
                          <th className="py-3 px-4 text-left font-medium">Role</th>
                          <th className="py-3 px-4 text-left font-medium">Joined</th>
                          <th className="py-3 px-4 text-left font-medium">Status</th>
                          <th className="py-3 px-4 text-center font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.map((user) => (
                          <tr key={user.id} className="border-t">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>{user.name}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                variant="outline" 
                                className={
                                  user.role === "admin" 
                                    ? "bg-red-100 text-red-800 border-red-200" 
                                    : user.role === "teacher" 
                                    ? "bg-purple-100 text-purple-800 border-purple-200" 
                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                }
                              >
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{user.joinDate}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                variant="outline" 
                                className={
                                  user.status === "active" 
                                    ? "bg-green-100 text-green-800 border-green-200" 
                                    : "bg-red-100 text-red-800 border-red-200"
                                }
                              >
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 325 users
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Manage courses and educational content</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">Course</th>
                          <th className="py-3 px-4 text-left font-medium">Instructor</th>
                          <th className="py-3 px-4 text-left font-medium">Students</th>
                          <th className="py-3 px-4 text-left font-medium">Created</th>
                          <th className="py-3 px-4 text-left font-medium">Status</th>
                          <th className="py-3 px-4 text-center font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseData.map((course) => (
                          <tr key={course.id} className="border-t">
                            <td className="py-3 px-4">
                              <div className="font-medium">{course.title}</div>
                            </td>
                            <td className="py-3 px-4">{course.instructor}</td>
                            <td className="py-3 px-4">{course.students}</td>
                            <td className="py-3 px-4">{course.created}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                variant="outline" 
                                className={
                                  course.status === "active" 
                                    ? "bg-green-100 text-green-800 border-green-200" 
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }
                              >
                                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Overview</CardTitle>
                  <CardDescription>Files and materials uploaded per course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Data Structures & Algorithms</span>
                        <span className="text-sm font-medium">24 files</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Advanced Web Development</span>
                        <span className="text-sm font-medium">18 files</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Machine Learning Fundamentals</span>
                        <span className="text-sm font-medium">15 files</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Management Systems</span>
                        <span className="text-sm font-medium">21 files</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Cybersecurity Principles</span>
                        <span className="text-sm font-medium">9 files</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content Types</CardTitle>
                  <CardDescription>Distribution of educational material formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-blue-500"></div>
                        <span>PDF Documents</span>
                      </div>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-purple-500"></div>
                        <span>Video Lectures</span>
                      </div>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-green-500"></div>
                        <span>Quizzes & Tests</span>
                      </div>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-yellow-500"></div>
                        <span>Presentations</span>
                      </div>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-red-500"></div>
                        <span>Other Formats</span>
                      </div>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Skill Metrics</CardTitle>
                <CardDescription>Performance analytics across skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillMetricsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" name="Class Average" fill="#8884d8" />
                      <Bar dataKey="top" name="Top Performers" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Programming Languages</CardTitle>
                  <CardDescription>Most proficient languages by students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">JavaScript</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Python</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Java</span>
                        <span className="text-sm font-medium">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">SQL</span>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">C++</span>
                        <span className="text-sm font-medium">58%</span>
                      </div>
                      <Progress value={58} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Technical Concepts</CardTitle>
                  <CardDescription>Strongest technical areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Data Structures</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Algorithms</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Web Development</span>
                        <span className="text-sm font-medium">73%</span>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Design</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">System Design</span>
                        <span className="text-sm font-medium">55%</span>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Areas</CardTitle>
                  <CardDescription>Skills needing most development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Dynamic Programming</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Security Principles</span>
                        <span className="text-sm font-medium">48%</span>
                      </div>
                      <Progress value={48} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Cloud Infrastructure</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Machine Learning</span>
                        <span className="text-sm font-medium">38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">DevOps</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Analytics & Reports</CardTitle>
                  <CardDescription>Generate and export platform analytics</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Academic Performance Report</CardTitle>
                      <CardDescription>Grades and assignment completion data</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Comprehensive data on student grades, assignment submission rates, and 
                        academic progress across all courses.
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Attendance & Participation Report</CardTitle>
                      <CardDescription>Student attendance and engagement metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Data on student attendance rates, class participation, and engagement 
                        with course materials and discussions.
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Coding Skills Report</CardTitle>
                      <CardDescription>Programming and technical proficiency data</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Detailed metrics on coding challenge completion, technical skills assessment,
                        and programming language proficiency.
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Faculty Performance Report</CardTitle>
                      <CardDescription>Teaching effectiveness and student feedback</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Analysis of teaching effectiveness, student satisfaction ratings, and
                        course material quality assessments.
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">System Usage Report</CardTitle>
                      <CardDescription>Platform engagement and activity data</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Statistics on platform usage, feature engagement, and user activity 
                        patterns across the system.
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Custom Report</CardTitle>
                      <CardDescription>Generate a custom analytics report</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Create a custom report by selecting specific metrics, date ranges,
                        and user groups to analyze.
                      </p>
                      <Button variant="default" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Custom Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialog for adding a new user */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new student or faculty account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  className="col-span-3"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="col-span-3"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={userForm.role}
                  onValueChange={(value) => setUserForm({ ...userForm, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Faculty/Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Temporary password"
                  className="col-span-3"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for creating a new contest/test */}
      <Dialog open={contestDialogOpen} onOpenChange={setContestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Plan New Contest</DialogTitle>
            <DialogDescription>
              Schedule a coding contest or mock test for students
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateContest}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Contest title"
                  className="col-span-3"
                  value={contestForm.title}
                  onChange={(e) => setContestForm({ ...contestForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Contest details and instructions"
                  className="col-span-3"
                  value={contestForm.description}
                  onChange={(e) => setContestForm({ ...contestForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date & Time
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  className="col-span-3"
                  value={contestForm.date}
                  onChange={(e) => setContestForm({ ...contestForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  className="col-span-3"
                  value={contestForm.duration}
                  onChange={(e) => setContestForm({ ...contestForm, duration: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Event Type
                </Label>
                <Select
                  value={contestForm.type}
                  onValueChange={(value) => setContestForm({ ...contestForm, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coding">Coding Contest</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="quiz">Mock Quiz</SelectItem>
                    <SelectItem value="test">Mock Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="difficulty" className="text-right">
                  Difficulty
                </Label>
                <Select
                  value={contestForm.difficulty}
                  onValueChange={(value) => setContestForm({ ...contestForm, difficulty: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="mixed">Mixed Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setContestDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default AdminDashboard;

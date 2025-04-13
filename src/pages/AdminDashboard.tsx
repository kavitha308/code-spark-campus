
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, Legend, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { 
  Users, 
  UserPlus, 
  UserCog, 
  Layers, 
  Settings, 
  BarChart as BarChartIcon, 
  LayoutDashboard, 
  Search,
  FileText,
  Trash2,
  Edit,
  BookOpen,
  GraduationCap,
  Bell,
  Code,
  PlusCircle,
  Check,
  X,
  Info,
  Download
} from "lucide-react";
import { toast } from "sonner";

// Mock data for user management
const usersMock = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    status: "active",
    registeredDate: "2023-03-15",
    lastLogin: "2023-04-10 08:45",
    courses: 4,
    avatar: ""
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "student",
    status: "active",
    registeredDate: "2023-02-28",
    lastLogin: "2023-04-11 10:22",
    courses: 3,
    avatar: ""
  },
  {
    id: "3",
    name: "Dr. Robert Johnson",
    email: "robert.johnson@example.com",
    role: "teacher",
    status: "active",
    registeredDate: "2023-01-10",
    lastLogin: "2023-04-11 09:15",
    courses: 2,
    avatar: ""
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    role: "student",
    status: "inactive",
    registeredDate: "2023-03-05",
    lastLogin: "2023-04-02 14:30",
    courses: 2,
    avatar: ""
  },
  {
    id: "5",
    name: "Prof. Michael Brown",
    email: "michael.brown@example.com",
    role: "teacher",
    status: "active",
    registeredDate: "2022-12-15",
    lastLogin: "2023-04-10 16:45",
    courses: 3,
    avatar: ""
  }
];

// Mock data for analytics
const userRegistrationsData = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 78 },
  { month: 'Mar', count: 94 },
  { month: 'Apr', count: 87 },
  { month: 'May', count: 105 },
  { month: 'Jun', count: 120 },
  { month: 'Jul', count: 98 },
  { month: 'Aug', count: 87 },
  { month: 'Sep', count: 92 },
  { month: 'Oct', count: 110 },
  { month: 'Nov', count: 130 },
  { month: 'Dec', count: 145 },
];

const courseEngagementData = [
  { name: 'Data Structures', students: 46, completionRate: 78, avgScore: 84 },
  { name: 'Web Development', students: 38, completionRate: 65, avgScore: 79 },
  { name: 'Database Systems', students: 52, completionRate: 81, avgScore: 86 },
  { name: 'Machine Learning', students: 35, completionRate: 72, avgScore: 82 },
  { name: 'Network Security', students: 28, completionRate: 68, avgScore: 77 },
];

const studentsByRoleData = [
  { name: 'Students', value: 450, color: '#8884d8' },
  { name: 'Teachers', value: 45, color: '#82ca9d' },
  { name: 'Admins', value: 8, color: '#ffc658' },
];

const coursesMock = [
  {
    id: "1",
    name: "Data Structures & Algorithms",
    code: "CS202",
    teacher: "Dr. Robert Johnson",
    enrollments: 46,
    content: 24,
    status: "active",
    lastUpdated: "2023-04-10"
  },
  {
    id: "2",
    name: "Advanced Web Development",
    code: "CS301",
    teacher: "Prof. Michael Brown",
    enrollments: 38,
    content: 32,
    status: "active",
    lastUpdated: "2023-04-08"
  },
  {
    id: "3",
    name: "Database Management Systems",
    code: "CS305",
    teacher: "Dr. Sarah Williams",
    enrollments: 52,
    content: 28,
    status: "active",
    lastUpdated: "2023-04-11"
  },
  {
    id: "4",
    name: "Introduction to Machine Learning",
    code: "CS405",
    teacher: "Prof. Emily Chen",
    enrollments: 35,
    content: 22,
    status: "draft",
    lastUpdated: "2023-04-12"
  }
];

// User Creator Modal Component
const UserCreatorModal = ({ onAdd }: { onAdd: (data: any) => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  
  const handleSubmit = () => {
    if (!name || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      status: "active",
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: "-",
      courses: 0,
      avatar: ""
    };
    
    onAdd(newUser);
    
    if (sendEmail) {
      toast.success(`Welcome email sent to ${email}`);
    }
    
    toast.success("User added successfully!");
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user's full name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">User Role <span className="text-red-500">*</span></Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select user role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher/Faculty</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password <span className="text-red-500">*</span></Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Switch 
          id="send-email" 
          checked={sendEmail}
          onCheckedChange={setSendEmail}
        />
        <Label htmlFor="send-email">Send welcome email with login instructions</Label>
      </div>
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Create User</Button>
      </DialogFooter>
    </div>
  );
};

// Course Creator Modal Component
const CourseCreatorModal = ({ onAdd }: { onAdd: (data: any) => void }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  
  const handleSubmit = () => {
    if (!name || !code || !teacher) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newCourse = {
      id: `c${Date.now()}`,
      name,
      code,
      description,
      teacher,
      enrollments: 0,
      content: 0,
      status: "draft",
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    onAdd(newCourse);
    toast.success("Course created successfully!");
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="course-name">Course Name <span className="text-red-500">*</span></Label>
        <Input
          id="course-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter course name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="course-code">Course Code <span className="text-red-500">*</span></Label>
        <Input
          id="course-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. CS101"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="course-description">Course Description</Label>
        <Textarea
          id="course-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter course description"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="teacher">Assign Teacher <span className="text-red-500">*</span></Label>
        <Select value={teacher} onValueChange={setTeacher}>
          <SelectTrigger>
            <SelectValue placeholder="Select teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dr. Robert Johnson">Dr. Robert Johnson</SelectItem>
            <SelectItem value="Prof. Michael Brown">Prof. Michael Brown</SelectItem>
            <SelectItem value="Dr. Sarah Williams">Dr. Sarah Williams</SelectItem>
            <SelectItem value="Prof. Emily Chen">Prof. Emily Chen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Course Settings</Label>
        <div className="space-y-3 border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="enrollment" defaultChecked />
              <Label htmlFor="enrollment">Open for enrollment</Label>
            </div>
            <Badge variant="outline">Default: Off</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="visibility" defaultChecked />
              <Label htmlFor="visibility">Visible in catalog</Label>
            </div>
            <Badge variant="outline">Default: Off</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="certificate" />
              <Label htmlFor="certificate">Enable certificates</Label>
            </div>
            <Badge variant="outline">Default: Off</Badge>
          </div>
        </div>
      </div>
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Create Course</Button>
      </DialogFooter>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState(usersMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courses, setCourses] = useState(coursesMock);
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState("all");
  const [userCreatorOpen, setUserCreatorOpen] = useState(false);
  const [courseCreatorOpen, setCourseCreatorOpen] = useState(false);
  
  const handleAddUser = (newUser: any) => {
    setUsers([newUser, ...users]);
    setUserCreatorOpen(false);
  };
  
  const handleAddCourse = (newCourse: any) => {
    setCourses([newCourse, ...courses]);
    setCourseCreatorOpen(false);
  };
  
  const filteredUsers = users.filter(user => {
    // Apply search filter
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply role filter
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const filteredCourses = courses.filter(course => {
    // Apply search filter
    const matchesSearch = courseSearchTerm === "" || 
      course.name.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(courseSearchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = courseStatusFilter === "all" || course.status === courseStatusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleDeleteUser = (userId: string) => {
    toast.error("This action is not available in the demo");
  };
  
  const handleDeleteCourse = (courseId: string) => {
    toast.error("This action is not available in the demo");
  };
  
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "active" ? "inactive" : "active"
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const user = users.find(u => u.id === userId);
    toast.success(`User ${user?.name} has been ${user?.status === "active" ? "deactivated" : "activated"}`);
  };
  
  const toggleCourseStatus = (courseId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          status: course.status === "active" ? "draft" : "active"
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    const course = courses.find(c => c.id === courseId);
    toast.success(`Course ${course?.name} has been ${course?.status === "active" ? "set to draft" : "activated"}`);
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || "Administrator"}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={userCreatorOpen} onOpenChange={setUserCreatorOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account (student, teacher, or admin)
                  </DialogDescription>
                </DialogHeader>
                <UserCreatorModal onAdd={handleAddUser} />
              </DialogContent>
            </Dialog>
            
            <Dialog open={courseCreatorOpen} onOpenChange={setCourseCreatorOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                  <BookOpen className="h-4 w-4" /> Create Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Set up a new course in the system
                  </DialogDescription>
                </DialogHeader>
                <CourseCreatorModal onAdd={handleAddCourse} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-campus-purple" /> 
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">503</div>
              <p className="text-muted-foreground text-sm">Active platform users</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="font-medium">Students</p>
                  <p className="text-muted-foreground">450</p>
                </div>
                <div>
                  <p className="font-medium">Teachers</p>
                  <p className="text-muted-foreground">45</p>
                </div>
                <div>
                  <p className="font-medium">Admins</p>
                  <p className="text-muted-foreground">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-campus-blue" /> 
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-muted-foreground text-sm">Active courses</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Content Count</p>
                  <p className="text-muted-foreground">328 modules</p>
                </div>
                <div>
                  <p className="font-medium">Avg. Enrollment</p>
                  <p className="text-muted-foreground">38 students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChartIcon className="h-5 w-5 mr-2 text-campus-green" /> 
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">99.8%</div>
              <p className="text-muted-foreground text-sm">Uptime last 30 days</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Storage Usage</p>
                  <p className="text-muted-foreground">36.4 GB (42%)</p>
                </div>
                <div>
                  <p className="font-medium">API Responses</p>
                  <p className="text-muted-foreground">218ms avg.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="bg-campus-purple/10 text-campus-purple">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">Dashboard</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white">User Management</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-white">Course Management</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-white">Content Review</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">User Registrations Trend</CardTitle>
                  <CardDescription>
                    Monthly user registration statistics for the past year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={userRegistrationsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          name="Users"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of users by role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={studentsByRoleData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {studentsByRoleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {studentsByRoleData.map((entry, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div
                          className="h-3 w-3 mr-1 rounded-sm"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Engagement Metrics</CardTitle>
                  <CardDescription>
                    Performance metrics for top courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={courseEngagementData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="students"
                          name="Enrolled Students"
                          fill="#8884d8"
                        />
                        <Bar
                          dataKey="completionRate"
                          name="Completion Rate (%)"
                          fill="#82ca9d"
                        />
                        <Bar
                          dataKey="avgScore"
                          name="Average Score"
                          fill="#ffc658"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-muted-foreground">Emma Thompson joined as Student</p>
                          <p className="text-xs text-muted-foreground">15 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-green-100 p-2 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New course published</p>
                          <p className="text-xs text-muted-foreground">AI Fundamentals is now live</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-yellow-100 p-2 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bell className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">System alert</p>
                          <p className="text-xs text-muted-foreground">Storage usage reached 80%</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">System Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Scheduled Maintenance</p>
                            <p className="text-xs text-muted-foreground">System maintenance scheduled for April 15, 2023 at 2:00 AM UTC</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">New Feature Available</p>
                            <p className="text-xs text-muted-foreground">Advanced analytics dashboard is now available for all admin users</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" className="h-auto py-2">
                        <Download className="h-4 w-4 mr-1" />
                        Export Reports
                      </Button>
                      <Button size="sm" className="h-auto py-2" variant="outline">
                        <Bell className="h-4 w-4 mr-1" />
                        Send Notifications
                      </Button>
                      <Button size="sm" className="h-auto py-2" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        System Settings
                      </Button>
                      <Button size="sm" className="h-auto py-2" variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        View All Users
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">User Management</CardTitle>
                      <CardDescription>
                        Add, edit, or remove users from the platform
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="h-4 w-4 mr-2" /> Add New User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Create a new user account (student, teacher, or admin)
                          </DialogDescription>
                        </DialogHeader>
                        <UserCreatorModal onAdd={handleAddUser} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-2 flex-grow">
                        <div className="relative flex-grow">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search users..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="student">Students</SelectItem>
                            <SelectItem value="teacher">Teachers</SelectItem>
                            <SelectItem value="admin">Administrators</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-1" /> Export
                        </Button>
                        <Button variant="outline">
                          <UserPlus className="h-4 w-4 mr-1" /> Bulk Import
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">User</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Registered</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Last Login</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredUsers.map((user) => (
                            <tr key={user.id}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-campus-purple text-white">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">{user.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">{user.email}</td>
                              <td className="px-4 py-3 text-sm">
                                {user.role === "student" && (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <GraduationCap className="h-3 w-3 mr-1" /> Student
                                  </Badge>
                                )}
                                {user.role === "teacher" && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <BookOpen className="h-3 w-3 mr-1" /> Teacher
                                  </Badge>
                                )}
                                {user.role === "admin" && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    <UserCog className="h-3 w-3 mr-1" /> Admin
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {user.status === "active" ? (
                                  <Badge className="bg-green-500">Active</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Inactive</Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">{user.registeredDate}</td>
                              <td className="px-4 py-3 text-sm">{user.lastLogin}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => toggleUserStatus(user.id)}
                                  >
                                    {user.status === "active" ? (
                                      <X className="h-4 w-4 text-red-500" />
                                    ) : (
                                      <Check className="h-4 w-4 text-green-500" />
                                    )}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No users found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bulk User Operations</CardTitle>
                  <CardDescription>
                    Perform actions on multiple users at once
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Import Users</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground mb-4">
                            Bulk import users from a CSV or Excel file
                          </p>
                          <Button className="w-full mt-2">
                            <Upload className="h-4 w-4 mr-1" /> Upload File
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Mass Enrollment</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground mb-4">
                            Enroll multiple users in courses at once
                          </p>
                          <Button variant="outline" className="w-full mt-2">
                            Manage Enrollments
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">Bulk Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground mb-4">
                            Send notifications to multiple users
                          </p>
                          <Button variant="outline" className="w-full mt-2">
                            <Bell className="h-4 w-4 mr-1" /> Send Notifications
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Course Management</CardTitle>
                      <CardDescription>
                        Manage all courses on the platform
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <PlusCircle className="h-4 w-4 mr-2" /> Create New Course
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Create New Course</DialogTitle>
                          <DialogDescription>
                            Set up a new course in the system
                          </DialogDescription>
                        </DialogHeader>
                        <CourseCreatorModal onAdd={handleAddCourse} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-2 flex-grow">
                        <div className="relative flex-grow">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search courses..."
                            className="pl-8"
                            value={courseSearchTerm}
                            onChange={(e) => setCourseSearchTerm(e.target.value)}
                          />
                        </div>
                        <Select value={courseStatusFilter} onValueChange={setCourseStatusFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-1" /> Export
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">Course</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Code</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Teacher</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Enrollments</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Content</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Last Updated</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredCourses.map((course) => (
                            <tr key={course.id}>
                              <td className="px-4 py-3">
                                <div className="font-medium text-sm">{course.name}</div>
                              </td>
                              <td className="px-4 py-3 text-sm">{course.code}</td>
                              <td className="px-4 py-3 text-sm">{course.teacher}</td>
                              <td className="px-4 py-3 text-sm">{course.enrollments}</td>
                              <td className="px-4 py-3 text-sm">{course.content} modules</td>
                              <td className="px-4 py-3 text-sm">
                                {course.status === "active" ? (
                                  <Badge className="bg-green-500">Active</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">{course.lastUpdated}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => toggleCourseStatus(course.id)}
                                  >
                                    {course.status === "active" ? (
                                      <X className="h-4 w-4 text-red-500" />
                                    ) : (
                                      <Check className="h-4 w-4 text-green-500" />
                                    )}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleDeleteCourse(course.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {filteredCourses.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No courses found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Categories</CardTitle>
                  <CardDescription>
                    Organize courses by categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Card className="w-full md:w-[calc(33.33%-1rem)]">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Computer Science</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          8 active courses
                        </p>
                        <div className="flex justify-between mt-2">
                          <Badge variant="outline">126 students</Badge>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Courses
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="w-full md:w-[calc(33.33%-1rem)]">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Data Science</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          6 active courses
                        </p>
                        <div className="flex justify-between mt-2">
                          <Badge variant="outline">94 students</Badge>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Courses
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="w-full md:w-[calc(33.33%-1rem)]">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Web Development</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">
                          7 active courses
                        </p>
                        <div className="flex justify-between mt-2">
                          <Badge variant="outline">112 students</Badge>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Courses
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="w-full md:w-[calc(33.33%-1rem)] border-dashed">
                      <CardContent className="p-4 flex flex-col items-center justify-center min-h-[168px]">
                        <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground text-sm">Add New Category</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Create Category
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Review Queue</CardTitle>
                  <CardDescription>
                    Review and approve content submitted by faculty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-2 flex-grow">
                        <div className="relative flex-grow">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search content..."
                            className="pl-8"
                          />
                        </div>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="video">Videos</SelectItem>
                            <SelectItem value="document">Documents</SelectItem>
                            <SelectItem value="assignment">Assignments</SelectItem>
                            <SelectItem value="quiz">Quizzes</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="pending">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="all">All Statuses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">Content</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Course</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Submitted By</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-4 py-3">
                              <div className="font-medium text-sm">Introduction to Binary Trees</div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <Video className="h-3 w-3 mr-1" /> Video
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">CS202: Data Structures</td>
                            <td className="px-4 py-3 text-sm">Dr. Robert Johnson</td>
                            <td className="px-4 py-3 text-sm">Apr 10, 2023</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Pending
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">
                                  Review
                                </Button>
                                <Button size="sm" variant="ghost" className="text-green-500">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-500">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">
                              <div className="font-medium text-sm">Web Development Final Project</div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                <Code className="h-3 w-3 mr-1" /> Assignment
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">CS301: Web Development</td>
                            <td className="px-4 py-3 text-sm">Prof. Michael Brown</td>
                            <td className="px-4 py-3 text-sm">Apr 11, 2023</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Pending
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">
                                  Review
                                </Button>
                                <Button size="sm" variant="ghost" className="text-green-500">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-500">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">
                              <div className="font-medium text-sm">Database Normalization</div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <FileText className="h-3 w-3 mr-1" /> Document
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">CS305: Database Systems</td>
                            <td className="px-4 py-3 text-sm">Dr. Sarah Williams</td>
                            <td className="px-4 py-3 text-sm">Apr 12, 2023</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Pending
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">
                                  Review
                                </Button>
                                <Button size="sm" variant="ghost" className="text-green-500">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-500">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Stats</CardTitle>
                  <CardDescription>
                    Overview of content on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center space-y-1">
                          <Video className="h-6 w-6 mx-auto mb-1 text-campus-purple" />
                          <p className="text-2xl font-bold">156</p>
                          <p className="text-xs text-muted-foreground">Videos</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center space-y-1">
                          <FileText className="h-6 w-6 mx-auto mb-1 text-campus-blue" />
                          <p className="text-2xl font-bold">243</p>
                          <p className="text-xs text-muted-foreground">Documents</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center space-y-1">
                          <Code className="h-6 w-6 mx-auto mb-1 text-campus-green" />
                          <p className="text-2xl font-bold">87</p>
                          <p className="text-xs text-muted-foreground">Assignments</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center space-y-1">
                          <Check className="h-6 w-6 mx-auto mb-1 text-campus-orange" />
                          <p className="text-2xl font-bold">112</p>
                          <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Recently Approved Content</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-campus-purple" />
                          <span className="text-sm font-medium">SQL Joins and Their Types</span>
                        </div>
                        <Badge className="bg-green-500">Approved</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-campus-blue" />
                          <span className="text-sm font-medium">React State Management</span>
                        </div>
                        <Badge className="bg-green-500">Approved</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-campus-green" />
                          <span className="text-sm font-medium">Graph Implementation Assignment</span>
                        </div>
                        <Badge className="bg-green-500">Approved</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Settings</CardTitle>
                  <CardDescription>
                    Configure platform-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium mb-4">General Settings</h3>
                      <div className="space-y-4 border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="site-name">Platform Name</Label>
                            <Input 
                              id="site-name" 
                              defaultValue="Campus Bridge" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Default Timezone</Label>
                            <Select defaultValue="UTC">
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                                <SelectItem value="CST">Central Time (CST)</SelectItem>
                                <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="site-description">Platform Description</Label>
                          <Textarea 
                            id="site-description" 
                            defaultValue="Campus Bridge - Your integrated academic and coding platform for students and faculty."
                          />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="maintenance-mode" />
                              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                            </div>
                            <Badge variant="outline">Currently: Off</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="user-registration" defaultChecked />
                              <Label htmlFor="user-registration">Allow New User Registration</Label>
                            </div>
                            <Badge variant="outline">Currently: On</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="email-verification" defaultChecked />
                              <Label htmlFor="email-verification">Require Email Verification</Label>
                            </div>
                            <Badge variant="outline">Currently: On</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-4">Email Settings</h3>
                      <div className="space-y-4 border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="from-email">From Email Address</Label>
                            <Input 
                              id="from-email" 
                              defaultValue="noreply@campusbridge.edu" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="admin-email">Admin Email Address</Label>
                            <Input 
                              id="admin-email" 
                              defaultValue="admin@campusbridge.edu" 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="welcome-email" defaultChecked />
                              <Label htmlFor="welcome-email">Send Welcome Email</Label>
                            </div>
                            <Badge variant="outline">Currently: On</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="course-notifications" defaultChecked />
                              <Label htmlFor="course-notifications">Course Update Notifications</Label>
                            </div>
                            <Badge variant="outline">Currently: On</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="assignment-notifications" defaultChecked />
                              <Label htmlFor="assignment-notifications">Assignment Notifications</Label>
                            </div>
                            <Badge variant="outline">Currently: On</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-4">Security Settings</h3>
                      <div className="space-y-4 border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                            <Input 
                              id="session-timeout" 
                              type="number"
                              defaultValue="60" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                            <Input 
                              id="max-login-attempts" 
                              type="number"
                              defaultValue="5" 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="two-factor" />
                              <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                            </div>
                            <Badge variant="outline">Currently: Off</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="password-policy" defaultChecked />
                              <Label htmlFor="password-policy">Enforce Strong Password Policy</Label>
                            </div>
                            <Badge variant="outline">Currently: On</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">
                    Reset to Defaults
                  </Button>
                  <Button>
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Maintenance</CardTitle>
                  <CardDescription>
                    Perform system maintenance tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Download className="h-4 w-4 mr-2 text-campus-blue" />
                          Backup System
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          Create a full backup of the platform data
                        </p>
                        <Button variant="outline" className="w-full">
                          Create Backup
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Layers className="h-4 w-4 mr-2 text-campus-green" />
                          Clear Cache
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          Clear system cache to improve performance
                        </p>
                        <Button variant="outline" className="w-full">
                          Clear Cache
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Settings className="h-4 w-4 mr-2 text-campus-purple" />
                          System Logs
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          View and download system logs
                        </p>
                        <Button variant="outline" className="w-full">
                          View Logs
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;

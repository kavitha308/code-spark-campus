
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, FileText, Users, BookOpen, PieChart, Upload, FileUp, Check, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for attendance
  const attendanceData = [
    {
      name: "John Doe",
      id: "student1",
      totalClasses: 24,
      attended: 22,
      percentage: 91.7,
    },
    {
      name: "Jane Smith",
      id: "student2",
      totalClasses: 24,
      attended: 20,
      percentage: 83.3,
    },
    {
      name: "Michael Brown",
      id: "student3",
      totalClasses: 24,
      attended: 18,
      percentage: 75.0,
    },
    {
      name: "Sarah Johnson",
      id: "student4",
      totalClasses: 24,
      attended: 23,
      percentage: 95.8,
    },
    {
      name: "Robert Williams",
      id: "student5",
      totalClasses: 24,
      attended: 19,
      percentage: 79.2,
    },
  ];

  // Mock data for student progress
  const progressData = [
    {
      name: "John Doe",
      assignments: 90,
      quizzes: 85,
      participation: 75,
    },
    {
      name: "Jane Smith",
      assignments: 80,
      quizzes: 95,
      participation: 85,
    },
    {
      name: "Michael Brown",
      assignments: 70,
      quizzes: 75,
      participation: 90,
    },
    {
      name: "Sarah Johnson",
      assignments: 95,
      quizzes: 90,
      participation: 80,
    },
    {
      name: "Robert Williams",
      assignments: 85,
      quizzes: 80,
      participation: 70,
    },
  ];

  // Mock data for coding progress
  const codingProgressData = [
    {
      name: "John Doe",
      easy: 18,
      medium: 12,
      hard: 5,
    },
    {
      name: "Jane Smith",
      easy: 15,
      medium: 10,
      hard: 7,
    },
    {
      name: "Michael Brown",
      easy: 20,
      medium: 8,
      hard: 3,
    },
    {
      name: "Sarah Johnson",
      easy: 16,
      medium: 14,
      hard: 8,
    },
    {
      name: "Robert Williams",
      easy: 17,
      medium: 9,
      hard: 4,
    },
  ];

  // Mock submission data
  const submissionData = [
    {
      id: "sub1",
      student: "John Doe",
      assignment: "Database Normalization",
      submittedDate: "2025-04-08",
      status: "Graded",
      marks: "18/20",
    },
    {
      id: "sub2",
      student: "Jane Smith",
      assignment: "React Hooks Project",
      submittedDate: "2025-04-10",
      status: "Pending",
      marks: "-",
    },
    {
      id: "sub3",
      student: "Michael Brown",
      assignment: "Algorithm Analysis",
      submittedDate: "2025-04-07",
      status: "Graded",
      marks: "15/20",
    },
    {
      id: "sub4",
      student: "Sarah Johnson",
      assignment: "Database Normalization",
      submittedDate: "2025-04-09",
      status: "Graded",
      marks: "19/20",
    },
    {
      id: "sub5",
      student: "Robert Williams",
      assignment: "React Hooks Project",
      submittedDate: "2025-04-11",
      status: "Submitted",
      marks: "-",
    },
  ];

  // Form state for content upload
  const [contentForm, setContentForm] = useState({
    title: "",
    description: "",
    courseId: "",
    contentType: "pdf",
    file: null,
  });

  // Form state for assignment creation
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    courseId: "",
    dueDate: "",
    totalMarks: 20,
    submissionType: "report",
  });

  // Handle uploading content
  const handleContentUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, upload file to Supabase storage
      // and create a record in the database
      await new Promise(res => setTimeout(res, 1000));
      
      toast.success("Content uploaded successfully!");
      setUploadDialogOpen(false);
      setContentForm({
        title: "",
        description: "",
        courseId: "",
        contentType: "pdf",
        file: null,
      });
    } catch (error) {
      console.error("Error uploading content:", error);
      toast.error("Failed to upload content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle creating assignment
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, create assignment record in database
      await new Promise(res => setTimeout(res, 1000));
      
      toast.success("Assignment created successfully!");
      setAssignmentDialogOpen(false);
      setAssignmentForm({
        title: "",
        description: "",
        courseId: "",
        dueDate: "",
        totalMarks: 20,
        submissionType: "report",
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, fetch courses taught by the faculty
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("*");
        
        if (coursesError) throw coursesError;
        setCourses(coursesData || []);
        
        // Fetch students enrolled in faculty's courses
        // This would need a more complex query in a real implementation
        setStudents([]); // Placeholder
      } catch (error) {
        console.error("Error fetching faculty data:", error);
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
            <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your courses, track student progress, and create content
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="default" 
              className="bg-campus-purple hover:bg-campus-purple/90"
              onClick={() => setUploadDialogOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" /> 
              Upload Content
            </Button>
            <Button 
              variant="outline" 
              className="border-campus-purple text-campus-purple hover:bg-campus-purple/10"
              onClick={() => setAssignmentDialogOpen(true)}
            >
              <FileUp className="mr-2 h-4 w-4" /> 
              Create Assignment
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="academic">Academic Progress</TabsTrigger>
            <TabsTrigger value="coding">Coding Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Students</CardTitle>
                  <CardDescription>Enrolled in your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Users className="h-8 w-8 text-campus-purple" />
                    <span className="text-3xl font-bold">125</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Courses</CardTitle>
                  <CardDescription>Courses you're teaching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-8 w-8 text-campus-blue" />
                    <span className="text-3xl font-bold">3</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending Evaluations</CardTitle>
                  <CardDescription>Ungraded assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <FileText className="h-8 w-8 text-campus-orange" />
                    <span className="text-3xl font-bold">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {submissionData.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{submission.student}</p>
                          <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-muted-foreground mr-2">{submission.submittedDate}</p>
                          {submission.status === "Graded" ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-4" onClick={() => setActiveTab("submissions")}>
                    View All Submissions
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Database Normalization Exercise</p>
                        <p className="text-sm text-muted-foreground">Database Management</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Apr 15, 2025</div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Web Development Project</p>
                        <p className="text-sm text-muted-foreground">Advanced Web Development</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Apr 18, 2025</div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Algorithm Analysis Report</p>
                        <p className="text-sm text-muted-foreground">Data Structures & Algorithms</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Apr 22, 2025</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full mt-4" onClick={() => navigate("/assignments")}>
                    Manage Assignments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Attendance Overview</CardTitle>
                <CardDescription>Track attendance for all students in your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Student Name</th>
                        <th className="text-left py-2">Total Classes</th>
                        <th className="text-left py-2">Attended</th>
                        <th className="text-left py-2">Percentage</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="py-3">{student.name}</td>
                          <td className="py-3">{student.totalClasses}</td>
                          <td className="py-3">{student.attended}</td>
                          <td className="py-3">{student.percentage}%</td>
                          <td className="py-3">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                student.percentage >= 85
                                  ? "bg-green-100 text-green-800"
                                  : student.percentage >= 75
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.percentage >= 85
                                ? "Excellent"
                                : student.percentage >= 75
                                ? "Good"
                                : "Warning"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="course2">Database Management</SelectItem>
                    <SelectItem value="course3">Advanced Web Development</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Mark Attendance</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>Review and grade student assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Student</th>
                        <th className="text-left py-2">Assignment</th>
                        <th className="text-left py-2">Submitted Date</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Marks</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissionData.map((submission) => (
                        <tr key={submission.id} className="border-b">
                          <td className="py-3">{submission.student}</td>
                          <td className="py-3">{submission.assignment}</td>
                          <td className="py-3">{submission.submittedDate}</td>
                          <td className="py-3">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                submission.status === "Graded"
                                  ? "bg-green-100 text-green-800"
                                  : submission.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {submission.status}
                            </span>
                          </td>
                          <td className="py-3">{submission.marks}</td>
                          <td className="py-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={submission.status === "Graded"}
                            >
                              {submission.status === "Graded" ? "Graded" : "Grade"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="course1">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="course2">Database Management</SelectItem>
                    <SelectItem value="course3">Advanced Web Development</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="graded">Graded</SelectItem>
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Academic Progress</CardTitle>
                <CardDescription>Academic performance metrics for your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={progressData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="assignments" name="Assignments" fill="#8884d8" />
                      <Bar dataKey="quizzes" name="Quizzes" fill="#82ca9d" />
                      <Bar dataKey="participation" name="Participation" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="course2">Database Management</SelectItem>
                    <SelectItem value="course3">Advanced Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {progressData.map((student, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Assignments</span>
                        <span className="text-sm font-medium">{student.assignments}%</span>
                      </div>
                      <Progress value={student.assignments} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Quizzes</span>
                        <span className="text-sm font-medium">{student.quizzes}%</span>
                      </div>
                      <Progress value={student.quizzes} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Participation</span>
                        <span className="text-sm font-medium">{student.participation}%</span>
                      </div>
                      <Progress value={student.participation} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall</span>
                        <span className="text-sm font-medium">
                          {Math.round((student.assignments + student.quizzes + student.participation) / 3)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.round((student.assignments + student.quizzes + student.participation) / 3)} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="coding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Coding Progress</CardTitle>
                <CardDescription>Coding challenges completed by difficulty level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={codingProgressData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="easy" name="Easy" fill="#82ca9d" />
                      <Bar dataKey="medium" name="Medium" fill="#8884d8" />
                      <Bar dataKey="hard" name="Hard" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {codingProgressData.map((student, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>
                      Total challenges: {student.easy + student.medium + student.hard}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-green-600">Easy ({student.easy})</span>
                        <span className="text-sm font-medium text-orange-600">Medium ({student.medium})</span>
                        <span className="text-sm font-medium text-red-600">Hard ({student.hard})</span>
                      </div>
                      <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(student.easy / (student.easy + student.medium + student.hard)) * 100}%` }} 
                        />
                        <div 
                          className="bg-orange-500" 
                          style={{ width: `${(student.medium / (student.easy + student.medium + student.hard)) * 100}%` }} 
                        />
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(student.hard / (student.easy + student.medium + student.hard)) * 100}%` }} 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Top Language</span>
                        <span className="font-medium">JavaScript</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Weekly Streak</span>
                        <span className="font-medium">5 days</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Points</span>
                        <span className="font-medium">{student.easy * 10 + student.medium * 30 + student.hard * 50}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Rank</span>
                        <span className="font-medium">#{index + 1}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialog for content upload */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Upload Course Content</DialogTitle>
            <DialogDescription>
              Add PDFs, videos, or quiz materials for your courses
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContentUpload}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Content title"
                  className="col-span-3"
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the content"
                  className="col-span-3"
                  value={contentForm.description}
                  onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select
                  value={contentForm.courseId}
                  onValueChange={(value) => setContentForm({ ...contentForm, courseId: value })}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="course2">Database Management</SelectItem>
                    <SelectItem value="course3">Advanced Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contentType" className="text-right">
                  Content Type
                </Label>
                <Select
                  value={contentForm.contentType}
                  onValueChange={(value) => setContentForm({ ...contentForm, contentType: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  File
                </Label>
                <Input
                  id="file"
                  type="file"
                  className="col-span-3"
                  onChange={(e) => setContentForm({ ...contentForm, file: e.target.files?.[0] || null })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload Content"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for assignment creation */}
      <Dialog open={assignmentDialogOpen} onOpenChange={setAssignmentDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Set up a new assignment for your students
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateAssignment}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Assignment title"
                  className="col-span-3"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed instructions for the assignment"
                  className="col-span-3"
                  value={assignmentForm.description}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select
                  value={assignmentForm.courseId}
                  onValueChange={(value) => setAssignmentForm({ ...assignmentForm, courseId: value })}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="course2">Database Management</SelectItem>
                    <SelectItem value="course3">Advanced Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <div className="col-span-3">
                  <Input 
                    type="date" 
                    id="dueDate"
                    value={assignmentForm.dueDate}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalMarks" className="text-right">
                  Total Marks
                </Label>
                <Input
                  id="totalMarks"
                  type="number"
                  min="1"
                  className="col-span-3"
                  value={assignmentForm.totalMarks}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, totalMarks: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="submissionType" className="text-right">
                  Submission Type
                </Label>
                <Select
                  value={assignmentForm.submissionType}
                  onValueChange={(value) => setAssignmentForm({ ...assignmentForm, submissionType: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select submission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="report">Written Report</SelectItem>
                    <SelectItem value="code">Code Submission</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAssignmentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Assignment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default FacultyDashboard;

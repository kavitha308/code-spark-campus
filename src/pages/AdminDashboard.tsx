
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, BookOpen, GraduationCap, FileText, BarChart3, Code, Trophy, FileUp, Download, Database } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getAllStudents, getAllFaculty } from "@/services/UserService";
import { getAllCourses } from "@/services/CourseService";
import { getAssignments } from "@/services/AssignmentService";
import { createEvent } from "@/services/EventService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: new Date(),
    event_type: "exam",
    course_id: ""
  });
  
  // Modal state
  const [eventModalOpen, setEventModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentsData = await getAllStudents();
        const facultyData = await getAllFaculty();
        const coursesData = await getAllCourses();
        const assignmentsData = await getAssignments();
        
        setStudents(studentsData);
        setFaculty(facultyData);
        setCourses(coursesData);
        setAssignments(assignmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCreateEvent = async () => {
    try {
      await createEvent(
        newEvent.title,
        newEvent.description,
        format(newEvent.event_date, "yyyy-MM-dd'T'HH:mm:ssXXX"),
        newEvent.event_type,
        newEvent.course_id || null
      );
      
      toast.success("Event created successfully");
      setEventModalOpen(false);
      
      // Reset form
      setNewEvent({
        title: "",
        description: "",
        event_date: new Date(),
        event_type: "exam",
        course_id: ""
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor institution-wide metrics and manage academic affairs
            </p>
          </div>
          <div className="flex gap-2">
            <DialogTrigger asChild onClick={() => setEventModalOpen(true)}>
              <Button>
                <Calendar className="mr-2 h-4 w-4" /> Schedule Event
              </Button>
            </DialogTrigger>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Reports
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-muted">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="academics">
              <BookOpen className="h-4 w-4 mr-2" /> Academic Progress
            </TabsTrigger>
            <TabsTrigger value="coding">
              <Code className="h-4 w-4 mr-2" /> Coding Metrics
            </TabsTrigger>
            <TabsTrigger value="faculty">
              <GraduationCap className="h-4 w-4 mr-2" /> Faculty
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Trophy className="h-4 w-4 mr-2" /> Leaderboard
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" /> Events
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Faculty Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{faculty.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Academic Overview</CardTitle>
                  <CardDescription>
                    Course enrollments and completion rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.slice(0, 5).map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 50) + 50}%</div>
                        </div>
                        <Progress value={Math.floor(Math.random() * 50) + 50} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("academics")}
                  >
                    View Academic Details
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Coding Performance</CardTitle>
                  <CardDescription>
                    Student coding metrics and challenge completion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Data Structures</div>
                        <div className="text-sm text-muted-foreground">78%</div>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Algorithms</div>
                        <div className="text-sm text-muted-foreground">65%</div>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Web Development</div>
                        <div className="text-sm text-muted-foreground">82%</div>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Database Design</div>
                        <div className="text-sm text-muted-foreground">71%</div>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("coding")}
                  >
                    View Coding Metrics
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest academic and coding activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue-100 p-2">
                        <FileUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">New assignment uploaded</p>
                        <p className="text-sm text-muted-foreground">
                          Data Structures Assignment 3 was uploaded by Prof. James Wilson
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">New course created</p>
                        <p className="text-sm text-muted-foreground">
                          Introduction to Machine Learning was created
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(new Date().setDate(new Date().getDate() - 1)), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Trophy className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Coding challenge completed</p>
                        <p className="text-sm text-muted-foreground">
                          10 students completed the Advanced Algorithms challenge
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(new Date().setDate(new Date().getDate() - 2)), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-orange-100 p-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">New event scheduled</p>
                        <p className="text-sm text-muted-foreground">
                          Mid-term examination scheduled for Database Systems
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(new Date().setDate(new Date().getDate() - 3)), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Progress Tab */}
          <TabsContent value="academics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Academic Progress</CardTitle>
                <CardDescription>
                  Overall academic performance and eligibility status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Student Name</th>
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">Courses Enrolled</th>
                        <th className="p-3 text-left font-medium">Academic Progress</th>
                        <th className="p-3 text-left font-medium">Attendance</th>
                        <th className="p-3 text-left font-medium">Exam Eligibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 10).map((student, index) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">{student.full_name}</td>
                          <td className="p-3">{student.username || `STU${1000 + index}`}</td>
                          <td className="p-3">{Math.floor(Math.random() * 3) + 2}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={Math.floor(Math.random() * 30) + 70} 
                                className="h-2 w-24" 
                              />
                              <span className="text-sm">{Math.floor(Math.random() * 30) + 70}%</span>
                            </div>
                          </td>
                          <td className="p-3">{Math.floor(Math.random() * 20) + 80}%</td>
                          <td className="p-3">
                            <Badge variant={
                              Math.random() > 0.2 ? "default" : "destructive"
                            }>
                              {Math.random() > 0.2 ? "Eligible" : "Not Eligible"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Performance Overview</CardTitle>
                <CardDescription>
                  Performance metrics across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Course</th>
                        <th className="p-3 text-left font-medium">Faculty</th>
                        <th className="p-3 text-left font-medium">Enrolled Students</th>
                        <th className="p-3 text-left font-medium">Avg. Performance</th>
                        <th className="p-3 text-left font-medium">Avg. Attendance</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={course.id} className="border-b">
                          <td className="p-3">{course.title}</td>
                          <td className="p-3">{
                            faculty.length > 0 
                              ? faculty[index % faculty.length]?.full_name 
                              : "Unassigned"
                          }</td>
                          <td className="p-3">{Math.floor(Math.random() * 20) + 10}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={Math.floor(Math.random() * 30) + 65} 
                                className="h-2 w-24" 
                              />
                              <span className="text-sm">{Math.floor(Math.random() * 30) + 65}%</span>
                            </div>
                          </td>
                          <td className="p-3">{Math.floor(Math.random() * 25) + 75}%</td>
                          <td className="p-3">
                            <Badge variant={
                              course.status === "available" ? "default" : "secondary"
                            }>
                              {course.status === "available" ? "Active" : "Draft"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {courses.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No courses found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coding Metrics Tab */}
          <TabsContent value="coding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Coding Performance</CardTitle>
                <CardDescription>
                  Detailed coding metrics and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Student Name</th>
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">Challenges Completed</th>
                        <th className="p-3 text-left font-medium">Success Rate</th>
                        <th className="p-3 text-left font-medium">Preferred Language</th>
                        <th className="p-3 text-left font-medium">Skill Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 10).map((student, index) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">{student.full_name}</td>
                          <td className="p-3">{student.username || `STU${1000 + index}`}</td>
                          <td className="p-3">{Math.floor(Math.random() * 15) + 5}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={Math.floor(Math.random() * 30) + 65} 
                                className="h-2 w-24" 
                              />
                              <span className="text-sm">{Math.floor(Math.random() * 30) + 65}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            {["JavaScript", "Python", "Java"][Math.floor(Math.random() * 3)]}
                          </td>
                          <td className="p-3">
                            <Badge variant={
                              index % 3 === 0 ? "default" : 
                              index % 3 === 1 ? "secondary" : "outline"
                            }>
                              {index % 3 === 0 ? "Advanced" : 
                                index % 3 === 1 ? "Intermediate" : "Beginner"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                  <CardDescription>
                    Preferred coding languages among students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">JavaScript</div>
                        <div className="text-sm text-muted-foreground">42%</div>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Python</div>
                        <div className="text-sm text-muted-foreground">35%</div>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Java</div>
                        <div className="text-sm text-muted-foreground">15%</div>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">C++</div>
                        <div className="text-sm text-muted-foreground">8%</div>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Challenge Categories</CardTitle>
                  <CardDescription>
                    Distribution of challenge completions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Data Structures</div>
                        <div className="text-sm text-muted-foreground">38%</div>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Algorithms</div>
                        <div className="text-sm text-muted-foreground">32%</div>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Web Development</div>
                        <div className="text-sm text-muted-foreground">20%</div>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Database</div>
                        <div className="text-sm text-muted-foreground">10%</div>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Level Breakdown</CardTitle>
                  <CardDescription>
                    Student skill distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Beginner</div>
                        <div className="text-sm text-muted-foreground">25%</div>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Intermediate</div>
                        <div className="text-sm text-muted-foreground">45%</div>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Advanced</div>
                        <div className="text-sm text-muted-foreground">30%</div>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Faculty Tab */}
          <TabsContent value="faculty" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Directory</CardTitle>
                <CardDescription>
                  All faculty members and their courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Name</th>
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">Courses</th>
                        <th className="p-3 text-left font-medium">Students</th>
                        <th className="p-3 text-left font-medium">Assignments</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faculty.map((teacher, index) => (
                        <tr key={teacher.id} className="border-b">
                          <td className="p-3">{teacher.full_name}</td>
                          <td className="p-3">{teacher.username || `FAC${1000 + index}`}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {courses
                                .filter((_, i) => i % faculty.length === index % faculty.length)
                                .slice(0, 2)
                                .map(course => (
                                  <Badge key={course.id} variant="outline">
                                    {course.title}
                                  </Badge>
                                ))}
                            </div>
                          </td>
                          <td className="p-3">{Math.floor(Math.random() * 40) + 20}</td>
                          <td className="p-3">{Math.floor(Math.random() * 10) + 5}</td>
                          <td className="p-3">
                            <Badge variant="default">Active</Badge>
                          </td>
                        </tr>
                      ))}
                      {faculty.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No faculty members found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Faculty Performance</CardTitle>
                  <CardDescription>
                    Teaching performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.slice(0, 5).map((teacher, index) => (
                      <div key={teacher.id} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="font-medium">{teacher.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 15) + 85}%
                          </div>
                        </div>
                        <Progress value={Math.floor(Math.random() * 15) + 85} className="h-2" />
                      </div>
                    ))}
                    {faculty.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        No faculty members found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Allocation</CardTitle>
                  <CardDescription>
                    Faculty teaching load distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.slice(0, 5).map((teacher, index) => (
                      <div key={teacher.id} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="font-medium">{teacher.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {index + 1} {index + 1 === 1 ? "course" : "courses"}
                          </div>
                        </div>
                        <Progress 
                          value={((index + 1) / 5) * 100} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                    {faculty.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        No faculty members found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Coding Leaderboard</CardTitle>
                <CardDescription>
                  Top performing students in coding challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Rank</th>
                        <th className="p-3 text-left font-medium">Student</th>
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">Score</th>
                        <th className="p-3 text-left font-medium">Challenges</th>
                        <th className="p-3 text-left font-medium">Badge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .slice(0, 10)
                        .sort(() => Math.random() - 0.5)
                        .map((student, index) => (
                          <tr key={student.id} className="border-b">
                            <td className="p-3 font-bold">#{index + 1}</td>
                            <td className="p-3">{student.full_name}</td>
                            <td className="p-3">{student.username || `STU${1000 + index}`}</td>
                            <td className="p-3 font-semibold">{1000 - (index * 50)}</td>
                            <td className="p-3">{20 - index}</td>
                            <td className="p-3">
                              <Badge variant={
                                index === 0 ? "default" : 
                                index < 3 ? "secondary" : "outline"
                              }>
                                {index === 0 ? "Gold" : 
                                  index < 3 ? "Silver" : "Bronze"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Leaderboard</CardTitle>
                <CardDescription>
                  Top performing students in academic courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Rank</th>
                        <th className="p-3 text-left font-medium">Student</th>
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">GPA</th>
                        <th className="p-3 text-left font-medium">Courses</th>
                        <th className="p-3 text-left font-medium">Achievement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .slice(0, 10)
                        .sort(() => Math.random() - 0.5)
                        .map((student, index) => (
                          <tr key={student.id} className="border-b">
                            <td className="p-3 font-bold">#{index + 1}</td>
                            <td className="p-3">{student.full_name}</td>
                            <td className="p-3">{student.username || `STU${1000 + index}`}</td>
                            <td className="p-3 font-semibold">
                              {(4.0 - (index * 0.1)).toFixed(1)}
                            </td>
                            <td className="p-3">{Math.floor(Math.random() * 3) + 3}</td>
                            <td className="p-3">
                              <Badge variant={
                                index === 0 ? "default" : 
                                index < 3 ? "secondary" : "outline"
                              }>
                                {index === 0 ? "Dean's List" : 
                                  index < 3 ? "Honors" : "Merit"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>
                      Scheduled events and academic activities
                    </CardDescription>
                  </div>
                  <Button onClick={() => setEventModalOpen(true)}>
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Event</th>
                        <th className="p-3 text-left font-medium">Date</th>
                        <th className="p-3 text-left font-medium">Type</th>
                        <th className="p-3 text-left font-medium">Course</th>
                        <th className="p-3 text-left font-medium">Created By</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((_, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">
                            {["Mid-term Exam", "Final Project Submission", "Guest Lecture", "Coding Contest"][index]}
                          </td>
                          <td className="p-3">
                            {format(new Date(new Date().setDate(new Date().getDate() + (index + 1) * 7)), "MMM dd, yyyy")}
                          </td>
                          <td className="p-3">
                            <Badge variant={
                              index === 0 ? "destructive" : 
                              index === 1 ? "default" : 
                              index === 2 ? "outline" : "secondary"
                            }>
                              {index === 0 ? "Exam" : 
                                index === 1 ? "Deadline" : 
                                index === 2 ? "Lecture" : "Contest"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {courses[index % courses.length]?.title || "General"}
                          </td>
                          <td className="p-3">
                            {faculty[index % faculty.length]?.full_name || "Admin"}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Cancel</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {courses.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No events scheduled
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Mock Tests / Coding Contests</CardTitle>
                <CardDescription>
                  Schedule and configure coding assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Data Structures Challenge</CardTitle>
                        <CardDescription>
                          Upcoming on {format(new Date(new Date().setDate(new Date().getDate() + 14)), "MMM dd, yyyy")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          A coding challenge focused on data structures implementation and algorithms.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Challenge
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Web Development Hackathon</CardTitle>
                        <CardDescription>
                          Upcoming on {format(new Date(new Date().setDate(new Date().getDate() + 21)), "MMM dd, yyyy")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          A 24-hour hackathon focused on building full-stack web applications.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Challenge
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="bg-muted/30 border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Create New Contest</CardTitle>
                        <CardDescription>
                          Set up a new coding challenge or test
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Configure a new assessment with custom problems and evaluation criteria.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Code className="mr-2 h-4 w-4" /> Create Contest
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>
                  Generate and download academic and performance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Academic Performance</CardTitle>
                      <CardDescription>
                        Student academic metrics and grades
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Complete academic performance data including GPA, course grades, and attendance.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Coding Performance</CardTitle>
                      <CardDescription>
                        Student coding metrics and achievements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Comprehensive coding performance including challenges, submissions, and metrics.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Faculty Report</CardTitle>
                      <CardDescription>
                        Faculty teaching load and performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Faculty course assignments, evaluations, and teaching metrics.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Event Modal */}
      <Dialog open={eventModalOpen} onOpenChange={setEventModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
            <DialogDescription>
              Create a new academic event or activity
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Event Date</Label>
                <DatePicker
                  selected={newEvent.event_date}
                  onSelect={(date) => setNewEvent({...newEvent, event_date: date})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select
                  value={newEvent.event_type}
                  onValueChange={(value) => setNewEvent({...newEvent, event_type: value})}
                >
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="lab">Lab Session</SelectItem>
                    <SelectItem value="lecture">Lecture</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="contest">Coding Contest</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-course">Related Course (Optional)</Label>
              <Select
                value={newEvent.course_id}
                onValueChange={(value) => setNewEvent({...newEvent, course_id: value})}
              >
                <SelectTrigger id="event-course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>Schedule Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default AdminDashboard;

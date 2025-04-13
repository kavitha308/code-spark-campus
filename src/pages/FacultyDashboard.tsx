
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
import { Calendar, Users, BookOpen, GraduationCap, FileText, BarChart3, Code } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getAllStudents, getStudentProgress } from "@/services/UserService";
import { getFacultyCourses, createCourse } from "@/services/CourseService";
import { getAssignments, createAssignment } from "@/services/AssignmentService";
import { getAllSubmissionsForAssignment } from "@/services/AssignmentService";
import { getCourseAttendance, markAttendance } from "@/services/AttendanceService";
import { createEvent } from "@/services/EventService";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    status: "available",
    image_url: "" // Added image_url field
  });
  
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    due_date: new Date(),
    total_marks: 100,
    course_id: "",
    submission_type: "file",
    page_limit: null
  });
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: new Date(),
    event_type: "lecture",
    course_id: ""
  });
  
  // Modal states
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentsData = await getAllStudents();
        const coursesData = await getFacultyCourses();
        const assignmentsData = await getAssignments();
        
        setStudents(studentsData);
        setCourses(coursesData);
        setAssignments(assignmentsData);
        
        if (coursesData.length > 0) {
          setSelectedCourse(coursesData[0].id);
          
          // Get attendance for the first course
          const attendanceData = await getCourseAttendance(coursesData[0].id);
          setAttendance(attendanceData);
        }
        
        if (assignmentsData.length > 0) {
          setSelectedAssignment(assignmentsData[0].id);
          
          // Get submissions for the first assignment
          const submissionsData = await getAllSubmissionsForAssignment(assignmentsData[0].id);
          setSubmissions(submissionsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId);
    try {
      const attendanceData = await getCourseAttendance(courseId);
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance data");
    }
  };
  
  const handleAssignmentChange = async (assignmentId) => {
    setSelectedAssignment(assignmentId);
    try {
      const submissionsData = await getAllSubmissionsForAssignment(assignmentId);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submission data");
    }
  };
  
  const handleMarkAttendance = async (studentId, status) => {
    if (!selectedCourse) return;
    
    try {
      await markAttendance(
        studentId,
        selectedCourse,
        format(new Date(), "yyyy-MM-dd"),
        status
      );
      
      toast.success("Attendance marked successfully");
      
      // Refresh attendance data
      const attendanceData = await getCourseAttendance(selectedCourse);
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    }
  };
  
  const handleCreateCourse = async () => {
    try {
      await createCourse(newCourse);
      toast.success("Course created successfully");
      setCourseModalOpen(false);
      
      // Refresh courses data
      const coursesData = await getFacultyCourses();
      setCourses(coursesData);
      
      // Reset form
      setNewCourse({
        title: "",
        description: "",
        category: "",
        duration: "",
        status: "available",
        image_url: ""
      });
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };
  
  const handleCreateAssignment = async () => {
    try {
      await createAssignment({
        ...newAssignment,
        due_date: format(newAssignment.due_date, "yyyy-MM-dd'T'HH:mm:ssXXX")
      });
      
      toast.success("Assignment created successfully");
      setAssignmentModalOpen(false);
      
      // Refresh assignments data
      const assignmentsData = await getAssignments();
      setAssignments(assignmentsData);
      
      // Reset form
      setNewAssignment({
        title: "",
        description: "",
        due_date: new Date(),
        total_marks: 100,
        course_id: "",
        submission_type: "file",
        page_limit: null
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment");
    }
  };
  
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
        event_type: "lecture",
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
            <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your courses, assignments, and monitor student progress
            </p>
          </div>
          <div className="flex gap-2">
            <DialogTrigger asChild onClick={() => setCourseModalOpen(true)}>
              <Button>
                <BookOpen className="mr-2 h-4 w-4" /> Create Course
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild onClick={() => setAssignmentModalOpen(true)}>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" /> Create Assignment
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild onClick={() => setEventModalOpen(true)}>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Event
              </Button>
            </DialogTrigger>
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
            <TabsTrigger value="students">
              <Users className="h-4 w-4 mr-2" /> Students
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" /> Courses
            </TabsTrigger>
            <TabsTrigger value="assignments">
              <FileText className="h-4 w-4 mr-2" /> Assignments
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <GraduationCap className="h-4 w-4 mr-2" /> Attendance
            </TabsTrigger>
            <TabsTrigger value="coding">
              <Code className="h-4 w-4 mr-2" /> Coding Progress
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Total Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {assignments.filter(a => new Date(a.due_date) > new Date()).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Assignments</CardTitle>
                  <CardDescription>
                    Latest assignments and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {assignments.slice(0, 5).map((assignment) => (
                        <div key={assignment.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {format(new Date(assignment.due_date), "MMM dd, yyyy")}
                            </p>
                          </div>
                          <Badge variant={
                            new Date(assignment.due_date) > new Date() 
                              ? "default" 
                              : "secondary"
                          }>
                            {new Date(assignment.due_date) > new Date() 
                              ? "Active" 
                              : "Past due"}
                          </Badge>
                        </div>
                      ))}
                      {assignments.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                          No assignments found
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("assignments")}
                  >
                    View All Assignments
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>
                    Top performing students based on assignment submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {students.slice(0, 5).map((student) => (
                        <div key={student.id} className="space-y-2">
                          <div className="flex justify-between">
                            <div className="font-medium">{student.full_name}</div>
                            <div className="text-sm text-muted-foreground">85%</div>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      ))}
                      {students.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                          No students found
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("students")}
                  >
                    View All Students
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress</CardTitle>
                <CardDescription>
                  Monitor academic and coding progress of all students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Name</th>
                        <th className="p-3 text-left font-medium">Student ID</th>
                        <th className="p-3 text-left font-medium">Academic Progress</th>
                        <th className="p-3 text-left font-medium">Coding Progress</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">{student.full_name}</td>
                          <td className="p-3">{student.username || "N/A"}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={75} className="h-2 flex-1" />
                              <span className="text-sm">75%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={60} className="h-2 flex-1" />
                              <span className="text-sm">60%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-muted-foreground">
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

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-2 bg-primary" />
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      {course.category} • {course.duration || "Self-paced"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {course.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant={course.status === "available" ? "default" : "outline"}>
                        {course.status === "available" ? "Available" : "Draft"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="default" size="sm">Edit Course</Button>
                  </CardFooter>
                </Card>
              ))}

              {courses.length === 0 && (
                <div className="col-span-3 text-center p-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No courses yet</h3>
                  <p className="text-muted-foreground">
                    Get started by creating your first course
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setCourseModalOpen(true)}
                  >
                    Create Course
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>
                  View and manage your assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Title</th>
                        <th className="p-3 text-left font-medium">Due Date</th>
                        <th className="p-3 text-left font-medium">Total Marks</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Submissions</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map((assignment) => (
                        <tr key={assignment.id} className="border-b">
                          <td className="p-3">{assignment.title}</td>
                          <td className="p-3">
                            {format(new Date(assignment.due_date), "MMM dd, yyyy")}
                          </td>
                          <td className="p-3">{assignment.total_marks}</td>
                          <td className="p-3">
                            <Badge variant={
                              new Date(assignment.due_date) > new Date() 
                                ? "default" 
                                : "secondary"
                            }>
                              {new Date(assignment.due_date) > new Date() 
                                ? "Active" 
                                : "Past due"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAssignmentChange(assignment.id)}
                            >
                              View Submissions
                            </Button>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                      {assignments.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-muted-foreground">
                            No assignments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {selectedAssignment && (
              <Card>
                <CardHeader>
                  <CardTitle>Submissions</CardTitle>
                  <CardDescription>
                    Student submissions for the selected assignment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-3 text-left font-medium">Student</th>
                          <th className="p-3 text-left font-medium">Submission Date</th>
                          <th className="p-3 text-left font-medium">File</th>
                          <th className="p-3 text-left font-medium">Status</th>
                          <th className="p-3 text-left font-medium">Marks</th>
                          <th className="p-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((submission) => (
                          <tr key={submission.id} className="border-b">
                            <td className="p-3">{submission.profiles?.full_name || "Unknown Student"}</td>
                            <td className="p-3">
                              {format(new Date(submission.submission_date), "MMM dd, yyyy")}
                            </td>
                            <td className="p-3">
                              <a 
                                href={submission.file_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {submission.file_name}
                              </a>
                            </td>
                            <td className="p-3">
                              <Badge variant={
                                submission.status === "graded" 
                                  ? "outline" 
                                  : "default"
                              }>
                                {submission.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              {submission.marks_awarded !== null 
                                ? submission.marks_awarded 
                                : "Not graded"}
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm">Grade</Button>
                            </td>
                          </tr>
                        ))}
                        {submissions.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-3 text-center text-muted-foreground">
                              No submissions found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>
                  Manage student attendance for your courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label>Select Course</Label>
                  <Select 
                    value={selectedCourse} 
                    onValueChange={handleCourseChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Student</th>
                        <th className="p-3 text-left font-medium">Date</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Mark Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => {
                        const studentAttendance = attendance.find(
                          a => a.user_id === student.id && 
                          format(new Date(a.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                        );
                        
                        return (
                          <tr key={student.id} className="border-b">
                            <td className="p-3">{student.full_name}</td>
                            <td className="p-3">{format(new Date(), "MMM dd, yyyy")}</td>
                            <td className="p-3">
                              {studentAttendance ? (
                                <Badge variant={
                                  studentAttendance.status === "present" 
                                    ? "default" 
                                    : studentAttendance.status === "absent"
                                    ? "destructive"
                                    : "outline"
                                }>
                                  {studentAttendance.status}
                                </Badge>
                              ) : (
                                <Badge variant="outline">Not marked</Badge>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button 
                                  variant={studentAttendance?.status === "present" ? "default" : "outline"} 
                                  size="sm"
                                  onClick={() => handleMarkAttendance(student.id, "present")}
                                >
                                  Present
                                </Button>
                                <Button 
                                  variant={studentAttendance?.status === "absent" ? "destructive" : "outline"} 
                                  size="sm"
                                  onClick={() => handleMarkAttendance(student.id, "absent")}
                                >
                                  Absent
                                </Button>
                                <Button 
                                  variant={studentAttendance?.status === "late" ? "secondary" : "outline"} 
                                  size="sm"
                                  onClick={() => handleMarkAttendance(student.id, "late")}
                                >
                                  Late
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-3 text-center text-muted-foreground">
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

          {/* Coding Progress Tab */}
          <TabsContent value="coding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Coding Progress</CardTitle>
                <CardDescription>
                  Monitor coding progress and performance of students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Student</th>
                        <th className="p-3 text-left font-medium">Challenges Completed</th>
                        <th className="p-3 text-left font-medium">Success Rate</th>
                        <th className="p-3 text-left font-medium">Languages</th>
                        <th className="p-3 text-left font-medium">Last Activity</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">{student.full_name}</td>
                          <td className="p-3">{15 - index}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={85 - (index * 5)} className="h-2 w-24" />
                              <span className="text-sm">{85 - (index * 5)}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Badge variant="outline">JavaScript</Badge>
                              <Badge variant="outline">Python</Badge>
                            </div>
                          </td>
                          <td className="p-3">
                            {format(new Date(new Date().setDate(new Date().getDate() - index)), "MMM dd, yyyy")}
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">View Details</Button>
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
        </Tabs>
      </div>

      {/* Create Course Modal */}
      <Dialog open={courseModalOpen} onOpenChange={setCourseModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add a new course to your teaching portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  placeholder="e.g. 8 weeks"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={newCourse.image_url}
                onChange={(e) => setNewCourse({...newCourse, image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newCourse.status}
                onValueChange={(value) => setNewCourse({...newCourse, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select course status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Assignment Modal */}
      <Dialog open={assignmentModalOpen} onOpenChange={setAssignmentModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Create a new assignment for your students
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-title">Assignment Title</Label>
              <Input
                id="assignment-title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-description">Description</Label>
              <Textarea
                id="assignment-description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignment-course">Course</Label>
                <Select
                  value={newAssignment.course_id}
                  onValueChange={(value) => setNewAssignment({...newAssignment, course_id: value})}
                >
                  <SelectTrigger id="assignment-course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment-due-date">Due Date</Label>
                <DatePicker
                  selected={newAssignment.due_date}
                  onSelect={(date) => setNewAssignment({...newAssignment, due_date: date})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignment-total-marks">Total Marks</Label>
                <Input
                  id="assignment-total-marks"
                  type="number"
                  value={newAssignment.total_marks}
                  onChange={(e) => setNewAssignment({...newAssignment, total_marks: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment-submission-type">Submission Type</Label>
                <Select
                  value={newAssignment.submission_type}
                  onValueChange={(value) => setNewAssignment({...newAssignment, submission_type: value})}
                >
                  <SelectTrigger id="assignment-submission-type">
                    <SelectValue placeholder="Select submission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file">File Upload</SelectItem>
                    <SelectItem value="text">Text Submission</SelectItem>
                    <SelectItem value="link">Link Submission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newAssignment.submission_type === "file" && (
              <div className="space-y-2">
                <Label htmlFor="assignment-page-limit">Page Limit (Optional)</Label>
                <Input
                  id="assignment-page-limit"
                  type="number"
                  value={newAssignment.page_limit || ""}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment, 
                    page_limit: e.target.value ? parseInt(e.target.value) : null
                  })}
                  placeholder="Leave empty for no limit"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignmentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAssignment}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Modal */}
      <Dialog open={eventModalOpen} onOpenChange={setEventModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Event</DialogTitle>
            <DialogDescription>
              Create a new event or class on the calendar
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
                    <SelectItem value="lecture">Lecture</SelectItem>
                    <SelectItem value="lab">Lab Session</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
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

export default FacultyDashboard;

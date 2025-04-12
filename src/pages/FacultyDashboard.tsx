
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";
import { 
  Video, 
  FileText, 
  Upload, 
  Check, 
  X, 
  Clock, 
  Calendar as CalendarIcon, 
  FileUp, 
  Code, 
  BookOpen, 
  PlusCircle,
  Users,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

// Mock data for faculty dashboard
const coursesMock = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    code: "CS202",
    studentsEnrolled: 46,
    completionRate: 78,
    lastUpdated: "2023-04-10"
  },
  {
    id: "2",
    title: "Advanced Web Development",
    code: "CS301",
    studentsEnrolled: 38,
    completionRate: 65,
    lastUpdated: "2023-04-08"
  },
  {
    id: "3",
    title: "Database Management Systems",
    code: "CS305",
    studentsEnrolled: 52,
    completionRate: 81,
    lastUpdated: "2023-04-11"
  }
];

const assignmentsMock = [
  {
    id: "a1",
    title: "Binary Tree Implementation",
    course: "CS202: Data Structures & Algorithms",
    dueDate: "2023-04-25",
    submissionsReceived: 32,
    totalStudents: 46,
    status: "Active"
  },
  {
    id: "a2",
    title: "React Component Architecture",
    course: "CS301: Advanced Web Development",
    dueDate: "2023-04-20",
    submissionsReceived: 27,
    totalStudents: 38,
    status: "Active"
  },
  {
    id: "a3",
    title: "SQL Query Optimization",
    course: "CS305: Database Management Systems",
    dueDate: "2023-04-18",
    submissionsReceived: 48,
    totalStudents: 52,
    status: "Active"
  },
  {
    id: "a4",
    title: "Big O Notation Analysis",
    course: "CS202: Data Structures & Algorithms",
    dueDate: "2023-04-05",
    submissionsReceived: 43,
    totalStudents: 46,
    status: "Completed"
  }
];

const studentPerformanceData = [
  { name: "A (90-100%)", value: 15, color: "#4CAF50" },
  { name: "B (80-89%)", value: 23, color: "#8BC34A" },
  { name: "C (70-79%)", value: 18, color: "#FFC107" },
  { name: "D (60-69%)", value: 8, color: "#FF9800" },
  { name: "F (Below 60%)", value: 4, color: "#F44336" },
];

const moduleCompletionData = [
  { name: "Week 1", completion: 98 },
  { name: "Week 2", completion: 94 },
  { name: "Week 3", completion: 89 },
  { name: "Week 4", completion: 82 },
  { name: "Week 5", completion: 76 },
  { name: "Week 6", completion: 68 },
  { name: "Week 7", completion: 54 },
  { name: "Week 8", completion: 42 },
];

const upcomingSessionsMock = [
  {
    id: "s1",
    title: "Advanced Tree Traversal",
    course: "CS202: Data Structures & Algorithms",
    date: new Date(2023, 3, 20, 10, 0),
    duration: "90 minutes",
    type: "Lecture"
  },
  {
    id: "s2",
    title: "React Hooks Workshop",
    course: "CS301: Advanced Web Development",
    date: new Date(2023, 3, 21, 14, 30),
    duration: "120 minutes",
    type: "Lab"
  },
  {
    id: "s3",
    title: "Database Normalization Principles",
    course: "CS305: Database Management Systems",
    date: new Date(2023, 3, 22, 9, 0),
    duration: "90 minutes",
    type: "Lecture"
  }
];

// Content Upload Modal Component
const ContentUploadModal = ({ onUpload }: { onUpload: (data: any) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("video");
  const [course, setCourse] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isVisible, setIsVisible] = useState(true);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = () => {
    if (!title || !course || !selectedFile) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, we'd upload the file to storage
    // Here we'll just simulate the upload
    
    const newContent = {
      id: `c${Date.now()}`,
      title,
      description,
      type: contentType,
      course,
      uploadDate: new Date(),
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      visibility: isVisible ? "Visible" : "Hidden",
      scheduledDate: date
    };
    
    onUpload(newContent);
    toast.success("Content uploaded successfully!");
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter content title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter content description"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content-type">Content Type <span className="text-red-500">*</span></Label>
        <Select value={contentType} onValueChange={setContentType}>
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Video Lecture</SelectItem>
            <SelectItem value="document">Document/PDF</SelectItem>
            <SelectItem value="quiz">Quiz</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="course">Course <span className="text-red-500">*</span></Label>
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CS202">CS202: Data Structures & Algorithms</SelectItem>
            <SelectItem value="CS301">CS301: Advanced Web Development</SelectItem>
            <SelectItem value="CS305">CS305: Database Management Systems</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file">Upload File <span className="text-red-500">*</span></Label>
        <div className="border-2 border-dashed rounded-md p-4 text-center">
          {selectedFile ? (
            <div className="space-y-2">
              <Check className="h-8 w-8 mx-auto text-green-500" />
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedFile(null)}
              >
                Change File
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm">Drag and drop a file or click to browse</p>
              <Input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById("file")?.click()}
              >
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOCX, MP4, PPT, etc.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Schedule Settings</Label>
        <div className="grid grid-cols-2 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-start text-left font-normal w-full"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Select defaultValue="visible">
            <SelectTrigger>
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visible" onClick={() => setIsVisible(true)}>Visible to Students</SelectItem>
              <SelectItem value="hidden" onClick={() => setIsVisible(false)}>Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Upload Content</Button>
      </DialogFooter>
    </div>
  );
};

// Assignment Creator Modal Component
const AssignmentCreatorModal = ({ onCreate }: { onCreate: (data: any) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [points, setPoints] = useState("100");
  const [difficultyLevel, setDifficultyLevel] = useState("medium");
  const [submissionType, setSubmissionType] = useState("code");
  
  const handleSubmit = () => {
    if (!title || !course || !dueDate) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newAssignment = {
      id: `a${Date.now()}`,
      title,
      description,
      course,
      dueDate: dueDate,
      points: Number(points),
      difficultyLevel,
      submissionType,
      status: "Active",
      submissionsReceived: 0,
      totalStudents: course === "CS202" ? 46 : course === "CS301" ? 38 : 52
    };
    
    onCreate(newAssignment);
    toast.success("Assignment created successfully!");
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Assignment Title <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter assignment title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description/Instructions <span className="text-red-500">*</span></Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter detailed instructions for the assignment"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="course">Course <span className="text-red-500">*</span></Label>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CS202">CS202: Data Structures & Algorithms</SelectItem>
              <SelectItem value="CS301">CS301: Advanced Web Development</SelectItem>
              <SelectItem value="CS305">CS305: Database Management Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="points">Total Points</Label>
          <Input
            id="points"
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min={0}
            max={500}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Due Date <span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-start text-left font-normal w-full"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="submission-type">Submission Type</Label>
        <Select value={submissionType} onValueChange={setSubmissionType}>
          <SelectTrigger>
            <SelectValue placeholder="Select submission type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="code">Code Submission</SelectItem>
            <SelectItem value="document">Document Upload</SelectItem>
            <SelectItem value="quiz">Online Quiz</SelectItem>
            <SelectItem value="project">Project Submission</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {submissionType === "code" && (
        <div className="space-y-2 p-3 border rounded-md bg-muted/30">
          <Label htmlFor="test-cases">Test Cases (Optional)</Label>
          <Textarea
            id="test-cases"
            placeholder="Enter test cases for automated grading"
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            Enter input/output pairs separated by newlines for automated testing
          </p>
        </div>
      )}
      
      <DialogFooter className="mt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Create Assignment</Button>
      </DialogFooter>
    </div>
  );
};

// Faculty Dashboard Component
const FacultyDashboard = () => {
  const { profile } = useAuth();
  const [uploadedContent, setUploadedContent] = useState<any[]>([]);
  const [assignments, setAssignments] = useState(assignmentsMock);
  const [courses, setCourses] = useState(coursesMock);
  const [contentUploadOpen, setContentUploadOpen] = useState(false);
  const [assignmentCreatorOpen, setAssignmentCreatorOpen] = useState(false);
  
  const handleContentUpload = (newContent: any) => {
    setUploadedContent([newContent, ...uploadedContent]);
    setContentUploadOpen(false);
  };
  
  const handleAssignmentCreate = (newAssignment: any) => {
    setAssignments([newAssignment, ...assignments]);
    setAssignmentCreatorOpen(false);
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || "Professor"}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={contentUploadOpen} onOpenChange={setContentUploadOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" /> Upload Content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Upload Course Content</DialogTitle>
                  <DialogDescription>
                    Upload videos, documents, quizzes or assignments for your courses
                  </DialogDescription>
                </DialogHeader>
                <ContentUploadModal onUpload={handleContentUpload} />
              </DialogContent>
            </Dialog>
            
            <Dialog open={assignmentCreatorOpen} onOpenChange={setAssignmentCreatorOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                  <Code className="h-4 w-4" /> Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Create a new assignment or coding challenge for your students
                  </DialogDescription>
                </DialogHeader>
                <AssignmentCreatorModal onCreate={handleAssignmentCreate} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-campus-purple" /> 
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">136</div>
              <p className="text-muted-foreground text-sm">Total enrolled students</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Active Today</p>
                  <p className="text-muted-foreground">89</p>
                </div>
                <div>
                  <p className="font-medium">Assignment Submissions</p>
                  <p className="text-muted-foreground">43 (last 7 days)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-campus-blue" /> 
                Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-muted-foreground text-sm">Active courses</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Total Content</p>
                  <p className="text-muted-foreground">42 modules</p>
                </div>
                <div>
                  <p className="font-medium">Avg. Completion</p>
                  <p className="text-muted-foreground">74%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-campus-green" /> 
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-muted-foreground text-sm">Active assignments</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Pending Grading</p>
                  <p className="text-muted-foreground">18 submissions</p>
                </div>
                <div>
                  <p className="font-medium">Avg. Score</p>
                  <p className="text-muted-foreground">82%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-campus-purple/10 text-campus-purple">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-white">Course Content</TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-white">Assignments</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">Student Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-campus-purple" /> 
                    Module Completion Rates
                  </CardTitle>
                  <CardDescription>
                    Weekly module completion rates across all courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={moduleCompletionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis 
                          label={{ 
                            value: 'Completion %', 
                            angle: -90, 
                            position: 'insideLeft' 
                          }} 
                        />
                        <Tooltip />
                        <Bar 
                          dataKey="completion" 
                          fill="#8884d8" 
                          name="Completion Rate (%)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Grade Distribution</CardTitle>
                  <CardDescription>
                    Overall grade distribution across all courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={studentPerformanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {studentPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {studentPerformanceData.map((entry, index) => (
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
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
              <Card className="md:col-span-7">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                  <CardDescription>
                    Your scheduled classes and lectures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessionsMock.map((session) => (
                      <Card key={session.id} className="shadow-none border">
                        <CardHeader className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{session.title}</CardTitle>
                              <CardDescription>{session.course}</CardDescription>
                            </div>
                            <Badge>{session.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {format(session.date, "MMM d, yyyy 'at' h:mm a")}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <Button variant="outline" size="sm" className="mr-2">
                            Reschedule
                          </Button>
                          <Button size="sm">Start Session</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-5">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>
                    Student interactions in the last 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Assignment Submission</p>
                        <p className="text-xs text-muted-foreground">
                          Alex Johnson submitted "Binary Tree Implementation"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          15 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Discussion Comment</p>
                        <p className="text-xs text-muted-foreground">
                          Maria Garcia commented on "Help with React Hooks"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          34 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Video className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Content Viewed</p>
                        <p className="text-xs text-muted-foreground">
                          12 students watched "Introduction to Binary Trees"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <Check className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Quiz Completed</p>
                        <p className="text-xs text-muted-foreground">
                          8 students completed "JavaScript Fundamentals Quiz"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Course Content Management</h2>
                <p className="text-muted-foreground">
                  Upload, manage and schedule content for your courses
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-1" /> Upload New Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Upload Course Content</DialogTitle>
                    <DialogDescription>
                      Upload videos, documents, quizzes or assignments for your courses
                    </DialogDescription>
                  </DialogHeader>
                  <ContentUploadModal onUpload={handleContentUpload} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Courses</CardTitle>
                  <CardDescription>
                    Select a course to view and manage its content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <Card key={course.id} className="bg-muted/30">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{course.title}</CardTitle>
                          <CardDescription>{course.code}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 pb-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="font-medium">Students</p>
                              <p className="text-muted-foreground">{course.studentsEnrolled}</p>
                            </div>
                            <div>
                              <p className="font-medium">Completion</p>
                              <p className="text-muted-foreground">{course.completionRate}%</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full" variant="outline">
                            Manage Content
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recently Uploaded Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recently Uploaded Content</CardTitle>
                  <CardDescription>
                    Content you've recently added to your courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {uploadedContent.length > 0 ? (
                    <div className="space-y-4">
                      {uploadedContent.map((content) => (
                        <Card key={content.id} className="shadow-none border">
                          <CardHeader className="p-3 pb-0">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                {content.type === "video" && (
                                  <div className="bg-red-100 p-2 rounded-md">
                                    <Video className="h-4 w-4 text-red-600" />
                                  </div>
                                )}
                                {content.type === "document" && (
                                  <div className="bg-blue-100 p-2 rounded-md">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                  </div>
                                )}
                                {content.type === "quiz" && (
                                  <div className="bg-green-100 p-2 rounded-md">
                                    <Check className="h-4 w-4 text-green-600" />
                                  </div>
                                )}
                                {content.type === "assignment" && (
                                  <div className="bg-purple-100 p-2 rounded-md">
                                    <Code className="h-4 w-4 text-purple-600" />
                                  </div>
                                )}
                                <div>
                                  <CardTitle className="text-base">{content.title}</CardTitle>
                                  <CardDescription>
                                    {content.course === "CS202" ? "CS202: Data Structures & Algorithms" :
                                    content.course === "CS301" ? "CS301: Advanced Web Development" :
                                    "CS305: Database Management Systems"}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge variant="outline">{content.visibility}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-medium">File Name</p>
                                <p className="text-muted-foreground truncate">
                                  {content.fileName}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Uploaded On</p>
                                <p className="text-muted-foreground">
                                  {format(content.uploadDate, "MMM d, yyyy")}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Scheduled For</p>
                                <p className="text-muted-foreground">
                                  {format(content.scheduledDate, "MMM d, yyyy")}
                                </p>
                              </div>
                            </div>
                            {content.description && (
                              <p className="text-sm mt-2 line-clamp-2">
                                {content.description}
                              </p>
                            )}
                          </CardContent>
                          <CardFooter className="p-3 pt-0">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button size="sm" className="ml-auto">
                                View
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileUp className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No content uploaded yet</h3>
                      <p className="text-muted-foreground">
                        Upload course content to get started
                      </p>
                      <Button variant="outline" className="mt-4" onClick={() => setContentUploadOpen(true)}>
                        Upload Content
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Content Library */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Library</CardTitle>
                  <CardDescription>
                    Browse all your course content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-2">
                        <Select defaultValue="all-courses">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter by course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-courses">All Courses</SelectItem>
                            <SelectItem value="CS202">CS202: Data Structures & Algorithms</SelectItem>
                            <SelectItem value="CS301">CS301: Advanced Web Development</SelectItem>
                            <SelectItem value="CS305">CS305: Database Management Systems</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select defaultValue="all-types">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-types">All Types</SelectItem>
                            <SelectItem value="video">Videos</SelectItem>
                            <SelectItem value="document">Documents</SelectItem>
                            <SelectItem value="quiz">Quizzes</SelectItem>
                            <SelectItem value="assignment">Assignments</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2 md:ml-auto">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-1" /> Bulk Upload
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Course</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-4 py-3 text-sm">Binary Tree Traversal</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <Video className="h-3 w-3 mr-1" /> Video
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">CS202</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge className="bg-green-500">Published</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">Apr 10, 2023</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">Edit</Button>
                                <Button size="sm" variant="ghost">View</Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">React Hooks Overview</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <FileText className="h-3 w-3 mr-1" /> Document
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">CS301</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge className="bg-green-500">Published</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">Apr 8, 2023</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">Edit</Button>
                                <Button size="sm" variant="ghost">View</Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">Database Normalization Quiz</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" /> Quiz
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">CS305</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline">Scheduled</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">Apr 15, 2023</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">Edit</Button>
                                <Button size="sm" variant="ghost">View</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="assignments">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Assignments & Grading</h2>
                <p className="text-muted-foreground">
                  Create, manage and grade student assignments
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-1" /> Create Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                    <DialogDescription>
                      Create a new assignment or coding challenge for your students
                    </DialogDescription>
                  </DialogHeader>
                  <AssignmentCreatorModal onCreate={handleAssignmentCreate} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Assignments</CardTitle>
                  <CardDescription>
                    Currently active assignments and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments
                      .filter(assignment => assignment.status === "Active")
                      .map((assignment) => (
                        <Card key={assignment.id} className="shadow-none border">
                          <CardHeader className="p-3 pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{assignment.title}</CardTitle>
                                <CardDescription>{assignment.course}</CardDescription>
                              </div>
                              <Badge>Active</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Due Date</p>
                                <p className="text-muted-foreground">
                                  {assignment.dueDate}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Submissions</p>
                                <p className="text-muted-foreground">
                                  {assignment.submissionsReceived} / {assignment.totalStudents}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="font-medium">Submission Progress</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Progress 
                                    value={(assignment.submissionsReceived / assignment.totalStudents) * 100} 
                                    className="h-2" 
                                  />
                                  <span className="text-xs w-10 text-right">
                                    {Math.round((assignment.submissionsReceived / assignment.totalStudents) * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-3 pt-0">
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                View Submissions
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                <X className="h-4 w-4 mr-1" /> Close
                              </Button>
                              <Button size="sm" className="ml-auto">
                                Grade
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Past Assignments</CardTitle>
                  <CardDescription>
                    Completed assignments and their results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments
                      .filter(assignment => assignment.status === "Completed")
                      .map((assignment) => (
                        <Card key={assignment.id} className="shadow-none border">
                          <CardHeader className="p-3 pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{assignment.title}</CardTitle>
                                <CardDescription>{assignment.course}</CardDescription>
                              </div>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Due Date</p>
                                <p className="text-muted-foreground">
                                  {assignment.dueDate}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Submissions</p>
                                <p className="text-muted-foreground">
                                  {assignment.submissionsReceived} / {assignment.totalStudents}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Avg. Grade</p>
                                <p className="text-muted-foreground">
                                  85%
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Status</p>
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                  Graded
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-3 pt-0">
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                View Results
                              </Button>
                              <Button variant="outline" size="sm">
                                Export Grades
                              </Button>
                              <Button size="sm" className="ml-auto">
                                Reopen
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assignment Analytics</CardTitle>
                  <CardDescription>
                    Performance metrics across assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Submission Rates by Course</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>CS202: Data Structures & Algorithms</span>
                            <span>93%</span>
                          </div>
                          <Progress value={93} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>CS301: Advanced Web Development</span>
                            <span>87%</span>
                          </div>
                          <Progress value={87} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>CS305: Database Management Systems</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Average Grades by Assignment Type</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Coding Assignments</p>
                              <p className="text-2xl font-bold mt-1">82%</p>
                              <Badge variant="outline" className="mt-2">34 Assignments</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Written Assignments</p>
                              <p className="text-2xl font-bold mt-1">88%</p>
                              <Badge variant="outline" className="mt-2">27 Assignments</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Quizzes</p>
                              <p className="text-2xl font-bold mt-1">74%</p>
                              <Badge variant="outline" className="mt-2">42 Quizzes</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Projects</p>
                              <p className="text-2xl font-bold mt-1">91%</p>
                              <Badge variant="outline" className="mt-2">8 Projects</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto text-campus-purple mb-2" />
                      <h3 className="text-2xl font-bold">136</h3>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto text-campus-blue mb-2" />
                      <h3 className="text-2xl font-bold">83%</h3>
                      <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Code className="h-8 w-8 mx-auto text-campus-green mb-2" />
                      <h3 className="text-2xl font-bold">74%</h3>
                      <p className="text-sm text-muted-foreground">Avg. Assignment Completion</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto text-campus-pink mb-2" />
                      <h3 className="text-2xl font-bold">B+</h3>
                      <p className="text-sm text-muted-foreground">Avg. Grade</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Performance Overview</CardTitle>
                  <CardDescription>
                    Detailed analytics of student performance across courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">CS202: Data Structures & Algorithms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Grade Distribution</h4>
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "A", value: 18, color: "#4CAF50" },
                                      { name: "B", value: 15, color: "#8BC34A" },
                                      { name: "C", value: 8, color: "#FFC107" },
                                      { name: "D", value: 3, color: "#FF9800" },
                                      { name: "F", value: 2, color: "#F44336" },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    fill="#8884d8"
                                    label={({ name, value }) => `${name}: ${value}`}
                                    dataKey="value"
                                  >
                                    {
                                      [
                                        { name: "A", value: 18, color: "#4CAF50" },
                                        { name: "B", value: 15, color: "#8BC34A" },
                                        { name: "C", value: 8, color: "#FFC107" },
                                        { name: "D", value: 3, color: "#FF9800" },
                                        { name: "F", value: 2, color: "#F44336" },
                                      ].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))
                                    }
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Assignment Completion</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Assignment 1</span>
                                  <span>98%</span>
                                </div>
                                <Progress value={98} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Assignment 2</span>
                                  <span>94%</span>
                                </div>
                                <Progress value={94} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Assignment 3</span>
                                  <span>89%</span>
                                </div>
                                <Progress value={89} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Assignment 4</span>
                                  <span>93%</span>
                                </div>
                                <Progress value={93} className="h-2" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm">Course Average</span>
                                <Badge>86%</Badge>
                              </div>
                              <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm">Attendance Rate</span>
                                <Badge>92%</Badge>
                              </div>
                              <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm">Pass Rate</span>
                                <Badge>96%</Badge>
                              </div>
                              <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm">At-Risk Students</span>
                                <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">5</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Individual Student Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium">Student</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Overall Grade</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Assignments</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Attendance</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Participation</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              <tr>
                                <td className="px-4 py-3 text-sm">Alex Johnson</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge className="bg-green-500">A (92%)</Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">9/10 completed</td>
                                <td className="px-4 py-3 text-sm">94%</td>
                                <td className="px-4 py-3 text-sm">High</td>
                                <td className="px-4 py-3 text-sm">
                                  <Button size="sm" variant="ghost">View Details</Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Sarah Williams</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge className="bg-green-500">B+ (88%)</Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">8/10 completed</td>
                                <td className="px-4 py-3 text-sm">90%</td>
                                <td className="px-4 py-3 text-sm">Medium</td>
                                <td className="px-4 py-3 text-sm">
                                  <Button size="sm" variant="ghost">View Details</Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Michael Brown</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge className="bg-yellow-500">C (76%)</Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">7/10 completed</td>
                                <td className="px-4 py-3 text-sm">82%</td>
                                <td className="px-4 py-3 text-sm">Low</td>
                                <td className="px-4 py-3 text-sm">
                                  <Button size="sm" variant="ghost">View Details</Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Emily Davis</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge className="bg-red-500">D (64%)</Badge>
                                </td>
                                <td className="px-4 py-3 text-sm">5/10 completed</td>
                                <td className="px-4 py-3 text-sm">70%</td>
                                <td className="px-4 py-3 text-sm">Low</td>
                                <td className="px-4 py-3 text-sm">
                                  <Button size="sm" variant="ghost">View Details</Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button>View All Students</Button>
                        </div>
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

export default FacultyDashboard;

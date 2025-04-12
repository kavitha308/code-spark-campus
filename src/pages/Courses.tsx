
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, FileText, Lock, CheckCircle, PlayCircle, Star, ArrowRight, Download } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Sample course data
const availableCourses = [
  {
    id: "c1",
    title: "Advanced Data Structures",
    instructor: "Dr. Smith",
    description: "A comprehensive look at advanced data structures and algorithm analysis.",
    difficulty: "Advanced",
    duration: "8 weeks",
    rating: 4.8,
    enrollments: 235,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    topics: ["Trees", "Graphs", "Dynamic Programming", "NP-Completeness"],
    syllabus: [
      { week: 1, topic: "Binary Trees and BSTs" },
      { week: 2, topic: "AVL Trees and Red-Black Trees" },
      { week: 3, topic: "Graph Representation" },
      { week: 4, topic: "Graph Algorithms" },
      { week: 5, topic: "Dynamic Programming Basics" },
      { week: 6, topic: "Advanced DP Problems" },
      { week: 7, topic: "P vs NP & NP-Completeness" },
      { week: 8, topic: "Final Project & Presentation" }
    ]
  },
  {
    id: "c2",
    title: "Web Development with React",
    instructor: "Prof. Johnson",
    description: "Learn modern web development using React.js and related technologies.",
    difficulty: "Intermediate",
    duration: "10 weeks",
    rating: 4.9,
    enrollments: 412,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2231&q=80",
    topics: ["React", "Redux", "Hooks", "API Integration"],
    syllabus: [
      { week: 1, topic: "JavaScript Review & Modern ES6+" },
      { week: 2, topic: "React Fundamentals" },
      { week: 3, topic: "Component Lifecycle & Hooks" },
      { week: 4, topic: "State Management with Context" },
      { week: 5, topic: "Redux & Redux Toolkit" },
      { week: 6, topic: "API Integration & Async Operations" },
      { week: 7, topic: "Testing React Applications" },
      { week: 8, topic: "Performance Optimization" },
      { week: 9, topic: "Deployment & CI/CD" },
      { week: 10, topic: "Final Project" }
    ]
  },
  {
    id: "c3",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Chen",
    description: "An introduction to machine learning concepts and techniques.",
    difficulty: "Intermediate",
    duration: "12 weeks",
    rating: 4.7,
    enrollments: 378,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2565&q=80",
    topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Python"],
    syllabus: [
      { week: 1, topic: "Introduction to ML & Python for ML" },
      { week: 2, topic: "Data Preprocessing & Exploration" },
      { week: 3, topic: "Regression Algorithms" },
      { week: 4, topic: "Classification Algorithms I" },
      { week: 5, topic: "Classification Algorithms II" },
      { week: 6, topic: "Model Evaluation & Validation" },
      { week: 7, topic: "Unsupervised Learning" },
      { week: 8, topic: "Dimensionality Reduction" },
      { week: 9, topic: "Neural Networks Basics" },
      { week: 10, topic: "Deep Learning Introduction" },
      { week: 11, topic: "ML Project Development" },
      { week: 12, topic: "Final Project Presentation" }
    ]
  }
];

// Function to create a proper Date instance from the date string
const createDate = (dateStr: string) => {
  return new Date(dateStr);
};

const initialEnrolledCourses = [
  {
    id: "e1",
    title: "Database Management Systems",
    instructor: "Prof. Garcia",
    description: "Learn database design, normalization, and SQL.",
    progress: 65,
    lastAccessed: createDate("2023-04-01"),
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    content: [
      {
        id: "m1",
        title: "Introduction to Databases",
        type: "video",
        duration: "25 min",
        completed: true,
        url: "https://example.com/video1"
      },
      {
        id: "m2",
        title: "ER Diagrams & Database Design",
        type: "document",
        duration: "15 min",
        completed: true,
        url: "https://example.com/doc1"
      },
      {
        id: "m3",
        title: "SQL Basics",
        type: "video",
        duration: "30 min",
        completed: true,
        url: "https://example.com/video2"
      },
      {
        id: "m4",
        title: "Normalization",
        type: "document",
        duration: "20 min",
        completed: false,
        url: "https://example.com/doc2"
      },
      {
        id: "m5",
        title: "Advanced Queries",
        type: "quiz",
        questions: 10,
        completed: false,
        url: "https://example.com/quiz1"
      },
      {
        id: "m6",
        title: "Stored Procedures & Triggers",
        type: "video",
        duration: "35 min",
        completed: false,
        url: "https://example.com/video3"
      }
    ]
  },
  {
    id: "e2",
    title: "Object-Oriented Programming",
    instructor: "Dr. Thompson",
    description: "Master OOP concepts using Java.",
    progress: 30,
    lastAccessed: createDate("2023-04-05"),
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    content: [
      {
        id: "m1",
        title: "OOP Principles",
        type: "video",
        duration: "40 min",
        completed: true,
        url: "https://example.com/video1"
      },
      {
        id: "m2",
        title: "Classes & Objects in Java",
        type: "document",
        duration: "25 min",
        completed: true,
        url: "https://example.com/doc1"
      },
      {
        id: "m3",
        title: "Inheritance & Polymorphism",
        type: "video",
        duration: "35 min",
        completed: false,
        url: "https://example.com/video2"
      },
      {
        id: "m4",
        title: "Interfaces & Abstract Classes",
        type: "document",
        duration: "20 min",
        completed: false,
        url: "https://example.com/doc2"
      },
      {
        id: "m5",
        title: "Design Patterns",
        type: "video",
        duration: "45 min",
        completed: false,
        url: "https://example.com/video3"
      }
    ]
  }
];

const initialCompletedCourses = [
  {
    id: "cc1",
    title: "Python Programming",
    instructor: "Dr. Wilson",
    description: "A beginner's guide to Python programming language.",
    completedDate: createDate("2023-03-15"),
    grade: "A",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
  }
];

const CourseLearningModal = ({ open, setOpen, course }: { open: boolean, setOpen: (open: boolean) => void, course: any }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [moduleContent, setModuleContent] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const handleModuleClick = (moduleId: string) => {
    const module = course.content.find((m: any) => m.id === moduleId);
    if (module) {
      setActiveModule(moduleId);
      
      if (module.type === "document") {
        setModuleContent(`
          <div class="p-4 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">${module.title}</h2>
            <p>This is a sample document content for ${module.title}. In a real application, this would contain actual course material.</p>
            <p class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
            <h3 class="text-lg font-semibold mt-4">Key Points</h3>
            <ul class="list-disc pl-5 mt-2">
              <li>Important concept 1</li>
              <li>Important concept 2</li>
              <li>Important concept 3</li>
            </ul>
          </div>
        `);
      } else if (module.type === "video") {
        setModuleContent(`
          <div class="p-4 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">${module.title}</h2>
            <div class="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2">Video Player (Sample)</p>
              </div>
            </div>
            <div class="mt-4">
              <h3 class="font-semibold">Video Transcript</h3>
              <p class="mt-2">This is a sample transcript for the video lecture on ${module.title}. In a real application, this would contain the actual transcript.</p>
            </div>
          </div>
        `);
      } else if (module.type === "quiz") {
        setModuleContent(`
          <div class="p-4 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">${module.title} Quiz</h2>
            <form id="quiz-form" class="space-y-6">
              <div>
                <h3 class="font-medium mb-2">Question 1: What is the primary purpose of normalization in database design?</h3>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" name="q1" value="a" class="mr-2" ${quizAnswers["q1"] === "a" ? "checked" : ""} ${quizSubmitted ? "disabled" : ""}>
                    To reduce data redundancy and improve data integrity
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="q1" value="b" class="mr-2" ${quizAnswers["q1"] === "b" ? "checked" : ""} ${quizSubmitted ? "disabled" : ""}>
                    To increase storage efficiency only
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="q1" value="c" class="mr-2" ${quizAnswers["q1"] === "c" ? "checked" : ""} ${quizSubmitted ? "disabled" : ""}>
                    To complicate database design
                  </label>
                </div>
                ${quizSubmitted && quizAnswers["q1"] === "a" ? 
                  '<p class="text-green-600 mt-1">Correct! Normalization helps reduce redundancy and dependency.</p>' : 
                  quizSubmitted ? '<p class="text-red-600 mt-1">Incorrect. The correct answer is: To reduce data redundancy and improve data integrity.</p>' : ''}
              </div>
              
              <div>
                <h3 class="font-medium mb-2">Question 2: Which SQL statement is used to retrieve data from a database?</h3>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" name="q2" value="a" class="mr-2" ${quizAnswers["q2"] === "a" ? "checked" : ""} ${quizSubmitted ? "disabled" : ""}>
                    INSERT
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="q2" value="b" class="mr-2" ${quizAnswers["q2"] === "b" ? "checked" : ""} ${quizSubmitted ? "disabled" : ""}>
                    SELECT
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="q2" value="c" class="mr-2" ${quizAnswers["q2"] === "c" ? "checked" : ""} ${quizSubmitted ? "disabled" : ""}>
                    UPDATE
                  </label>
                </div>
                ${quizSubmitted && quizAnswers["q2"] === "b" ? 
                  '<p class="text-green-600 mt-1">Correct! SELECT is used to query and retrieve data.</p>' : 
                  quizSubmitted ? '<p class="text-red-600 mt-1">Incorrect. The correct answer is: SELECT</p>' : ''}
              </div>
            </form>
            ${!quizSubmitted ?
              '<button id="submit-quiz" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Submit Quiz</button>' :
              '<p class="mt-4 text-blue-600 font-medium">Quiz submitted! You got 2/2 correct.</p>'
            }
          </div>
        `);
      }
    }
  };
  
  const handleQuizSubmit = () => {
    // In a real app, you'd validate answers against correct ones
    setQuizSubmitted(true);
    toast.success("Quiz submitted successfully!");
    
    // Mark the module as completed in a real app
    // Here we're just showing a success message
  };
  
  const handleMarkCompleted = () => {
    if (!activeModule) return;
    
    // Update the course progress
    // In a real app, you'd also update this in the database
    toast.success("Module marked as completed!");
    
    // Close the modal after a delay
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl h-[80vh] max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">{course.title}</DialogTitle>
          <DialogDescription>
            Instructor: {course.instructor}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-1 h-full overflow-hidden">
          {/* Sidebar with modules */}
          <div className="w-64 border-r overflow-y-auto">
            <div className="py-2 px-3">
              <p className="text-sm font-medium mb-2">Course Progress</p>
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-right mt-1">{course.progress}% Complete</p>
            </div>
            
            <div className="px-1 py-2">
              <p className="text-sm font-medium px-2 mb-1">Course Content</p>
              <ul className="space-y-1">
                {course.content.map((module: any) => (
                  <li key={module.id}>
                    <button 
                      className={`w-full text-left px-2 py-2 rounded text-sm ${activeModule === module.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                      onClick={() => handleModuleClick(module.id)}
                    >
                      <div className="flex items-center">
                        {module.type === 'video' && <PlayCircle className="h-4 w-4 mr-2" />}
                        {module.type === 'document' && <FileText className="h-4 w-4 mr-2" />}
                        {module.type === 'quiz' && <CheckCircle className="h-4 w-4 mr-2" />}
                        <span className="line-clamp-1">{module.title}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                        <span>
                          {module.type === 'quiz' ? `${module.questions} questions` : module.duration}
                        </span>
                        {module.completed && <Badge variant="outline" className="text-xs py-0 h-5">Completed</Badge>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeModule ? (
              <>
                <div dangerouslySetInnerHTML={{ __html: moduleContent || '' }} />
                
                <div className="mt-4 flex justify-end">
                  {quizSubmitted ? (
                    <Button onClick={handleMarkCompleted}>
                      Mark as Completed
                    </Button>
                  ) : (
                    activeModule && course.content.find((m: any) => m.id === activeModule)?.type === 'quiz' ? (
                      <Button onClick={handleQuizSubmit}>
                        Submit Quiz
                      </Button>
                    ) : (
                      <Button onClick={handleMarkCompleted}>
                        Mark as Completed
                      </Button>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Select a module to begin</h3>
                  <p className="text-muted-foreground">Choose a module from the left sidebar to start learning</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AvailableCourseDetails = ({ course, onEnroll }: { course: any, onEnroll: (course: any) => void }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">View Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{course.title}</DialogTitle>
            <DialogDescription>Course Information & Syllabus</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            <div>
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 rounded-md object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Instructor</p>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Difficulty</p>
                <p className="text-sm text-muted-foreground">{course.difficulty}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{course.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Enrollments</p>
                <p className="text-sm text-muted-foreground">{course.enrollments}+ students</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Rating</p>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">{course.rating}/5</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Description</p>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Topics Covered</p>
              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic: string, index: number) => (
                  <Badge key={index} variant="secondary">{topic}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Syllabus</p>
              <ul className="space-y-2">
                {course.syllabus.map((item: any, index: number) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">Week {item.week}:</span>{" "}
                    <span className="text-muted-foreground">{item.topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => {
              onEnroll(course);
              setOpen(false);
            }} className="w-full">
              Enroll Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CertificateModal = ({ course, open, setOpen }: { course: any, open: boolean, setOpen: (open: boolean) => void }) => {
  const { profile, user } = useAuth();
  const fullName = profile?.full_name || user?.email?.split('@')[0] || "Student Name";
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Course Completion Certificate</DialogTitle>
          <DialogDescription>
            Congratulations on completing the course!
          </DialogDescription>
        </DialogHeader>
        
        <div className="border-8 border-double border-purple-200 p-8 text-center space-y-6">
          <div className="uppercase text-sm tracking-widest text-campus-purple">Campus Bridge Learning Platform</div>
          
          <h2 className="text-2xl font-serif">Certificate of Completion</h2>
          
          <p className="text-sm text-muted-foreground">This certifies that</p>
          
          <p className="text-xl font-semibold">{fullName}</p>
          
          <p className="text-sm text-muted-foreground">has successfully completed the course</p>
          
          <p className="text-lg font-medium">{course.title}</p>
          
          <div className="pt-2">
            <p className="text-sm">Instructor: <span className="font-medium">{course.instructor}</span></p>
            <p className="text-sm">Completed on: <span className="font-medium">
              {course.completedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span></p>
            <p className="text-sm">Grade Achieved: <span className="font-medium">{course.grade}</span></p>
          </div>
          
          <div className="pt-4 flex justify-center">
            <div className="border-b border-gray-400 w-40">
              <p className="text-sm text-muted-foreground">Authorized Signature</p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Certificate ID: CAMP-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            <p>Verify at: campus-bridge.edu/verify</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const [availableCoursesList, setAvailableCoursesList] = useState(availableCourses);
  const [enrolledCoursesList, setEnrolledCoursesList] = useState(initialEnrolledCourses);
  const [completedCoursesList, setCompletedCoursesList] = useState(initialCompletedCourses);
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [selectedCompletedCourse, setSelectedCompletedCourse] = useState<any>(null);
  const { user, profile } = useAuth();
  
  const handleEnrollCourse = (course: any) => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to enroll in courses");
      navigate("/auth");
      return;
    }
    
    // Convert the available course to an enrolled course format
    const newEnrolledCourse = {
      id: `e${Date.now()}`,
      title: course.title,
      instructor: course.instructor,
      description: course.description,
      progress: 0,
      lastAccessed: new Date(),
      image: course.image,
      // Generate some mock content based on the course syllabus
      content: course.syllabus.map((week: any, index: number) => ({
        id: `m${index + 1}`,
        title: week.topic,
        type: index % 3 === 0 ? "video" : index % 3 === 1 ? "document" : "quiz",
        duration: `${Math.floor(Math.random() * 30) + 15} min`,
        completed: false,
        url: `https://example.com/${index % 3 === 0 ? 'video' : index % 3 === 1 ? 'doc' : 'quiz'}${index + 1}`
      }))
    };
    
    // Add to enrolled courses
    setEnrolledCoursesList([newEnrolledCourse, ...enrolledCoursesList]);
    
    // Remove from available courses
    setAvailableCoursesList(availableCoursesList.filter(c => c.id !== course.id));
    
    toast.success(`Successfully enrolled in ${course.title}!`);
  };
  
  const handleContinueLearning = (course: any) => {
    setSelectedCourse(course);
    setLearningModalOpen(true);
  };
  
  const handleViewCertificate = (course: any) => {
    setSelectedCompletedCourse(course);
    setCertificateModalOpen(true);
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Browse, enroll and track your progress in available courses
          </p>
        </div>
        
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="bg-campus-purple/10 text-campus-purple">
            <TabsTrigger value="available" className="data-[state=active]:bg-white">Available Courses</TabsTrigger>
            <TabsTrigger value="enrolled" className="data-[state=active]:bg-white">My Enrolled Courses</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-white">Completed Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCoursesList.length > 0 ? (
                availableCoursesList.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition hover:shadow-md">
                    <div className="relative h-48">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-campus-purple">
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span>{course.instructor}</span>
                        <span className="inline-flex items-center ml-auto">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          {course.rating}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{course.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{course.enrollments}+ enrolled</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {course.topics.slice(0, 2).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.topics.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <AvailableCourseDetails 
                        course={course}
                        onEnroll={handleEnrollCourse}
                      />
                      <Button onClick={() => handleEnrollCourse(course)}>
                        Enroll Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No available courses</h3>
                  <p className="text-muted-foreground">
                    You've enrolled in all available courses
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="enrolled">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesList.length > 0 ? (
                enrolledCoursesList.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition hover:shadow-md">
                    <div className="relative h-40">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        Instructor: {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Last accessed: {course.lastAccessed.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button
                        className="w-full"
                        onClick={() => handleContinueLearning(course)}
                      >
                        Continue Learning <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No enrolled courses</h3>
                  <p className="text-muted-foreground">
                    Browse available courses and enroll to get started
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => document.querySelector('[data-state="inactive"][value="available"]')?.click()}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>
            
            {/* Learning Modal for Continue Learning */}
            {selectedCourse && (
              <CourseLearningModal
                open={learningModalOpen}
                setOpen={setLearningModalOpen}
                course={selectedCourse}
              />
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCoursesList.length > 0 ? (
                completedCoursesList.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition hover:shadow-md border-green-100">
                    <div className="relative h-40">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="absolute bottom-3 left-3 flex items-center">
                          <Badge className="bg-green-500">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        Instructor: {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Completion Date:</span>
                          <span>
                            {course.completedDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Grade:</span>
                          <Badge variant="outline">{course.grade}</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleViewCertificate(course)}
                      >
                        View Certificate
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No completed courses yet</h3>
                  <p className="text-muted-foreground">
                    Complete your enrolled courses to earn certificates
                  </p>
                </div>
              )}
            </div>
            
            {selectedCompletedCourse && (
              <CertificateModal 
                course={selectedCompletedCourse}
                open={certificateModalOpen}
                setOpen={setCertificateModalOpen}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Courses;

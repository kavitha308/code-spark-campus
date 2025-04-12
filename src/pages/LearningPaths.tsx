
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Code,
  Layers,
  CheckCircle,
  Lock,
  ExternalLink,
  Star,
  Trophy,
  ArrowRight,
  Clock,
  Activity,
  BarChart,
  MoveRight,
  CheckCircle2,
  Lightbulb,
  Flame
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LearningPaths = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  
  // Sample learning paths data
  const learningPaths = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Master front-end and back-end technologies for building modern web applications",
      level: "All Levels",
      modules: 15,
      hours: 45,
      completedModules: 8,
      enrolledStudents: 457,
      rating: 4.8,
      category: "Development",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      phases: [
        {
          title: "HTML & CSS Fundamentals",
          completed: true,
          modules: [
            { title: "Introduction to HTML", completed: true, type: "video" },
            { title: "HTML Elements & Structure", completed: true, type: "reading" },
            { title: "CSS Basics", completed: true, type: "video" },
            { title: "CSS Layout & Flexbox", completed: true, type: "practice" },
            { title: "Responsive Design", completed: true, type: "quiz" },
          ]
        },
        {
          title: "JavaScript Essentials",
          completed: true,
          modules: [
            { title: "JavaScript Syntax", completed: true, type: "video" },
            { title: "Functions & Objects", completed: true, type: "reading" },
            { title: "DOM Manipulation", completed: true, type: "practice" },
            { title: "Event Handling", completed: true, type: "video" },
          ]
        },
        {
          title: "React Framework",
          completed: false,
          currentModule: true,
          modules: [
            { title: "React Fundamentals", completed: true, type: "video" },
            { title: "Components & Props", completed: true, type: "practice" },
            { title: "State & Lifecycle", completed: false, type: "practice", current: true },
            { title: "Hooks & Context API", completed: false, type: "video", locked: true },
            { title: "React Router", completed: false, type: "practice", locked: true },
          ]
        },
        {
          title: "Backend Development",
          completed: false,
          modules: [
            { title: "Node.js Basics", completed: false, type: "video", locked: true },
            { title: "Express Framework", completed: false, type: "practice", locked: true },
            { title: "RESTful APIs", completed: false, type: "practice", locked: true },
            { title: "Database Integration", completed: false, type: "project", locked: true },
          ]
        },
        {
          title: "Full Stack Project",
          completed: false,
          modules: [
            { title: "Project Planning", completed: false, type: "reading", locked: true },
            { title: "Frontend Implementation", completed: false, type: "project", locked: true },
            { title: "Backend Implementation", completed: false, type: "project", locked: true },
            { title: "Deployment & Testing", completed: false, type: "project", locked: true },
          ]
        }
      ]
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      description: "Learn data analysis, visualization, and machine learning techniques",
      level: "Intermediate",
      modules: 12,
      hours: 40,
      completedModules: 3,
      enrolledStudents: 389,
      rating: 4.7,
      category: "Data",
      tags: ["Python", "Data Analysis", "Machine Learning", "Visualization"],
      phases: [
        {
          title: "Python for Data Science",
          completed: true,
          modules: [
            { title: "Python Basics", completed: true, type: "video" },
            { title: "Data Structures", completed: true, type: "practice" },
            { title: "NumPy & Pandas", completed: true, type: "practice" },
            { title: "Data Manipulation", completed: true, type: "project" },
          ]
        },
        {
          title: "Data Analysis & Visualization",
          completed: false,
          currentModule: true,
          modules: [
            { title: "Exploratory Data Analysis", completed: true, type: "video" },
            { title: "Visualization with Matplotlib", completed: true, type: "practice" },
            { title: "Advanced Visualization", completed: false, type: "practice", current: true },
            { title: "Dashboard Creation", completed: false, type: "project", locked: true },
          ]
        },
        {
          title: "Machine Learning Basics",
          completed: false,
          modules: [
            { title: "ML Fundamentals", completed: false, type: "video", locked: true },
            { title: "Supervised Learning", completed: false, type: "practice", locked: true },
            { title: "Unsupervised Learning", completed: false, type: "practice", locked: true },
            { title: "Model Evaluation", completed: false, type: "project", locked: true },
          ]
        },
        {
          title: "Advanced Machine Learning",
          completed: false,
          modules: [
            { title: "Neural Networks", completed: false, type: "video", locked: true },
            { title: "Deep Learning", completed: false, type: "practice", locked: true },
            { title: "Natural Language Processing", completed: false, type: "practice", locked: true },
            { title: "Computer Vision", completed: false, type: "project", locked: true },
          ]
        }
      ]
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications for iOS and Android",
      level: "Beginner to Intermediate",
      modules: 10,
      hours: 35,
      completedModules: 0,
      enrolledStudents: 312,
      rating: 4.6,
      category: "Development",
      tags: ["React Native", "Flutter", "iOS", "Android", "UI/UX"],
      phases: [
        {
          title: "Mobile Development Foundations",
          completed: false,
          modules: [
            { title: "Introduction to Mobile Dev", completed: false, type: "video" },
            { title: "Mobile UI/UX Principles", completed: false, type: "reading" },
            { title: "App Architecture", completed: false, type: "video" },
          ]
        },
        {
          title: "React Native Essentials",
          completed: false,
          modules: [
            { title: "Setup & First App", completed: false, type: "practice" },
            { title: "Components & Styling", completed: false, type: "video" },
            { title: "Navigation", completed: false, type: "practice" },
            { title: "State Management", completed: false, type: "practice" },
          ]
        },
        {
          title: "Native Features",
          completed: false,
          modules: [
            { title: "Camera & Photos", completed: false, type: "practice", locked: true },
            { title: "Geolocation", completed: false, type: "practice", locked: true },
            { title: "Push Notifications", completed: false, type: "practice", locked: true },
          ]
        },
        {
          title: "Publishing & Deployment",
          completed: false,
          modules: [
            { title: "App Store Preparation", completed: false, type: "reading", locked: true },
            { title: "Google Play Preparation", completed: false, type: "reading", locked: true },
            { title: "CI/CD for Mobile", completed: false, type: "practice", locked: true },
          ]
        }
      ]
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing",
      description: "Master cloud services, infrastructure, and deployment using leading platforms",
      level: "Intermediate to Advanced",
      modules: 12,
      hours: 42,
      completedModules: 0,
      enrolledStudents: 276,
      rating: 4.9,
      category: "Infrastructure",
      tags: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps"],
      phases: []
    },
  ];

  const handleEnrollPath = (pathId: string) => {
    toast({
      title: "Enrolled Successfully",
      description: `You have been enrolled in the ${learningPaths.find(p => p.id === pathId)?.title} learning path.`,
    });
  };

  const handleContinueLearning = (pathId: string) => {
    // In a real app, this would navigate to the current module
    toast({
      title: "Continuing Learning",
      description: "Resuming from where you left off.",
    });
  };

  const handleOpenPath = (pathId: string) => {
    setSelectedPath(pathId);
  };

  const calculateProgress = (path: any) => {
    return Math.round((path.completedModules / path.modules) * 100);
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Learning Paths
        </h1>

        {!selectedPath ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card 
                  key={path.id}
                  className="bg-gradient-to-br from-white to-purple-50 shadow-md hover:shadow-lg transition-all duration-300 animate-hover border-purple-100"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-blue-50 text-campus-blue border-campus-blue">
                            {path.category}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 text-campus-purple border-campus-purple">
                            {path.level}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                        <CardDescription className="mt-1">{path.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{calculateProgress(path)}%</span>
                        </div>
                        <Progress value={calculateProgress(path)} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-md bg-white shadow-sm">
                          <div className="text-campus-purple font-semibold">{path.modules}</div>
                          <div className="text-xs text-muted-foreground">Modules</div>
                        </div>
                        <div className="p-2 rounded-md bg-white shadow-sm">
                          <div className="text-campus-blue font-semibold">{path.hours}</div>
                          <div className="text-xs text-muted-foreground">Hours</div>
                        </div>
                        <div className="p-2 rounded-md bg-white shadow-sm">
                          <div className="text-campus-green font-semibold">{path.enrolledStudents}</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {path.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{path.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="text-campus-purple border-campus-purple"
                        onClick={() => handleOpenPath(path.id)}
                      >
                        Details
                      </Button>
                      {path.completedModules > 0 ? (
                        <Button 
                          className="gradient-purple"
                          onClick={() => handleContinueLearning(path.id)}
                        >
                          Continue <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          className="gradient-blue"
                          onClick={() => handleEnrollPath(path.id)}
                        >
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-br from-white to-green-50 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-campus-green" />
                  Your Learning Progress
                </CardTitle>
                <CardDescription>
                  Track your development journey across different learning paths
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-white shadow-sm text-center">
                      <div className="text-3xl font-bold text-campus-purple">2</div>
                      <div className="text-sm text-muted-foreground">Active Paths</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white shadow-sm text-center">
                      <div className="text-3xl font-bold text-campus-blue">11</div>
                      <div className="text-sm text-muted-foreground">Completed Modules</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white shadow-sm text-center">
                      <div className="text-3xl font-bold text-campus-green">32</div>
                      <div className="text-sm text-muted-foreground">Hours Spent</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white shadow-sm text-center">
                      <div className="text-3xl font-bold text-campus-orange">4</div>
                      <div className="text-sm text-muted-foreground">Certificates</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Learning Activity</h3>
                    <div className="h-[120px] bg-white rounded-lg shadow-sm p-4">
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Activity className="h-5 w-5 mr-2" />
                        <span>Activity chart would be displayed here</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-campus-blue" />
                  Recommended for You
                </CardTitle>
                <CardDescription>
                  Based on your interests and current skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700">Beginner</Badge>
                    </div>
                    <h3 className="font-medium">Python Programming</h3>
                    <p className="text-sm text-muted-foreground mt-1">Learn Python programming from scratch</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>30 hours</span>
                      </div>
                      <Button size="sm" variant="outline">View Path</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-orange-100 text-orange-700">Intermediate</Badge>
                    </div>
                    <h3 className="font-medium">Cybersecurity Basics</h3>
                    <p className="text-sm text-muted-foreground mt-1">Learn essential security practices and tools</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>25 hours</span>
                      </div>
                      <Button size="sm" variant="outline">View Path</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-700">Beginner</Badge>
                    </div>
                    <h3 className="font-medium">UI/UX Design</h3>
                    <p className="text-sm text-muted-foreground mt-1">Learn principles of effective interface design</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>20 hours</span>
                      </div>
                      <Button size="sm" variant="outline">View Path</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Path details view */}
            {learningPaths.filter(path => path.id === selectedPath).map((path) => (
              <div key={path.id} className="space-y-6">
                <Button 
                  variant="ghost" 
                  className="mb-2" 
                  onClick={() => setSelectedPath(null)}
                >
                  <ArrowRight className="h-4 w-4 rotate-180 mr-2" /> Back to All Paths
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md">
                      <CardHeader>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-campus-blue border-campus-blue">
                              {path.category}
                            </Badge>
                            <Badge variant="outline" className="bg-purple-50 text-campus-purple border-campus-purple">
                              {path.level}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl">{path.title}</CardTitle>
                          <CardDescription className="mt-2">{path.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Overall Progress</span>
                              <span className="font-medium">{calculateProgress(path)}%</span>
                            </div>
                            <Progress value={calculateProgress(path)} className="h-2" />
                          </div>
                          
                          <Tabs defaultValue="curriculum">
                            <TabsList>
                              <TabsTrigger value="curriculum">
                                <BookOpen className="h-4 w-4 mr-1" /> Curriculum
                              </TabsTrigger>
                              <TabsTrigger value="about">
                                <Layers className="h-4 w-4 mr-1" /> About this Path
                              </TabsTrigger>
                              <TabsTrigger value="reviews">
                                <Star className="h-4 w-4 mr-1" /> Reviews
                              </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="curriculum" className="space-y-4 py-4">
                              {path.phases.map((phase, phaseIndex) => (
                                <div 
                                  key={phaseIndex}
                                  className={`rounded-lg border ${
                                    phase.completed ? 'bg-green-50/50 border-green-200' :
                                    phase.currentModule ? 'bg-blue-50/50 border-blue-200' :
                                    'bg-white border-gray-200'
                                  }`}
                                >
                                  <div className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      {phase.completed ? (
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                          <CheckCircle className="h-5 w-5" />
                                        </div>
                                      ) : phase.currentModule ? (
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                          <Flame className="h-5 w-5" />
                                        </div>
                                      ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                                          <Layers className="h-5 w-5" />
                                        </div>
                                      )}
                                      <div>
                                        <h3 className="font-medium">{phase.title}</h3>
                                        <div className="text-sm text-muted-foreground">
                                          {phase.modules.length} modules
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      {phase.completed ? (
                                        <Badge className="bg-green-100 text-green-700">Completed</Badge>
                                      ) : phase.currentModule ? (
                                        <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
                                      ) : (
                                        <Badge variant="outline">Upcoming</Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="px-4 pb-4 pt-2">
                                    <div className="space-y-3">
                                      {phase.modules.map((module, moduleIndex) => (
                                        <div 
                                          key={moduleIndex} 
                                          className={`p-3 rounded-md flex items-center justify-between ${
                                            module.completed ? 'bg-green-50' :
                                            module.current ? 'bg-blue-50 border-2 border-blue-200' :
                                            module.locked ? 'bg-gray-50 opacity-70' :
                                            'bg-white border border-gray-100'
                                          }`}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                              module.completed ? 'bg-green-100 text-green-700' :
                                              module.current ? 'bg-blue-100 text-blue-700' :
                                              'bg-gray-100 text-gray-500'
                                            }`}>
                                              {module.completed ? (
                                                <CheckCircle2 className="h-4 w-4" />
                                              ) : module.locked ? (
                                                <Lock className="h-4 w-4" />
                                              ) : (
                                                moduleIndex + 1
                                              )}
                                            </div>
                                            <div>
                                              <div className="flex items-center gap-2">
                                                <span className={module.locked ? 'text-gray-500' : ''}>{module.title}</span>
                                                {module.current && (
                                                  <Badge className="h-5 bg-blue-500">Current</Badge>
                                                )}
                                              </div>
                                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                {module.type === 'video' && <span>Video Lesson</span>}
                                                {module.type === 'reading' && <span>Reading Material</span>}
                                                {module.type === 'practice' && <span>Practice Exercise</span>}
                                                {module.type === 'quiz' && <span>Assessment Quiz</span>}
                                                {module.type === 'project' && <span>Project Work</span>}
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <Button 
                                            size="sm" 
                                            variant={module.completed ? "ghost" : module.current ? "default" : "outline"}
                                            className={
                                              module.completed ? "text-green-700 hover:text-green-800 hover:bg-green-50" : 
                                              module.current ? "gradient-blue" : ""
                                            }
                                            disabled={module.locked}
                                          >
                                            {module.completed ? (
                                              <span className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-1" /> Completed
                                              </span>
                                            ) : module.current ? (
                                              <span className="flex items-center">
                                                Continue <MoveRight className="ml-1 h-4 w-4" />
                                              </span>
                                            ) : (
                                              <span className="flex items-center">
                                                Start <ArrowRight className="ml-1 h-4 w-4" />
                                              </span>
                                            )}
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </TabsContent>
                            
                            <TabsContent value="about" className="space-y-4 py-4">
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg border">
                                  <h3 className="font-medium mb-2">About this Learning Path</h3>
                                  <p className="text-muted-foreground">
                                    This comprehensive learning path is designed to take you from basics to advanced concepts in {path.title.toLowerCase()}. 
                                    You'll learn through a combination of video lessons, reading materials, hands-on practice, 
                                    and project work that will help you build a strong portfolio.
                                  </p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg border">
                                  <h3 className="font-medium mb-2">What You'll Learn</h3>
                                  <ul className="space-y-2">
                                    {path.phases.map((phase, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                                        <span>{phase.title}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg border">
                                  <h3 className="font-medium mb-2">Requirements</h3>
                                  <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                      <ArrowRight className="h-4 w-4 text-campus-blue mt-1" />
                                      <span>Basic computer knowledge</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <ArrowRight className="h-4 w-4 text-campus-blue mt-1" />
                                      <span>Dedication to complete all modules</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <ArrowRight className="h-4 w-4 text-campus-blue mt-1" />
                                      <span>3-5 hours per week of study time</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg border">
                                  <h3 className="font-medium mb-2">Certification</h3>
                                  <p className="text-muted-foreground">
                                    Upon completion of all modules and the final project, you'll receive a verified certificate 
                                    that you can add to your portfolio and professional profiles.
                                  </p>
                                  <Button variant="outline" className="mt-3">
                                    <ExternalLink className="h-4 w-4 mr-1" /> Preview Certificate
                                  </Button>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="reviews" className="space-y-4 py-4">
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg border">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Student Reviews</h3>
                                    <div className="flex items-center">
                                      <span className="font-medium mr-1">{path.rating}</span>
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star 
                                            key={star} 
                                            className={`h-4 w-4 ${
                                              star <= Math.floor(path.rating) 
                                                ? 'fill-yellow-400 text-yellow-400' 
                                                : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-muted-foreground ml-1">
                                        ({path.enrolledStudents} students)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                {[
                                  {
                                    name: "Alex Johnson",
                                    rating: 5,
                                    date: "March 15, 2025",
                                    comment: "This is an excellent learning path! The content is well-structured and the hands-on projects really helped me apply what I learned. Highly recommended for anyone looking to get into this field."
                                  },
                                  {
                                    name: "Sarah Williams",
                                    rating: 4,
                                    date: "February 28, 2025",
                                    comment: "Very good course overall. The material is comprehensive and the instructors explain complex topics clearly. I'm taking off one star because some of the practice exercises could use more detailed explanations."
                                  },
                                  {
                                    name: "Michael Brown",
                                    rating: 5,
                                    date: "January 12, 2025",
                                    comment: "I've tried several other courses on this topic, and this one is by far the best. The progression from basic to advanced concepts is smooth, and I never felt overwhelmed. The projects are challenging but doable."
                                  }
                                ].map((review, index) => (
                                  <div key={index} className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarFallback className={`bg-gradient-${
                                            index % 3 === 0 ? 'purple' : 
                                            index % 3 === 1 ? 'blue' : 'green'
                                          } text-white`}>
                                            {review.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h4 className="font-medium">{review.name}</h4>
                                          <div className="flex items-center text-sm text-muted-foreground">
                                            <span>{review.date}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star 
                                            key={star} 
                                            className={`h-4 w-4 ${
                                              star <= review.rating 
                                                ? 'fill-yellow-400 text-yellow-400' 
                                                : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <p className="mt-3 text-muted-foreground">{review.comment}</p>
                                  </div>
                                ))}
                                
                                <Button className="w-full" variant="outline">
                                  Load More Reviews
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md sticky top-20">
                      <CardHeader>
                        <CardTitle className="text-xl">Path Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Modules</span>
                            <span className="font-medium">{path.modules}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Time</span>
                            <span className="font-medium">{path.hours} hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Level</span>
                            <span className="font-medium">{path.level}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Category</span>
                            <span className="font-medium">{path.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Enrolled Students</span>
                            <span className="font-medium">{path.enrolledStudents}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span className="font-medium">April 1, 2025</span>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <h3 className="font-medium mb-3">Skills You'll Gain</h3>
                          <div className="flex flex-wrap gap-2">
                            {path.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-white">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <h3 className="font-medium mb-3">Includes</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-campus-purple" />
                              <span>Comprehensive lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4 text-campus-blue" />
                              <span>Coding exercises</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Layers className="h-4 w-4 text-campus-green" />
                              <span>Real-world projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-campus-orange" />
                              <span>Completion certificate</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-3">
                        {path.completedModules > 0 ? (
                          <Button className="w-full gradient-purple animate-hover">
                            Continue Learning <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button className="w-full gradient-blue animate-hover">
                            Enroll Now
                          </Button>
                        )}
                        {path.completedModules > 0 && (
                          <div className="w-full text-center">
                            <Progress value={calculateProgress(path)} className="h-2 mb-1" />
                            <span className="text-sm text-muted-foreground">
                              {path.completedModules} of {path.modules} modules completed
                            </span>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default LearningPaths;

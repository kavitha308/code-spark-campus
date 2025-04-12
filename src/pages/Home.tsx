
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code, LucideGraduationCap, UserCog, LogIn, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("student");
  
  const handleGetStarted = () => {
    navigate("/auth");
  };
  
  const handleLearnMore = () => {
    toast({
      title: "Feature information",
      description: "You clicked to learn more about this feature. This would typically navigate to detailed documentation.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/90 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
              Campus Bridge
            </span>
          </div>
          <Button 
            onClick={handleGetStarted} 
            className="gradient-purple animate-hover"
          >
            <LogIn className="h-4 w-4 mr-1" /> Login / Register
          </Button>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[250px] w-[250px] rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-green-200 opacity-20 blur-3xl"></div>
        
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-campus-purple via-campus-blue to-campus-green bg-clip-text text-transparent">
                The Ultimate Academic & Coding Platform
              </h1>
              <p className="text-lg text-muted-foreground">
                Campus Bridge connects your academic journey with coding skills development. 
                All-in-one platform for students, faculty, and administrators to learn, teach, and grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGetStarted} 
                  size="lg"
                  className="gradient-purple animate-hover"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleLearnMore} 
                  variant="outline" 
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <Tabs defaultValue="student" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="student" className="data-[state=active]:bg-purple-100 data-[state=active]:text-campus-purple">
                    <LucideGraduationCap className="mr-1 h-4 w-4" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="faculty" className="data-[state=active]:bg-blue-100 data-[state=active]:text-campus-blue">
                    <Code className="mr-1 h-4 w-4" />
                    Faculty
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-green-100 data-[state=active]:text-campus-green">
                    <UserCog className="mr-1 h-4 w-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-campus-purple">Student Portal</h3>
                    <p className="text-sm text-muted-foreground">
                      Access your courses, practice coding, submit assignments, and track your progress.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input id="student-email" placeholder="student@university.edu" type="email" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input id="student-password" type="password" />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGetStarted} 
                    className="w-full gradient-purple animate-hover"
                  >
                    <LogIn className="mr-1 h-4 w-4" /> Student Login
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Don't have an account? <Button variant="link" onClick={handleGetStarted} className="p-0 h-auto">Register</Button></p>
                  </div>
                </TabsContent>
                
                <TabsContent value="faculty" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-campus-blue">Faculty Portal</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage courses, create assignments, monitor student progress, and provide feedback.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="faculty-email">Email</Label>
                      <Input id="faculty-email" placeholder="faculty@university.edu" type="email" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="faculty-password">Password</Label>
                      <Input id="faculty-password" type="password" />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGetStarted} 
                    className="w-full bg-gradient-blue animate-hover"
                  >
                    <LogIn className="mr-1 h-4 w-4" /> Faculty Login
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Don't have an account? <Button variant="link" onClick={handleGetStarted} className="p-0 h-auto">Register</Button></p>
                  </div>
                </TabsContent>
                
                <TabsContent value="admin" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-campus-green">Admin Portal</h3>
                    <p className="text-sm text-muted-foreground">
                      Oversee the entire platform, manage users, view analytics, and generate reports.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input id="admin-email" placeholder="admin@university.edu" type="email" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input id="admin-password" type="password" />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGetStarted} 
                    className="w-full bg-gradient-green animate-hover"
                  >
                    <LogIn className="mr-1 h-4 w-4" /> Admin Login
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Don't have an account? <Button variant="link" onClick={handleGetStarted} className="p-0 h-auto">Register</Button></p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md hover:shadow-lg transition-all duration-300 animate-hover border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-campus-purple/10 flex items-center justify-center mb-4">
                  <LucideGraduationCap className="h-6 w-6 text-campus-purple" />
                </div>
                <CardTitle>Academic LMS</CardTitle>
                <CardDescription>Comprehensive learning management system</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-purple"></div>
                    <span>Manage academic courses and materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-purple"></div>
                    <span>Track attendance and performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-purple"></div>
                    <span>Submit and grade assignments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-purple"></div>
                    <span>Interact with faculty and peers</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full text-campus-purple"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300 animate-hover border-blue-100">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-campus-blue/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-campus-blue" />
                </div>
                <CardTitle>Coding Platform</CardTitle>
                <CardDescription>Interactive coding environment and challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-blue"></div>
                    <span>Built-in code editor and compiler</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-blue"></div>
                    <span>Coding challenges and competitions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-blue"></div>
                    <span>Structured learning paths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-blue"></div>
                    <span>Progress tracking and leaderboards</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full text-campus-blue"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-green-50 shadow-md hover:shadow-lg transition-all duration-300 animate-hover border-green-100">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-campus-green/10 flex items-center justify-center mb-4">
                  <UserCog className="h-6 w-6 text-campus-green" />
                </div>
                <CardTitle>AI-Powered Tools</CardTitle>
                <CardDescription>Intelligent assistance and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-green"></div>
                    <span>Smart code review and suggestions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-green"></div>
                    <span>Job matching based on skills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-green"></div>
                    <span>Collaborative coding rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-campus-green"></div>
                    <span>Personalized learning recommendations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full text-campus-green"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-r from-campus-purple/10 to-campus-blue/10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Campus Bridge</h3>
              <p className="text-sm text-muted-foreground">
                Bridging academic learning with coding skills development for the modern educational experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">About Us</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Features</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Testimonials</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">Documentation</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Tutorials</Button></li>
                <li><Button variant="link" className="p-0 h-auto">API Reference</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Support</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto">GDPR</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-100 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Campus Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Code, LucideGraduationCap, UserPlus, LogIn } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student", // student, faculty, admin
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate and authenticate
    // For demo purposes, we'll just navigate to dashboard
    toast({
      title: "Login successful",
      description: "Welcome back to Campus Bridge!",
    });
    
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate and register the user
    // For demo purposes, we'll just show a success message
    toast({
      title: "Registration successful",
      description: "Your account has been created. You can now log in.",
    });
    
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-blue-50 p-4">
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[250px] w-[250px] rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-gradient-to-br from-campus-purple to-campus-blue">
              <LucideGraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
            Campus Bridge
          </h1>
          <p className="text-muted-foreground mt-1">
            Your integrated academic and coding platform
          </p>
        </div>

        <Card className="border-purple-100 shadow-lg shadow-purple-100/20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 bg-purple-100 text-purple-800">
              <TabsTrigger value="login" className="data-[state=active]:bg-white">
                <LogIn className="h-4 w-4 mr-1" /> Log In
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-white">
                <UserPlus className="h-4 w-4 mr-1" /> Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@university.edu"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="p-0 h-auto text-xs">
                        Forgot password?
                      </Button>
                    </div>
                    <Input 
                      id="password" 
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-gradient-to-r from-campus-purple to-campus-blue">
                    Log In
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="your.email@university.edu"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input 
                        id="reg-password" 
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={registerData.userType === "student" ? "default" : "outline"}
                        className={`${registerData.userType === "student" ? "bg-gradient-to-r from-campus-purple to-campus-blue" : ""}`}
                        onClick={() => setRegisterData({...registerData, userType: "student"})}
                      >
                        <LucideGraduationCap className="h-4 w-4 mr-1" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.userType === "faculty" ? "default" : "outline"}
                        className={`${registerData.userType === "faculty" ? "bg-gradient-to-r from-campus-purple to-campus-blue" : ""}`}
                        onClick={() => setRegisterData({...registerData, userType: "faculty"})}
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Faculty
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.userType === "admin" ? "default" : "outline"}
                        className={`${registerData.userType === "admin" ? "bg-gradient-to-r from-campus-purple to-campus-blue" : ""}`}
                        onClick={() => setRegisterData({...registerData, userType: "admin"})}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Admin
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-gradient-to-r from-campus-purple to-campus-blue">
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

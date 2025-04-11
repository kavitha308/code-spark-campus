
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Code, LucideGraduationCap, UserPlus, LogIn, UserCog } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "student", // student, teacher, admin
  });
  
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student", // student, teacher, admin
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate and authenticate
    // For demo purposes, we'll just navigate to dashboard with a toast message
    toast({
      title: `Logged in as ${loginData.userType}`,
      description: `Welcome back to Campus Bridge! You are now logged in as a ${loginData.userType}.`,
      variant: "default",
    });
    
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate and register the user
    // For demo purposes, we'll just show a success message
    toast({
      title: "Registration successful",
      description: `Your account has been created as a ${registerData.userType}. You can now log in.`,
      variant: "default",
    });
    
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-br from-campus-purple/80 to-campus-blue/80 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-white shadow-lg">
              <LucideGraduationCap className="h-8 w-8 text-campus-purple" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            Campus Bridge
          </h1>
          <p className="text-white/90 mt-1 drop-shadow-md">
            Your integrated academic and coding platform
          </p>
        </div>

        <Card className="backdrop-blur-md bg-white/90 border-white/20 shadow-2xl animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 bg-campus-purple/10 text-campus-purple">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-campus-purple">
                <LogIn className="h-4 w-4 mr-1" /> Log In
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-campus-purple">
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
                      className="bg-white"
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
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={loginData.userType === "student" ? "default" : "outline"}
                        className={`${loginData.userType === "student" ? "gradient-purple" : ""}`}
                        onClick={() => setLoginData({...loginData, userType: "student"})}
                      >
                        <LucideGraduationCap className="h-4 w-4 mr-1" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={loginData.userType === "teacher" ? "default" : "outline"}
                        className={`${loginData.userType === "teacher" ? "gradient-blue" : ""}`}
                        onClick={() => setLoginData({...loginData, userType: "teacher"})}
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Teacher
                      </Button>
                      <Button
                        type="button"
                        variant={loginData.userType === "admin" ? "default" : "outline"}
                        className={`${loginData.userType === "admin" ? "gradient-green" : ""}`}
                        onClick={() => setLoginData({...loginData, userType: "admin"})}
                      >
                        <UserCog className="h-4 w-4 mr-1" />
                        Admin
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full ${
                      loginData.userType === "student" ? "gradient-purple" :
                      loginData.userType === "teacher" ? "gradient-blue" : "gradient-green"
                    } animate-hover`}
                  >
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
                      className="bg-white"
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
                      className="bg-white"
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
                        className="bg-white"
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
                        className="bg-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={registerData.userType === "student" ? "default" : "outline"}
                        className={`${registerData.userType === "student" ? "gradient-purple" : ""}`}
                        onClick={() => setRegisterData({...registerData, userType: "student"})}
                      >
                        <LucideGraduationCap className="h-4 w-4 mr-1" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.userType === "teacher" ? "default" : "outline"}
                        className={`${registerData.userType === "teacher" ? "gradient-blue" : ""}`}
                        onClick={() => setRegisterData({...registerData, userType: "teacher"})}
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Teacher
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.userType === "admin" ? "default" : "outline"}
                        className={`${registerData.userType === "admin" ? "gradient-green" : ""}`}
                        onClick={() => setRegisterData({...registerData, userType: "admin"})}
                      >
                        <UserCog className="h-4 w-4 mr-1" />
                        Admin
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full ${
                      registerData.userType === "student" ? "gradient-purple" :
                      registerData.userType === "teacher" ? "gradient-blue" : "gradient-green"
                    } animate-hover`}
                  >
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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, LucideGraduationCap, UserPlus, LogIn, UserCog } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const { signIn, signUp, isLoading } = useAuth();
  
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      userType: "student", // student, teacher, admin
    }
  });

  const registerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "student", // student, teacher, admin
    }
  });

  const handleLogin = async (data: any) => {
    try {
      await signIn(data.email, data.password);
      // Navigation is handled in the auth context
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (data: any) => {
    try {
      if (data.password !== data.confirmPassword) {
        registerForm.setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      
      await signUp(data.email, data.password, {
        full_name: data.name,
        role: data.userType,
      });
      
      setActiveTab("login");
    } catch (error) {
      console.error("Registration error:", error);
    }
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
              <form onSubmit={loginForm.handleSubmit(handleLogin)}>
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
                      {...loginForm.register("email")}
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
                      {...loginForm.register("password")}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={loginForm.watch("userType") === "student" ? "default" : "outline"}
                        className={`${loginForm.watch("userType") === "student" ? "gradient-purple" : ""}`}
                        onClick={() => loginForm.setValue("userType", "student")}
                      >
                        <LucideGraduationCap className="h-4 w-4 mr-1" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={loginForm.watch("userType") === "teacher" ? "default" : "outline"}
                        className={`${loginForm.watch("userType") === "teacher" ? "gradient-blue" : ""}`}
                        onClick={() => loginForm.setValue("userType", "teacher")}
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Teacher
                      </Button>
                      <Button
                        type="button"
                        variant={loginForm.watch("userType") === "admin" ? "default" : "outline"}
                        className={`${loginForm.watch("userType") === "admin" ? "gradient-green" : ""}`}
                        onClick={() => loginForm.setValue("userType", "admin")}
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
                      loginForm.watch("userType") === "student" ? "gradient-purple" :
                      loginForm.watch("userType") === "teacher" ? "gradient-blue" : "gradient-green"
                    } animate-hover`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(handleRegister)}>
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
                      {...registerForm.register("name")}
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
                      {...registerForm.register("email")}
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
                        {...registerForm.register("password")}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        required
                        className="bg-white"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {registerForm.formState.errors.confirmPassword.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={registerForm.watch("userType") === "student" ? "default" : "outline"}
                        className={`${registerForm.watch("userType") === "student" ? "gradient-purple" : ""}`}
                        onClick={() => registerForm.setValue("userType", "student")}
                      >
                        <LucideGraduationCap className="h-4 w-4 mr-1" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={registerForm.watch("userType") === "teacher" ? "default" : "outline"}
                        className={`${registerForm.watch("userType") === "teacher" ? "gradient-blue" : ""}`}
                        onClick={() => registerForm.setValue("userType", "teacher")}
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Teacher
                      </Button>
                      <Button
                        type="button"
                        variant={registerForm.watch("userType") === "admin" ? "default" : "outline"}
                        className={`${registerForm.watch("userType") === "admin" ? "gradient-green" : ""}`}
                        onClick={() => registerForm.setValue("userType", "admin")}
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
                      registerForm.watch("userType") === "student" ? "gradient-purple" :
                      registerForm.watch("userType") === "teacher" ? "gradient-blue" : "gradient-green"
                    } animate-hover`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
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


import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Award, BookOpen, Code, Briefcase, Calendar, CheckCircle, Save, X, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: profile?.full_name || "John Doe",
    email: user?.email || "john.doe@university.edu",
    program: "Computer Science",
    semester: "5th Semester",
    bio: "Passionate programmer with interest in web development and machine learning.",
  });
  const [editedData, setEditedData] = useState({ ...profileData });

  const skills = [
    { name: "JavaScript", level: 85 },
    { name: "Python", level: 72 },
    { name: "React", level: 68 },
    { name: "Data Structures", level: 78 },
    { name: "Algorithms", level: 65 },
  ];

  const badges = [
    { name: "10-Day Streak", icon: <Calendar className="h-4 w-4" /> },
    { name: "Algorithm Master", icon: <Code className="h-4 w-4" /> },
    { name: "Perfect Attendance", icon: <CheckCircle className="h-4 w-4" /> },
  ];
  
  const jobMatches = [
    {
      title: "Frontend Developer Intern",
      company: "TechSolutions Inc.",
      match: 92,
      skills: ["JavaScript", "React", "CSS"],
    },
    {
      title: "Junior Python Developer",
      company: "DataAnalytics Co.",
      match: 78,
      skills: ["Python", "Data Analysis", "SQL"],
    },
    {
      title: "Web Development Associate",
      company: "WebCraft Studios",
      match: 85,
      skills: ["HTML", "JavaScript", "React"],
    },
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing, revert changes
      setEditedData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // If connected to Supabase, you would update the profile in the database
      if (user) {
        // Update profile in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ 
            full_name: editedData.name,
            // Add other profile fields here
          })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      // Update local state
      setProfileData(editedData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    toast.success("Avatar uploaded successfully!");
    // In a real implementation, you would upload the file to storage
    // and update the avatar_url in the profiles table
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="col-span-1 bg-gradient-to-br from-white to-purple-50 border-purple-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>Profile</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditToggle}
                >
                  {isEditing ? (
                    <X className="h-4 w-4 text-red-500" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src={profile?.avatar_url || ""} alt={profileData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-campus-purple to-campus-blue text-white text-lg">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="rounded-full bg-primary p-1 text-white">
                        <Upload className="h-4 w-4" />
                      </div>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={uploadAvatar}
                      />
                    </label>
                  </div>
                )}
              </div>
              
              {isEditing ? (
                <div className="w-full mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={editedData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Input
                      id="program"
                      name="program"
                      value={editedData.program}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input
                      id="semester"
                      name="semester"
                      value={editedData.semester}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={editedData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : (
                      <>
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="mt-4 text-xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <div className="flex flex-col w-full mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Program:</span>
                      <span className="text-sm">{profileData.program}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Semester:</span>
                      <span className="text-sm">{profileData.semester}</span>
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <h3 className="text-sm font-medium mb-2">Bio</h3>
                    <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
              <h3 className="w-full text-sm font-medium mb-1">Earned Badges</h3>
              {badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="flex gap-1 items-center bg-white">
                  {badge.icon}
                  {badge.name}
                </Badge>
              ))}
            </CardFooter>
          </Card>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Tabs defaultValue="skills">
              <TabsList className="bg-purple-100 text-purple-800">
                <TabsTrigger value="skills" className="data-[state=active]:bg-white">Skills</TabsTrigger>
                <TabsTrigger value="attendance" className="data-[state=active]:bg-white">Attendance</TabsTrigger>
                <TabsTrigger value="jobs" className="data-[state=active]:bg-white">Job Matches</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="mt-4">
                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-campus-purple" />
                      Skill Assessment
                    </CardTitle>
                    <CardDescription>
                      Your current skill levels based on course performance and coding challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attendance" className="mt-4">
                <Card className="bg-gradient-to-br from-white to-green-50 border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-campus-purple" />
                      Course Attendance
                    </CardTitle>
                    <CardDescription>
                      Your attendance record for this semester
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Data Structures & Algorithms</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Advanced Web Development</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Database Management Systems</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Machine Learning Fundamentals</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-4">
                <Card className="bg-gradient-to-br from-white to-yellow-50 border-yellow-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-campus-purple" />
                      Job Match Recommendations
                    </CardTitle>
                    <CardDescription>
                      Jobs that match your current skill profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobMatches.map((job, index) => (
                        <Card key={index} className="bg-white border">
                          <CardHeader className="py-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{job.title}</CardTitle>
                                <CardDescription>{job.company}</CardDescription>
                              </div>
                              <Badge className="bg-campus-purple">
                                {job.match}% Match
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardFooter className="py-3 flex flex-wrap gap-2">
                            {job.skills.map((skill, i) => (
                              <Badge key={i} variant="outline">{skill}</Badge>
                            ))}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;

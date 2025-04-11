
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, FileText, Video, Users, Award } from "lucide-react";

const CoursesPage = () => {
  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground mt-1">
              Manage your academic courses and learning progress
            </p>
          </div>
        </div>

        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Data Structures & Algorithms */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-campus-purple">In Progress</Badge>
                    <Badge variant="outline">CS301</Badge>
                  </div>
                  <CardTitle className="mt-2">Data Structures & Algorithms</CardTitle>
                  <CardDescription>Learn fundamental data structures and algorithms for efficient problem-solving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">12 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">4 hrs/week</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Video className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">24 Lectures</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <FileText className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">8 Assignments</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Award className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">5 Quizzes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">65 students</span>
                  </div>
                  <Button size="sm">Continue Learning</Button>
                </CardFooter>
              </Card>
              
              {/* Advanced Web Development */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-campus-purple">In Progress</Badge>
                    <Badge variant="outline">CS415</Badge>
                  </div>
                  <CardTitle className="mt-2">Advanced Web Development</CardTitle>
                  <CardDescription>Master modern web technologies and frameworks for building scalable applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">10 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">6 hrs/week</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Video className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">18 Lectures</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <FileText className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">6 Assignments</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Award className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">4 Projects</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">48 students</span>
                  </div>
                  <Button size="sm">Continue Learning</Button>
                </CardFooter>
              </Card>
              
              {/* Database Management Systems */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-campus-purple">In Progress</Badge>
                    <Badge variant="outline">CS355</Badge>
                  </div>
                  <CardTitle className="mt-2">Database Management Systems</CardTitle>
                  <CardDescription>Design and implement efficient database solutions for complex applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">8 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">5 hrs/week</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Video className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">16 Lectures</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <FileText className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">5 Assignments</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Award className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">3 Projects</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">55 students</span>
                  </div>
                  <Button size="sm">Continue Learning</Button>
                </CardFooter>
              </Card>

              {/* Machine Learning Fundamentals */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-campus-purple">In Progress</Badge>
                    <Badge variant="outline">CS460</Badge>
                  </div>
                  <CardTitle className="mt-2">Machine Learning Fundamentals</CardTitle>
                  <CardDescription>Learn core ML algorithms and how to apply them to real-world problems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">14 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">8 hrs/week</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Video className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">28 Lectures</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <FileText className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">10 Assignments</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-campus-purple/10 mb-1">
                          <Award className="h-4 w-4 text-campus-purple" />
                        </div>
                        <span className="text-xs">6 Projects</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">72 students</span>
                  </div>
                  <Button size="sm">Continue Learning</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
                    <Badge variant="outline">CS201</Badge>
                  </div>
                  <CardTitle className="mt-2">Introduction to Programming</CardTitle>
                  <CardDescription>Fundamentals of programming using Python</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Final Grade</span>
                      <span className="text-sm font-bold">A (95%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm">Certificate Earned</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">View Certificate</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
                    <Badge variant="outline">CS215</Badge>
                  </div>
                  <CardTitle className="mt-2">Object-Oriented Programming</CardTitle>
                  <CardDescription>OOP principles and patterns using Java</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Final Grade</span>
                      <span className="text-sm font-bold">A- (92%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm">Certificate Earned</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">View Certificate</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Cloud Computing</CardTitle>
                  <CardDescription>Learn to design, deploy, and manage cloud infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">10 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">6 hrs/week</span>
                      </div>
                    </div>
                    <Badge variant="outline">CS450</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">Enroll Now</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Mobile App Development</CardTitle>
                  <CardDescription>Build cross-platform mobile applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">12 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">8 hrs/week</span>
                      </div>
                    </div>
                    <Badge variant="outline">CS425</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">Enroll Now</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Cybersecurity Fundamentals</CardTitle>
                  <CardDescription>Protect systems and networks from digital attacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">14 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">7 hrs/week</span>
                      </div>
                    </div>
                    <Badge variant="outline">CS380</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">Enroll Now</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CoursesPage;

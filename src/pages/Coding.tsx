
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Brain, Users, ArrowRight, Star, Clock } from "lucide-react";
import CodeEditor from "@/components/coding/CodeEditor";
import AiAssistantWithContext from "@/components/coding/AiAssistantWithContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CodingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Coding Practice</h1>
            <p className="text-muted-foreground mt-1">
              Develop your coding skills with interactive exercises and AI assistance
            </p>
          </div>
        </div>

        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="tracks">Learning Tracks</TabsTrigger>
            <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center text-xl">
                            <Code className="mr-2 h-5 w-5 text-campus-purple" />
                            Two Sum Problem
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Given an array of integers, return indices of the two numbers such that they add up to a specific target.
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Easy</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-md bg-gray-50 border text-sm">
                          <p className="font-medium mb-2">Example:</p>
                          <p>Input: nums = [2, 7, 11, 15], target = 9</p>
                          <p>Output: [0, 1]</p>
                          <p className="text-muted-foreground mt-2">Explanation: Because nums[0] + nums[1] = 2 + 7 = 9</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">Arrays</Badge>
                          <Badge variant="outline">Hash Tables</Badge>
                          <Badge variant="outline">Algorithms</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>1,245 attempts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>82% success rate</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <CodeEditor />

                  <div className="flex justify-end">
                    <Button 
                      className="bg-campus-purple hover:bg-campus-purple/90"
                      onClick={() => toast.success("Solution submitted successfully!")}
                    >
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <AiAssistantWithContext />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800">Easy</Badge>
                    <Badge variant="outline" className="bg-campus-purple/10">Arrays</Badge>
                  </div>
                  <CardTitle className="mt-2">Valid Parentheses</CardTitle>
                  <CardDescription>Check if the input string has valid parentheses ordering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>892 solved</span>
                      <Star className="h-4 w-4 text-yellow-500 ml-2" />
                      <span>4.8/5 rating</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Strings</Badge>
                      <Badge variant="outline">Stacks</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => navigate('/coding')}>
                    Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                    <Badge variant="outline" className="bg-campus-purple/10">Algorithms</Badge>
                  </div>
                  <CardTitle className="mt-2">LRU Cache</CardTitle>
                  <CardDescription>Design and implement a Least Recently Used (LRU) cache mechanism</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>654 solved</span>
                      <Star className="h-4 w-4 text-yellow-500 ml-2" />
                      <span>4.6/5 rating</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Hash Table</Badge>
                      <Badge variant="outline">Linked List</Badge>
                      <Badge variant="outline">Design</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => navigate('/coding')}>
                    Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-red-100 text-red-800">Hard</Badge>
                    <Badge variant="outline" className="bg-campus-purple/10">Graph Theory</Badge>
                  </div>
                  <CardTitle className="mt-2">Word Ladder</CardTitle>
                  <CardDescription>Find shortest transformation sequence from start word to end word</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>375 solved</span>
                      <Star className="h-4 w-4 text-yellow-500 ml-2" />
                      <span>4.9/5 rating</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">BFS</Badge>
                      <Badge variant="outline">Dictionary</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => navigate('/coding')}>
                    Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                    <Badge variant="outline" className="bg-campus-purple/10">Trees</Badge>
                  </div>
                  <CardTitle className="mt-2">Binary Tree Level Order Traversal</CardTitle>
                  <CardDescription>Traverse a binary tree in level order (breadth-first search)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>729 solved</span>
                      <Star className="h-4 w-4 text-yellow-500 ml-2" />
                      <span>4.7/5 rating</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">BFS</Badge>
                      <Badge variant="outline">Binary Tree</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => navigate('/coding')}>
                    Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracks" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Data Structures Mastery</CardTitle>
                    <Badge variant="outline" className="bg-campus-purple/10">Popular</Badge>
                  </div>
                  <CardDescription>Comprehensive path to master all essential data structures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">8 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">42 challenges</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Arrays</Badge>
                      <Badge variant="outline">Linked Lists</Badge>
                      <Badge variant="outline">Trees</Badge>
                      <Badge variant="outline">Graphs</Badge>
                      <Badge variant="outline">Hash Tables</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Enrolled in Data Structures Mastery track")}>
                    Enroll in Track
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Algorithm Techniques</CardTitle>
                    <Badge variant="outline" className="bg-campus-purple/10">Advanced</Badge>
                  </div>
                  <CardDescription>Learn and implement various algorithmic techniques for problem-solving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">10 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">56 challenges</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Sorting</Badge>
                      <Badge variant="outline">Searching</Badge>
                      <Badge variant="outline">Dynamic Programming</Badge>
                      <Badge variant="outline">Greedy Algorithms</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Enrolled in Algorithm Techniques track")}>
                    Enroll in Track
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Interview Preparation</CardTitle>
                    <Badge variant="outline" className="bg-campus-purple/10">Career</Badge>
                  </div>
                  <CardDescription>Prepare for technical interviews with real interview questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">6 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">35 challenges</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">FAANG Questions</Badge>
                      <Badge variant="outline">Patterns</Badge>
                      <Badge variant="outline">Time Complexity</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Enrolled in Interview Preparation track")}>
                    Enroll in Track
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Web Development Coding</CardTitle>
                    <Badge variant="outline" className="bg-campus-purple/10">Project-based</Badge>
                  </div>
                  <CardDescription>Build real-world web applications with practical exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">12 weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">8 projects</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">API Design</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Enrolled in Web Development Coding track")}>
                    Enroll in Track
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collaborate" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Algorithm Study Group</CardTitle>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <CardDescription>Weekly sessions to solve and discuss algorithmic problems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">12 members</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Algorithm</Badge>
                      <Badge variant="outline">Data Structures</Badge>
                      <Badge variant="outline">Problem Solving</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Next session: April 14, 2025 - 7:00 PM</p>
                      <p>Current focus: Graph Algorithms</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Joined Algorithm Study Group")}>
                    Join Group
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Hackathon Team Formation</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">Recruiting</Badge>
                  </div>
                  <CardDescription>Find teammates for the upcoming campus hackathon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">8 teams forming</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Hackathon</Badge>
                      <Badge variant="outline">Project</Badge>
                      <Badge variant="outline">Teamwork</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Hackathon date: April 20-21, 2025</p>
                      <p>Theme: AI for Social Good</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Team matching initiated")}>
                    Find Team
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Live Coding Room</CardTitle>
                    <Badge className="bg-green-100 text-green-800">2 Active</Badge>
                  </div>
                  <CardDescription>Real-time collaborative coding sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">AI-assisted pair programming</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Collaboration</Badge>
                      <Badge variant="outline">Pair Programming</Badge>
                      <Badge variant="outline">Live Help</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">DSA Problem Solving</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">3 users</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">Web Project Help</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">2 users</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" onClick={() => toast.success("Joined coding room")}>
                    Join a Room
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CodingPage;

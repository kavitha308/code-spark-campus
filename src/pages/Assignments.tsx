
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Upload, Check, X, AlertTriangle } from "lucide-react";

const AssignmentsPage = () => {
  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground mt-1">
              Manage your academic assignments and coding tasks
            </p>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      Binary Search Implementation
                    </CardTitle>
                    <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Due Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Data Structures & Algorithms - CS301</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-500">Due: Apr 15, 2025 - 11:59 PM</span>
                    </div>
                    <p className="text-sm">
                      Implement a binary search algorithm in Python and analyze its time and space complexity.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Algorithms</Badge>
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Time Complexity</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Submit Assignment
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      React Component Architecture
                    </CardTitle>
                    <Badge className="bg-gray-100 text-gray-800">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Advanced Web Development - CS415</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Due: Apr 22, 2025 - 11:59 PM</span>
                    </div>
                    <p className="text-sm">
                      Design and implement a reusable component architecture for a React application following best practices.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Components</Badge>
                      <Badge variant="outline">Architecture</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      Database Normalization Project
                    </CardTitle>
                    <Badge className="bg-gray-100 text-gray-800">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Database Management Systems - CS355</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Due: Apr 25, 2025 - 11:59 PM</span>
                    </div>
                    <p className="text-sm">
                      Design a normalized database schema for a given business case and implement it using SQL.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Database</Badge>
                      <Badge variant="outline">SQL</Badge>
                      <Badge variant="outline">Normalization</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submitted" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      Linked List Implementation
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Submitted
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Data Structures & Algorithms - CS301</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: Apr 5, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Submitted: Apr 4, 2025</span>
                      </div>
                    </div>
                    <p className="text-sm">
                      Implemented a doubly linked list with insertion, deletion, and traversal operations.
                    </p>
                    <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                      <p className="font-medium">Submission Status:</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Under review by instructor</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Submission
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      REST API Design
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Submitted
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Advanced Web Development - CS415</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: Apr 8, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Submitted: Apr 7, 2025</span>
                      </div>
                    </div>
                    <p className="text-sm">
                      Designed and implemented a RESTful API for a task management application.
                    </p>
                    <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                      <p className="font-medium">Submission Status:</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Under review by instructor</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Submission
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="graded" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      SQL Query Optimization
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800">Graded</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Database Management Systems - CS355</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: Apr 1, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Submitted: Mar 30, 2025</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Grade:</p>
                        <p className="text-lg font-bold text-green-700">92/100</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Instructor Feedback:</p>
                        <p className="text-sm mt-1">Excellent work on identifying and fixing performance bottlenecks. Query optimization techniques were well-implemented. Could improve explanation of indexing strategy.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      Sorting Algorithms Analysis
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800">Graded</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Data Structures & Algorithms - CS301</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: Mar 25, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Submitted: Mar 24, 2025</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Grade:</p>
                        <p className="text-lg font-bold text-green-700">95/100</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Instructor Feedback:</p>
                        <p className="text-sm mt-1">Outstanding analysis of time and space complexity for each sorting algorithm. Implementation was clean and well-documented. Comparative analysis was especially insightful.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      JavaScript DOM Manipulation
                    </CardTitle>
                    <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                      <X className="h-3 w-3" />
                      Needs Revision
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Advanced Web Development - CS415</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: Mar 18, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Submitted: Mar 17, 2025</span>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Grade:</p>
                        <p className="text-lg font-bold text-red-700">68/100</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Instructor Feedback:</p>
                        <p className="text-sm mt-1">Several issues with the event handling implementation. The code lacks proper error handling and has performance issues due to unnecessary DOM traversals. Please revise and resubmit by April 18.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex gap-2">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                  <Button className="w-full">
                    Resubmit
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

export default AssignmentsPage;

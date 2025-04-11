
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/layout/PageLayout";
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Code2, BookOpen } from "lucide-react";

// Sample data - in a real app, this would be fetched from your API
const academicPerformanceData = [
  { name: "Math", grade: 85, average: 75 },
  { name: "Science", grade: 78, average: 72 },
  { name: "History", grade: 92, average: 78 },
  { name: "English", grade: 88, average: 76 },
  { name: "Computer", grade: 95, average: 79 },
];

const codingPerformanceData = [
  { name: "Algorithms", score: 82, average: 74 },
  { name: "Data Structures", score: 90, average: 76 },
  { name: "Web Dev", score: 95, average: 80 },
  { name: "Database", score: 78, average: 75 },
  { name: "System Design", score: 85, average: 72 },
];

const attendanceData = [
  { name: "Week 1", attendance: 95 },
  { name: "Week 2", attendance: 100 },
  { name: "Week 3", attendance: 90 },
  { name: "Week 4", attendance: 100 },
  { name: "Week 5", attendance: 88 },
  { name: "Week 6", attendance: 92 },
  { name: "Week 7", attendance: 96 },
  { name: "Week 8", attendance: 94 },
];

const submissionData = [
  { name: "On Time", value: 85 },
  { name: "Late", value: 10 },
  { name: "Missed", value: 5 },
];

const COLORS = ["#8B5CF6", "#60A5FA", "#F97316"];

const weeklyProgressData = [
  { name: "Week 1", academic: 65, coding: 50 },
  { name: "Week 2", academic: 68, coding: 55 },
  { name: "Week 3", academic: 72, coding: 58 },
  { name: "Week 4", academic: 75, coding: 62 },
  { name: "Week 5", academic: 80, coding: 70 },
  { name: "Week 6", academic: 82, coding: 75 },
  { name: "Week 7", academic: 87, coding: 82 },
  { name: "Week 8", academic: 90, coding: 88 },
];

const Performance = () => {
  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Track your academic and coding progress to improve your learning journey
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="gap-1">
              <BarChart3 className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="academic" className="gap-1">
              <BookOpen className="h-4 w-4" /> Academic
            </TabsTrigger>
            <TabsTrigger value="coding" className="gap-1">
              <Code2 className="h-4 w-4" /> Coding
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-1">
              <PieChartIcon className="h-4 w-4" /> Attendance
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-1">
              <LineChartIcon className="h-4 w-4" /> Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-campus-purple" /> Academic Performance
                  </CardTitle>
                  <CardDescription>
                    Your subject-wise academic grades compared to class average
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={academicPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="grade" name="Your Grade" fill="#8B5CF6" />
                        <Bar dataKey="average" name="Class Average" fill="#E9D5FF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code2 className="h-5 w-5 mr-2 text-campus-blue" /> Coding Performance
                  </CardTitle>
                  <CardDescription>
                    Your skill-wise coding scores compared to cohort average
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={codingPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" name="Your Score" fill="#4F46E5" />
                        <Bar dataKey="average" name="Cohort Average" fill="#C7D2FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2 text-campus-orange" /> Assignment Submission
                  </CardTitle>
                  <CardDescription>
                    Distribution of your assignment submission status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={submissionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {submissionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2 text-campus-green" /> Weekly Progress
                  </CardTitle>
                  <CardDescription>
                    Your academic and coding progress over the semester
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weeklyProgressData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="academic" name="Academic" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="coding" name="Coding" stroke="#4F46E5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            {/* Academic Performance Details */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  Detailed breakdown of your academic performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={academicPerformanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="grade" name="Your Grade" fill="#8B5CF6" />
                      <Bar dataKey="average" name="Class Average" fill="#E9D5FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coding" className="space-y-6">
            {/* Coding Performance Details */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Coding Skills</CardTitle>
                <CardDescription>
                  Detailed breakdown of your coding performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={codingPerformanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Your Score" fill="#4F46E5" />
                      <Bar dataKey="average" name="Cohort Average" fill="#C7D2FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            {/* Attendance Details */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
                <CardDescription>
                  Your attendance record throughout the semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={attendanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="attendance" stroke="#F97316" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Progress Over Time */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>
                  Your academic and coding progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyProgressData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="academic" name="Academic" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="coding" name="Coding" stroke="#4F46E5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Performance;

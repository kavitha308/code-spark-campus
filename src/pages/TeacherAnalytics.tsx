import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { BookOpen, Users, TrendingUp, Award } from "lucide-react";
import { getFacultyCourses } from "@/services/CourseService";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ['hsl(var(--campus-blue))', 'hsl(var(--campus-purple))', 'hsl(var(--campus-orange))', 'hsl(var(--campus-yellow))'];

const TeacherAnalytics = () => {
  const [courses, setCourses] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // Get courses
      const coursesData = await getFacultyCourses();
      setCourses(coursesData);
      
      // Get enrollment stats
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          id,
          progress,
          course_id,
          courses (
            title
          )
        `);
      
      // Process enrollment data
      const enrollmentStats = coursesData.map(course => {
        const courseEnrollments = enrollments?.filter(e => e.course_id === course.id) || [];
        return {
          name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
          students: courseEnrollments.length,
          avgProgress: courseEnrollments.length > 0 
            ? Math.round(courseEnrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / courseEnrollments.length)
            : 0
        };
      });
      
      setEnrollmentData(enrollmentStats);
      
      // Process progress distribution
      const progressDistribution = [
        { name: '0-25%', value: 0 },
        { name: '26-50%', value: 0 },
        { name: '51-75%', value: 0 },
        { name: '76-100%', value: 0 }
      ];
      
      enrollments?.forEach(e => {
        const progress = e.progress || 0;
        if (progress <= 25) progressDistribution[0].value++;
        else if (progress <= 50) progressDistribution[1].value++;
        else if (progress <= 75) progressDistribution[2].value++;
        else progressDistribution[3].value++;
      });
      
      setProgressData(progressDistribution);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = enrollmentData.reduce((sum, item) => sum + item.students, 0);
  const avgOverallProgress = enrollmentData.length > 0
    ? Math.round(enrollmentData.reduce((sum, item) => sum + item.avgProgress, 0) / enrollmentData.length)
    : 0;

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor student progress and course performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgOverallProgress}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progressData[3]?.value || 0}
              </div>
              <p className="text-xs text-muted-foreground">Students completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enrollments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="progress">Progress Distribution</TabsTrigger>
            <TabsTrigger value="performance">Course Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollments by Course</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="hsl(var(--campus-blue))" name="Students" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Average Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="avgProgress" 
                      stroke="hsl(var(--campus-purple))" 
                      name="Avg Progress %" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TeacherAnalytics;
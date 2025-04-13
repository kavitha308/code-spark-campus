import React, { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, FileText, Users, BookOpen, PieChart, Upload, FileUp, Check, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("title");
  const { user, profile } = useAuth();

  // Mock data for course progress
  const courseProgressData = [
    {
      courseId: "course1",
      progress: 75,
    },
    {
      courseId: "course2",
      progress: 40,
    },
    {
      courseId: "course3",
      progress: 90,
    },
    {
      courseId: "course4",
      progress: 60,
    },
  ];

  // Mock data for student count
  const studentCountData = [
    {
      courseId: "course1",
      studentCount: 68,
    },
    {
      courseId: "course2",
      studentCount: 52,
    },
    {
      courseId: "course3",
      studentCount: 76,
    },
    {
      courseId: "course4",
      studentCount: 61,
    },
  ];

  // Mock data for course categories
  const courseCategories = [
    {
      id: "category1",
      name: "Computer Science",
    },
    {
      id: "category2",
      name: "Web Development",
    },
    {
      id: "category3",
      name: "Data Science",
    },
    {
      id: "category4",
      name: "Cybersecurity",
    },
  ];

  // Mock data for course instructors
  const courseInstructors = [
    {
      id: "instructor1",
      name: "Dr. Michael Brown",
    },
    {
      id: "instructor2",
      name: "Prof. Robert Garcia",
    },
    {
      id: "instructor3",
      name: "Dr. Emily Taylor",
    },
    {
      id: "instructor4",
      name: "Dr. James Wilson",
    },
  ];

  // Mock data for course schedule
  const courseScheduleData = [
    {
      courseId: "course1",
      schedule: "Mon, Wed, Fri 10:00 AM - 11:00 AM",
    },
    {
      courseId: "course2",
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
    },
    {
      courseId: "course3",
      schedule: "Mon, Wed 4:00 PM - 5:30 PM",
    },
    {
      courseId: "course4",
      schedule: "Tue, Thu 10:00 AM - 11:30 AM",
    },
  ];

  // Mock data for course description
  const courseDescriptionData = [
    {
      courseId: "course1",
      description: "This course covers fundamental data structures and algorithms, including arrays, linked lists, trees, graphs, sorting, and searching.",
    },
    {
      courseId: "course2",
      description: "This course explores advanced web development techniques, including React, Node.js, and MongoDB.",
    },
    {
      courseId: "course3",
      description: "This course introduces machine learning concepts, including supervised learning, unsupervised learning, and deep learning.",
    },
    {
      courseId: "course4",
      description: "This course covers database management systems, including SQL, NoSQL, and database design.",
    },
  ];

  // Mock data for course enrollment status
  const courseEnrollmentStatusData = [
    {
      courseId: "course1",
      enrolled: true,
    },
    {
      courseId: "course2",
      enrolled: false,
    },
    {
      courseId: "course3",
      enrolled: true,
    },
    {
      courseId: "course4",
      enrolled: false,
    },
  ];

  // Function to get course progress
  const getCourseProgress = (courseId: string) => {
    const courseProgress = courseProgressData.find((course) => course.courseId === courseId);
    return courseProgress ? courseProgress.progress : 0;
  };

  // Function to get student count
  const getStudentCount = (courseId: string) => {
    const studentCount = studentCountData.find((course) => course.courseId === courseId);
    return studentCount ? studentCount.studentCount : 0;
  };

  // Function to get course category
  const getCourseCategory = (courseId: string) => {
    const courseCategory = courseCategories.find((category) => category.id === courseId);
    return courseCategory ? courseCategory.name : "N/A";
  };

  // Function to get course instructor
  const getCourseInstructor = (courseId: string) => {
    const courseInstructor = courseInstructors.find((instructor) => instructor.id === courseId);
    return courseInstructor ? courseInstructor.name : "N/A";
  };

  // Function to get course schedule
  const getCourseSchedule = (courseId: string) => {
    const courseSchedule = courseScheduleData.find((schedule) => schedule.courseId === courseId);
    return courseSchedule ? courseSchedule.schedule : "N/A";
  };

  // Function to get course description
  const getCourseDescription = (courseId: string) => {
    const courseDescription = courseDescriptionData.find((description) => description.courseId === courseId);
    return courseDescription ? courseDescription.description : "N/A";
  };

  // Function to get course enrollment status
  const getCourseEnrollmentStatus = (courseId: string) => {
    const courseEnrollmentStatus = courseEnrollmentStatusData.find((enrollmentStatus) => enrollmentStatus.courseId === courseId);
    return courseEnrollmentStatus ? courseEnrollmentStatus.enrolled : false;
  };

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, fetch courses from Supabase
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("*");

        if (coursesError) throw coursesError;
        setCourses(coursesData || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to enroll in a course
  const handleEnroll = (courseId: string) => {
    // Use ref instead of direct click if accessing DOM element
    const enrollButton = document.getElementById(`enroll-button-${courseId}`);
    if (enrollButton) {
      enrollButton.click(); // TypeScript-compatible click
    }
  };

  // Filter courses based on search query and category
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase();
    const category = filterCategory.toLowerCase();

    const matchesQuery =
      course.title.toLowerCase().includes(query) ||
      getCourseInstructor(course.id)?.toLowerCase().includes(query) ||
      getCourseDescription(course.id)?.toLowerCase().includes(query);

    const matchesCategory =
      category === "all" || getCourseCategory(course.id)?.toLowerCase() === category;

    return matchesQuery && matchesCategory;
  });

  // Sort courses based on selected order
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOrder === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "instructor") {
      return getCourseInstructor(a.id)?.localeCompare(getCourseInstructor(b.id));
    } else {
      return getStudentCount(b.id) - getStudentCount(a.id);
    }
  });

  return (
    <PageLayout>
      <div className="container py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Courses</h1>
          <p className="text-muted-foreground mt-1">
            Explore our wide range of courses and start learning today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-[300px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="students">Popularity</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="computer science">Computer Science</SelectItem>
                    <SelectItem value="web development">Web Development</SelectItem>
                    <SelectItem value="data science">Data Science</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-campus-purple border-t-transparent rounded-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ) : sortedCourses.length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center">
                      <h3 className="font-medium text-lg">No courses found</h3>
                      <p className="text-muted-foreground mt-1">
                        {searchQuery
                          ? "Try adjusting your search query or filters"
                          : "Check back later for new courses!"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                sortedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex items-center justify-between">
                        <Label className="bg-campus-purple">{getCourseCategory(course.id)}</Label>
                        <Label
                          variant="outline"
                          className={
                            getCourseEnrollmentStatus(course.id)
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-blue-100 text-blue-800 border-blue-200"
                          }
                        >
                          {getCourseEnrollmentStatus(course.id) ? "Enrolled" : "Available"}
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Students: {getStudentCount(course.id)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Schedule: {getCourseSchedule(course.id)}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Instructor: {getCourseInstructor(course.id)}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {getCourseDescription(course.id)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <Button
                        variant="default"
                        className="w-full"
                        disabled={getCourseEnrollmentStatus(course.id)}
                        onClick={() => handleEnroll(course.id)}
                      >
                        {getCourseEnrollmentStatus(course.id) ? "Enrolled" : "Enroll Now"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Track your progress in enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{course.title}</span>
                        <span className="text-sm font-medium">{getCourseProgress(course.id)}%</span>
                      </div>
                      <Progress value={getCourseProgress(course.id)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Courses;

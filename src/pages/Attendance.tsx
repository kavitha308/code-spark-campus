
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from "recharts";
import { BookOpen, Calendar as CalendarIcon, CheckCircle, Clock, AlertTriangle, BarChart as BarChartIcon } from "lucide-react";
import { format, isToday, parseISO, isSameDay } from "date-fns";

// Mock attendance data
const courseAttendanceData = [
  { 
    id: "cs202",
    name: "Data Structures & Algorithms", 
    code: "CS202",
    attendance: 92, 
    classes: [
      { date: "2023-04-03", status: "present" },
      { date: "2023-04-05", status: "present" },
      { date: "2023-04-10", status: "present" },
      { date: "2023-04-12", status: "absent" },
      { date: "2023-04-17", status: "present" }
    ]
  },
  { 
    id: "cs301",
    name: "Advanced Web Development", 
    code: "CS301",
    attendance: 85, 
    classes: [
      { date: "2023-04-04", status: "present" },
      { date: "2023-04-06", status: "present" },
      { date: "2023-04-11", status: "absent" },
      { date: "2023-04-13", status: "present" },
      { date: "2023-04-18", status: "present" }
    ]
  },
  { 
    id: "cs305",
    name: "Database Management Systems", 
    code: "CS305",
    attendance: 78, 
    classes: [
      { date: "2023-04-03", status: "present" },
      { date: "2023-04-06", status: "absent" },
      { date: "2023-04-10", status: "present" },
      { date: "2023-04-13", status: "absent" },
      { date: "2023-04-17", status: "present" }
    ]
  },
  { 
    id: "cs405",
    name: "Machine Learning Fundamentals", 
    code: "CS405",
    attendance: 95, 
    classes: [
      { date: "2023-04-04", status: "present" },
      { date: "2023-04-07", status: "present" },
      { date: "2023-04-11", status: "present" },
      { date: "2023-04-14", status: "present" },
      { date: "2023-04-18", status: "present" }
    ]
  }
];

const monthlyAttendanceData = [
  { month: "Jan", attendance: 95 },
  { month: "Feb", attendance: 92 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 85 },
  { month: "May", attendance: 90 },
  { month: "Jun", attendance: 94 },
  { month: "Jul", attendance: 96 },
  { month: "Aug", attendance: 95 },
  { month: "Sep", attendance: 90 },
  { month: "Oct", attendance: 88 },
  { month: "Nov", attendance: 91 },
  { month: "Dec", attendance: 93 }
];

const Attendance = () => {
  const { profile } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  // Calculate overall attendance percentage
  const overallAttendance = courseAttendanceData.reduce((total, course) => total + course.attendance, 0) / courseAttendanceData.length;
  
  // Count total classes attended and missed
  const totalClasses = courseAttendanceData.reduce((total, course) => total + course.classes.length, 0);
  const attendedClasses = courseAttendanceData.reduce((total, course) => 
    total + course.classes.filter(c => c.status === "present").length, 0);
  
  // Function to get classes for a specific date
  const getClassesForDate = (date: Date) => {
    return courseAttendanceData.flatMap(course => {
      return course.classes
        .filter(cls => isSameDay(parseISO(cls.date), date))
        .map(cls => ({
          ...cls,
          course: course.name,
          courseCode: course.code
        }));
    });
  };
  
  // Get today's classes
  const todaysClasses = getClassesForDate(new Date());
  
  // Function to render attendance status badge
  const renderStatusBadge = (status: string) => {
    if (status === "present") {
      return (
        <div className="flex items-center text-green-600 bg-green-100 rounded-full px-2 py-1 text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          Present
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600 bg-red-100 rounded-full px-2 py-1 text-xs">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Absent
        </div>
      );
    }
  };
  
  // Function to determine if a date has classes
  const hasClasses = (date: Date) => {
    return courseAttendanceData.some(course => 
      course.classes.some(cls => isSameDay(parseISO(cls.date), date))
    );
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Attendance Tracker</h1>
          <p className="text-muted-foreground">
            Track your attendance records and ensure you're meeting requirements
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-campus-purple" /> 
                Overall Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Math.round(overallAttendance)}%</div>
              <Progress 
                value={overallAttendance} 
                className="h-2 mt-2" 
              />
              <p className="text-muted-foreground text-sm mt-2">
                Across all enrolled courses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-campus-blue" /> 
                Classes Attended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{attendedClasses}/{totalClasses}</div>
              <Progress 
                value={(attendedClasses / totalClasses) * 100} 
                className="h-2 mt-2" 
              />
              <p className="text-muted-foreground text-sm mt-2">
                Total classes this semester
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-campus-green" /> 
                Today's Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaysClasses.length > 0 ? (
                <div>
                  <div className="text-xl font-medium">{todaysClasses.length} Classes</div>
                  <div className="space-y-2 mt-2">
                    {todaysClasses.map((cls, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{cls.courseCode}</span>
                        {renderStatusBadge(cls.status)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="text-xl font-medium">No Classes Today</div>
                  <p className="text-muted-foreground text-sm mt-1">
                    Enjoy your day off!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="by-course" className="space-y-4">
          <TabsList className="bg-campus-purple/10 text-campus-purple">
            <TabsTrigger value="by-course" className="data-[state=active]:bg-white">By Course</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-white">Calendar View</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-white">Attendance Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="by-course">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course-wise Attendance</CardTitle>
                  <CardDescription>
                    Your attendance percentage for each enrolled course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={courseAttendanceData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="code" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Attendance']}
                          labelFormatter={(value) => `${courseAttendanceData.find(c => c.code === value)?.name}`}
                        />
                        <Legend />
                        <Bar 
                          dataKey="attendance" 
                          name="Attendance %" 
                          fill="#8884d8" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseAttendanceData.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{course.name}</CardTitle>
                          <CardDescription>{course.code}</CardDescription>
                        </div>
                        <div className={`text-lg font-bold ${
                          course.attendance >= 90 ? 'text-green-600' : 
                          course.attendance >= 75 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {course.attendance}%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress 
                        value={course.attendance} 
                        className={`h-2 ${
                          course.attendance >= 90 ? 'bg-green-600' : 
                          course.attendance >= 75 ? 'bg-yellow-600' : 
                          'bg-red-600'
                        }`}
                      />
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Recent Classes</h4>
                        <div className="space-y-2">
                          {course.classes.slice(-3).map((cls, index) => (
                            <div key={index} className="flex justify-between items-center p-2 rounded-md border">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{format(parseISO(cls.date), 'MMM d, yyyy')}</span>
                              </div>
                              {renderStatusBadge(cls.status)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <div className="text-sm">
                          <span className="font-medium">Classes Attended:</span>{" "}
                          {course.classes.filter(c => c.status === "present").length}/{course.classes.length}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCourse(course.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-campus-purple" />
                    Attendance Calendar
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(), 'MMMM yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      hasClasses: hasClasses,
                    }}
                    modifiersClassNames={{
                      hasClasses: "bg-campus-purple/10 font-bold text-campus-purple",
                    }}
                  />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Classes on {date ? format(date, 'MMMM d, yyyy') : 'Selected Date'}
                  </CardTitle>
                  <CardDescription>
                    {getClassesForDate(date || new Date()).length} classes scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {getClassesForDate(date || new Date()).length > 0 ? (
                    <div className="space-y-4">
                      {getClassesForDate(date || new Date()).map((cls, index) => (
                        <Card key={index} className="shadow-none border">
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{cls.course}</CardTitle>
                              {renderStatusBadge(cls.status)}
                            </div>
                            <CardDescription>{cls.courseCode}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {format(parseISO(cls.date), 'EEEE, MMMM d, yyyy')}
                            </div>
                            
                            {isToday(parseISO(cls.date)) && cls.status === "absent" && (
                              <div className="mt-2">
                                <Button size="sm" variant="outline">Request Excuse</Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No classes for this day</h3>
                      <p className="text-muted-foreground">
                        Select a different date to view classes
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-campus-purple" />
                    Monthly Attendance Trends
                  </CardTitle>
                  <CardDescription>
                    Your attendance percentage over the past year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyAttendanceData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Attendance']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="attendance" 
                          name="Attendance %" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendance Insights</CardTitle>
                  <CardDescription>
                    Key metrics and insights about your attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="rounded-full bg-green-100 p-3 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="text-2xl font-bold">{Math.round((attendedClasses / totalClasses) * 100)}%</div>
                          <p className="text-sm text-muted-foreground mt-1">Current Semester</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="rounded-full bg-purple-100 p-3 mb-4">
                            <BookOpen className="h-6 w-6 text-campus-purple" />
                          </div>
                          <div className="text-2xl font-bold">
                            {courseAttendanceData.filter(c => c.attendance >= 90).length}/{courseAttendanceData.length}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Courses Above 90%</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="rounded-full bg-red-100 p-3 mb-4">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                          </div>
                          <div className="text-2xl font-bold">
                            {courseAttendanceData.filter(c => c.attendance < 75).length}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Courses Below 75%</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-4">Attendance Requirements</h3>
                    <div className="space-y-4 border rounded-lg p-4">
                      <p className="text-sm">
                        University policy requires a minimum of 75% attendance in each course to be eligible for final examinations.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Courses Meeting Requirements</h4>
                          <div className="space-y-2">
                            {courseAttendanceData
                              .filter(course => course.attendance >= 75)
                              .map(course => (
                                <div key={course.id} className="flex justify-between items-center p-2 rounded-md border">
                                  <span className="text-sm">{course.code}</span>
                                  <span className="text-sm font-medium">{course.attendance}%</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Courses Below Requirements</h4>
                          <div className="space-y-2">
                            {courseAttendanceData
                              .filter(course => course.attendance < 75)
                              .length > 0 ? (
                                courseAttendanceData
                                  .filter(course => course.attendance < 75)
                                  .map(course => (
                                    <div key={course.id} className="flex justify-between items-center p-2 rounded-md border border-red-200 bg-red-50">
                                      <span className="text-sm">{course.code}</span>
                                      <span className="text-sm font-medium text-red-600">{course.attendance}%</span>
                                    </div>
                                  ))
                              ) : (
                                <div className="p-2 rounded-md border border-green-200 bg-green-50 text-green-600 text-sm">
                                  All courses meet attendance requirements! 🎉
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Attendance;

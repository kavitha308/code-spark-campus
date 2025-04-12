
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileCheck, AlertTriangle, Calendar, Clock, User } from "lucide-react";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState("all");
  
  // Sample attendance data by subject
  const subjectAttendanceData = [
    { subject: "Data Structures", present: 85, absent: 15, total: 20, threshold: 75 },
    { subject: "Web Development", present: 92, absent: 8, total: 25, threshold: 75 },
    { subject: "Database Systems", present: 68, absent: 32, total: 22, threshold: 75 },
    { subject: "Machine Learning", present: 78, absent: 22, total: 18, threshold: 75 },
    { subject: "Professional Ethics", present: 95, absent: 5, total: 20, threshold: 75 },
    { subject: "Computer Networks", present: 72, absent: 28, total: 18, threshold: 75 },
  ];
  
  // Sample attendance data by month
  const monthlyAttendanceData = [
    { month: "Jan", present: 90, absent: 10 },
    { month: "Feb", present: 85, absent: 15 },
    { month: "Mar", present: 78, absent: 22 },
    { month: "Apr", present: 82, absent: 18 },
    { month: "May", present: 88, absent: 12 },
    { month: "Jun", present: 92, absent: 8 },
    { month: "Jul", present: 94, absent: 6 },
    { month: "Aug", present: 85, absent: 15 },
    { month: "Sep", present: 80, absent: 20 },
    { month: "Oct", present: 75, absent: 25 },
    { month: "Nov", present: 82, absent: 18 },
    { month: "Dec", present: 90, absent: 10 },
  ];
  
  // Sample recent attendance records
  const recentAttendance = [
    { date: "Apr 10, 2025", day: "Monday", subject: "Data Structures", status: "present", time: "10:30 AM" },
    { date: "Apr 10, 2025", day: "Monday", subject: "Web Development", status: "present", time: "01:00 PM" },
    { date: "Apr 09, 2025", day: "Sunday", subject: "Database Systems", status: "absent", time: "11:15 AM" },
    { date: "Apr 08, 2025", day: "Saturday", subject: "Machine Learning", status: "present", time: "09:45 AM" },
    { date: "Apr 07, 2025", day: "Friday", subject: "Professional Ethics", status: "present", time: "02:30 PM" },
    { date: "Apr 06, 2025", day: "Thursday", subject: "Computer Networks", status: "present", time: "10:00 AM" },
  ];
  
  // Filter data based on selected course
  const filteredData = selectedCourse === "all" 
    ? subjectAttendanceData 
    : subjectAttendanceData.filter(item => item.subject === selectedCourse);
  
  // Calculate overall attendance percentage
  const overallPercentage = subjectAttendanceData.reduce(
    (acc, curr) => acc + curr.present, 0
  ) / subjectAttendanceData.length;
  
  // Determine attendance status
  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 85) return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (percentage >= 75) return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (percentage >= 65) return { label: "Average", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Poor", color: "bg-red-100 text-red-800" };
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Attendance Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-muted-foreground text-sm">Overall Attendance</div>
                <Badge className={getAttendanceStatus(overallPercentage).color}>
                  {getAttendanceStatus(overallPercentage).label}
                </Badge>
              </div>
              <div className="text-3xl font-bold">{overallPercentage.toFixed(1)}%</div>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                <div 
                  className="h-2 bg-campus-purple rounded-full" 
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>Threshold 75%</span>
                <span>100%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="h-5 w-5 text-campus-green" />
                <span className="text-muted-foreground text-sm">Classes Attended</span>
              </div>
              <div className="text-3xl font-bold">124 / 143</div>
              <div className="text-sm text-muted-foreground mt-1">
                Total classes attended this semester
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-campus-orange" />
                <span className="text-muted-foreground text-sm">Courses Below Threshold</span>
              </div>
              <div className="text-3xl font-bold">
                {subjectAttendanceData.filter(s => s.present < s.threshold).length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Courses requiring attention
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {subjectAttendanceData.map((subject, index) => (
                  <SelectItem key={index} value={subject.subject}>
                    {subject.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Course-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`]} />
                      <Legend />
                      <Bar name="Present %" dataKey="present" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      <Bar name="Absent %" dataKey="absent" fill="#ff7c43" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {filteredData.map((subject, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{subject.subject}</div>
                        <Badge className={getAttendanceStatus(subject.present).color}>
                          {subject.present}%
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full mb-2">
                        <div 
                          className={`h-2 rounded-full ${subject.present >= subject.threshold ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${subject.present}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(subject.present * subject.total / 100)} / {subject.total} classes attended
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyAttendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`]} />
                      <Legend />
                      <Bar name="Present %" dataKey="present" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      <Bar name="Absent %" dataKey="absent" fill="#ff7c43" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAttendance.map((record, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-slate-50">
                      <div className={`p-2 rounded-full ${record.status === 'present' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {record.status === 'present' ? (
                          <FileCheck className={`h-5 w-5 ${record.status === 'present' ? 'text-green-600' : 'text-red-600'}`} />
                        ) : (
                          <AlertTriangle className={`h-5 w-5 ${record.status === 'present' ? 'text-green-600' : 'text-red-600'}`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium">{record.subject}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.day}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{record.time}</span>
                        </div>
                      </div>
                      
                      <Badge className={record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Attendance;

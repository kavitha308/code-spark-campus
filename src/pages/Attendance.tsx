
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Attendance = () => {
  // Sample attendance data
  const attendanceData = [
    {
      subject: "Data Structures",
      present: 28,
      absent: 4,
      total: 32,
    },
    {
      subject: "Web Development",
      present: 25,
      absent: 7,
      total: 32,
    },
    {
      subject: "Database Systems",
      present: 30,
      absent: 2,
      total: 32,
    },
    {
      subject: "Machine Learning",
      present: 22,
      absent: 10,
      total: 32,
    },
    {
      subject: "Python Programming",
      present: 31,
      absent: 1,
      total: 32,
    },
  ];

  // Calculate attendance percentages for each subject
  const chartData = attendanceData.map((item) => ({
    subject: item.subject,
    "Attendance %": Math.round((item.present / item.total) * 100),
    present: item.present,
    absent: item.absent,
  }));

  // Calculate overall attendance
  const totalClasses = attendanceData.reduce((acc, item) => acc + item.total, 0);
  const totalPresent = attendanceData.reduce((acc, item) => acc + item.present, 0);
  const overallAttendance = Math.round((totalPresent / totalClasses) * 100);

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Attendance Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-gradient-to-br from-white to-purple-50 shadow-md animate-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-campus-purple" />
                Subject-wise Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Attendance"]} />
                    <Legend />
                    <Bar
                      dataKey="Attendance %"
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-campus-green" />
                  Overall Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-campus-green to-campus-blue flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">
                    {overallAttendance}%
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      {overallAttendance >= 75 ? "Good Standing" : "Need Improvement"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {totalPresent} classes attended out of {totalClasses}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-orange-50 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-campus-orange" />
                  Attendance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {attendanceData
                  .filter((item) => (item.present / item.total) * 100 < 75)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-orange-50 border-l-4 border-orange-400 animate-hover"
                    >
                      <h3 className="font-medium">{item.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        Current: {Math.round((item.present / item.total) * 100)}% (Need 75%)
                      </p>
                    </div>
                  ))}
                {attendanceData.filter((item) => (item.present / item.total) * 100 < 75)
                  .length === 0 && (
                  <div className="p-3 rounded-lg bg-green-50 border-l-4 border-green-400">
                    <p className="text-sm font-medium">No attendance alerts!</p>
                    <p className="text-xs text-muted-foreground">
                      You're meeting minimum requirements in all subjects.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-green-50 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-campus-green" />
                  Next Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-white shadow-sm animate-hover">
                  <h3 className="font-medium">Database Systems</h3>
                  <p className="text-sm text-muted-foreground">Today, 2:00 PM - 3:30 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-white shadow-sm animate-hover">
                  <h3 className="font-medium">Web Development</h3>
                  <p className="text-sm text-muted-foreground">Tomorrow, 10:30 AM - 12:00 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-white shadow-sm animate-hover">
                  <h3 className="font-medium">Machine Learning</h3>
                  <p className="text-sm text-muted-foreground">Tomorrow, 3:00 PM - 4:30 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Attendance;

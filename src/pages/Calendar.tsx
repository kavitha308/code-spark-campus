
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Bookmark, BellRing } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Sample academic events
  const events = [
    { date: "2025-04-15", title: "Mid-term Exams Begin", type: "exam" },
    { date: "2025-04-25", title: "Mid-term Exams End", type: "exam" },
    { date: "2025-04-20", title: "Coding Hackathon", type: "event" },
    { date: "2025-05-01", title: "Labor Day - Holiday", type: "holiday" },
    { date: "2025-05-10", title: "Project Submission Deadline", type: "deadline" },
    { date: "2025-05-15", title: "Guest Lecture: AI in Education", type: "lecture" },
  ];

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Academic Calendar
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-campus-purple" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BellRing className="mr-2 h-5 w-5 text-campus-orange" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg transition-all duration-200 hover:shadow-md animate-hover ${
                      event.type === 'holiday' ? 'bg-green-50 border-l-4 border-green-400' :
                      event.type === 'exam' ? 'bg-red-50 border-l-4 border-red-400' :
                      event.type === 'deadline' ? 'bg-orange-50 border-l-4 border-orange-400' :
                      event.type === 'event' ? 'bg-blue-50 border-l-4 border-blue-400' :
                      'bg-purple-50 border-l-4 border-purple-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Calendar Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <span>Exams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <span>Holidays</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                  <span>Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                  <span>Deadlines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                  <span>Lectures</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Calendar;

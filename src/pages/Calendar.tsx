
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarClock, BookOpen, GraduationCap, CalendarPlus, Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample events data
  const events = [
    { date: new Date(2025, 3, 15), title: "Data Structures Quiz", type: "assessment", course: "Data Structures & Algorithms" },
    { date: new Date(2025, 3, 18), title: "Web Development Project Due", type: "deadline", course: "Advanced Web Development" },
    { date: new Date(2025, 3, 20), title: "SQL Workshop", type: "workshop", course: "Database Management Systems" },
    { date: new Date(2025, 3, 25), title: "Machine Learning Midterm", type: "exam", course: "Machine Learning Fundamentals" },
    { date: new Date(2025, 4, 5), title: "Spring Break Begins", type: "holiday" },
    { date: new Date(2025, 4, 12), title: "Spring Break Ends", type: "holiday" },
    { date: new Date(2025, 4, 15), title: "Programming Contest", type: "event" },
  ];
  
  // Holidays
  const holidays = [
    { date: new Date(2025, 4, 5), title: "Spring Break Start" },
    { date: new Date(2025, 4, 6), title: "Spring Break" },
    { date: new Date(2025, 4, 7), title: "Spring Break" },
    { date: new Date(2025, 4, 8), title: "Spring Break" },
    { date: new Date(2025, 4, 9), title: "Spring Break" },
    { date: new Date(2025, 4, 10), title: "Spring Break" },
    { date: new Date(2025, 4, 11), title: "Spring Break" },
    { date: new Date(2025, 4, 12), title: "Spring Break End" },
    { date: new Date(2025, 5, 25), title: "Memorial Day" },
  ];
  
  // Function to get events for selected date
  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  // Function to check if a date is a holiday
  const isHoliday = (date: Date) => {
    return holidays.some(holiday => 
      holiday.date.getDate() === date.getDate() &&
      holiday.date.getMonth() === date.getMonth() &&
      holiday.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Function to get the holiday name
  const getHolidayName = (date: Date) => {
    const holiday = holidays.find(h => 
      h.date.getDate() === date.getDate() &&
      h.date.getMonth() === date.getMonth() &&
      h.date.getFullYear() === date.getFullYear()
    );
    return holiday ? holiday.title : "";
  };
  
  // Get events for the selected date
  const selectedDateEvents = getEventsForDate(date);
  
  // Get badge color based on event type
  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "assessment": return "bg-yellow-100 text-yellow-800";
      case "deadline": return "bg-red-100 text-red-800";
      case "workshop": return "bg-blue-100 text-blue-800";
      case "exam": return "bg-purple-100 text-purple-800";
      case "holiday": return "bg-green-100 text-green-800";
      case "event": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "assessment":
      case "exam":
        return <BookOpen className="h-4 w-4" />;
      case "deadline":
        return <CalendarClock className="h-4 w-4" />;
      case "workshop":
        return <GraduationCap className="h-4 w-4" />;
      case "event":
        return <CalendarPlus className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:w-1/2 lg:w-1/3 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  components={{
                    DayContent: ({ date: dayDate }) => (
                      <div className="relative h-full w-full p-2">
                        <span>{dayDate.getDate()}</span>
                        {events.some(event => 
                          event.date.getDate() === dayDate.getDate() &&
                          event.date.getMonth() === dayDate.getMonth() &&
                          event.date.getFullYear() === dayDate.getFullYear()
                        ) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-campus-purple"></div>
                        )}
                        {isHoliday(dayDate) && (
                          <div className="absolute inset-0 bg-green-50 rounded-full opacity-20"></div>
                        )}
                      </div>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-1/2 lg:w-2/3 w-full">
            <Card>
              <CardHeader>
                <CardTitle>
                  {date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}
                </CardTitle>
                {isHoliday(date!) && (
                  <Badge className="bg-green-100 text-green-800">
                    Holiday: {getHolidayName(date!)}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                        <div className={`mt-1 p-2 rounded-full ${getEventBadgeColor(event.type).split(" ")[0]}`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge className={getEventBadgeColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          {event.course && (
                            <p className="text-sm text-muted-foreground">{event.course}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                    <h3 className="text-lg font-medium">No events scheduled</h3>
                    <p className="text-muted-foreground">There are no events scheduled for this date.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {events
                      .filter(event => event.date >= new Date())
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .slice(0, 3)
                      .map((event, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50">
                          <div className={`p-1.5 rounded-md ${getEventBadgeColor(event.type).split(" ")[0]}`}>
                            {getEventIcon(event.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{event.title}</div>
                            <div className="text-xs text-muted-foreground">{format(event.date, "MMM d, yyyy")}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Holidays</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {holidays
                      .filter(holiday => holiday.date >= new Date())
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .slice(0, 3)
                      .map((holiday, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50">
                          <div className="p-1.5 rounded-md bg-green-100">
                            <CalendarIcon className="h-4 w-4 text-green-800" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{holiday.title}</div>
                            <div className="text-xs text-muted-foreground">{format(holiday.date, "MMM d, yyyy")}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Calendar;

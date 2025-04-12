
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Bookmark, MapPin, Users, BookOpen, Briefcase, GraduationCap, PartyPopper } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, isSameDay, parseISO, formatISO, addHours } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Event type definition
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  type: 'class' | 'assignment' | 'exam' | 'holiday' | 'event' | 'personal';
  description?: string;
  location?: string;
  isAllDay: boolean;
}

// Sample calendar events
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Data Structures Lecture',
    date: parseISO('2023-04-15T10:00:00'),
    endDate: parseISO('2023-04-15T11:30:00'),
    type: 'class',
    location: 'Room 203',
    description: 'Binary Trees and Graph Algorithms',
    isAllDay: false
  },
  {
    id: '2',
    title: 'Algorithm Assignment Due',
    date: parseISO('2023-04-18T23:59:00'),
    type: 'assignment',
    description: 'Implement Dijkstra\'s Algorithm',
    isAllDay: false
  },
  {
    id: '3',
    title: 'Spring Break',
    date: parseISO('2023-04-20T00:00:00'),
    endDate: parseISO('2023-04-27T23:59:00'),
    type: 'holiday',
    description: 'University closed for Spring Break',
    isAllDay: true
  },
  {
    id: '4',
    title: 'Midterm Exam',
    date: parseISO('2023-05-02T14:00:00'),
    endDate: parseISO('2023-05-02T16:00:00'),
    type: 'exam',
    location: 'Main Hall',
    description: 'Covers all topics from weeks 1-6',
    isAllDay: false
  },
  {
    id: '5',
    title: 'Hackathon',
    date: parseISO('2023-05-10T09:00:00'),
    endDate: parseISO('2023-05-11T18:00:00'),
    type: 'event',
    location: 'Student Center',
    description: '24-hour coding challenge',
    isAllDay: true
  },
  {
    id: '6',
    title: 'Independence Day',
    date: parseISO('2023-07-04T00:00:00'),
    type: 'holiday',
    description: 'National Holiday - University Closed',
    isAllDay: true
  },
  {
    id: '7',
    title: 'Labor Day',
    date: parseISO('2023-09-04T00:00:00'),
    type: 'holiday',
    description: 'National Holiday - University Closed',
    isAllDay: true
  },
  {
    id: '8',
    title: 'Thanksgiving Break',
    date: parseISO('2023-11-23T00:00:00'),
    endDate: parseISO('2023-11-26T23:59:00'),
    type: 'holiday',
    description: 'University Closed for Thanksgiving',
    isAllDay: true
  },
  {
    id: '9',
    title: 'Winter Break',
    date: parseISO('2023-12-22T00:00:00'),
    endDate: parseISO('2024-01-07T23:59:00'),
    type: 'holiday',
    description: 'University Closed for Winter Break',
    isAllDay: true
  }
];

const Calendar = () => {
  const { user, profile } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    date: new Date(),
    type: 'personal',
    isAllDay: false
  });
  
  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.date, date) || 
      (event.endDate && 
        date >= event.date && 
        date <= event.endDate)
    );
  };
  
  // Function to determine if a date has events
  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };
  
  // Function to handle date selection in calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };
  
  // Function to handle adding a new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error("Please provide at least a title and date");
      return;
    }
    
    const eventToAdd: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title || '',
      date: newEvent.date || new Date(),
      endDate: newEvent.endDate,
      type: newEvent.type as 'class' | 'assignment' | 'exam' | 'holiday' | 'event' | 'personal',
      description: newEvent.description,
      location: newEvent.location,
      isAllDay: newEvent.isAllDay || false
    };
    
    setEvents([...events, eventToAdd]);
    setIsAddEventOpen(false);
    setNewEvent({
      title: '',
      date: new Date(),
      type: 'personal',
      isAllDay: false
    });
    
    toast.success("Event added to calendar!");
  };
  
  // Function to handle viewing event details
  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };
  
  // Function to render event type badge
  const renderEventTypeBadge = (type: string) => {
    switch (type) {
      case 'class':
        return <Badge className="bg-blue-500"><BookOpen className="h-3 w-3 mr-1" /> Class</Badge>;
      case 'assignment':
        return <Badge className="bg-yellow-500"><Bookmark className="h-3 w-3 mr-1" /> Assignment</Badge>;
      case 'exam':
        return <Badge className="bg-red-500"><GraduationCap className="h-3 w-3 mr-1" /> Exam</Badge>;
      case 'holiday':
        return <Badge className="bg-green-500"><PartyPopper className="h-3 w-3 mr-1" /> Holiday</Badge>;
      case 'event':
        return <Badge className="bg-purple-500"><Users className="h-3 w-3 mr-1" /> Event</Badge>;
      case 'personal':
        return <Badge className="bg-orange-500"><Briefcase className="h-3 w-3 mr-1" /> Personal</Badge>;
      default:
        return <Badge className="bg-gray-500">Other</Badge>;
    }
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Academic Calendar</h1>
          <p className="text-muted-foreground">
            View your schedule, classes, assignments, and important dates
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-campus-purple" />
                Calendar
              </CardTitle>
              <CardDescription>
                {format(new Date(), 'MMMM yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiers={{
                  hasEvents: hasEvents,
                }}
                modifiersClassNames={{
                  hasEvents: "bg-campus-purple/10 font-bold text-campus-purple",
                }}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  setNewEvent({
                    ...newEvent,
                    date: date || new Date()
                  });
                  setIsAddEventOpen(true);
                }}
              >
                Add Event
              </Button>
            </CardFooter>
          </Card>
          
          {/* Events for selected date */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Events for {date ? format(date, 'MMMM d, yyyy') : 'Today'}
              </CardTitle>
              <CardDescription>
                {getEventsForDate(date || new Date()).length} events scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getEventsForDate(date || new Date()).length > 0 ? (
                  getEventsForDate(date || new Date()).map((event) => (
                    <Card 
                      key={event.id} 
                      className="shadow-none border cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => handleViewEvent(event)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          {renderEventTypeBadge(event.type)}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.isAllDay ? (
                              <span>All day</span>
                            ) : (
                              <span>
                                {format(event.date, 'h:mm a')}
                                {event.endDate && ` - ${format(event.endDate, 'h:mm a')}`}
                              </span>
                            )}
                          </div>
                          {event.location && (
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No events for this day</h3>
                    <p className="text-muted-foreground mb-4">
                      Add a new event or select a different date
                    </p>
                    <Button
                      onClick={() => {
                        setNewEvent({
                          ...newEvent,
                          date: date || new Date()
                        });
                        setIsAddEventOpen(true);
                      }}
                    >
                      Add Event
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming holidays and important dates */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Holidays & Important Dates</CardTitle>
              <CardDescription>
                Academic calendar for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events
                  .filter(event => event.type === 'holiday' || event.type === 'exam')
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 6)
                  .map(event => (
                    <Card key={event.id} className="shadow-none border">
                      <CardHeader className="p-3 pb-0">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          {renderEventTypeBadge(event.type)}
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {format(event.date, 'MMM d, yyyy')}
                          {event.endDate && ` - ${format(event.endDate, 'MMM d, yyyy')}`}
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in your calendar
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                value={newEvent.title || ''} 
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select 
                  value={newEvent.type} 
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>All Day</Label>
                <Select 
                  value={newEvent.isAllDay ? "yes" : "no"} 
                  onValueChange={(value) => setNewEvent({ ...newEvent, isAllDay: value === "yes" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All day event?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date" 
                  value={newEvent.date ? formatISO(newEvent.date, { representation: 'date' }) : ''} 
                  onChange={(e) => setNewEvent({ 
                    ...newEvent, 
                    date: e.target.value ? parseISO(e.target.value) : new Date() 
                  })} 
                />
              </div>
              
              {!newEvent.isAllDay && (
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input 
                    type="time" 
                    value={newEvent.date ? format(newEvent.date, 'HH:mm') : ''} 
                    onChange={(e) => {
                      if (!e.target.value) return;
                      
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const newDate = new Date(newEvent.date || new Date());
                      newDate.setHours(hours);
                      newDate.setMinutes(minutes);
                      
                      setNewEvent({ ...newEvent, date: newDate });
                    }} 
                  />
                </div>
              )}
            </div>
            
            {!newEvent.isAllDay && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input 
                    type="date" 
                    value={newEvent.endDate ? formatISO(newEvent.endDate, { representation: 'date' }) : ''} 
                    onChange={(e) => setNewEvent({ 
                      ...newEvent, 
                      endDate: e.target.value ? parseISO(e.target.value) : undefined 
                    })} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input 
                    type="time" 
                    value={newEvent.endDate ? format(newEvent.endDate, 'HH:mm') : ''} 
                    onChange={(e) => {
                      if (!e.target.value) return;
                      
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const baseDate = newEvent.endDate || newEvent.date || new Date();
                      const newDate = new Date(baseDate);
                      newDate.setHours(hours);
                      newDate.setMinutes(minutes);
                      
                      setNewEvent({ ...newEvent, endDate: newDate });
                    }} 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input 
                id="location" 
                value={newEvent.location || ''} 
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                value={newEvent.description || ''} 
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {renderEventTypeBadge(selectedEvent.type)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm">
                    {format(selectedEvent.date, 'MMM d, yyyy')}
                    {selectedEvent.endDate && selectedEvent.endDate.getTime() !== selectedEvent.date.getTime() && (
                      ` - ${format(selectedEvent.endDate, 'MMM d, yyyy')}`
                    )}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Time</Label>
                  <p className="text-sm">
                    {selectedEvent.isAllDay ? (
                      "All day"
                    ) : (
                      <>
                        {format(selectedEvent.date, 'h:mm a')}
                        {selectedEvent.endDate && ` - ${format(selectedEvent.endDate, 'h:mm a')}`}
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              {selectedEvent.location && (
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm">{selectedEvent.location}</p>
                </div>
              )}
              
              {selectedEvent.description && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm">{selectedEvent.description}</p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setEvents(events.filter(e => e.id !== selectedEvent.id));
                  setSelectedEvent(null);
                  toast.success("Event deleted successfully!");
                }}
              >
                Delete Event
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </PageLayout>
  );
};

export default Calendar;

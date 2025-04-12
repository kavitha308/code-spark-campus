
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Mail, Phone, Calendar, Users, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Faculty = () => {
  // Sample faculty data
  const facultyData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor",
      department: "Computer Science",
      image: "", // Placeholder for faculty image
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      expertise: ["Data Structures", "Algorithms", "Machine Learning"],
      rating: 4.8,
      office: "Science Building, Room 305",
      officeHours: "Monday & Wednesday: 2:00 PM - 4:00 PM",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Associate Professor",
      department: "Web Technologies",
      image: "", // Placeholder for faculty image
      email: "michael.chen@university.edu",
      phone: "+1 (555) 987-6543",
      expertise: ["Web Development", "JavaScript", "Node.js", "React"],
      rating: 4.6,
      office: "Tech Building, Room 210",
      officeHours: "Tuesday & Thursday: 1:00 PM - 3:00 PM",
    },
    {
      id: 3,
      name: "Dr. Robert Garcia",
      role: "Professor",
      department: "Database Systems",
      image: "", // Placeholder for faculty image
      email: "robert.garcia@university.edu",
      phone: "+1 (555) 456-7890",
      expertise: ["Database Management", "SQL", "NoSQL", "Data Modeling"],
      rating: 4.5,
      office: "Engineering Building, Room 405",
      officeHours: "Friday: 10:00 AM - 2:00 PM",
    },
    {
      id: 4,
      name: "Dr. Emily Taylor",
      role: "Assistant Professor",
      department: "Artificial Intelligence",
      image: "", // Placeholder for faculty image
      email: "emily.taylor@university.edu",
      phone: "+1 (555) 234-5678",
      expertise: ["Machine Learning", "Neural Networks", "Computer Vision"],
      rating: 4.9,
      office: "AI Center, Room 112",
      officeHours: "Monday & Wednesday: 11:00 AM - 1:00 PM",
    },
  ];

  const [selectedFaculty, setSelectedFaculty] = React.useState(facultyData[0]);
  const [message, setMessage] = React.useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${selectedFaculty.name}.`,
        variant: "default",
      });
      setMessage("");
    }
  };

  const handleBookAppointment = (faculty) => {
    toast({
      title: "Appointment Request Sent",
      description: `Your appointment request with ${faculty.name} has been submitted.`,
      variant: "default",
    });
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Faculty Interaction
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md animate-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-campus-blue" />
                  Faculty Directory
                </CardTitle>
                <CardDescription>Connect with your professors and instructors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {facultyData.map((faculty) => (
                  <div
                    key={faculty.id}
                    className={`p-3 rounded-lg flex items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                      selectedFaculty.id === faculty.id ? "bg-blue-50 border-l-4 border-campus-blue" : ""
                    }`}
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src={faculty.image} alt={faculty.name} />
                      <AvatarFallback className="bg-gradient-to-br from-campus-blue to-campus-purple text-white">
                        {faculty.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{faculty.name}</h3>
                      <p className="text-sm text-muted-foreground">{faculty.department}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage src={selectedFaculty.image} alt={selectedFaculty.name} />
                      <AvatarFallback className="text-xl bg-gradient-to-br from-campus-blue to-campus-purple text-white">
                        {selectedFaculty.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{selectedFaculty.name}</CardTitle>
                      <CardDescription className="text-base">
                        {selectedFaculty.role} • {selectedFaculty.department}
                      </CardDescription>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{selectedFaculty.rating}</span>
                        <span className="text-sm text-muted-foreground ml-2">Faculty Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="info">
                  <TabsList className="w-full">
                    <TabsTrigger value="info" className="flex-1">Information</TabsTrigger>
                    <TabsTrigger value="message" className="flex-1">Message</TabsTrigger>
                    <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="pt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-white shadow-sm">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-campus-blue" />
                              <span>{selectedFaculty.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-campus-green" />
                              <span>{selectedFaculty.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white shadow-sm">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Office Hours</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-campus-purple mt-1" />
                              <div>
                                <p>{selectedFaculty.officeHours}</p>
                                <p className="text-sm text-muted-foreground">{selectedFaculty.office}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-white shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedFaculty.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-100 text-campus-purple rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          className="gradient-blue animate-hover" 
                          onClick={() => handleBookAppointment(selectedFaculty)}
                        >
                          Request Appointment
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="message" className="pt-4">
                    <div className="p-4 rounded-lg bg-white shadow-sm mb-4 min-h-[200px]">
                      <div className="flex justify-center items-center h-full text-muted-foreground">
                        <MessageSquare className="h-5 w-5 mr-2" /> 
                        Start a new conversation with {selectedFaculty.name}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Message ${selectedFaculty.name.split(' ')[0]}...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-white"
                      />
                      <Button onClick={handleSendMessage} className="gradient-purple animate-hover">
                        <Send className="h-4 w-4 mr-2" /> Send
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="pt-4">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-white shadow-sm">
                        <h3 className="font-medium mb-3">Upcoming Classes</h3>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-campus-blue">
                            <h4 className="font-medium">Data Structures & Algorithms</h4>
                            <p className="text-sm">Tomorrow • 10:30 AM - 12:00 PM • Room 305</p>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-campus-blue">
                            <h4 className="font-medium">Advanced Machine Learning</h4>
                            <p className="text-sm">Thursday • 2:00 PM - 3:30 PM • AI Lab</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-white shadow-sm">
                        <h3 className="font-medium mb-3">Office Hours</h3>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-green-50 border-l-4 border-campus-green">
                            <h4 className="font-medium">Monday</h4>
                            <p className="text-sm">2:00 PM - 4:00 PM • Science Building, Room 305</p>
                          </div>
                          <div className="p-3 rounded-lg bg-green-50 border-l-4 border-campus-green">
                            <h4 className="font-medium">Wednesday</h4>
                            <p className="text-sm">2:00 PM - 4:00 PM • Science Building, Room 305</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          className="gradient-green animate-hover" 
                          onClick={() => handleBookAppointment(selectedFaculty)}
                        >
                          Book Office Hours Slot
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Faculty;

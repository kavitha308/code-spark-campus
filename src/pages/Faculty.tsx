
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, Calendar, Star, Phone, BookOpen, GraduationCap, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Sample faculty data
const facultyMembers = [
  {
    id: "1",
    name: "Dr. Robert Johnson",
    title: "Professor",
    department: "Computer Science",
    expertise: ["Algorithms", "Data Structures", "Machine Learning"],
    courses: ["CS202: Data Structures & Algorithms", "CS506: Advanced Algorithms"],
    email: "r.johnson@university.edu",
    phone: "(555) 123-4567",
    office: "Science Building, Room 305",
    officeHours: "Monday & Wednesday, 2:00 PM - 4:00 PM",
    bio: "Dr. Johnson has over 15 years of experience in computer science education and research. His primary focus is on algorithmic efficiency and machine learning applications.",
    image: "",
    rating: 4.8,
    reviews: 45
  },
  {
    id: "2",
    name: "Prof. Emily Chen",
    title: "Associate Professor",
    department: "Computer Science",
    expertise: ["Artificial Intelligence", "Neural Networks", "Computer Vision"],
    courses: ["CS405: Machine Learning Fundamentals", "CS610: Advanced AI"],
    email: "e.chen@university.edu",
    phone: "(555) 123-4568",
    office: "Science Building, Room 310",
    officeHours: "Tuesday & Thursday, 1:00 PM - 3:00 PM",
    bio: "Prof. Chen specializes in artificial intelligence and computer vision. Her research has been published in top-tier journals and she has worked on several industry collaborations in AI applications.",
    image: "",
    rating: 4.9,
    reviews: 38
  },
  {
    id: "3",
    name: "Dr. Michael Brown",
    title: "Professor",
    department: "Computer Science",
    expertise: ["Web Development", "JavaScript", "Frontend Frameworks"],
    courses: ["CS301: Advanced Web Development", "CS420: Modern Frontend Development"],
    email: "m.brown@university.edu",
    phone: "(555) 123-4569",
    office: "Tech Building, Room 205",
    officeHours: "Wednesday & Friday, 10:00 AM - 12:00 PM",
    bio: "Dr. Brown has extensive industry experience in web development before joining academia. He maintains close ties with tech companies and focuses on practical, industry-relevant teaching approaches.",
    image: "",
    rating: 4.7,
    reviews: 52
  },
  {
    id: "4",
    name: "Dr. Sarah Williams",
    title: "Assistant Professor",
    department: "Computer Science",
    expertise: ["Database Systems", "SQL", "Data Management"],
    courses: ["CS305: Database Management Systems", "CS510: Advanced Database Concepts"],
    email: "s.williams@university.edu",
    phone: "(555) 123-4570",
    office: "Tech Building, Room 210",
    officeHours: "Monday & Thursday, 11:00 AM - 1:00 PM",
    bio: "Dr. Williams specializes in database design and optimization. She has worked with several large organizations to improve their data management systems and brings practical knowledge to her courses.",
    image: "",
    rating: 4.6,
    reviews: 31
  },
  {
    id: "5",
    name: "Prof. David Martinez",
    title: "Associate Professor",
    department: "Computer Science",
    expertise: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    courses: ["CS350: Introduction to Cybersecurity", "CS550: Advanced Network Security"],
    email: "d.martinez@university.edu",
    phone: "(555) 123-4571",
    office: "Science Building, Room 315",
    officeHours: "Tuesday & Friday, 3:00 PM - 5:00 PM",
    bio: "Prof. Martinez has a background in cybersecurity and has consulted for government agencies. His courses focus on practical security concepts and ethical considerations in the digital age.",
    image: "",
    rating: 4.5,
    reviews: 29
  },
  {
    id: "6",
    name: "Dr. Jennifer Wilson",
    title: "Professor",
    department: "Computer Science",
    expertise: ["Mobile Development", "iOS/Android", "Cross-platform Frameworks"],
    courses: ["CS330: Mobile App Development", "CS530: Advanced Mobile Frameworks"],
    email: "j.wilson@university.edu",
    phone: "(555) 123-4572",
    office: "Tech Building, Room 220",
    officeHours: "Monday & Wednesday, 9:00 AM - 11:00 AM",
    bio: "Dr. Wilson specializes in mobile application development and has released several apps in the market. She brings real-world experience to her teaching and focuses on current industry best practices.",
    image: "",
    rating: 4.7,
    reviews: 40
  }
];

// Sample reviews data (for a selected faculty member)
const facultyReviews = [
  {
    id: "r1",
    facultyId: "1",
    student: "Alex Johnson",
    course: "CS202: Data Structures & Algorithms",
    date: "March 15, 2023",
    rating: 5,
    comment: "Dr. Johnson explains complex concepts very clearly. His examples are relevant and he's always willing to help outside of class hours."
  },
  {
    id: "r2",
    facultyId: "1",
    student: "Maria Garcia",
    course: "CS202: Data Structures & Algorithms",
    date: "February 28, 2023",
    rating: 4,
    comment: "Very knowledgeable professor who is passionate about the subject. The assignments are challenging but very educational."
  },
  {
    id: "r3",
    facultyId: "1",
    student: "James Wilson",
    course: "CS506: Advanced Algorithms",
    date: "April 5, 2023",
    rating: 5,
    comment: "One of the best professors in the department. His lectures are engaging and he explains difficult topics in an accessible way."
  },
  {
    id: "r4",
    facultyId: "2",
    student: "Sarah Thompson",
    course: "CS405: Machine Learning Fundamentals",
    date: "March 20, 2023",
    rating: 5,
    comment: "Prof. Chen is incredibly knowledgeable and her passion for AI is contagious. She makes complex neural network concepts understandable."
  },
  {
    id: "r5",
    facultyId: "2",
    student: "Michael Brown",
    course: "CS610: Advanced AI",
    date: "April 2, 2023",
    rating: 5,
    comment: "Brilliant professor who brings cutting-edge research into the classroom. Her assignments are challenging but worthwhile."
  }
];

// AppointmentForm component for scheduling appointments with faculty
const AppointmentForm = ({ faculty, onSubmit }: { faculty: any, onSubmit: () => void }) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    date: "",
    time: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.reason) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to schedule appointment
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
      toast.success(`Appointment requested with ${faculty.name}!`);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date <span className="text-red-500">*</span></Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Preferred Time <span className="text-red-500">*</span></Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Appointment <span className="text-red-500">*</span></Label>
        <Textarea
          id="reason"
          name="reason"
          placeholder="Please describe the purpose of your appointment..."
          value={formData.reason}
          onChange={handleInputChange}
          className="min-h-[100px]"
          required
        />
      </div>
      
      <DialogFooter className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request Appointment"}
        </Button>
      </DialogFooter>
    </form>
  );
};

// MessageForm component for sending messages to faculty
const MessageForm = ({ faculty, onSubmit }: { faculty: any, onSubmit: () => void }) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to send message
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
      toast.success(`Message sent to ${faculty.name}!`);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleInputChange}
          className="min-h-[150px]"
          required
        />
      </div>
      
      <DialogFooter className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </DialogFooter>
    </form>
  );
};

// Label component
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium">
    {children}
  </label>
);

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedFaculty, setSelectedFaculty] = useState<any | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  
  // Filter faculty based on search term and department
  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase())) ||
      faculty.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = departmentFilter === "all" || faculty.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });
  
  // Handle appointment form submission
  const handleAppointmentSubmit = () => {
    setShowAppointmentForm(false);
  };
  
  // Handle message form submission
  const handleMessageSubmit = () => {
    setShowMessageForm(false);
  };
  
  // Get reviews for selected faculty
  const getFacultyReviews = (facultyId: string) => {
    return facultyReviews.filter(review => review.facultyId === facultyId);
  };
  
  // Render star rating
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm">{rating}</span>
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
          <p className="text-muted-foreground">
            Connect with professors, view office hours, and schedule appointments
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex-grow flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, course, or expertise..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty) => (
              <Card key={faculty.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-campus-purple bg-campus-purple text-white">
                        <AvatarImage src={faculty.image} alt={faculty.name} />
                        <AvatarFallback>
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{faculty.name}</CardTitle>
                        <CardDescription>
                          {faculty.title} • {faculty.department}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {renderStarRating(faculty.rating)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Areas of Expertise</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {faculty.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Courses</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {faculty.courses.map((course, index) => (
                          <li key={index} className="flex items-center">
                            <BookOpen className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-campus-purple" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{faculty.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{faculty.officeHours.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between gap-2 w-full">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedFaculty(faculty);
                        setShowAppointmentForm(true);
                      }}
                    >
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      Appointment
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedFaculty(faculty);
                        setShowMessageForm(true);
                      }}
                    >
                      <Mail className="h-3.5 w-3.5 mr-1.5" />
                      Message
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setSelectedFaculty(faculty)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No faculty members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Faculty Profile Dialog */}
      <Dialog open={!!selectedFaculty && !showAppointmentForm && !showMessageForm} onOpenChange={(open) => !open && setSelectedFaculty(null)}>
        {selectedFaculty && (
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-campus-purple bg-campus-purple text-white">
                  <AvatarImage src={selectedFaculty.image} alt={selectedFaculty.name} />
                  <AvatarFallback className="text-xl">
                    {selectedFaculty.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-xl">{selectedFaculty.name}</DialogTitle>
                  <DialogDescription>
                    {selectedFaculty.title} • {selectedFaculty.department}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="bg-campus-purple/10 text-campus-purple w-full">
                <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-white">Overview</TabsTrigger>
                <TabsTrigger value="courses" className="flex-1 data-[state=active]:bg-white">Courses</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 data-[state=active]:bg-white">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Biography</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedFaculty.bio}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFaculty.expertise.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedFaculty.email}</span>
                          </li>
                          <li className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedFaculty.phone}</span>
                          </li>
                          <li className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedFaculty.office}</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Office Hours</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 text-sm">
                          {selectedFaculty.officeHours.split(',').map((hours: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{hours.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex gap-2 justify-end mt-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowAppointmentForm(true);
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-1.5" />
                      Schedule Appointment
                    </Button>
                    <Button
                      onClick={() => {
                        setShowMessageForm(true);
                      }}
                    >
                      <Mail className="h-4 w-4 mr-1.5" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium mb-2">Courses Taught</h3>
                  
                  <div className="grid gap-4">
                    {selectedFaculty.courses.map((course: string, index: number) => {
                      // Extract course code and name
                      const [code, name] = course.split(':').map(s => s.trim());
                      
                      return (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{name}</CardTitle>
                                <CardDescription>{code}</CardDescription>
                              </div>
                              <Badge>{index % 2 === 0 ? "Current" : "Previous"}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{index % 2 === 0 ? "Spring 2023" : "Fall 2022"}</span>
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="h-4 w-4 mr-1" />
                                <span>{index % 3 === 0 ? "Graduate" : "Undergraduate"}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Student Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {renderStarRating(selectedFaculty.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({selectedFaculty.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {getFacultyReviews(selectedFaculty.id).length > 0 ? (
                      getFacultyReviews(selectedFaculty.id).map((review) => (
                        <Card key={review.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{review.student}</CardTitle>
                                <CardDescription>{review.course}</CardDescription>
                              </div>
                              <div className="flex items-center">
                                {renderStarRating(review.rating)}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-2">
                              {review.comment}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review.date}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Star className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No reviews yet</h3>
                        <p className="text-muted-foreground">
                          Be the first to leave a review for {selectedFaculty.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Appointment Form Dialog */}
      <Dialog open={showAppointmentForm} onOpenChange={setShowAppointmentForm}>
        {selectedFaculty && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>
                Request an appointment with {selectedFaculty.name}
              </DialogDescription>
            </DialogHeader>
            
            <AppointmentForm 
              faculty={selectedFaculty} 
              onSubmit={handleAppointmentSubmit} 
            />
          </DialogContent>
        )}
      </Dialog>
      
      {/* Message Form Dialog */}
      <Dialog open={showMessageForm} onOpenChange={setShowMessageForm}>
        {selectedFaculty && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>
                Send a message to {selectedFaculty.name}
              </DialogDescription>
            </DialogHeader>
            
            <MessageForm 
              faculty={selectedFaculty} 
              onSubmit={handleMessageSubmit} 
            />
          </DialogContent>
        )}
      </Dialog>
    </PageLayout>
  );
};

export default Faculty;

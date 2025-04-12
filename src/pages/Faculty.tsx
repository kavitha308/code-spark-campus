
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Mail, BookOpen, Clock, Users, Star, Filter, MessageCircle } from "lucide-react";

// Sample faculty data
const facultyData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Associate Professor",
    department: "Computer Science",
    expertise: ["Data Structures", "Algorithms", "Machine Learning"],
    courses: ["Data Structures & Algorithms"],
    email: "sarah.johnson@university.edu",
    rating: 4.8,
    students: 240,
    image: "",
    officeHours: "Mon, Wed 2:00-4:00 PM",
    experience: "12 years",
    education: "Ph.D. in Computer Science, Stanford University",
    bio: "Dr. Johnson specializes in algorithm design and machine learning. Her research focuses on efficient data structures for large-scale applications and optimization algorithms."
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    title: "Full Professor",
    department: "Computer Science",
    expertise: ["Web Development", "UI/UX Design", "Front-end Frameworks"],
    courses: ["Advanced Web Development"],
    email: "michael.chen@university.edu",
    rating: 4.6,
    students: 310,
    image: "",
    officeHours: "Tue, Thu 1:00-3:00 PM",
    experience: "15 years",
    education: "Ph.D. in Human-Computer Interaction, MIT",
    bio: "Prof. Chen is an expert in modern web technologies and user experience design. He has worked with major tech companies and brings practical industry insights to his teaching."
  },
  {
    id: 3,
    name: "Dr. Robert Garcia",
    title: "Assistant Professor",
    department: "Information Systems",
    expertise: ["Database Design", "SQL", "Data Warehousing"],
    courses: ["Database Management Systems"],
    email: "robert.garcia@university.edu",
    rating: 4.5,
    students: 180,
    image: "",
    officeHours: "Mon, Fri 10:00 AM-12:00 PM",
    experience: "8 years",
    education: "Ph.D. in Information Systems, UC Berkeley",
    bio: "Dr. Garcia focuses on database optimization and big data systems. His research explores efficient query processing and data storage solutions for enterprise applications."
  },
  {
    id: 4,
    name: "Dr. Emily Taylor",
    title: "Associate Professor",
    department: "Artificial Intelligence",
    expertise: ["Machine Learning", "Neural Networks", "Computer Vision"],
    courses: ["Machine Learning Fundamentals"],
    email: "emily.taylor@university.edu",
    rating: 4.9,
    students: 290,
    image: "",
    officeHours: "Wed, Thu 9:00-11:00 AM",
    experience: "10 years",
    education: "Ph.D. in Computer Science, Carnegie Mellon University",
    bio: "Dr. Taylor is a leading expert in neural networks and deep learning architectures. Her research has contributed to significant advancements in computer vision and natural language processing."
  },
  {
    id: 5,
    name: "Prof. James Wilson",
    title: "Full Professor",
    department: "Computer Science",
    expertise: ["Operating Systems", "Distributed Systems", "Cloud Computing"],
    courses: ["Operating Systems Design", "Cloud Architecture"],
    email: "james.wilson@university.edu",
    rating: 4.7,
    students: 260,
    image: "",
    officeHours: "Tue, Fri 2:00-4:00 PM",
    experience: "18 years",
    education: "Ph.D. in Computer Science, University of Washington",
    bio: "Prof. Wilson specializes in distributed systems and cloud computing architectures. He has extensive experience working with industry leaders in developing scalable infrastructure solutions."
  },
  {
    id: 6,
    name: "Dr. Sophia Patel",
    title: "Assistant Professor",
    department: "Software Engineering",
    expertise: ["Software Architecture", "Design Patterns", "Agile Methodologies"],
    courses: ["Software Engineering Principles", "Project Management"],
    email: "sophia.patel@university.edu",
    rating: 4.4,
    students: 210,
    image: "",
    officeHours: "Mon, Wed 1:00-3:00 PM",
    experience: "7 years",
    education: "Ph.D. in Software Engineering, Georgia Tech",
    bio: "Dr. Patel focuses on software design patterns and development methodologies. Her research aims to improve software quality and team productivity through better architectural practices."
  }
];

// Faculty details component
const FacultyDetails: React.FC<{ faculty: any, onBack: () => void }> = ({ faculty, onBack }) => (
  <div className="space-y-6">
    <Button variant="ghost" onClick={onBack} className="mb-2">
      ← Back to faculty list
    </Button>
    
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={faculty.image} alt={faculty.name} />
                <AvatarFallback className="text-2xl bg-campus-purple text-white">
                  {faculty.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{faculty.name}</h2>
              <p className="text-muted-foreground">{faculty.title}</p>
              <p className="text-sm text-muted-foreground">{faculty.department}</p>
              
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                <span className="font-medium">{faculty.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({faculty.students} students)</span>
              </div>
              
              <div className="mt-4 w-full">
                <Button className="w-full" onClick={() => window.location.href = `mailto:${faculty.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Office Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Schedule</p>
                <p className="text-sm text-muted-foreground">{faculty.officeHours}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Courses</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {faculty.courses.map((course: string, i: number) => (
                    <Badge key={i} variant="outline">{course}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Teaching Experience</p>
                <p className="text-sm text-muted-foreground">{faculty.experience}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>About {faculty.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Biography</h3>
              <p>{faculty.bio}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Education</h3>
              <p>{faculty.education}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-1">
                {faculty.expertise.map((area: string, i: number) => (
                  <Badge key={i} className="bg-campus-purple/10 text-campus-purple hover:bg-campus-purple/20">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Courses Taught</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faculty.courses.map((course: string, i: number) => (
                <div key={i} className="p-3 border rounded-md flex justify-between items-center hover:bg-slate-50">
                  <div>
                    <div className="font-medium">{course}</div>
                    <div className="text-sm text-muted-foreground">Current Semester</div>
                  </div>
                  <Button size="sm">View Syllabus</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Ask a question or schedule a meeting with {faculty.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Subject</label>
                <Input placeholder="Enter message subject" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Message</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border border-input resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
);

const Faculty = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  
  // Filter faculty based on search query and active tab
  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faculty.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && faculty.department.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
        <p className="text-muted-foreground mb-6">
          Connect with our expert faculty members for academic guidance and research opportunities
        </p>
        
        {selectedFaculty ? (
          <FacultyDetails 
            faculty={selectedFaculty} 
            onBack={() => setSelectedFaculty(null)} 
          />
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, department, or expertise"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Computer Science">CS</TabsTrigger>
                    <TabsTrigger value="Artificial Intelligence">AI</TabsTrigger>
                    <TabsTrigger value="Information Systems">IS</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty) => (
                <Card key={faculty.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedFaculty(faculty)}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={faculty.image} alt={faculty.name} />
                        <AvatarFallback className="text-xl bg-campus-purple text-white">
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-bold">{faculty.name}</h3>
                        <p className="text-sm text-muted-foreground">{faculty.title}</p>
                        <p className="text-xs text-muted-foreground">{faculty.department}</p>
                        
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                          <span className="text-sm font-medium">{faculty.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium">Expertise</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {faculty.expertise.slice(0, 2).map((area, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {faculty.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{faculty.expertise.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Teaches: {faculty.courses.length} {faculty.courses.length === 1 ? 'course' : 'courses'}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 text-campus-purple hover:text-campus-purple hover:bg-campus-purple/10">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredFaculty.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No faculty members found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Faculty;

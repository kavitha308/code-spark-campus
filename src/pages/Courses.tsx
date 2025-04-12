
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, FileText, Video, Users, Award } from "lucide-react";
import CourseCard from "@/components/dashboard/CourseCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// Courses data
const enrolledCourses = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Robert Chan",
    description: "Learn fundamental data structures and algorithms for efficient problem-solving",
    progress: 78,
    nextClass: "Tomorrow, 2:00 PM",
    students: 65,
    category: "Computer Science",
  },
  {
    id: "2",
    title: "Advanced Web Development",
    instructor: "Prof. Sarah Wilson",
    description: "Master modern web technologies and frameworks for building scalable applications",
    progress: 45,
    nextClass: "Wednesday, 10:00 AM",
    students: 48,
    category: "Web Development",
  },
  {
    id: "3",
    title: "Database Management Systems",
    instructor: "Dr. Michael Lee",
    description: "Design and implement efficient database solutions for complex applications",
    progress: 92,
    nextClass: "Friday, 1:00 PM",
    students: 55,
    category: "Database",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Lisa Chen",
    description: "Learn core ML algorithms and how to apply them to real-world problems",
    progress: 32,
    nextClass: "Thursday, 3:00 PM",
    students: 72,
    category: "AI/ML",
  }
];

const completedCourses = [
  {
    id: "5",
    title: "Introduction to Programming",
    instructor: "Dr. James Miller",
    description: "Fundamentals of programming using Python",
    progress: 100,
    nextClass: "N/A",
    students: 120,
    category: "Programming",
    grade: "A (95%)",
  },
  {
    id: "6",
    title: "Object-Oriented Programming",
    instructor: "Prof. Emily Johnson",
    description: "OOP principles and patterns using Java",
    progress: 100,
    nextClass: "N/A",
    students: 85,
    category: "Programming",
    grade: "A- (92%)",
  }
];

const availableCourses = [
  {
    id: "7",
    title: "Cloud Computing",
    instructor: "Dr. Alan Richards",
    description: "Learn to design, deploy, and manage cloud infrastructure",
    duration: "10 weeks",
    hoursPerWeek: "6 hrs/week",
    students: 42,
    category: "Cloud",
  },
  {
    id: "8",
    title: "Mobile App Development",
    instructor: "Prof. Tina Brooks",
    description: "Build cross-platform mobile applications",
    duration: "12 weeks",
    hoursPerWeek: "8 hrs/week",
    students: 58,
    category: "Mobile",
  },
  {
    id: "9",
    title: "Cybersecurity Fundamentals",
    instructor: "Dr. Nathan Hayes",
    description: "Protect systems and networks from digital attacks",
    duration: "14 weeks",
    hoursPerWeek: "7 hrs/week",
    students: 63,
    category: "Security",
  }
];

const CoursesPage = () => {
  const [showCertificateDialog, setShowCertificateDialog] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<any>(null);

  const handleViewCertificate = (course: any) => {
    setSelectedCourse(course);
    setShowCertificateDialog(true);
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground mt-1">
              Manage your academic courses and learning progress
            </p>
          </div>
        </div>

        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                <div key={index} className="flex flex-col h-full">
                  <CourseCard
                    title={course.title}
                    instructor={course.instructor}
                    progress={course.progress}
                    nextClass={course.nextClass}
                    students={course.students}
                    category={course.category}
                    id={course.id}
                    description={course.description}
                    isEnrolled={true}
                  />
                  <Button 
                    className="mt-2 bg-campus-purple hover:bg-campus-purple/90"
                    onClick={() => {
                      const dialog = document.querySelector(`[data-continue-learning-dialog="${course.id}"]`);
                      if (dialog) {
                        (dialog as HTMLDialogElement).showModal();
                      } else {
                        toast.success(`Continue learning ${course.title}`);
                      }
                    }}
                  >
                    Continue Learning
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
                      <Badge variant="outline">CS{201 + index}</Badge>
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Final Grade</span>
                        <span className="text-sm font-bold">{course.grade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm">Certificate Earned</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewCertificate(course)}
                    >
                      View Certificate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course, index) => (
                <Card className="card-hover" key={index}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{course.hoursPerWeek}</span>
                        </div>
                      </div>
                      <Badge variant="outline">CS{450 + index}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => {
                        const courseCard = new CourseCard({
                          title: course.title,
                          instructor: course.instructor,
                          progress: 0,
                          nextClass: "Not yet scheduled",
                          students: course.students,
                          category: course.category,
                          id: course.id,
                          description: course.description,
                          isEnrolled: false,
                        });
                        
                        // Simulate enrollment process
                        toast.success(`Showing enrollment form for ${course.title}`);
                      }}
                    >
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Certificate Dialog */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Certificate of Completion</DialogTitle>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="border-8 border-gray-200 p-8 bg-white">
              <div className="text-center space-y-6">
                <div className="border-b-2 border-t-2 border-gray-300 py-4">
                  <h1 className="text-3xl font-serif mb-2">Certificate of Completion</h1>
                  <p className="text-lg">This certifies that</p>
                  <p className="text-2xl font-semibold my-4">John Doe</p>
                  <p className="text-lg">has successfully completed the course</p>
                  <p className="text-2xl font-semibold my-4">{selectedCourse.title}</p>
                  <p className="text-lg">with a grade of {selectedCourse.grade}</p>
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <div className="text-center">
                    <div className="border-b border-gray-300 mb-2 pb-2">April 12, 2025</div>
                    <p className="text-sm">Date</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-gray-300 mb-2 pb-2 font-script text-xl">{selectedCourse.instructor}</div>
                    <p className="text-sm">Instructor Signature</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-gray-50 p-4 rounded-lg inline-block mx-auto">
                  <p className="text-sm">Certificate ID: CERT-{selectedCourse.id}-{Math.floor(Math.random() * 1000000)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => {
              toast.success("Certificate downloaded");
              setShowCertificateDialog(false);
            }}>
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default CoursesPage;

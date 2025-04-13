
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronRight, Filter, Search, Star, Video } from "lucide-react";
import { getAllCourses, enrollInCourse } from "@/services/CourseService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        
        // Separate courses into enrolled and not enrolled
        const enrolled = data.filter(course => course.is_enrolled);
        const all = data;

        setCourses(all);
        setEnrolledCourses(enrolled);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(courseId);
      toast.success("Successfully enrolled in course!");
      
      // Update the course lists
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId 
            ? { ...course, is_enrolled: true } 
            : course
        )
      );
      
      // Add course to enrolled courses
      const enrolledCourse = courses.find(course => course.id === courseId);
      if (enrolledCourse) {
        setEnrolledCourses(prev => [...prev, {...enrolledCourse, is_enrolled: true}]);
      }
      
      // Navigate to the newly enrolled course
      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in course");
    }
  };

  const filteredCourses = (activeTab === "enrolled" ? enrolledCourses : courses)
    .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleViewCourse = (courseId) => {
    // Navigate to the course detail page
    navigate(`/courses/${courseId}`);
  };

  // Function to manually handle file upload trigger
  const handleUploadClick = () => {
    // Find the hidden file input element
    const fileInput = document.getElementById('course-file-upload');
    // Programmatically trigger click if element exists
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground">
              Browse and enroll in courses to enhance your skills
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10 w-[200px] md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="enrolled">My Courses</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <input 
              type="file" 
              id="course-file-upload" 
              className="hidden" 
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
            <Button variant="outline" onClick={handleUploadClick}>
              Upload Course Materials
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onEnroll={() => handleEnroll(course.id)}
                  onView={() => handleViewCourse(course.id)}
                />
              ))}

              {filteredCourses.length === 0 && !loading && (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No courses found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchTerm 
                      ? "Try a different search term" 
                      : "Check back later for new courses"}
                  </p>
                </div>
              )}

              {loading && (
                <div className="col-span-full flex justify-center p-8">
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div 
                        key={index} 
                        className="bg-muted rounded-md h-40 w-[350px]"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="enrolled" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <EnrolledCourseCard 
                  key={course.id} 
                  course={course}
                  onView={() => handleViewCourse(course.id)}
                />
              ))}

              {filteredCourses.length === 0 && !loading && (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No enrolled courses</h3>
                  <p className="text-muted-foreground mt-1">
                    Enroll in courses to see them here
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab("all")}
                  >
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 3).map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  recommended
                  onEnroll={() => handleEnroll(course.id)}
                  onView={() => handleViewCourse(course.id)}
                />
              ))}

              {filteredCourses.length === 0 && !loading && (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No recommendations yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Enroll in more courses to get recommendations
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

const CourseCard = ({ course, recommended = false, onEnroll, onView }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div 
        className="h-48 bg-gradient-to-r from-campus-blue/80 to-campus-purple/80 relative"
        style={{
          backgroundImage: course.image_url ? `url(${course.image_url})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {recommended && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-campus-orange">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Recommended
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-4 text-white">
            <Badge variant="outline" className="bg-white/20 border-white/40 text-white mb-2">
              {course.category || "General"}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Video className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">
              {course.duration || "Self-paced"}
            </span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-campus-yellow mr-1" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.description || "No description available"}
        </p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
        <Button variant="outline" onClick={onView}>View Details</Button>
        {course.is_enrolled ? (
          <Button onClick={onView}>Continue</Button>
        ) : (
          <Button onClick={onEnroll}>Enroll</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const EnrolledCourseCard = ({ course, onView }) => {
  const progress = course.progress || 0;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div 
        className="h-48 bg-gradient-to-r from-campus-blue/80 to-campus-purple/80 relative"
        style={{
          backgroundImage: course.image_url ? `url(${course.image_url})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-4 text-white">
            <Badge variant="outline" className="bg-white/20 border-white/40 text-white mb-2">
              {course.category || "General"}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="text-sm font-medium">10</div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </div>
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="text-sm font-medium">5</div>
            <div className="text-xs text-muted-foreground">Assignments</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
        <Button variant="outline" onClick={onView}>View Materials</Button>
        <Button className="gap-1" onClick={onView}>
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Courses;

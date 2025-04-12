
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  nextClass: string;
  students: number;
  category: string;
  id?: string;
  description?: string;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  progress,
  nextClass,
  students,
  category,
  id = "1",
  description = "No description available",
  isEnrolled = true,
}) => {
  const [showContinueLearningDialog, setShowContinueLearningDialog] = React.useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = React.useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const handleContinueLearning = () => {
    setShowContinueLearningDialog(true);
  };

  const handleEnrollNow = () => {
    setShowEnrollDialog(true);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Successfully enrolled in ${title}`);
    setShowEnrollDialog(false);
  };

  const handleQuizSubmit = () => {
    toast.success("Quiz submitted successfully!");
    setShowContinueLearningDialog(false);
  };

  const handleViewCertificate = () => {
    setShowCertificateDialog(true);
  };

  return (
    <>
      <Card className="card-hover overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <Badge variant="outline" className="bg-campus-purple/10 text-campus-purple">
              {category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Instructor: {instructor}</p>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Next: {nextClass}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{students} students</span>
          </div>
        </CardFooter>
      </Card>

      {/* Continue Learning Dialog */}
      <Dialog open={showContinueLearningDialog} onOpenChange={setShowContinueLearningDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Module 3: Advanced Concepts
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="lecture" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="w-full max-w-md mx-auto mb-4">
              <TabsTrigger value="lecture">Lecture</TabsTrigger>
              <TabsTrigger value="quiz">Interactive Quiz</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lecture" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1">
                <div className="space-y-4 p-1">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <iframe 
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title={`${title} Lecture`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Lecture Notes</h3>
                    <p>
                      In this lecture, we cover advanced concepts related to {title.toLowerCase()}. 
                      The key points include implementation strategies, optimization techniques, and 
                      practical applications in real-world scenarios.
                    </p>
                    <p>
                      Make sure to complete the interactive quiz after watching the lecture to test 
                      your understanding of the material.
                    </p>
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <h4 className="font-medium mb-2">Key Takeaways</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Understanding the core principles of {title.toLowerCase()}</li>
                        <li>Implementing efficient algorithms for problem-solving</li>
                        <li>Analyzing the time and space complexity of different approaches</li>
                        <li>Applying theoretical concepts to practical examples</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="quiz" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1">
                <div className="space-y-6 p-1">
                  <h3 className="text-lg font-semibold">Module Quiz</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete this quiz to test your understanding of the lecture material.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Question 1</h4>
                      <p>What is the main advantage of using the approach discussed in the lecture?</p>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q1-a" name="q1" className="w-4 h-4" />
                          <label htmlFor="q1-a">Improved time complexity</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q1-b" name="q1" className="w-4 h-4" />
                          <label htmlFor="q1-b">Reduced space complexity</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q1-c" name="q1" className="w-4 h-4" />
                          <label htmlFor="q1-c">Simpler implementation</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q1-d" name="q1" className="w-4 h-4" />
                          <label htmlFor="q1-d">All of the above</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Question 2</h4>
                      <p>Which of the following statements about the algorithm is true?</p>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q2-a" name="q2" className="w-4 h-4" />
                          <label htmlFor="q2-a">It has O(n²) time complexity in the worst case</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q2-b" name="q2" className="w-4 h-4" />
                          <label htmlFor="q2-b">It always requires O(n) extra space</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q2-c" name="q2" className="w-4 h-4" />
                          <label htmlFor="q2-c">It's not suitable for large datasets</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q2-d" name="q2" className="w-4 h-4" />
                          <label htmlFor="q2-d">It can be implemented recursively</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Question 3</h4>
                      <p>What is the output of the following code snippet?</p>
                      <pre className="bg-gray-100 p-2 rounded-md mt-2 text-sm font-mono">
{`function process(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result / arr.length;
}

console.log(process([2, 4, 6, 8, 10]));`}
                      </pre>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q3-a" name="q3" className="w-4 h-4" />
                          <label htmlFor="q3-a">6</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q3-b" name="q3" className="w-4 h-4" />
                          <label htmlFor="q3-b">30</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q3-c" name="q3" className="w-4 h-4" />
                          <label htmlFor="q3-c">5</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="q3-d" name="q3" className="w-4 h-4" />
                          <label htmlFor="q3-d">Error</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <DialogFooter className="mt-4">
                <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Enroll Now Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enroll in {title}</DialogTitle>
            <DialogDescription>
              Complete the form below to enroll in this course.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Course Details</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Title:</strong> {title}</p>
                <p><strong>Instructor:</strong> {instructor}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Students Enrolled:</strong> {students}</p>
                <p><strong>Description:</strong> {description}</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Enroll Now</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Certificate Dialog */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Certificate of Completion</DialogTitle>
          </DialogHeader>
          
          <div className="border-8 border-gray-200 p-8 bg-white">
            <div className="text-center space-y-6">
              <div className="border-b-2 border-t-2 border-gray-300 py-4">
                <h1 className="text-3xl font-serif mb-2">Certificate of Completion</h1>
                <p className="text-lg">This certifies that</p>
                <p className="text-2xl font-semibold my-4">John Doe</p>
                <p className="text-lg">has successfully completed the course</p>
                <p className="text-2xl font-semibold my-4">{title}</p>
                <p className="text-lg">with a grade of A</p>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <div className="text-center">
                  <div className="border-b border-gray-300 mb-2 pb-2">April 12, 2025</div>
                  <p className="text-sm">Date</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-gray-300 mb-2 pb-2 font-script text-xl">John Smith</div>
                  <p className="text-sm">Instructor Signature</p>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg inline-block mx-auto">
                <p className="text-sm">Certificate ID: CERT-{id}-{Math.floor(Math.random() * 1000000)}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => toast.success("Certificate downloaded")}>
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;

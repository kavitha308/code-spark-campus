
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, FileText, Upload, Download, Award, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssignmentDetailsProps {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
  submissionType: string;
  description: string;
  pageLimit?: number;
  marks: number;
  instructor: {
    name: string;
    avatar?: string;
  };
  resources?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({
  id,
  title,
  course,
  dueDate,
  status,
  submissionType,
  description,
  pageLimit,
  marks,
  instructor,
  resources = []
}) => {
  const navigate = useNavigate();
  const isLate = new Date(dueDate) < new Date();
  const isPending = status === "Pending";

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Submitted: "bg-blue-100 text-blue-800",
    Graded: "bg-green-100 text-green-800",
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.doc,.txt';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        console.log('File selected:', file.name);
        // In a real implementation, you would upload this file to a server
        navigate('/assignments');
      }
    };
    
    input.click();
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/assignments')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assignments
      </Button>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <Badge 
                className={`mb-2 ${statusColors[status]}`}
              >
                {status} {isLate && isPending ? " - Late" : ""}
              </Badge>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <p className="text-muted-foreground mt-1">Course: {course}</p>
            </div>
            <Badge variant="outline" className="bg-campus-purple/10 text-campus-purple">
              {marks} marks
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Clock className={`h-4 w-4 ${isLate && isPending ? "text-red-500" : "text-muted-foreground"}`} />
              <span className={`text-sm ${isLate && isPending ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                {isLate && isPending ? "Overdue: " : "Due: "}
                {dueDate}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Submission Type: {submissionType}
              </span>
            </div>
            
            {pageLimit && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Page Limit: {pageLimit} pages
                </span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Assignment Description</h3>
            <div className="p-4 bg-gray-50 rounded-md text-sm">
              {description}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Instructor</h3>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={instructor.avatar} />
                <AvatarFallback className="bg-campus-purple text-white">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span>{instructor.name}</span>
            </div>
          </div>
          
          {resources.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Resources</h3>
              <div className="space-y-2">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-campus-purple" />
                      <span>{resource.name}</span>
                      <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <Separator />
        
        <CardFooter className="p-6">
          {status === "Pending" ? (
            <Button 
              className="w-full bg-campus-purple hover:bg-campus-purple/90"
              onClick={handleFileUpload}
            >
              <Upload className="mr-2 h-4 w-4" /> Submit Assignment
            </Button>
          ) : status === "Submitted" ? (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Submission under review</span>
                <span className="text-sm">Submitted on April 10, 2025</span>
              </div>
              <Progress value={30} className="h-2" />
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Submit New Version
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Grade: {marks}/100</span>
                <span className="text-sm">Graded on April 11, 2025</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">Feedback</h4>
                <p className="text-sm text-muted-foreground">
                  Excellent work! Your assignment demonstrates a thorough understanding of the concepts. The analysis is well-structured and your conclusions are supported by strong evidence.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                <Award className="mr-2 h-4 w-4" /> View Certificate
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssignmentDetails;

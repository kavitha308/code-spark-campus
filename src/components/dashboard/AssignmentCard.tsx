
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface AssignmentCardProps {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
  submissionType: string;
}

const AssignmentCard = ({ id, title, course, dueDate, status, submissionType }: AssignmentCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="card-hover overflow-hidden">
      <div className={`h-1 ${
        status === "Pending" 
          ? "bg-yellow-500" 
          : status === "Submitted" 
          ? "bg-blue-500" 
          : "bg-green-500"
      }`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex items-center justify-between">
          <Badge className="bg-campus-purple">{course}</Badge>
          <Badge 
            variant="outline" 
            className={
              status === "Pending" 
                ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
                : status === "Submitted" 
                ? "bg-blue-100 text-blue-800 border-blue-200" 
                : "bg-green-100 text-green-800 border-green-200"
            }
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Due: {dueDate}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Submission: {submissionType}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate(`/assignments/details/${id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;

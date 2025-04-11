
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";

interface AssignmentCardProps {
  title: string;
  course: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
  submissionType: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  course,
  dueDate,
  status,
  submissionType,
}) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Submitted: "bg-blue-100 text-blue-800",
    Graded: "bg-green-100 text-green-800",
  };

  const isLate = new Date(dueDate) < new Date();
  const isPending = status === "Pending";

  return (
    <Card className={`card-hover ${isLate && isPending ? "border-red-300" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FileText className="h-4 w-4 text-campus-purple" />
            {title}
          </CardTitle>
          <Badge className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Course: {course}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2 mt-1">
          <Clock className={`h-4 w-4 ${isLate && isPending ? "text-red-500" : "text-muted-foreground"}`} />
          <span className={`text-sm ${isLate && isPending ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
            {isLate && isPending ? "Overdue: " : "Due: "}
            {dueDate}
          </span>
        </div>
        <div className="mt-2">
          <Badge variant="outline" className="bg-gray-100">
            {submissionType}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          size="sm" 
          variant={status === "Pending" ? "default" : "outline"}
        >
          {status === "Pending" ? "Submit Assignment" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;

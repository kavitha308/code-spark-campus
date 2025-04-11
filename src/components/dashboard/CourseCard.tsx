
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  nextClass: string;
  students: number;
  category: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  progress,
  nextClass,
  students,
  category,
}) => {
  return (
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
  );
};

export default CourseCard;

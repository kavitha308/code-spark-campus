
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

interface UpcomingClassCardProps {
  title: string;
  courseCode: string;
  instructor: string;
  date: string;
  time: string;
  mode: "Online" | "Offline";
  duration: string;
}

const UpcomingClassCard: React.FC<UpcomingClassCardProps> = ({
  title,
  courseCode,
  instructor,
  date,
  time,
  mode,
  duration,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Badge 
            variant={mode === "Online" ? "default" : "outline"}
            className={mode === "Online" ? "bg-campus-purple" : ""}
          >
            {mode}
          </Badge>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            {courseCode} · {instructor}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Duration: {duration}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        {mode === "Online" ? (
          <Button className="w-full" size="sm">
            <Video className="mr-2 h-4 w-4" /> Join Class
          </Button>
        ) : (
          <Button variant="outline" className="w-full" size="sm">
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UpcomingClassCard;

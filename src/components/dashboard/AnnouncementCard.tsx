
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AnnouncementCardProps {
  title: string;
  content: string;
  sender: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  category: "Important" | "Information" | "Reminder";
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
  sender,
  date,
  category,
}) => {
  const categoryColors = {
    Important: "bg-red-100 text-red-800",
    Information: "bg-blue-100 text-blue-800",
    Reminder: "bg-yellow-100 text-yellow-800",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Badge className={categoryColors[category]}>
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={sender.avatar} />
            <AvatarFallback className="text-xs bg-campus-purple text-white">
              {getInitials(sender.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <p className="font-medium">{sender.name}</p>
            <p className="text-muted-foreground">{sender.role}</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">{date}</div>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;

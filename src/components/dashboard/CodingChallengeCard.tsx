
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Star } from "lucide-react";

interface CodingChallengeCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  completedBy: number;
  category: string;
}

const CodingChallengeCard: React.FC<CodingChallengeCardProps> = ({
  title,
  difficulty,
  language,
  completedBy,
  category,
}) => {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Code className="h-4 w-4 text-campus-purple" />
            {title}
          </CardTitle>
          <Badge className={difficultyColor[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{language}</Badge>
          <Badge variant="outline">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-3 w-3 text-yellow-500" />
          <span>Completed by {completedBy} students</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" size="sm">
          Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodingChallengeCard;

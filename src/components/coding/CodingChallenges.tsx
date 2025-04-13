
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Users, ArrowRight, Star } from "lucide-react";

interface CodingChallengesProps {
  challenges: any[];
  isLoading: boolean;
}

const CodingChallenges = ({ challenges, isLoading }: CodingChallengesProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i} className="card-hover">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-6 w-48 mt-2 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full mt-2 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3">
              <div className="h-9 w-full bg-gray-200 rounded animate-pulse"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="col-span-full text-center py-12 border rounded-lg bg-muted/30">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Code className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No coding challenges available</h3>
        <p className="text-muted-foreground mt-1">
          Check back later for new challenges
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge className={
                challenge.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                challenge.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-campus-purple/10">{challenge.category}</Badge>
            </div>
            <CardTitle className="mt-2">{challenge.title}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>0 solved</span>
                <Star className="h-4 w-4 text-yellow-500 ml-2" />
                <span>New</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button className="w-full" onClick={() => navigate(`/coding?challenge=${challenge.id}`)}>
              Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CodingChallenges;

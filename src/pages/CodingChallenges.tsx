import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Code,
  Star,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle,
  Award,
  Users,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CodingChallengesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popularity");

  const challenges = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      solved: 892,
      rating: 4.8,
    },
    {
      id: "2",
      title: "Reverse Linked List",
      difficulty: "Medium",
      category: "Linked Lists",
      solved: 654,
      rating: 4.6,
    },
    {
      id: "3",
      title: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      category: "Trees",
      solved: 729,
      rating: 4.7,
    },
    {
      id: "4",
      title: "Implement Trie (Prefix Tree)",
      difficulty: "Medium",
      category: "Design",
      solved: 512,
      rating: 4.5,
    },
    {
      id: "5",
      title: "Merge Intervals",
      difficulty: "Medium",
      category: "Arrays",
      solved: 481,
      rating: 4.4,
    },
    {
      id: "6",
      title: "Word Ladder",
      difficulty: "Hard",
      category: "Graph Theory",
      solved: 375,
      rating: 4.9,
    },
  ];

  const filteredChallenges =
    filter === "all" ? challenges : challenges.filter((c) => c.category === filter);

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    if (sort === "popularity") {
      return b.solved - a.solved;
    } else if (sort === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Coding Challenges</h1>
            <p className="text-muted-foreground mt-1">
              Sharpen your coding skills with a variety of challenges
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              className="border rounded px-4 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Arrays">Arrays</option>
              <option value="Linked Lists">Linked Lists</option>
              <option value="Trees">Trees</option>
              <option value="Design">Design</option>
              <option value="Graph Theory">Graph Theory</option>
            </select>
            <select
              className="border rounded px-4 py-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedChallenges.map((challenge) => (
            <Card key={challenge.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge
                    className={
                      challenge.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : challenge.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-campus-purple/10">
                    {challenge.category}
                  </Badge>
                </div>
                <CardTitle className="mt-2">{challenge.title}</CardTitle>
                <CardDescription>Solve this {challenge.difficulty} challenge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{challenge.solved} solved</span>
                    <Star className="h-4 w-4 text-yellow-500 ml-2" />
                    <span>{challenge.rating}/5 rating</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Strings</Badge>
                    <Badge variant="outline">Stacks</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button className="w-full" onClick={() => navigate('/coding')}>
                  Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CodingChallengesPage;

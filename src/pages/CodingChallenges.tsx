
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search,
  Filter,
  Tag,
  Code,
  Clock,
  Award,
  Users,
  CheckCircle,
  Zap,
  ArrowUp,
  BookOpen,
  Star,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const CodingChallenges = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  
  // Sample challenges data
  const challenges = [
    {
      id: 1,
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "easy",
      category: "arrays",
      completedBy: 325,
      timeEstimate: "15 mins",
      points: 50,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["Array", "Hash Table"],
      sampleInput: "nums = [2,7,11,15], target = 9",
      sampleOutput: "[0,1]",
      hint: "Try using a dictionary to store the values you've seen so far.",
      testCases: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        { input: "nums = [3,3], target = 6", output: "[0,1]" },
      ],
    },
    {
      id: 2,
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
      difficulty: "easy",
      category: "strings",
      completedBy: 287,
      timeEstimate: "20 mins",
      points: 60,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["String", "Stack"],
      sampleInput: "s = '()'",
      sampleOutput: "true",
      hint: "Consider using a stack data structure to track open brackets.",
      testCases: [
        { input: "s = '()'", output: "true" },
        { input: "s = '()[]{}'", output: "true" },
        { input: "s = '(]'", output: "false" },
      ],
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
      difficulty: "easy",
      category: "linked-lists",
      completedBy: 245,
      timeEstimate: "25 mins",
      points: 70,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["Linked List", "Recursion"],
      sampleInput: "list1 = [1,2,4], list2 = [1,3,4]",
      sampleOutput: "[1,1,2,3,4,4]",
      hint: "Use a recursive approach or create a dummy head to simplify the code.",
      testCases: [
        { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
        { input: "list1 = [], list2 = []", output: "[]" },
        { input: "list1 = [], list2 = [0]", output: "[0]" },
      ],
    },
    {
      id: 4,
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      difficulty: "medium",
      category: "strings",
      completedBy: 190,
      timeEstimate: "30 mins",
      points: 100,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["String", "Sliding Window", "Hash Table"],
      sampleInput: "s = 'abcabcbb'",
      sampleOutput: "3",
      hint: "Try using a sliding window approach with a hash set to keep track of characters in the current window.",
      testCases: [
        { input: "s = 'abcabcbb'", output: "3" },
        { input: "s = 'bbbbb'", output: "1" },
        { input: "s = 'pwwkew'", output: "3" },
      ],
    },
    {
      id: 5,
      title: "3Sum",
      description: "Given an array nums of n integers, find all unique triplets in the array which gives the sum of zero.",
      difficulty: "medium",
      category: "arrays",
      completedBy: 165,
      timeEstimate: "45 mins",
      points: 120,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["Array", "Two Pointers", "Sorting"],
      sampleInput: "nums = [-1,0,1,2,-1,-4]",
      sampleOutput: "[[-1,-1,2],[-1,0,1]]",
      hint: "Try sorting the array first, then use a combination of iteration and two-pointers technique.",
      testCases: [
        { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
        { input: "nums = []", output: "[]" },
        { input: "nums = [0]", output: "[]" },
      ],
    },
    {
      id: 6,
      title: "Minimum Path Sum",
      description: "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.",
      difficulty: "medium",
      category: "dynamic-programming",
      completedBy: 145,
      timeEstimate: "40 mins",
      points: 110,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["Array", "Dynamic Programming"],
      sampleInput: "grid = [[1,3,1],[1,5,1],[4,2,1]]",
      sampleOutput: "7",
      hint: "Try using dynamic programming to build up the solution from the starting position.",
      testCases: [
        { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7" },
        { input: "grid = [[1,2,3],[4,5,6]]", output: "12" },
      ],
    },
    {
      id: 7,
      title: "Merge k Sorted Lists",
      description: "Merge k sorted linked lists and return it as one sorted list.",
      difficulty: "hard",
      category: "linked-lists",
      completedBy: 95,
      timeEstimate: "60 mins",
      points: 180,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["Linked List", "Divide and Conquer", "Heap"],
      sampleInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
      sampleOutput: "[1,1,2,3,4,4,5,6]",
      hint: "Consider using a min-heap to efficiently find the next smallest element.",
      testCases: [
        { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
        { input: "lists = []", output: "[]" },
        { input: "lists = [[]]", output: "[]" },
      ],
    },
    {
      id: 8,
      title: "Word Break",
      description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
      difficulty: "hard",
      category: "dynamic-programming",
      completedBy: 85,
      timeEstimate: "55 mins",
      points: 170,
      languages: ["Python", "Java", "JavaScript", "C++"],
      tags: ["String", "Dynamic Programming", "Trie"],
      sampleInput: "s = 'leetcode', wordDict = ['leet', 'code']",
      sampleOutput: "true",
      hint: "Try using dynamic programming with a boolean array where dp[i] indicates whether the first i characters can be segmented.",
      testCases: [
        { input: "s = 'leetcode', wordDict = ['leet', 'code']", output: "true" },
        { input: "s = 'applepenapple', wordDict = ['apple', 'pen']", output: "true" },
        { input: "s = 'catsandog', wordDict = ['cats', 'dog', 'sand', 'and', 'cat']", output: "false" },
      ],
    },
  ];

  // Filter challenges based on search query, difficulty, and category
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = searchQuery === "" || 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleStartChallenge = (challenge) => {
    navigate("/coding", { state: { challenge } });
    toast({
      title: "Challenge Started",
      description: `You've started the "${challenge.title}" challenge. Good luck!`,
    });
  };

  const handleViewChallenge = (challenge) => {
    setSelectedChallenge(challenge);
  };

  // Get difficulty counts
  const difficultyCounts = {
    easy: challenges.filter(c => c.difficulty === "easy").length,
    medium: challenges.filter(c => c.difficulty === "medium").length,
    hard: challenges.filter(c => c.difficulty === "hard").length,
  };

  // Calculate user progress
  const userCompletedChallenges = 3; // Simulated data
  const totalChallenges = challenges.length;
  const userProgress = Math.round((userCompletedChallenges / totalChallenges) * 100);

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Coding Challenges
        </h1>

        {!selectedChallenge ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Challenge Library</CardTitle>
                      <CardDescription>
                        Find and solve coding problems of various difficulty levels
                      </CardDescription>
                    </div>
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search challenges..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant={selectedDifficulty === "all" ? "default" : "outline"}
                      className={selectedDifficulty === "all" ? "gradient-purple" : ""}
                      size="sm"
                      onClick={() => setSelectedDifficulty("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedDifficulty === "easy" ? "default" : "outline"}
                      className={selectedDifficulty === "easy" ? "bg-campus-green text-white" : "text-campus-green border-campus-green"}
                      size="sm"
                      onClick={() => setSelectedDifficulty("easy")}
                    >
                      Easy ({difficultyCounts.easy})
                    </Button>
                    <Button
                      variant={selectedDifficulty === "medium" ? "default" : "outline"}
                      className={selectedDifficulty === "medium" ? "bg-campus-orange text-white" : "text-campus-orange border-campus-orange"}
                      size="sm"
                      onClick={() => setSelectedDifficulty("medium")}
                    >
                      Medium ({difficultyCounts.medium})
                    </Button>
                    <Button
                      variant={selectedDifficulty === "hard" ? "default" : "outline"}
                      className={selectedDifficulty === "hard" ? "bg-campus-red text-white" : "text-campus-red border-campus-red"}
                      size="sm"
                      onClick={() => setSelectedDifficulty("hard")}
                    >
                      Hard ({difficultyCounts.hard})
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      className={selectedCategory === "all" ? "gradient-blue" : ""}
                      size="sm"
                      onClick={() => setSelectedCategory("all")}
                    >
                      <Filter className="h-4 w-4 mr-1" /> All Categories
                    </Button>
                    <Button
                      variant={selectedCategory === "arrays" ? "default" : "outline"}
                      className={selectedCategory === "arrays" ? "gradient-blue" : ""}
                      size="sm"
                      onClick={() => setSelectedCategory("arrays")}
                    >
                      Arrays
                    </Button>
                    <Button
                      variant={selectedCategory === "strings" ? "default" : "outline"}
                      className={selectedCategory === "strings" ? "gradient-blue" : ""}
                      size="sm"
                      onClick={() => setSelectedCategory("strings")}
                    >
                      Strings
                    </Button>
                    <Button
                      variant={selectedCategory === "linked-lists" ? "default" : "outline"}
                      className={selectedCategory === "linked-lists" ? "gradient-blue" : ""}
                      size="sm"
                      onClick={() => setSelectedCategory("linked-lists")}
                    >
                      Linked Lists
                    </Button>
                    <Button
                      variant={selectedCategory === "dynamic-programming" ? "default" : "outline"}
                      className={selectedCategory === "dynamic-programming" ? "gradient-blue" : ""}
                      size="sm"
                      onClick={() => setSelectedCategory("dynamic-programming")}
                    >
                      Dynamic Programming
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {filteredChallenges.length > 0 ? (
                      filteredChallenges.map((challenge) => (
                        <div
                          key={challenge.id}
                          className="p-4 rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:border-purple-100 cursor-pointer"
                          onClick={() => handleViewChallenge(challenge)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge
                                  className={
                                    challenge.difficulty === "easy" ? "bg-green-100 text-campus-green border-campus-green" :
                                    challenge.difficulty === "medium" ? "bg-orange-100 text-campus-orange border-campus-orange" :
                                    "bg-red-100 text-campus-red border-campus-red"
                                  }
                                >
                                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                                </Badge>
                                {challenge.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="bg-blue-50 text-campus-blue">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <h3 className="font-medium">{challenge.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {challenge.description}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mr-4">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{challenge.timeEstimate}</span>
                                </div>
                                <div className="flex items-center">
                                  <Zap className="h-3 w-3 mr-1" />
                                  <span>{challenge.points} pts</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{challenge.completedBy}</span>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                className={
                                  challenge.difficulty === "easy" ? "bg-campus-green hover:bg-campus-green/90" :
                                  challenge.difficulty === "medium" ? "bg-campus-orange hover:bg-campus-orange/90" :
                                  "bg-campus-red hover:bg-campus-red/90"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartChallenge(challenge);
                                }}
                              >
                                <Code className="h-4 w-4 mr-1" /> Solve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 rounded-lg bg-white text-center">
                        <Code className="h-12 w-12 mx-auto text-muted-foreground mb-2 opacity-50" />
                        <h3 className="text-lg font-medium">No challenges found</h3>
                        <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-campus-blue" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full bg-blue-100"></div>
                      <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-campus-blue">{userCompletedChallenges}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                      </div>
                      <svg
                        className="absolute inset-0 w-full h-full rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          className="text-blue-100"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-campus-blue"
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${userProgress * 2.64}, 264`}
                        />
                      </svg>
                    </div>
                    <p className="font-medium">Progress: {userProgress}%</p>
                    <p className="text-sm text-muted-foreground">
                      {userCompletedChallenges} of {totalChallenges} challenges completed
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-campus-green"></div>
                        <span>Easy</span>
                      </div>
                      <span className="text-sm">2/3</span>
                    </div>
                    <Progress value={66} className="h-2 bg-green-100" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-campus-orange"></div>
                        <span>Medium</span>
                      </div>
                      <span className="text-sm">1/3</span>
                    </div>
                    <Progress value={33} className="h-2 bg-orange-100" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-campus-red"></div>
                        <span>Hard</span>
                      </div>
                      <span className="text-sm">0/2</span>
                    </div>
                    <Progress value={0} className="h-2 bg-red-100" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gradient-blue animate-hover">View All Progress</Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-white to-green-50 shadow-md animate-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-campus-green" />
                    Recommended Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {challenges.slice(3, 6).map((challenge) => (
                    <div
                      key={`rec-${challenge.id}`}
                      className="p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
                      onClick={() => handleViewChallenge(challenge)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge
                            className={
                              challenge.difficulty === "easy" ? "bg-green-100 text-campus-green border-campus-green" :
                              challenge.difficulty === "medium" ? "bg-orange-100 text-campus-orange border-campus-orange" :
                              "bg-red-100 text-campus-red border-campus-red"
                            }
                          >
                            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                          </Badge>
                          <h3 className="font-medium mt-2">{challenge.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{challenge.timeEstimate}</span>
                            <Zap className="h-3 w-3 ml-1" />
                            <span>{challenge.points} pts</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartChallenge(challenge);
                          }}
                        >
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">See More</Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md animate-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-campus-purple" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-yellow">1</Badge>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-blue text-white">AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Alice Smith</p>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>1,240 points</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">42</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 text-white">2</Badge>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-purple text-white">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>1,180 points</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700">38</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-500 text-white">3</Badge>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-orange text-white">ET</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Taylor</p>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>1,050 points</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700">35</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/leaderboard")}
                  >
                    See Full Leaderboard
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <>
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => setSelectedChallenge(null)}
            >
              <ArrowUp className="h-4 w-4 rotate-90 mr-2" /> Back to Challenges
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <Badge
                          className={
                            selectedChallenge.difficulty === "easy" ? "bg-green-100 text-campus-green border-campus-green mb-2" :
                            selectedChallenge.difficulty === "medium" ? "bg-orange-100 text-campus-orange border-campus-orange mb-2" :
                            "bg-red-100 text-campus-red border-campus-red mb-2"
                          }
                        >
                          {selectedChallenge.difficulty.charAt(0).toUpperCase() + selectedChallenge.difficulty.slice(1)}
                        </Badge>
                        <CardTitle className="text-xl">{selectedChallenge.title}</CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Zap className="h-4 w-4 mr-1" />
                          <span>{selectedChallenge.points} points</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{selectedChallenge.completedBy} solved</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Problem Description</h3>
                      <p className="whitespace-pre-wrap">{selectedChallenge.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedChallenge.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-campus-blue">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <h3 className="font-medium mb-2">Sample Input</h3>
                        <pre className="text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                          {selectedChallenge.sampleInput}
                        </pre>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50">
                        <h3 className="font-medium mb-2">Sample Output</h3>
                        <pre className="text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                          {selectedChallenge.sampleOutput}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-campus-blue">
                      <h3 className="font-medium mb-2">Hint</h3>
                      <p>{selectedChallenge.hint}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Test Cases</h3>
                      <div className="space-y-3">
                        {selectedChallenge.testCases.map((testCase, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Input</h4>
                                <pre className="text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                                  {testCase.input}
                                </pre>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Expected Output</h4>
                                <pre className="text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                                  {testCase.output}
                                </pre>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full gradient-purple animate-hover"
                      onClick={() => handleStartChallenge(selectedChallenge)}
                    >
                      <Code className="h-4 w-4 mr-2" /> Start Coding
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md animate-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-campus-purple" />
                      Challenge Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                      <span>Difficulty</span>
                      <Badge
                        className={
                          selectedChallenge.difficulty === "easy" ? "bg-green-100 text-campus-green border-campus-green" :
                          selectedChallenge.difficulty === "medium" ? "bg-orange-100 text-campus-orange border-campus-orange" :
                          "bg-red-100 text-campus-red border-campus-red"
                        }
                      >
                        {selectedChallenge.difficulty.charAt(0).toUpperCase() + selectedChallenge.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                      <span>Estimated Time</span>
                      <Badge variant="outline" className="bg-blue-50 text-campus-blue">
                        {selectedChallenge.timeEstimate}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                      <span>Points</span>
                      <Badge variant="outline" className="bg-purple-50 text-campus-purple">
                        {selectedChallenge.points}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                      <span>Solved By</span>
                      <Badge variant="outline" className="bg-green-50 text-campus-green">
                        {selectedChallenge.completedBy} students
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-white to-green-50 shadow-md animate-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5 text-campus-green" />
                      Supported Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedChallenge.languages.map((language, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg bg-white shadow-sm">
                        <div className={`w-3 h-3 rounded-full ${
                          language === "Python" ? "bg-blue-500" :
                          language === "Java" ? "bg-orange-500" :
                          language === "JavaScript" ? "bg-yellow-500" :
                          "bg-purple-500"
                        } mr-2`}></div>
                        <span>{language}</span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full gradient-green animate-hover"
                      onClick={() => handleStartChallenge(selectedChallenge)}
                    >
                      <Code className="h-4 w-4 mr-2" /> Start Coding
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md animate-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-campus-blue" />
                      Related Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {challenges
                      .filter(c => c.id !== selectedChallenge.id && c.tags.some(tag => selectedChallenge.tags.includes(tag)))
                      .slice(0, 3)
                      .map((challenge) => (
                        <div
                          key={`related-${challenge.id}`}
                          className="p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
                          onClick={() => handleViewChallenge(challenge)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge
                                className={
                                  challenge.difficulty === "easy" ? "bg-green-100 text-campus-green border-campus-green" :
                                  challenge.difficulty === "medium" ? "bg-orange-100 text-campus-orange border-campus-orange" :
                                  "bg-red-100 text-campus-red border-campus-red"
                                }
                              >
                                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                              </Badge>
                              <h3 className="font-medium mt-2">{challenge.title}</h3>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartChallenge(challenge);
                              }}
                            >
                              <Code className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default CodingChallenges;

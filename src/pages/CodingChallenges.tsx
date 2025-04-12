
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Code, ChevronRight, Zap, Trophy, CheckCircle, Info, Clock, PlusCircle, BookOpen, Filter, BarChart } from "lucide-react";
import CodeEditor from "@/components/coding/CodeEditor";

// Sample coding challenges data
const codingChallenges = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    tags: ["Arrays", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    hints: [
      "A brute force approach would be to consider each pair of elements.",
      "Could we use a hash table to make this more efficient?",
      "For each element, check if the complement (target - current) exists in the hash table."
    ],
    solution: "function twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}",
    completedBy: 412,
    popularity: 95,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    languages: ["JavaScript", "Python", "Java", "C++"],
    company: "Google"
  },
  {
    id: 2,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    constraints: "The array size will be between 1 and 10^5. Array elements will be between -10^4 and 10^4.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" }
    ],
    hints: [
      "Consider using Kadane's algorithm.",
      "Keep track of the current sum and the maximum sum found so far.",
      "If the current sum becomes negative, reset it to zero."
    ],
    solution: "function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  \n  return maxSum;\n}",
    completedBy: 328,
    popularity: 88,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    languages: ["JavaScript", "Python", "Java", "C++"],
    company: "Amazon"
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    tags: ["String", "Stack"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    constraints: "An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
    examples: [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" },
      { input: "s = \"([)]\"", output: "false" },
      { input: "s = \"{[]}\"", output: "true" }
    ],
    hints: [
      "Use a stack data structure.",
      "Push opening brackets onto the stack and pop when you encounter a closing bracket.",
      "Check if the popped bracket matches the current closing bracket."
    ],
    solution: "function isValid(s) {\n  const stack = [];\n  const map = {\n    '(': ')',\n    '[': ']',\n    '{': '}'\n  };\n  \n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {\n      stack.push(s[i]);\n    } else {\n      const last = stack.pop();\n      if (map[last] !== s[i]) {\n        return false;\n      }\n    }\n  }\n  \n  return stack.length === 0;\n}",
    completedBy: 387,
    popularity: 92,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    languages: ["JavaScript", "Python", "Java", "C++"],
    company: "Facebook"
  },
  {
    id: 4,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked Lists",
    tags: ["Linked List", "Recursion"],
    description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
    constraints: "The number of nodes in both lists is in the range [0, 50]. -100 <= Node.val <= 100. Both l1 and l2 are sorted in non-decreasing order.",
    examples: [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "l1 = [], l2 = []", output: "[]" },
      { input: "l1 = [], l2 = [0]", output: "[0]" }
    ],
    hints: [
      "Create a dummy head node to simplify the code.",
      "Maintain a pointer to the current position in the merged list.",
      "Compare the current nodes of both lists and attach the smaller one to the merged list."
    ],
    solution: "function mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(-1);\n  let current = dummy;\n  \n  while (l1 !== null && l2 !== null) {\n    if (l1.val <= l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n  \n  current.next = l1 !== null ? l1 : l2;\n  \n  return dummy.next;\n}",
    completedBy: 356,
    popularity: 85,
    timeComplexity: "O(n+m)",
    spaceComplexity: "O(1)",
    languages: ["JavaScript", "Python", "Java", "C++"],
    company: "Microsoft"
  },
  {
    id: 5,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    tags: ["Linked List", "Recursion"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: "The number of nodes in the list is the range [0, 5000]. -5000 <= Node.val <= 5000",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" }
    ],
    hints: [
      "Use three pointers: previous, current, and next.",
      "Iterate through the list, changing the next pointer of each node.",
      "Return the new head (previous) after the iteration."
    ],
    solution: "function reverseList(head) {\n  let prev = null;\n  let current = head;\n  \n  while (current !== null) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  \n  return prev;\n}",
    completedBy: 402,
    popularity: 90,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    languages: ["JavaScript", "Python", "Java", "C++"],
    company: "Apple"
  },
  {
    id: 6,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Searching",
    tags: ["Array", "Binary Search"],
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    constraints: "1 <= nums.length <= 10^4, -10^4 <= nums[i], target <= 10^4, All elements in nums are unique. nums is sorted in ascending order.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1" }
    ],
    hints: [
      "Use the binary search algorithm.",
      "Maintain left and right pointers to track the search range.",
      "Compare the middle element with the target at each step."
    ],
    solution: "function search(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (nums[mid] === target) {\n      return mid;\n    } else if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}",
    completedBy: 378,
    popularity: 87,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    languages: ["JavaScript", "Python", "Java", "C++"],
    company: "Google"
  }
];

const ChallengeDetail: React.FC<{ challenge: any, onBack: () => void }> = ({ challenge, onBack }) => {
  const [tab, setTab] = useState("description");

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        ← Back to challenges
      </Button>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${
                      challenge.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                      challenge.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">{challenge.category}</Badge>
                  </div>
                  <CardTitle>{challenge.title}</CardTitle>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-1" /> Solution
                  </Button>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-1" /> Hint
                  </Button>
                  <Button size="sm">
                    <Zap className="h-4 w-4 mr-1" /> Submit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 border-t">
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="solution"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
                  >
                    Solution
                  </TabsTrigger>
                  <TabsTrigger 
                    value="submissions"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
                  >
                    Submissions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="discussions"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
                  >
                    Discussions
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="p-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Problem Statement</h3>
                      <p>{challenge.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Constraints</h3>
                      <p>{challenge.constraints}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Examples</h3>
                      <div className="space-y-4">
                        {challenge.examples.map((example: any, index: number) => (
                          <div key={index} className="p-3 bg-muted rounded-md">
                            <div className="mb-1">
                              <span className="font-medium">Input:</span> {example.input}
                            </div>
                            <div className="mb-1">
                              <span className="font-medium">Output:</span> {example.output}
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="font-medium">Explanation:</span> {example.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Hints</h3>
                      <div className="space-y-2">
                        {challenge.hints.map((hint: string, index: number) => (
                          <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                              <span>{hint}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Companies</h3>
                      <Badge className="bg-blue-100 text-blue-800">{challenge.company}</Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="solution" className="p-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Approach</h3>
                      <p>This solution uses a {challenge.category.toLowerCase()} approach to solve the problem efficiently.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Complexity Analysis</h3>
                      <div className="flex gap-4">
                        <div className="p-2 bg-purple-50 rounded-md flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span>Time: {challenge.timeComplexity}</span>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-md flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-blue-600" />
                          <span>Space: {challenge.spaceComplexity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Solution Code</h3>
                      <div className="p-4 bg-slate-900 text-white rounded-md font-mono text-sm overflow-x-auto">
                        <pre className="whitespace-pre">{challenge.solution}</pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="submissions" className="p-6 mt-0">
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No submissions yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Submit your solution to see your results here
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussions" className="p-6 mt-0">
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No discussions yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to start a discussion about this problem
                    </p>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-1" /> New Discussion
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <CardDescription>
                Write your solution and submit
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-t">
                <Select defaultValue="javascript">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border-t">
                <textarea 
                  className="w-full h-[300px] p-4 font-mono text-sm bg-slate-50 resize-none focus:outline-none"
                  defaultValue={`function ${challenge.title.toLowerCase().replace(/\s+/g, '')}(${challenge.title.includes('Array') ? 'nums' : challenge.tags.includes('String') ? 's' : 'head'}) {
  // Write your code here
  
}`}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t justify-between">
              <Button variant="outline">
                <Zap className="h-4 w-4 mr-1" /> Run Tests
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-1" /> Submit
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Challenge Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed by</span>
                  <span className="font-medium">{challenge.completedBy} students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Popularity</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-campus-purple rounded-full" 
                        style={{ width: `${challenge.popularity}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{challenge.popularity}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Similar Challenges</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {codingChallenges
                  .filter(c => c.id !== challenge.id && c.category === challenge.category)
                  .slice(0, 3)
                  .map(c => (
                    <div key={c.id} className="p-2 border rounded-md flex justify-between items-center hover:bg-slate-50">
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="flex items-center gap-1">
                          <Badge className={`text-xs ${
                            c.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                            c.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {c.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CodingChallenges = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [filters, setFilters] = useState({
    difficulty: {
      easy: true,
      medium: true,
      hard: true
    },
    category: "all"
  });
  
  // Filter challenges based on search, tab, and filters
  const filteredChallenges = codingChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = (
      (challenge.difficulty === "Easy" && filters.difficulty.easy) ||
      (challenge.difficulty === "Medium" && filters.difficulty.medium) ||
      (challenge.difficulty === "Hard" && filters.difficulty.hard)
    );
    
    const matchesCategory = filters.category === "all" || challenge.category === filters.category;
    
    if (activeTab === "all") return matchesSearch && matchesDifficulty && matchesCategory;
    if (activeTab === "array") return matchesSearch && matchesDifficulty && matchesCategory && challenge.tags.includes("Array");
    if (activeTab === "string") return matchesSearch && matchesDifficulty && matchesCategory && challenge.tags.includes("String");
    if (activeTab === "linkedlist") return matchesSearch && matchesDifficulty && matchesCategory && challenge.tags.includes("Linked List");
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
        <p className="text-muted-foreground mb-6">
          Practice coding problems and improve your algorithmic thinking skills
        </p>
        
        {selectedChallenge ? (
          <ChallengeDetail
            challenge={selectedChallenge}
            onBack={() => setSelectedChallenge(null)}
          />
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search challenges by title, description, or tags"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="array">Arrays</TabsTrigger>
                  <TabsTrigger value="string">Strings</TabsTrigger>
                  <TabsTrigger value="linkedlist">Linked Lists</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Difficulty</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="easy" 
                            checked={filters.difficulty.easy}
                            onCheckedChange={(checked) => setFilters(prev => ({
                              ...prev,
                              difficulty: { ...prev.difficulty, easy: !!checked }
                            }))}
                          />
                          <label htmlFor="easy" className="text-sm flex items-center gap-1">
                            <Badge className="bg-green-100 text-green-800">Easy</Badge>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="medium" 
                            checked={filters.difficulty.medium}
                            onCheckedChange={(checked) => setFilters(prev => ({
                              ...prev,
                              difficulty: { ...prev.difficulty, medium: !!checked }
                            }))}
                          />
                          <label htmlFor="medium" className="text-sm flex items-center gap-1">
                            <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="hard" 
                            checked={filters.difficulty.hard}
                            onCheckedChange={(checked) => setFilters(prev => ({
                              ...prev,
                              difficulty: { ...prev.difficulty, hard: !!checked }
                            }))}
                          />
                          <label htmlFor="hard" className="text-sm flex items-center gap-1">
                            <Badge className="bg-red-100 text-red-800">Hard</Badge>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Category</h3>
                      <Select 
                        value={filters.category}
                        onValueChange={(value) => setFilters(prev => ({
                          ...prev,
                          category: value
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Arrays">Arrays</SelectItem>
                          <SelectItem value="Stacks">Stacks</SelectItem>
                          <SelectItem value="Linked Lists">Linked Lists</SelectItem>
                          <SelectItem value="Dynamic Programming">Dynamic Programming</SelectItem>
                          <SelectItem value="Searching">Searching</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Companies</h3>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Google</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Amazon</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Facebook</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Microsoft</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Apple</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Netflix</Badge>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setFilters({
                        difficulty: { easy: true, medium: true, hard: true },
                        category: "all"
                      })}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-1">Problems Solved</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">3</div>
                        <span className="text-sm text-muted-foreground">/ {codingChallenges.length}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="flex items-center gap-1">
                            <Badge className="bg-green-100 text-green-800">Easy</Badge>
                          </span>
                          <span>2/3</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: "66.7%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="flex items-center gap-1">
                            <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                          </span>
                          <span>1/2</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="flex items-center gap-1">
                            <Badge className="bg-red-100 text-red-800">Hard</Badge>
                          </span>
                          <span>0/1</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full">
                          <div className="h-2 bg-red-500 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:w-3/4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Challenges ({filteredChallenges.length})</CardTitle>
                      <Select defaultValue="popularity">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="difficulty_asc">Difficulty (Easy to Hard)</SelectItem>
                          <SelectItem value="difficulty_desc">Difficulty (Hard to Easy)</SelectItem>
                          <SelectItem value="completions">Most Completions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredChallenges.length > 0 ? (
                        filteredChallenges.map((challenge) => (
                          <div 
                            key={challenge.id} 
                            className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer"
                            onClick={() => setSelectedChallenge(challenge)}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge className={`${
                                    challenge.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                                    challenge.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                    "bg-red-100 text-red-800"
                                  }`}>
                                    {challenge.difficulty}
                                  </Badge>
                                  <Badge variant="outline">{challenge.category}</Badge>
                                </div>
                                <h3 className="font-medium text-lg">{challenge.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {challenge.description}
                                </p>
                              </div>
                              
                              <div className="shrink-0 flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1 text-sm">
                                  <CheckCircle className="h-4 w-4 text-campus-green" />
                                  <span>{challenge.completedBy} completions</span>
                                </div>
                                <Button size="sm">
                                  <Code className="h-4 w-4 mr-1" /> Solve Challenge
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-3">
                              {challenge.tags.map((tag: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              <Badge variant="outline" className="text-xs bg-blue-50">
                                {challenge.company}
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-16 text-center">
                          <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-medium">No challenges found</h3>
                          <p className="text-muted-foreground mb-4">
                            Try adjusting your filters or search query
                          </p>
                          <Button onClick={() => {
                            setSearchQuery("");
                            setActiveTab("all");
                            setFilters({
                              difficulty: { easy: true, medium: true, hard: true },
                              category: "all"
                            });
                          }}>
                            Reset Filters
                          </Button>
                        </div>
                      )}
                    </div>
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

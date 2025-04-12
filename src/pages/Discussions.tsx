import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Plus, Send, ArrowUp, ThumbsUp, MessageCircle, Eye, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Discussions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newComment, setNewComment] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Sample discussion topics
  const discussionTopics = [
    {
      id: 1,
      title: "Understanding Recursion in Data Structures",
      category: "Data Structures",
      author: {
        name: "John Doe",
        avatar: "",
      },
      date: "Apr 10, 2025",
      replies: 15,
      views: 124,
      likes: 32,
      content: "I'm struggling with the concept of recursion in linked lists. Can someone explain how recursive functions work for traversing linked lists and trees? I understand the basic idea of a function calling itself, but I'm having trouble implementing it effectively.",
      comments: [
        {
          id: 1,
          author: {
            name: "Prof. Michael Chen",
            avatar: "",
            role: "Instructor",
          },
          date: "Apr 10, 2025",
          content: "Recursion can be thought of as a function that solves a smaller instance of the same problem. For linked lists, think of it this way: to process a list, you process the first node and then recursively process the rest of the list.\n\nHere's a simple example in pseudocode for traversing a linked list:\n\n```\nfunction traverse(node):\n    if node is null:\n        return\n    process node.data\n    traverse(node.next)\n```",
          likes: 8,
        },
        {
          id: 2,
          author: {
            name: "Alice Johnson",
            avatar: "",
          },
          date: "Apr 10, 2025",
          content: "I found it helpful to trace through recursive functions with a small example. For instance, if you have a linked list 1->2->3->null, try to trace how traverse(head) works:\n\n1. traverse(1): process 1, then traverse(2)\n2. traverse(2): process 2, then traverse(3)\n3. traverse(3): process 3, then traverse(null)\n4. traverse(null): return (base case)",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      title: "Best practices for React component design",
      category: "Web Development",
      author: {
        name: "Sarah Williams",
        avatar: "",
      },
      date: "Apr 9, 2025",
      replies: 8,
      views: 97,
      likes: 21,
      content: "I'm working on a large React application and finding myself creating components that are getting too large and complex. What are some best practices for breaking down components and structuring a React application for maintainability?",
      comments: [
        {
          id: 1,
          author: {
            name: "Prof. Emily Taylor",
            avatar: "",
            role: "Instructor",
          },
          date: "Apr 9, 2025",
          content: "Great question! Here are some guidelines I teach in my advanced web development course:\n\n1. Single Responsibility Principle: Each component should ideally do one thing well\n2. Container vs. Presentational Components: Separate logic from UI\n3. Keep components small (< 300 lines of code ideally)\n4. Use composition over inheritance\n5. Extract reusable logic into custom hooks\n\nThis approach keeps your codebase maintainable as it grows.",
          likes: 12,
        },
      ],
    },
    {
      id: 3,
      title: "Optimizing database queries for large datasets",
      category: "Database Systems",
      author: {
        name: "Michael Brown",
        avatar: "",
      },
      date: "Apr 8, 2025",
      replies: 12,
      views: 143,
      likes: 28,
      content: "I'm working with a database that has grown to contain millions of records, and my queries are starting to slow down. What strategies can I use to optimize SQL queries for large datasets without completely redesigning the database schema?",
      comments: [],
    },
    {
      id: 4,
      title: "Understanding neural network architectures for image recognition",
      category: "Machine Learning",
      author: {
        name: "Emma Davis",
        avatar: "",
      },
      date: "Apr 7, 2025",
      replies: 10,
      views: 89,
      likes: 15,
      content: "I'm confused about the different neural network architectures for image recognition. Can someone explain the key differences between CNNs, ResNets, and Transformers for image tasks, and when I should use each one?",
      comments: [],
    },
  ];

  const filteredTopics = searchQuery 
    ? discussionTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : discussionTopics;

  const handleCreateTopic = () => {
    toast({
      title: "New Topic Created",
      description: "Your discussion topic has been posted successfully.",
    });
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment Posted",
        description: "Your comment has been added to the discussion.",
      });
      setNewComment("");
    }
  };

  const handleLikeTopic = (topic) => {
    toast({
      title: "Post Liked",
      description: `You liked "${topic.title}"`,
    });
  };

  const handleViewTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent">
          Course Discussions
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {!selectedTopic ? (
              <>
                <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Discussion Forum</CardTitle>
                        <CardDescription>
                          Engage with classmates and instructors on various topics
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1 min-w-[200px]">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search discussions..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button className="gradient-purple animate-hover" onClick={handleCreateTopic}>
                          <Plus className="h-4 w-4 mr-2" /> New Topic
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">All Topics</TabsTrigger>
                        <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
                        <TabsTrigger value="web-dev">Web Development</TabsTrigger>
                        <TabsTrigger value="databases">Databases</TabsTrigger>
                        <TabsTrigger value="ml">Machine Learning</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="space-y-4">
                        {filteredTopics.map((topic) => (
                          <div 
                            key={topic.id}
                            className="p-4 rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:border-purple-100 cursor-pointer"
                            onClick={() => handleViewTopic(topic)}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="bg-blue-50 text-campus-blue border-campus-blue">
                                    {topic.category}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{topic.date}</span>
                                </div>
                                <h3 className="font-medium mb-2">{topic.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {topic.content}
                                </p>
                              </div>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                                <AvatarFallback className="bg-gradient-purple text-white">
                                  {topic.author.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{topic.replies} replies</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{topic.views} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{topic.likes} likes</span>
                              </div>
                              <div className="flex-1 flex justify-end">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="hover:text-campus-purple" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLikeTopic(topic);
                                  }}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" /> Like
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {filteredTopics.length === 0 && (
                          <div className="p-8 rounded-lg bg-white text-center">
                            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2 opacity-50" />
                            <h3 className="text-lg font-medium">No discussions found</h3>
                            <p className="text-muted-foreground mt-1">Try adjusting your search query</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      {/* Other tab contents would go here, but follow the same pattern */}
                      <TabsContent value="data-structures">
                        {/* Data structures specific discussions */}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="mb-4" 
                  onClick={() => setSelectedTopic(null)}
                >
                  <ArrowUp className="h-4 w-4 rotate-90 mr-2" /> Back to All Discussions
                </Button>
                
                <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-blue-50 text-campus-blue border-campus-blue">
                            {selectedTopic.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{selectedTopic.date}</span>
                        </div>
                        <CardTitle>{selectedTopic.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={selectedTopic.author.avatar} alt={selectedTopic.author.name} />
                            <AvatarFallback className="bg-gradient-purple text-white text-xs">
                              {selectedTopic.author.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          Posted by {selectedTopic.author.name}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLikeTopic(selectedTopic)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" /> Like
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                      <p className="whitespace-pre-wrap">{selectedTopic.content}</p>
                      <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{selectedTopic.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{selectedTopic.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{selectedTopic.likes} likes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Replies</h3>
                      <div className="space-y-4">
                        {selectedTopic.comments.length > 0 ? (
                          selectedTopic.comments.map((comment) => (
                            <div 
                              key={comment.id}
                              className="p-4 rounded-lg bg-white shadow-sm border border-gray-100"
                            >
                              <div className="flex justify-between items-start gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                    <AvatarFallback className={`text-white ${comment.author.role === 'Instructor' ? 'bg-gradient-blue' : 'bg-gradient-purple'}`}>
                                      {comment.author.name.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{comment.author.name}</span>
                                      {comment.author.role === 'Instructor' && (
                                        <Badge variant="outline" className="bg-blue-50 text-campus-blue border-campus-blue h-5">
                                          Instructor
                                        </Badge>
                                      )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="hover:text-campus-purple"
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" /> {comment.likes}
                                </Button>
                              </div>
                              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 rounded-lg bg-white text-center">
                            <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2 opacity-50" />
                            <p className="text-muted-foreground">No replies yet. Be the first to reply!</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Post a Reply</h3>
                      <div className="space-y-4">
                        <Input 
                          placeholder="Write your reply..." 
                          className="bg-white h-20" 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          multiline
                        />
                        <div className="flex justify-end">
                          <Button className="gradient-purple animate-hover" onClick={handlePostComment}>
                            <Send className="h-4 w-4 mr-2" /> Post Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-purple-50 shadow-md animate-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-campus-purple" />
                  Discussion Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                    <span>Total Discussions</span>
                    <Badge variant="outline" className="bg-purple-50 text-campus-purple">42</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                    <span>Your Discussions</span>
                    <Badge variant="outline" className="bg-blue-50 text-campus-blue">8</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                    <span>Your Replies</span>
                    <Badge variant="outline" className="bg-green-50 text-campus-green">26</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
                    <span>Participation Rate</span>
                    <Badge variant="outline" className="bg-orange-50 text-campus-orange">92%</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">View Your Activity</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-green-50 shadow-md animate-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-campus-green" />
                  Active Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {discussionTopics.slice(0, 3).map((topic) => (
                  <div 
                    key={`trending-${topic.id}`}
                    className="p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => handleViewTopic(topic)}
                  >
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className={
                        topic.category === "Data Structures" ? "bg-blue-50 text-blue-500 border-blue-200" :
                        topic.category === "Web Development" ? "bg-purple-50 text-purple-500 border-purple-200" :
                        topic.category === "Database Systems" ? "bg-green-50 text-green-500 border-green-200" :
                        "bg-orange-50 text-orange-500 border-orange-200"
                      }>
                        {topic.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium mt-2 line-clamp-2">{topic.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{topic.date}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{topic.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{topic.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">See All</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-orange-50 shadow-md animate-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-campus-orange" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-blue text-white">AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alice Smith</p>
                      <p className="text-xs text-muted-foreground">42 replies</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-campus-blue">1</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-purple text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">38 replies</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-campus-purple">2</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-green text-white">SW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah Williams</p>
                      <p className="text-xs text-muted-foreground">35 replies</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-campus-green">3</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Discussions;

import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Clock, 
  ThumbsUp, 
  MessageCircle, 
  Plus, 
  Search, 
  Send, 
  Tag,
  User,
  Users,
  Heart,
  Reply,
  Flag,
  AlertTriangle,
  BookmarkPlus
} from "lucide-react";
import { toast } from "sonner";

const discussionForums = [
  {
    id: 1,
    title: "Data Structures Concepts",
    course: "Data Structures & Algorithms",
    posts: 128,
    participants: 42,
    lastActive: "2 hours ago",
    pinned: true
  },
  {
    id: 2,
    title: "React Project Discussion",
    course: "Advanced Web Development",
    posts: 87,
    participants: 34,
    lastActive: "6 hours ago",
    pinned: true
  },
  {
    id: 3,
    title: "SQL Query Optimization",
    course: "Database Management Systems",
    posts: 54,
    participants: 23,
    lastActive: "1 day ago",
    pinned: false
  },
  {
    id: 4,
    title: "Neural Networks in Practice",
    course: "Machine Learning Fundamentals",
    posts: 102,
    participants: 39,
    lastActive: "3 hours ago",
    pinned: false
  },
  {
    id: 5,
    title: "Final Project Ideas",
    course: "Advanced Web Development",
    posts: 45,
    participants: 21,
    lastActive: "4 days ago",
    pinned: false
  },
  {
    id: 6,
    title: "Graph Algorithm Implementations",
    course: "Data Structures & Algorithms",
    posts: 63,
    participants: 28,
    lastActive: "2 days ago",
    pinned: false
  },
];

const discussionPosts = [
  {
    id: 1,
    title: "Understanding Binary Search Trees",
    content: "I'm struggling to understand the balancing of binary search trees. Can someone explain the rotation techniques in AVL trees? I've tried implementing the left and right rotations but I'm getting confused with the double rotations (left-right and right-left).",
    author: {
      name: "Alex Thompson",
      avatar: "",
      role: "Student"
    },
    course: "Data Structures & Algorithms",
    timestamp: new Date(2025, 3, 10, 14, 35),
    likes: 18,
    replies: 7,
    tags: ["BST", "AVL Trees", "Rotations"],
    pinned: false
  },
  {
    id: 2,
    title: "Help with React Hooks Implementation",
    content: "I'm trying to implement a custom hook for fetching and caching data in my React application. I've tried using useSWR and React Query, but I'm looking for a simpler solution for my specific use case. Has anyone built a custom solution that handles loading states, error handling, and cache invalidation?",
    author: {
      name: "Jamie Chen",
      avatar: "",
      role: "Student"
    },
    course: "Advanced Web Development",
    timestamp: new Date(2025, 3, 11, 9, 22),
    likes: 32,
    replies: 15,
    tags: ["React", "Hooks", "Data Fetching"],
    pinned: true
  },
  {
    id: 3,
    title: "SQL Join Performance Questions",
    content: "I'm working on optimizing a complex SQL query involving multiple joins across tables with millions of rows. I've tried indexing the join columns, but I'm still seeing slow performance. Any tips on how to further optimize this or alternative approaches I should consider?",
    author: {
      name: "Raj Patel",
      avatar: "",
      role: "Student"
    },
    course: "Database Management Systems",
    timestamp: new Date(2025, 3, 9, 16, 45),
    likes: 12,
    replies: 8,
    tags: ["SQL", "Performance", "Joins"],
    pinned: false
  },
  {
    id: 4,
    title: "CNN vs. Transformer for Image Classification",
    content: "I'm comparing the performance of CNNs and transformers for an image classification task. So far, I'm finding that while transformers have better accuracy, they're significantly slower to train. Has anyone else experimented with both approaches and can share their experiences or optimization tips?",
    author: {
      name: "Sophia Johnson",
      avatar: "",
      role: "Student"
    },
    course: "Machine Learning Fundamentals",
    timestamp: new Date(2025, 3, 10, 11, 15),
    likes: 25,
    replies: 11,
    tags: ["CNN", "Transformers", "Image Classification"],
    pinned: false
  },
];

const comments = [
  {
    id: 1,
    postId: 2,
    author: {
      name: "Dr. Michael Chen",
      avatar: "",
      role: "Professor"
    },
    content: "Great question! For your custom hook, I'd recommend starting with a structure that maintains an object with keys for data, loading, and error states. React Query is excellent for complex cases, but for a simpler implementation, you can use useReducer to manage these states cleanly. Here's a basic pattern:\n\n```jsx\nconst useData = (fetchFn) => {\n  const [state, dispatch] = useReducer(reducer, { data: null, loading: false, error: null });\n  \n  const fetchData = async () => {\n    dispatch({ type: 'FETCH_START' });\n    try {\n      const data = await fetchFn();\n      dispatch({ type: 'FETCH_SUCCESS', payload: data });\n    } catch (error) {\n      dispatch({ type: 'FETCH_ERROR', payload: error });\n    }\n  };\n  \n  return { ...state, fetchData };\n};\n```\n\nFor caching, consider using a reference map stored in a ref that persists across renders. Feel free to share more specific requirements if you need more targeted advice!",
    timestamp: new Date(2025, 3, 11, 10, 5),
    likes: 15
  },
  {
    id: 2,
    postId: 2,
    author: {
      name: "Emily Parker",
      avatar: "",
      role: "Student"
    },
    content: "I implemented something similar recently using a combination of useReducer and localStorage for persistence. One thing to watch out for is cache invalidation - make sure you have a strategy for when to refresh data or clear your cache. I found setting a timestamp with each cache entry and checking its age was helpful.",
    timestamp: new Date(2025, 3, 11, 10, 42),
    likes: 8
  },
  {
    id: 3,
    postId: 2,
    author: {
      name: "Jamie Chen",
      avatar: "",
      role: "Student"
    },
    content: "Thanks for the suggestions! @Michael I'll try that useReducer approach. Do you have any recommendations for handling dependent data fetching (where one API call depends on the result of another)?",
    timestamp: new Date(2025, 3, 11, 11, 15),
    likes: 3
  },
  {
    id: 4,
    postId: 2,
    author: {
      name: "Dr. Michael Chen",
      avatar: "",
      role: "Professor"
    },
    content: "For dependent fetching, you have a few options:\n\n1. Chain your fetches within useEffect using the result of the first as a dependency for the second\n2. Create a custom hook that wraps both fetches and manages the dependencies\n3. Use an async function that handles both fetches sequentially\n\nOption 2 tends to be cleanest in my experience. You can create a useChainedData hook that internally uses two instances of your basic data hook and coordinates between them.",
    timestamp: new Date(2025, 3, 11, 11, 30),
    likes: 10
  },
];

const DiscussionsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  
  const filteredDiscussions = discussionForums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          forum.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pinned") return matchesSearch && forum.pinned;
    return matchesSearch && forum.course.toLowerCase().includes(activeTab.toLowerCase());
  });
  
  const filteredPosts = discussionPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!selectedDiscussion) return matchesSearch;
    return matchesSearch && post.course === selectedDiscussion.course;
  });
  
  const postComments = selectedPost ? comments.filter(comment => comment.postId === selectedPost.id) : [];
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    toast.success(`Comment submitted: ${newComment}`);
    setNewComment("");
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Discussion Forums</h1>
        <p className="text-muted-foreground mb-6">
          Engage with your peers and instructors in course discussions
        </p>
        
        {selectedPost ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => {
                setSelectedPost(null);
                if (!selectedDiscussion) setActiveTab("all");
              }} className="mb-2">
                ← Back to {selectedDiscussion ? selectedDiscussion.title : "discussions"}
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2 bg-campus-purple/10 text-campus-purple">
                      {selectedPost.course}
                    </Badge>
                    <CardTitle className="text-xl">{selectedPost.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selectedPost.author.avatar} />
                        <AvatarFallback className="bg-campus-blue text-white text-xs">
                          {selectedPost.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{selectedPost.author.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedPost.author.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(selectedPost.timestamp, "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-1" /> Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{selectedPost.content}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {selectedPost.tags.map((tag: string, i: number) => (
                    <Badge key={i} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-6">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" /> Like ({selectedPost.likes})
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" /> Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-1" /> Reference
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Responses ({postComments.length})
                </h2>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Liked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Your Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Share your thoughts or questions..."
                    className="min-h-[100px]"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmitComment}>
                    <Send className="h-4 w-4 mr-1" /> Post Response
                  </Button>
                </CardFooter>
              </Card>
              
              {postComments.length > 0 ? (
                <div className="space-y-4">
                  {postComments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.author.avatar} />
                            <AvatarFallback className={`text-white text-sm ${
                              comment.author.role === 'Professor' ? 'bg-campus-blue' : 'bg-campus-purple'
                            }`}>
                              {comment.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comment.author.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {comment.author.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(comment.timestamp, "MMM d, yyyy 'at' h:mm a")}
                              </span>
                            </div>
                            
                            <div className="mt-2 prose max-w-none">
                              <p className="whitespace-pre-line">{comment.content}</p>
                            </div>
                            
                            <div className="flex items-center gap-3 mt-3">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Heart className="h-4 w-4 mr-1" /> {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MessageCircle className="h-4 w-4 mr-1" /> Reply
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Flag className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No responses yet</h3>
                    <p className="text-muted-foreground">Be the first to respond to this discussion</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : selectedDiscussion ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => {
                setSelectedDiscussion(null);
                setActiveTab("all");
              }} className="mb-2">
                ← Back to all forums
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2 bg-campus-blue/10 text-campus-blue">
                      {selectedDiscussion.course}
                    </Badge>
                    <CardTitle>{selectedDiscussion.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> 
                          {selectedDiscussion.posts} posts
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" /> 
                          {selectedDiscussion.participants} participants
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> 
                          Active {selectedDiscussion.lastActive}
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" /> New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative w-full mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search posts in this forum"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div 
                        key={post.id} 
                        className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {post.content}
                            </p>
                          </div>
                          {post.pinned && (
                            <Badge className="bg-yellow-100 text-yellow-800">Pinned</Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback className="bg-campus-purple text-white text-xs">
                                {post.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{post.author.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {format(post.timestamp, "MMM d, yyyy")}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm">
                              <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MessageCircle className="h-3.5 w-3.5" /> {post.replies}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-16 text-center">
                      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No posts found</h3>
                      <p className="text-muted-foreground mb-4">
                        No posts match your search criteria
                      </p>
                      <Button onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search forums by title or course"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Data Structures">DS&A</TabsTrigger>
                    <TabsTrigger value="Web Development">Web</TabsTrigger>
                    <TabsTrigger value="pinned">Pinned</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDiscussions.map((forum) => (
                <Card 
                  key={forum.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedDiscussion(forum)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="mb-2 bg-campus-blue/10 text-campus-blue">
                        {forum.course}
                      </Badge>
                      {forum.pinned && (
                        <Badge className="bg-yellow-100 text-yellow-800">Pinned</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{forum.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" /> 
                        <span>{forum.posts} posts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" /> 
                        <span>{forum.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" /> 
                        <span>Active {forum.lastActive}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Discussion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredDiscussions.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No discussion forums found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default DiscussionsPage;


import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ThumbsUp, MessageSquare } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { getDiscussions, getDiscussionById, createDiscussion, addReply } from "@/services/DiscussionService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const initialDiscussions = [
  {
    id: "discussion1",
    title: "Database Normalization Help",
    content: "Can someone explain the difference between 2NF and 3NF with examples? I'm preparing for the midterm exam.",
    author: {
      id: "author1",
      full_name: "Michael Brown",
      avatar_url: "",
      role: "student"
    },
    created_at: "2023-04-20T10:30:00Z",
    replies: [],
    tags: ["Databases", "SQL", "Normalization"]
  },
  {
    id: "discussion2",
    title: "Question about React Hooks",
    content: "I'm confused about the dependency array in useEffect. When should I include dependencies and when should I leave it empty?",
    author: {
      id: "author2",
      full_name: "Sarah Johnson",
      avatar_url: "",
      role: "student"
    },
    created_at: "2023-04-17T14:45:00Z",
    replies: [
      {
        id: "reply1",
        content: "The dependency array tells React when to re-run the effect. Empty array means run only once on mount, no array means run after every render, and with dependencies it runs when those values change.",
        author: {
          id: "author3",
          full_name: "Prof. Roberts",
          avatar_url: "",
          role: "teacher"
        },
        created_at: "2023-04-17T16:20:00Z"
      }
    ],
    tags: ["React", "JavaScript", "Hooks"]
  },
  {
    id: "discussion3",
    title: "Recursion vs Iteration",
    content: "What are the pros and cons of using recursion versus iteration? When should I use one over the other?",
    author: {
      id: "author4",
      full_name: "Alex Chen",
      avatar_url: "",
      role: "student"
    },
    created_at: "2023-04-15T09:10:00Z",
    replies: [],
    tags: ["Algorithms", "Programming", "Performance"]
  }
];

const Discussions = () => {
  const { user, profile } = useAuth();
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const [topicFilter, setTopicFilter] = useState("all");
  
  // New discussion form
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    course: "",
    tags: ""
  });
  
  // Reply input state
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState("");
  
  // Fetch discussions from the API
  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true);
      try {
        const data = await getDiscussions();
        // If there's data from the API, use it; otherwise, use the initial data
        if (data && data.length > 0) {
          setDiscussions(data);
        }
      } catch (error) {
        console.error("Error fetching discussions:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiscussions();
  }, []);
  
  // Handle creating a new discussion
  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call API to create discussion
      const result = await createDiscussion(
        newDiscussion.title,
        newDiscussion.content,
        newDiscussion.course || undefined
      );
      
      if (result) {
        toast.success("Discussion created successfully!");
        // Refresh discussions
        const updatedDiscussions = await getDiscussions();
        setDiscussions(updatedDiscussions);
        
        // Reset form
        setNewDiscussion({
          title: "",
          content: "",
          course: "",
          tags: ""
        });
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
      toast.error("Failed to create discussion. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle submitting a reply
  const handleAddReply = async (discussionId) => {
    if (!replyText.trim()) return;
    
    setLoading(true);
    try {
      // Call API to add reply
      const result = await addReply(discussionId, replyText);
      
      if (result) {
        toast.success("Reply added successfully!");
        // Refresh discussion with new reply
        const updatedDiscussion = await getDiscussionById(discussionId);
        
        // Update the discussions state
        setDiscussions(discussions.map(d => 
          d.id === discussionId ? updatedDiscussion : d
        ));
        
        // Reset reply form
        setReplyText("");
        setReplyingTo("");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Filter discussions based on active tab
  const filteredDiscussions = discussions.filter(discussion => {
    if (activeTab === "all") return true;
    if (activeTab === "my" && discussion.author.id === user?.id) return true;
    if (activeTab === "unanswered" && (!discussion.replies || discussion.replies.length === 0)) return true;
    return false;
  });
  
  // Filter by search query
  const searchedDiscussions = filteredDiscussions.filter(discussion => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      discussion.title.toLowerCase().includes(query) ||
      discussion.content.toLowerCase().includes(query) ||
      discussion.author.full_name.toLowerCase().includes(query) ||
      (discussion.tags && discussion.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });
  
  // Sort discussions
  const sortedDiscussions = [...searchedDiscussions].sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      // Most replies
      return (b.replies?.length || 0) - (a.replies?.length || 0);
    }
  });
  
  return (
    <PageLayout>
      <div className="container py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Discussions</h1>
          <p className="text-muted-foreground mt-1">
            Ask questions, share insights, and collaborate with peers and faculty
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Discussions</TabsTrigger>
                <TabsTrigger value="my">My Posts</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search discussions..."
                  className="w-[300px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="replies">Most Replies</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={topicFilter} onValueChange={setTopicFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                    <SelectItem value="databases">Databases</SelectItem>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="ai">AI & ML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-campus-purple border-t-transparent rounded-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ) : sortedDiscussions.length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center">
                      <h3 className="font-medium text-lg">No discussions found</h3>
                      <p className="text-muted-foreground mt-1">
                        {searchQuery 
                          ? "Try adjusting your search query or filters" 
                          : "Be the first to start a discussion!"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                sortedDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={discussion.author.avatar_url} alt={discussion.author.full_name} />
                              <AvatarFallback>
                                {discussion.author.full_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm flex items-center gap-2">
                                {discussion.author.full_name}
                                {discussion.author.role === "teacher" && (
                                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                                    Faculty
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(discussion.created_at).toLocaleDateString()} • {new Date(discussion.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{discussion.replies?.length || 0}</span>
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>0</span>
                            </Badge>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{discussion.title}</h3>
                        <p className="text-muted-foreground mb-4">{discussion.content}</p>
                        
                        {discussion.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-muted">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {replyingTo === discussion.id ? (
                          <div className="mt-4">
                            <Textarea
                              placeholder="Write your reply..."
                              className="mb-2"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setReplyingTo("");
                                  setReplyText("");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleAddReply(discussion.id)}
                                disabled={loading || !replyText.trim()}
                              >
                                Post Reply
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            variant="ghost" 
                            className="text-campus-purple"
                            onClick={() => setReplyingTo(discussion.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" /> Reply
                          </Button>
                        )}
                      </div>
                      
                      {discussion.replies && discussion.replies.length > 0 && (
                        <div className="border-t p-6 bg-muted/30">
                          <h4 className="font-medium mb-4">Replies</h4>
                          <div className="space-y-4">
                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={reply.author.avatar_url} alt={reply.author.full_name} />
                                    <AvatarFallback>
                                      {reply.author.full_name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium text-sm flex items-center gap-2">
                                    {reply.author.full_name}
                                    {reply.author.role === "teacher" && (
                                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs py-0 px-1">
                                        Faculty
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(reply.created_at).toLocaleDateString()}
                                  </div>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Start a Discussion</CardTitle>
                <CardDescription>
                  Ask a question or share insights with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateDiscussion} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Title"
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="What would you like to discuss?"
                      className="min-h-[120px]"
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Course (e.g. CS101: Intro to Programming)"
                      value={newDiscussion.course}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, course: e.target.value })}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Tags (comma-separated, e.g. React, JavaScript)"
                      value={newDiscussion.tags}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Posting..." : "Post Discussion"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Discussions;

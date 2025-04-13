
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Search, 
  Filter,
  ChevronDown, 
  User 
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { createDiscussion, getDiscussions, getDiscussionById, addReply } from "@/services/DiscussionService";

const Discussions = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "", course: "", tags: "" });
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Load discussions from the database
  useEffect(() => {
    const loadDiscussions = async () => {
      setIsLoading(true);
      try {
        const discussionsData = await getDiscussions();
        setDiscussions(discussionsData.map((disc: any) => ({
          ...disc,
          id: disc.id,
          title: disc.title,
          content: disc.content,
          author: {
            id: disc.author?.id || "unknown",
            name: disc.author?.full_name || "Unknown User",
            role: disc.author?.role || "Student",
            avatar: disc.author?.avatar_url || ""
          },
          timestamp: new Date(disc.created_at),
          likes: 0, // We'll implement likes in a more comprehensive version
          comments: disc.replies || [],
          tags: disc.tags || ["General"],
          course: disc.course || "General Discussion"
        })));
      } catch (error) {
        console.error("Error loading discussions:", error);
        toast.error("Failed to load discussions");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDiscussions();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter discussions based on search term - client-side filtering
    if (searchTerm.trim() === "") {
      // Reset to all discussions
      getDiscussions().then(discussionsData => {
        setDiscussions(discussionsData.map((disc: any) => ({
          ...disc,
          id: disc.id,
          title: disc.title,
          content: disc.content,
          author: {
            id: disc.author?.id || "unknown",
            name: disc.author?.full_name || "Unknown User",
            role: disc.author?.role || "Student",
            avatar: disc.author?.avatar_url || ""
          },
          timestamp: new Date(disc.created_at),
          likes: 0,
          comments: disc.replies || [],
          tags: disc.tags || ["General"],
          course: disc.course || "General Discussion"
        })));
      });
    } else {
      const filtered = discussions.filter(
        (disc: any) => 
          disc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disc.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setDiscussions(filtered);
    }
  };
  
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to create a post");
      return;
    }
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Please provide both title and content for your post");
      return;
    }
    
    try {
      const createdDiscussion = await createDiscussion(
        newPost.title,
        newPost.content,
        undefined // courseId is optional
      );
      
      if (createdDiscussion) {
        // Add the new discussion to the list
        const newDiscussion = {
          ...createdDiscussion,
          author: {
            id: user.id,
            name: profile?.full_name || user.email?.split("@")[0] || "Anonymous",
            role: profile?.role || "Student",
            avatar: profile?.avatar_url || ""
          },
          timestamp: new Date(createdDiscussion.created_at),
          likes: 0,
          comments: [],
          tags: newPost.tags.split(",").map(tag => tag.trim()),
          course: newPost.course
        };
        
        setDiscussions([newDiscussion, ...discussions]);
        setNewPost({ title: "", content: "", course: "", tags: "" });
        toast.success("Discussion posted successfully!");
      } else {
        toast.error("Failed to create discussion");
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
      toast.error("Failed to create discussion");
    }
  };
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }
    
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    try {
      const reply = await addReply(selectedDiscussion.id, newComment);
      
      if (reply) {
        // Update the selected discussion with the new comment
        const newCommentObj = {
          id: reply.id,
          content: reply.content,
          author: {
            id: user.id,
            name: profile?.full_name || user.email?.split("@")[0] || "Anonymous",
            role: profile?.role || "Student",
            avatar: profile?.avatar_url || ""
          },
          timestamp: new Date(reply.created_at),
          likes: 0
        };
        
        setSelectedDiscussion({
          ...selectedDiscussion,
          comments: [...selectedDiscussion.comments, newCommentObj]
        });
        
        // Also update in the main discussions list
        setDiscussions(discussions.map((disc: any) => {
          if (disc.id === selectedDiscussion.id) {
            return {
              ...disc,
              comments: [...disc.comments, newCommentObj]
            };
          }
          return disc;
        }));
        
        setNewComment("");
        toast.success("Comment added successfully!");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };
  
  const handleLike = (discussionId: string) => {
    // In a real app, this would call an API to update the likes in the database
    // For now, we'll just update the UI
    setDiscussions(discussions.map((disc: any) => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          likes: disc.likes + 1
        };
      }
      return disc;
    }));
    
    // Update selected discussion if it's the one being liked
    if (selectedDiscussion && selectedDiscussion.id === discussionId) {
      setSelectedDiscussion({
        ...selectedDiscussion,
        likes: selectedDiscussion.likes + 1
      });
    }
    
    toast.success("Post liked!");
  };
  
  const handleLikeComment = (discussionId: string, commentId: string) => {
    // In a real app, this would call an API to update the likes in the database
    // For now, we'll just update the UI
    setDiscussions(discussions.map((disc: any) => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.map((comment: any) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.likes + 1
              };
            }
            return comment;
          })
        };
      }
      return disc;
    }));
    
    // Update selected discussion if it's the one with the comment being liked
    if (selectedDiscussion && selectedDiscussion.id === discussionId) {
      setSelectedDiscussion({
        ...selectedDiscussion,
        comments: selectedDiscussion.comments.map((comment: any) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.likes + 1
            };
          }
          return comment;
        })
      });
    }
    
    toast.success("Comment liked!");
  };
  
  const sortedDiscussions = () => {
    let filtered = [...discussions];
    
    // Apply filters
    if (filterBy !== "all") {
      filtered = filtered.filter((disc: any) => 
        disc.tags.some((tag: string) => tag.toLowerCase() === filterBy.toLowerCase())
      );
    }
    
    // Apply active tab filtering
    if (activeTab === "my-posts") {
      filtered = filtered.filter((disc: any) => disc.author.id === user?.id);
    } else if (activeTab === "unanswered") {
      filtered = filtered.filter((disc: any) => disc.comments.length === 0);
    }
    
    // Apply sorting
    return filtered.sort((a: any, b: any) => {
      if (sortBy === "recent") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === "popular") {
        return b.likes - a.likes;
      } else {
        return b.comments.length - a.comments.length;
      }
    });
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Academic Discussions</h1>
          <p className="text-muted-foreground">
            Ask questions, share insights, and collaborate with peers and faculty
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Discussion Area */}
          <div className="lg:col-span-2">
            {selectedDiscussion ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{selectedDiscussion.title}</CardTitle>
                      <CardDescription>
                        Posted in {selectedDiscussion.course} • {format(new Date(selectedDiscussion.timestamp), "MMM d, yyyy 'at' h:mm a")}
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedDiscussion(null)}>
                      Back to Discussions
                    </Button>
                  </div>
                  <div className="flex items-center mt-2 gap-2">
                    <Avatar>
                      <AvatarImage src={selectedDiscussion.author.avatar} />
                      <AvatarFallback>{selectedDiscussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedDiscussion.author.name}</div>
                      <Badge variant="outline">{selectedDiscussion.author.role}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="whitespace-pre-wrap">{selectedDiscussion.content}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedDiscussion.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleLike(selectedDiscussion.id)}>
                      <ThumbsUp className="h-4 w-4 mr-1" /> {selectedDiscussion.likes}
                    </Button>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Comments ({selectedDiscussion.comments.length})</h3>
                    {selectedDiscussion.comments.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        No comments yet. Be the first to comment!
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedDiscussion.comments.map((comment: any) => (
                          <Card key={comment.id} className="border-l-4 border-l-purple-200">
                            <CardHeader className="py-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.author.avatar} />
                                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{comment.author.name}</div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">{comment.author.role}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {format(new Date(comment.timestamp), "MMM d, yyyy 'at' h:mm a")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="py-2">
                              <p className="text-sm">{comment.content}</p>
                            </CardContent>
                            <CardFooter className="py-2">
                              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(selectedDiscussion.id, comment.id)}>
                                <ThumbsUp className="h-3 w-3 mr-1" /> {comment.likes}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Add a Comment</h3>
                    <form onSubmit={handleCommentSubmit}>
                      <Textarea 
                        placeholder="Write your comment here..." 
                        className="min-h-[100px]"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button type="submit">
                          <Send className="h-4 w-4 mr-1" /> Post Comment
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">All Discussions</TabsTrigger>
                      <TabsTrigger value="my-posts">My Posts</TabsTrigger>
                      <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="active">Most Active</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Topics</SelectItem>
                        <SelectItem value="Algorithms">Algorithms</SelectItem>
                        <SelectItem value="Databases">Databases</SelectItem>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input 
                      type="text" 
                      placeholder="Search discussions..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4 mr-1" /> Search
                    </Button>
                  </form>
                </div>
                
                <div className="space-y-4 mb-4">
                  {sortedDiscussions().length > 0 ? (
                    sortedDiscussions().map((discussion) => (
                      <Card 
                        key={discussion.id} 
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setSelectedDiscussion(discussion)}
                      >
                        <CardHeader className="py-4">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{discussion.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                <MessageSquare className="h-3 w-3 mr-1" /> {discussion.comments.length}
                              </Badge>
                              <Badge variant="outline">
                                <ThumbsUp className="h-3 w-3 mr-1" /> {discussion.likes}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={discussion.author.avatar} />
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardDescription>
                              {discussion.author.name} • {format(new Date(discussion.timestamp), "MMM d, yyyy")}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0">
                          <p className="line-clamp-2">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {discussion.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="py-3">
                          <Button variant="link" className="p-0 h-auto text-sm">
                            <MessageSquare className="h-3 w-3 mr-1" /> Read more & reply
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10 border rounded-lg bg-muted/30">
                      <MessageSquare className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No discussions found</h3>
                      <p className="text-muted-foreground">
                        {searchTerm ? "Try a different search term" : "Be the first to start a discussion"}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Start a Discussion</CardTitle>
                <CardDescription>
                  Ask a question or share insights with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <Input 
                      type="text" 
                      placeholder="Title" 
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="What would you like to discuss?" 
                      className="min-h-[150px]"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      type="text" 
                      placeholder="Course (e.g. CS101: Intro to Programming)" 
                      value={newPost.course}
                      onChange={(e) => setNewPost({ ...newPost, course: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      type="text" 
                      placeholder="Tags (comma-separated, e.g. React, JavaScript)" 
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Post Discussion
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Discussion Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-0.5 text-green-500">•</div>
                    <p>Be respectful and supportive of your peers</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-0.5 text-green-500">•</div>
                    <p>Provide as much context as possible in your questions</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-0.5 text-green-500">•</div>
                    <p>Use appropriate tags to categorize your discussion</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-0.5 text-green-500">•</div>
                    <p>Upvote helpful answers and discussions</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-0.5 text-green-500">•</div>
                    <p>Share code examples using code formatting</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Discussions;

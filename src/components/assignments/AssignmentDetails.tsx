
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar, Clock, File, Upload, CheckCircle, Download, AlertCircle, User, FileText } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { submitAssignment, uploadAssignmentFile, getUserSubmission } from "@/services/AssignmentService";

const AssignmentDetails = (props: any) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submission, setSubmission] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user's submission for this assignment
  useEffect(() => {
    const loadSubmission = async () => {
      if (!user || !props.id) return;
      
      setIsLoading(true);
      try {
        const userSubmission = await getUserSubmission(props.id);
        setSubmission(userSubmission);
      } catch (error) {
        console.error("Error loading submission:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSubmission();
  }, [user, props.id]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to submit an assignment");
      return;
    }
    
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload the file
      const fileResult = await uploadAssignmentFile(selectedFile, props.id);
      
      if (!fileResult) {
        toast.error("Failed to upload file");
        return;
      }
      
      // Submit the assignment
      const result = await submitAssignment(
        props.id,
        fileResult.fileUrl,
        fileResult.fileName
      );
      
      if (result) {
        toast.success("Assignment submitted successfully!");
        setUploadDialogOpen(false);
        
        // Update the submission state
        setSubmission({
          assignment_id: props.id,
          file_url: fileResult.fileUrl,
          file_name: fileResult.fileName,
          submission_date: new Date().toISOString(),
          status: "submitted"
        });
      } else {
        toast.error("Failed to submit assignment");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment");
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{props.title}</CardTitle>
            <div className="flex items-center mt-2">
              <Badge className="bg-campus-purple mr-2">{props.course}</Badge>
              <Badge
                variant="outline"
                className={
                  props.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : props.status === "Submitted"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {props.status}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <div className="flex items-center text-red-500 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                Due: {format(new Date(props.dueDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {format(new Date(props.dueDate), "h:mm a")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{props.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submission Type:</span>
                  <Badge variant="outline" className="ml-auto">
                    {props.submissionType}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Marks:</span>
                  <span className="font-medium">{props.marks}</span>
                </div>
                {props.pageLimit && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Page Limit:</span>
                    <span className="font-medium">{props.pageLimit} pages</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Instructor</h3>
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={props.instructor?.avatar} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium">{props.instructor?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Course Instructor
                  </div>
                </div>
              </div>
            </div>
          </div>

          {props.resources && props.resources.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Resources</h3>
              <div className="space-y-2">
                {props.resources.map((resource: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-md border"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{resource.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={resource.url} download>
                        <Download className="h-4 w-4 mr-1" /> Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Submission</h3>
            
            {isLoading ? (
              <div className="text-center p-6">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading submission...</p>
              </div>
            ) : submission ? (
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <div className="font-medium">Assignment Submitted</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(submission.submission_date), "MMMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                  </div>
                  
                  {submission.file_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={submission.file_url} target="_blank" rel="noopener noreferrer">
                        <File className="h-4 w-4 mr-1" />
                        View Submission
                      </a>
                    </Button>
                  )}
                </div>
                
                {submission.marks_awarded !== null && (
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Grade:</span>
                      <Badge className="text-white bg-green-600">
                        {submission.marks_awarded} / {props.marks}
                      </Badge>
                    </div>
                    {submission.feedback && (
                      <div className="mt-2">
                        <span className="text-sm font-medium">Feedback:</span>
                        <p className="text-sm mt-1">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-6 border rounded-md">
                <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <h4 className="text-lg font-medium">No Submission Yet</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  You haven't submitted this assignment yet.
                </p>
                
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-campus-purple hover:bg-campus-purple/90">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Assignment</DialogTitle>
                      <DialogDescription>
                        Upload your assignment file. Accepted formats: PDF, DOCX, ZIP, etc.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="file">Assignment File <span className="text-red-500">*</span></Label>
                        
                        <div className="border-2 border-dashed rounded-md p-4 text-center">
                          {selectedFile ? (
                            <div className="space-y-2">
                              <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
                              <p className="text-sm font-medium">{selectedFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSelectedFile(null)}
                              >
                                Change File
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="text-sm">Drag and drop or click to upload</p>
                              <Input
                                id="file"
                                name="file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                              />
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm"
                                onClick={() => document.getElementById("file")?.click()}
                              >
                                Browse Files
                              </Button>
                              <p className="text-xs text-muted-foreground">
                                Max file size: 10MB
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={!selectedFile || isUploading}>
                          {isUploading ? "Uploading..." : "Submit Assignment"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentDetails;

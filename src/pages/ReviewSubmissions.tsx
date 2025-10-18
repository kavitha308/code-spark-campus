import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, CheckCircle, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAssignments, getAllSubmissionsForAssignment, gradeSubmission } from "@/services/AssignmentService";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ReviewSubmissions = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [gradingModal, setGradingModal] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<any>(null);
  const [gradeData, setGradeData] = useState({
    marks: 0,
    feedback: ""
  });

  useEffect(() => {
    loadAssignments();
  }, []);

  useEffect(() => {
    if (selectedAssignment) {
      loadSubmissions(selectedAssignment);
    }
  }, [selectedAssignment]);

  const loadAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Error loading assignments:", error);
      toast.error("Failed to load assignments");
    }
  };

  const loadSubmissions = async (assignmentId: string) => {
    try {
      setLoading(true);
      const data = await getAllSubmissionsForAssignment(assignmentId);
      setSubmissions(data);
    } catch (error) {
      console.error("Error loading submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async () => {
    if (!currentSubmission) return;

    try {
      await gradeSubmission(
        currentSubmission.id,
        gradeData.marks,
        gradeData.feedback
      );
      
      toast.success("Submission graded successfully!");
      setGradingModal(false);
      
      // Reload submissions
      if (selectedAssignment) {
        loadSubmissions(selectedAssignment);
      }
      
      // Reset form
      setGradeData({ marks: 0, feedback: "" });
      setCurrentSubmission(null);
    } catch (error) {
      console.error("Error grading submission:", error);
      toast.error("Failed to grade submission");
    }
  };

  const openGradingModal = (submission: any) => {
    setCurrentSubmission(submission);
    setGradeData({
      marks: submission.score || 0,
      feedback: submission.feedback || ""
    });
    setGradingModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge variant="default"><CheckCircle className="mr-1 h-3 w-3" />Graded</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/faculty-dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Review Submissions</h1>
          <p className="text-muted-foreground mt-1">
            Grade and provide feedback on student assignments
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Assignment</CardTitle>
            <CardDescription>Choose an assignment to review submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
              <SelectTrigger>
                <SelectValue placeholder="Select an assignment" />
              </SelectTrigger>
              <SelectContent>
                {assignments.map((assignment) => (
                  <SelectItem key={assignment.id} value={assignment.id}>
                    {assignment.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 && selectedAssignment ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No submissions yet for this assignment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {submission.profiles?.full_name || "Unknown Student"}
                      </CardTitle>
                      <CardDescription>
                        Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getStatusBadge(submission.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {submission.content && (
                      <div>
                        <Label className="text-sm font-medium">Submission Content</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.content}
                        </p>
                      </div>
                    )}
                    
                    {submission.score !== null && (
                      <div>
                        <Label className="text-sm font-medium">Score</Label>
                        <p className="text-sm font-semibold mt-1">{submission.score} marks</p>
                      </div>
                    )}
                    
                    {submission.feedback && (
                      <div>
                        <Label className="text-sm font-medium">Feedback</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.feedback}
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => openGradingModal(submission)}
                      className="w-full"
                    >
                      {submission.status === "graded" ? "Update Grade" : "Grade Submission"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Grading Modal */}
      <Dialog open={gradingModal} onOpenChange={setGradingModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input
                id="marks"
                type="number"
                placeholder="Enter marks"
                value={gradeData.marks}
                onChange={(e) => setGradeData({ ...gradeData, marks: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Provide feedback to the student"
                className="min-h-[120px]"
                value={gradeData.feedback}
                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGradingModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleGradeSubmission}>
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ReviewSubmissions;

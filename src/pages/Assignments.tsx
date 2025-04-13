
import React, { useState, useEffect } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AssignmentCard from "@/components/dashboard/AssignmentCard";
import AssignmentDetails from "@/components/assignments/AssignmentDetails";
import { getAssignments, getAssignmentById } from "@/services/AssignmentService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const AssignmentsPage = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<AssignmentsList />} />
        <Route path="/details/:id" element={<AssignmentDetailsPage />} />
      </Routes>
    </PageLayout>
  );
};

const AssignmentsList = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load assignments from the database
  useEffect(() => {
    const loadAssignments = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const assignmentsData = await getAssignments();
        
        setAssignments(assignmentsData.map((assignment: any) => ({
          id: assignment.id,
          title: assignment.title,
          course: assignment.course?.title || "Unknown Course",
          dueDate: new Date(assignment.due_date).toLocaleDateString(),
          status: "Pending", // This would come from the submissions table in a real app
          submissionType: assignment.submission_type || "Report",
          description: assignment.description,
          marks: assignment.total_marks,
          pageLimit: assignment.page_limit,
          instructor: {
            name: assignment.instructor?.full_name || "Unknown Instructor",
            avatar: assignment.instructor?.avatar_url || "",
          }
        })));
      } catch (error) {
        console.error("Error loading assignments:", error);
        toast.error("Failed to load assignments");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAssignments();
  }, [user]);
  
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground mt-1">
            Track and submit your academic assignments
          </p>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : assignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments
                .filter(a => a.status === "Pending")
                .map((assignment, index) => (
                  <AssignmentCard
                    key={index}
                    id={assignment.id}
                    title={assignment.title}
                    course={assignment.course}
                    dueDate={assignment.dueDate}
                    status={assignment.status}
                    submissionType={assignment.submissionType}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium">No active assignments</h3>
              <p className="text-muted-foreground mt-1">
                You don't have any active assignments at the moment.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments
              .filter(a => a.status === "Submitted")
              .map((assignment, index) => (
                <AssignmentCard
                  key={index}
                  id={assignment.id}
                  title={assignment.title}
                  course={assignment.course}
                  dueDate={assignment.dueDate}
                  status={assignment.status}
                  submissionType={assignment.submissionType}
                />
              ))}
          </div>
          
          {assignments.filter(a => a.status === "Submitted").length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium">No submitted assignments</h3>
              <p className="text-muted-foreground mt-1">
                You haven't submitted any assignments yet.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments
              .filter(a => a.status === "Graded")
              .map((assignment, index) => (
                <AssignmentCard
                  key={index}
                  id={assignment.id}
                  title={assignment.title}
                  course={assignment.course}
                  dueDate={assignment.dueDate}
                  status={assignment.status}
                  submissionType={assignment.submissionType}
                />
              ))}
          </div>
          
          {assignments.filter(a => a.status === "Graded").length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium">No past assignments</h3>
              <p className="text-muted-foreground mt-1">
                You don't have any graded assignments yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AssignmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load assignment details from the database
  useEffect(() => {
    const loadAssignment = async () => {
      if (!user || !id) return;
      
      setIsLoading(true);
      try {
        const assignmentData = await getAssignmentById(id);
        
        if (assignmentData) {
          setAssignment({
            id: assignmentData.id,
            title: assignmentData.title,
            course: assignmentData.course?.title || "Unknown Course",
            dueDate: assignmentData.due_date,
            status: "Pending", // This would come from the submissions table in a real app
            submissionType: assignmentData.submission_type || "Report",
            description: assignmentData.description,
            marks: assignmentData.total_marks,
            pageLimit: assignmentData.page_limit,
            instructor: {
              name: assignmentData.instructor?.full_name || "Unknown Instructor",
              avatar: assignmentData.instructor?.avatar_url || "",
            },
            resources: [
              {
                name: "Assignment Guidelines.pdf",
                type: "PDF",
                url: "#",
              },
              {
                name: "Sample Datasets.zip",
                type: "ZIP",
                url: "#",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error loading assignment:", error);
        toast.error("Failed to load assignment details");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAssignment();
  }, [user, id]);

  if (isLoading) {
    return (
      <div className="container py-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="container py-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The assignment you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <AssignmentDetails {...assignment} />
    </div>
  );
};

export default AssignmentsPage;

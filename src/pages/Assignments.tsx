
import React from "react";
import { useParams, Routes, Route } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AssignmentCard from "@/components/dashboard/AssignmentCard";
import AssignmentDetails from "@/components/assignments/AssignmentDetails";

// Mock assignment data
const assignments = [
  {
    id: "1",
    title: "Data Structures Algorithmic Analysis",
    course: "Data Structures & Algorithms",
    dueDate: "April 15, 2025",
    status: "Pending" as const,
    submissionType: "Report & Code",
    description: "Analyze the time and space complexity of five different sorting algorithms. Implement each algorithm in the programming language of your choice and compare their performance with varying input sizes.",
    marks: 100,
    pageLimit: 10,
    instructor: {
      name: "Dr. Robert Chan",
      avatar: "",
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
  },
  {
    id: "2",
    title: "Web Development Project Milestone",
    course: "Advanced Web Development",
    dueDate: "April 18, 2025",
    status: "Pending" as const,
    submissionType: "Code & Demo",
    description: "Submit your progress on the course project. Your submission should include working code for the frontend UI components and at least two implemented API endpoints. Include a brief report explaining your design decisions.",
    marks: 80,
    instructor: {
      name: "Prof. Sarah Wilson",
      avatar: "",
    },
    resources: [
      {
        name: "Project Rubric.pdf",
        type: "PDF",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    title: "Database Normalization Exercise",
    course: "Database Management Systems",
    dueDate: "April 10, 2025",
    status: "Submitted" as const,
    submissionType: "Report",
    description: "Analyze the given database schema and normalize it to 3NF. Explain each step of your normalization process and provide a final ER diagram of your normalized schema.",
    marks: 50,
    pageLimit: 5,
    instructor: {
      name: "Dr. Michael Lee",
      avatar: "",
    },
    resources: [
      {
        name: "Assignment Details.pdf",
        type: "PDF",
        url: "#",
      },
    ],
  },
  {
    id: "4",
    title: "Machine Learning Model Evaluation",
    course: "Machine Learning Fundamentals",
    dueDate: "April 5, 2025",
    status: "Graded" as const,
    submissionType: "Notebook & Report",
    description: "Train at least three different machine learning models on the provided dataset. Evaluate their performance using appropriate metrics and write a report comparing their strengths and weaknesses.",
    marks: 90,
    instructor: {
      name: "Dr. Lisa Chen",
      avatar: "",
    },
    resources: [
      {
        name: "Dataset Documentation.pdf",
        type: "PDF",
        url: "#",
      },
      {
        name: "Evaluation Guidelines.pdf",
        type: "PDF",
        url: "#",
      },
    ],
  },
];

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
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AssignmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const assignment = assignments.find(a => a.id === id);

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

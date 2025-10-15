import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "@/services/CourseService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Cloud Computing"
];

const CreateCourse = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    instructor_name: "",
    category: "",
    status: "draft"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a course");
      return;
    }

    try {
      setLoading(true);
      await createCourse({
        ...formData,
        image_url: ""
      });
      
      toast.success("Course created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        duration: "",
        instructor_name: "",
        category: "",
        status: "draft"
      });
      
      // Navigate to faculty dashboard
      navigate('/faculty-dashboard');
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-4xl py-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/faculty-dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl">Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Course Instructor</Label>
                  <Input
                    id="instructor"
                    placeholder="Instructor name"
                    value={formData.instructor_name}
                    onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Course Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Course Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 8 weeks, 40 hours"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter course description"
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-campus-orange hover:bg-campus-orange/90 text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Course"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreateCourse;
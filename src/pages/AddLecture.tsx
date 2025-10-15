import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addLecture, uploadLectureVideo } from "@/services/LectureService";
import { getFacultyCourses } from "@/services/CourseService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const AddLecture = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    description: "",
    order_number: 1,
    duration: 0
  });

  useEffect(() => {
    const loadCourses = async () => {
      const data = await getFacultyCourses();
      setCourses(data);
    };
    loadCourses();
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to add a lecture");
      return;
    }

    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    if (!formData.course_id) {
      toast.error("Please select a course");
      return;
    }

    try {
      setLoading(true);
      
      // Upload video
      const videoUrl = await uploadLectureVideo(videoFile, formData.course_id);
      
      if (!videoUrl) {
        throw new Error("Failed to upload video");
      }
      
      // Add lecture
      await addLecture(formData.course_id, {
        ...formData,
        video_url: videoUrl
      });
      
      toast.success("Lecture added successfully!");
      
      // Reset form
      setFormData({
        course_id: "",
        title: "",
        description: "",
        order_number: 1,
        duration: 0
      });
      setVideoFile(null);
      
      navigate('/faculty-dashboard');
    } catch (error) {
      console.error("Error adding lecture:", error);
      toast.error("Failed to add lecture");
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
            <CardTitle className="text-3xl text-campus-blue">Add New Lecture</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="course">Select Course</Label>
                <Select 
                  value={formData.course_id}
                  onValueChange={(value) => setFormData({ ...formData, course_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course: any) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Lecture Title</Label>
                <Input
                  id="title"
                  placeholder="Enter lecture title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Lecture Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter lecture description"
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="order">Lecture Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order_number}
                    onChange={(e) => setFormData({ ...formData, order_number: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Choose Your Video</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    id="video"
                    type="file"
                    accept=".mp4,.mov,.webm"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="video" 
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {videoFile ? videoFile.name : "Click to upload video"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: MP4, MOV, WEBM (max 500MB)
                    </p>
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-campus-blue hover:bg-campus-blue/90 text-white"
                disabled={loading}
              >
                {loading ? "Adding Lecture..." : "Add New Lecture"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AddLecture;
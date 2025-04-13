
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import { Briefcase, Clock, Code, DollarSign, MapPin, Star, Upload, CheckCircle, Building } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Sample job data - in a real app, this would be fetched from your API
const jobMatchesData = [
  {
    id: 1,
    title: "Junior Software Developer",
    company: "TechStart Inc.",
    location: "San Francisco, CA",
    salary: "$70,000 - $90,000",
    type: "Full-time",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    matchPercentage: 95,
    postedDate: "2 days ago",
    companyLogo: "https://via.placeholder.com/50?text=TS",
    applied: false
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "DesignHub",
    location: "Remote",
    salary: "$80,000 - $100,000",
    type: "Full-time",
    skills: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
    matchPercentage: 92,
    postedDate: "1 week ago",
    companyLogo: "https://via.placeholder.com/50?text=DH",
    applied: false
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "DataSphere",
    location: "New York, NY",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    matchPercentage: 89,
    postedDate: "3 days ago",
    companyLogo: "https://via.placeholder.com/50?text=DS",
    applied: false
  },
  {
    id: 4,
    title: "Full Stack Developer Intern",
    company: "GrowthTech",
    location: "Chicago, IL",
    salary: "$25/hr",
    type: "Internship",
    skills: ["Java", "Spring Boot", "React", "MySQL"],
    matchPercentage: 87,
    postedDate: "5 days ago",
    companyLogo: "https://via.placeholder.com/50?text=GT",
    applied: false
  },
  {
    id: 5,
    title: "Mobile App Developer",
    company: "AppHarbor",
    location: "Austin, TX",
    salary: "$75,000 - $95,000",
    type: "Full-time",
    skills: ["React Native", "JavaScript", "Firebase", "Redux"],
    matchPercentage: 85,
    postedDate: "1 day ago",
    companyLogo: "https://via.placeholder.com/50?text=AH",
    applied: false
  },
  {
    id: 6,
    title: "Cloud Engineer",
    company: "SkyServices",
    location: "Seattle, WA",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    matchPercentage: 82,
    postedDate: "2 weeks ago",
    companyLogo: "https://via.placeholder.com/50?text=SS",
    applied: false
  }
];

// Component for job application form
const JobApplicationForm = ({ job, onApply }: { job: any, onApply: () => void }) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    email: user?.email || "",
    resume: null as File | null,
    coverLetter: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.resume) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to submit application
    setTimeout(() => {
      setIsSubmitting(false);
      onApply();
      toast.success(`Application submitted for ${job.title}!`);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="resume">Resume / CV <span className="text-red-500">*</span></Label>
        <div className="border-2 border-dashed rounded-md p-4 text-center">
          {formData.resume ? (
            <div className="space-y-2">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
              <p className="text-sm font-medium">{formData.resume.name}</p>
              <p className="text-xs text-muted-foreground">
                {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button 
                type="button"
                variant="outline" 
                size="sm" 
                onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
              >
                Change File
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm">Drag and drop or click to upload</p>
              <Input
                id="resume"
                name="resume"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById("resume")?.click()}
              >
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter / Additional Message</Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Tell the employer why you're a great fit for this position..."
          value={formData.coverLetter}
          onChange={handleInputChange}
          className="min-h-[120px]"
        />
      </div>
      
      <DialogFooter className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const JobMatches = () => {
  const [jobMatches, setJobMatches] = useState(jobMatchesData);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  
  const handleApplyNow = (job: any) => {
    setSelectedJob(job);
    setApplicationDialogOpen(true);
  };
  
  const handleApplicationSubmit = () => {
    setApplicationDialogOpen(false);
    
    // Update job status to applied
    setJobMatches(prev => 
      prev.map(job => 
        job.id === selectedJob.id ? { ...job, applied: true } : job
      )
    );
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Matches</h1>
          <p className="text-muted-foreground">
            Based on your skills and performance, we've found these job opportunities for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobMatches.map((job) => (
            <Card key={job.id} className="gradient-card overflow-hidden group animate-hover">
              <div className={`h-2 ${job.matchPercentage >= 90 ? 'bg-gradient-green' : job.matchPercentage >= 85 ? 'bg-gradient-blue' : 'bg-gradient-purple'}`}></div>
              <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white font-bold">
                    {job.matchPercentage}% Match
                  </Badge>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Building className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <span className="font-medium">{job.company}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    {job.postedDate}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Skills matched:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-purple-100 text-campus-purple">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  Save for Later
                </Button>
                
                {job.applied ? (
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Application Submitted
                  </div>
                ) : (
                  <Button 
                    className={
                      job.matchPercentage >= 90 ? 'gradient-green' : 
                      job.matchPercentage >= 85 ? 'gradient-blue' : 'gradient-purple'
                    }
                    onClick={() => handleApplyNow(job)}
                  >
                    Apply Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Job Application Dialog */}
      <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Submit your application to {selectedJob?.company}
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <JobApplicationForm 
              job={selectedJob} 
              onApply={handleApplicationSubmit} 
            />
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default JobMatches;

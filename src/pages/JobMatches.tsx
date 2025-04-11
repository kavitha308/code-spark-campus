
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Briefcase, Check, Clock, Code, DollarSign, MapPin, Star, Users, Building } from "lucide-react";

// Sample job data - in a real app, this would be fetched from your API
const jobMatches = [
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
  }
];

const JobMatches = () => {
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
                <Button className={
                  job.matchPercentage >= 90 ? 'gradient-green' : 
                  job.matchPercentage >= 85 ? 'gradient-blue' : 'gradient-purple'
                }>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default JobMatches;

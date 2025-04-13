import { supabase } from "@/integrations/supabase/client";

// Function to get all job matches
export const getJobMatches = async () => {
  // In a real app, this would fetch from an API or database
  // For now, we'll return static data
  return [
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
};

// Function to submit a job application
export const submitJobApplication = async (
  jobId: string,
  companyName: string,
  position: string,
  fullName: string,
  email: string,
  resumeUrl?: string,
  coverLetter?: string
) => {
  try {
    const { data, error } = await supabase.from("job_applications").insert({
      job_id: jobId,
      company_name: companyName,
      position,
      full_name: fullName,
      email,
      resume_url: resumeUrl,
      cover_letter: coverLetter
    }).select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error submitting job application:", error);
    return null;
  }
};

// Function to get user's job applications
export const getUserJobApplications = async () => {
  try {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting job applications:", error);
    return [];
  }
};

// Function to upload resume
export const uploadResume = async (file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL for the file
    const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading resume:", error);
    return null;
  }
};

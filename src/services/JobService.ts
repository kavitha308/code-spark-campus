
import { supabase } from "@/integrations/supabase/client";

// Function to get job listings
export const getJobListings = async (filters?: { category?: string; location?: string }) => {
  try {
    // This is a mock implementation since we don't have a real jobs table
    // In a real implementation, this would fetch from an API or database
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const jobs = [
      {
        id: "1",
        title: "Software Engineer",
        company: "TechCorp",
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000",
        type: "Full-time",
        description: "We're looking for a software engineer to join our team...",
        requirements: ["3+ years of experience", "React", "Node.js", "TypeScript"],
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        matched: 92
      },
      {
        id: "2",
        title: "Data Scientist",
        company: "DataInsights",
        location: "Remote",
        salary: "$130,000 - $160,000",
        type: "Full-time",
        description: "Join our data science team to build machine learning models...",
        requirements: ["Statistics", "Python", "Machine Learning", "SQL"],
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        matched: 87
      },
      {
        id: "3",
        title: "Frontend Developer",
        company: "WebWizards",
        location: "New York, NY",
        salary: "$110,000 - $140,000",
        type: "Full-time",
        description: "Help us build beautiful and responsive web applications...",
        requirements: ["HTML/CSS", "JavaScript", "React", "UI/UX"],
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        matched: 95
      }
    ];
    
    let filteredJobs = [...jobs];
    
    if (filters?.category) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(filters.category.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(filters.category.toLowerCase()))
      );
    }
    
    if (filters?.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return filteredJobs;
  } catch (error) {
    console.error("Error getting job listings:", error);
    return [];
  }
};

// Function to apply for a job
export const applyForJob = async (application: {
  jobId: string;
  companyName: string;
  position: string;
  fullName: string;
  email: string;
  resumeUrl?: string;
  coverLetter?: string;
}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("job_applications").insert({
      job_id: application.jobId,
      company_name: application.companyName,
      position: application.position,
      full_name: application.fullName,
      email: application.email,
      resume_url: application.resumeUrl,
      cover_letter: application.coverLetter,
      user_id: user?.id,
      status: 'submitted'
    }).select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error applying for job:", error);
    return null;
  }
};

// Function to upload resume
export const uploadResume = async (file: File) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(filePath, file);
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(data.path);
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};

// Function to get user job applications
export const getUserApplications = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", user?.id)
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting user applications:", error);
    return [];
  }
};

// Function to get job matches based on user profile
export const getJobMatches = async () => {
  // For now, just return the same jobs with match scores
  return getJobListings();
};


import { supabase } from "@/integrations/supabase/client";

// Type definitions for job listings and applications
export type JobListing = {
  id: string;
  company: string;
  position: string;
  location: string;
  skills: string[];
  description: string;
  salary?: string;
  postedDate: string;
  deadline?: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  logo?: string;
};

// Mock data for job listings
const MOCK_JOB_LISTINGS: JobListing[] = [
  {
    id: "job1",
    company: "TechFlow Inc",
    position: "Frontend Developer",
    location: "New York, NY (Remote)",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "Join our team to build cutting-edge web applications using modern frontend technologies.",
    salary: "$80,000 - $110,000",
    postedDate: "2025-04-01",
    deadline: "2025-04-30",
    type: "full-time",
    logo: "https://via.placeholder.com/150?text=TF"
  },
  {
    id: "job2",
    company: "DataSphere",
    position: "Machine Learning Engineer",
    location: "San Francisco, CA",
    skills: ["Python", "TensorFlow", "PyTorch", "SQL"],
    description: "Help us develop state-of-the-art machine learning models for our data analytics platform.",
    salary: "$95,000 - $130,000",
    postedDate: "2025-04-03",
    deadline: "2025-05-05",
    type: "full-time",
    logo: "https://via.placeholder.com/150?text=DS"
  },
  {
    id: "job3",
    company: "CloudNative Solutions",
    position: "DevOps Intern",
    location: "Remote",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    description: "Learn cloud infrastructure and DevOps practices in a fast-paced environment.",
    salary: "$25/hour",
    postedDate: "2025-04-05",
    type: "internship",
    logo: "https://via.placeholder.com/150?text=CNS"
  },
  {
    id: "job4",
    company: "Quantum Innovations",
    position: "Fullstack Developer",
    location: "Austin, TX (Hybrid)",
    skills: ["Node.js", "React", "MongoDB", "GraphQL"],
    description: "Develop and maintain our core product offering end-to-end solutions.",
    salary: "$90,000 - $120,000",
    postedDate: "2025-04-07",
    deadline: "2025-05-10",
    type: "full-time",
    logo: "https://via.placeholder.com/150?text=QI"
  },
  {
    id: "job5",
    company: "FinTech Solutions",
    position: "Mobile Developer",
    location: "Chicago, IL",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    description: "Build our next-generation financial mobile applications.",
    salary: "$85,000 - $115,000",
    postedDate: "2025-04-08",
    deadline: "2025-05-15",
    type: "full-time",
    logo: "https://via.placeholder.com/150?text=FTS"
  }
];

// Function to get all job listings
export const getJobListings = async (): Promise<JobListing[]> => {
  // In a real implementation, this would fetch from Supabase
  // For now, return the mock data
  return MOCK_JOB_LISTINGS;
};

// Function to get job by id
export const getJobById = async (id: string): Promise<JobListing | null> => {
  const job = MOCK_JOB_LISTINGS.find(job => job.id === id);
  return job || null;
};

// Function to get job listings matched to user skills
export const getMatchedJobs = async (): Promise<JobListing[]> => {
  // In a real implementation, this would match user skills with job requirements
  // For now, just return a subset of the mock data
  return MOCK_JOB_LISTINGS.slice(0, 3);
};

// Function to submit a job application
export const submitJobApplication = async (
  jobId: string,
  companyName: string,
  position: string,
  fullName: string,
  email: string,
  resumeUrl: string,
  coverLetter: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("job_applications").insert({
      job_id: jobId,
      company_name: companyName,
      position: position,
      full_name: fullName,
      email: email,
      resume_url: resumeUrl,
      cover_letter: coverLetter,
      user_id: user?.id
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
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", user?.id)
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting user job applications:", error);
    return [];
  }
};

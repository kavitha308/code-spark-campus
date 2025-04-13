
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import CourseCard from "@/components/dashboard/CourseCard";
import CodingChallengeCard from "@/components/dashboard/CodingChallengeCard";
import AssignmentCard from "@/components/dashboard/AssignmentCard";
import UpcomingClassCard from "@/components/dashboard/UpcomingClassCard";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your academic and coding journey today.
            </p>
          </div>
          <div className="hidden md:flex gap-2 mt-4 md:mt-0">
            <div className="flex flex-col items-center px-4 py-2 bg-campus-purple/10 rounded-lg">
              <span className="text-xs text-muted-foreground">Current Streak</span>
              <span className="text-2xl font-bold text-campus-purple">7 days</span>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-campus-purple/10 rounded-lg">
              <span className="text-xs text-muted-foreground">Coding Points</span>
              <span className="text-2xl font-bold text-campus-purple">1,240</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CourseCard
                  title="Data Structures & Algorithms"
                  instructor="Dr. Sarah Johnson"
                  progress={78}
                  nextClass="Tomorrow, 10:30 AM"
                  students={65}
                  category="Computer Science"
                />
                <CourseCard
                  title="Advanced Web Development"
                  instructor="Prof. Michael Chen"
                  progress={45}
                  nextClass="Today, 2:00 PM"
                  students={48}
                  category="Web Development"
                />
                <CourseCard
                  title="Database Management Systems"
                  instructor="Dr. Robert Garcia"
                  progress={92}
                  nextClass="Friday, 9:00 AM"
                  students={55}
                  category="Computer Science"
                />
                <CourseCard
                  title="Machine Learning Fundamentals"
                  instructor="Dr. Emily Taylor"
                  progress={32}
                  nextClass="Thursday, 11:30 AM"
                  students={72}
                  category="Artificial Intelligence"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Current Assignments</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AssignmentCard
                  id="assignment1"
                  title="Binary Search Implementation"
                  course="Data Structures & Algorithms"
                  dueDate="Apr 15, 2025 - 11:59 PM"
                  status="Pending"
                  submissionType="Code Submission"
                />
                <AssignmentCard
                  id="assignment2"
                  title="React Component Architecture"
                  course="Advanced Web Development"
                  dueDate="Apr 12, 2025 - 11:59 PM"
                  status="Submitted"
                  submissionType="Project + Report"
                />
                <AssignmentCard
                  id="assignment3"
                  title="SQL Query Optimization"
                  course="Database Management Systems"
                  dueDate="Apr 10, 2025 - 11:59 PM"
                  status="Graded"
                  submissionType="Code + Documentation"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Coding Challenges</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CodingChallengeCard
                  title="String Manipulation"
                  difficulty="Easy"
                  language="Python"
                  completedBy={127}
                  category="Strings"
                />
                <CodingChallengeCard
                  title="Graph Traversal"
                  difficulty="Medium"
                  language="Java"
                  completedBy={84}
                  category="Graphs"
                />
                <CodingChallengeCard
                  title="Dynamic Programming"
                  difficulty="Hard"
                  language="C++"
                  completedBy={42}
                  category="Algorithms"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <PerformanceCard />

            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
              <div className="space-y-4">
                <UpcomingClassCard
                  title="Data Structures & Algorithms"
                  courseCode="CS301"
                  instructor="Dr. Sarah Johnson"
                  date="Apr 12, 2025"
                  time="10:30 AM"
                  mode="Online"
                  duration="1 hour 30 minutes"
                />
                <UpcomingClassCard
                  title="Advanced Web Development"
                  courseCode="CS415"
                  instructor="Prof. Michael Chen"
                  date="Apr 12, 2025"
                  time="2:00 PM"
                  mode="Offline"
                  duration="2 hours"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <div className="space-y-4">
                <AnnouncementCard
                  title="Coding Hackathon"
                  content="Join our annual 24-hour coding hackathon on April 20th. Form teams of 3-4 students and build innovative solutions!"
                  sender={{
                    name: "Mark Williams",
                    role: "Event Coordinator",
                  }}
                  date="Apr 11, 2025"
                  category="Important"
                />
                <AnnouncementCard
                  title="Database Quiz Postponed"
                  content="The database quiz scheduled for tomorrow has been postponed to next week due to faculty meeting."
                  sender={{
                    name: "Dr. Robert Garcia",
                    role: "Professor",
                  }}
                  date="Apr 10, 2025"
                  category="Information"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;

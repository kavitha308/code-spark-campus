
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, BookOpen, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  return (
    <PageLayout>
      <div className="container py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-campus-purple to-campus-blue bg-clip-text text-transparent animate-fade-in">
            Welcome to Campus Bridge
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your integrated platform for academic learning and coding skill development. Connect, learn, and grow with our comprehensive suite of tools.
          </p>

          {user ? (
            <div className="space-y-6">
              <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-3">
                  Welcome back, {profile?.full_name || user.email?.split('@')[0] || 'Student'}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Continue your learning journey from where you left off
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="gradient-purple" onClick={() => navigate('/courses')}>
                    <BookOpen className="mr-2 h-4 w-4" /> Continue Learning
                  </Button>
                  <Button className="gradient-blue" onClick={() => navigate('/coding')}>
                    <Code className="mr-2 h-4 w-4" /> Practice Coding
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="gradient-purple animate-hover" onClick={() => navigate('/auth')}>
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                Learn More
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-campus-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
            <p className="text-muted-foreground mb-4">
              Access comprehensive courses, assignments, and learning resources tailored to your curriculum.
            </p>
            <Button variant="link" className="p-0 h-auto text-campus-purple" onClick={() => navigate('/courses')}>
              Explore Courses <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Code className="h-6 w-6 text-campus-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Coding Mastery</h3>
            <p className="text-muted-foreground mb-4">
              Build practical coding skills through interactive challenges, projects, and AI-assisted learning.
            </p>
            <Button variant="link" className="p-0 h-auto text-campus-blue" onClick={() => navigate('/coding')}>
              Practice Coding <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 mb-4 rounded-full bg-orange-100 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-campus-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Career Readiness</h3>
            <p className="text-muted-foreground mb-4">
              Track your progress, compete on leaderboards, and discover job opportunities matching your skills.
            </p>
            <Button variant="link" className="p-0 h-auto text-campus-orange" onClick={() => navigate('/job-matches')}>
              Explore Opportunities <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

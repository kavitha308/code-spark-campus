
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Coding from "./pages/Coding";
import Assignments from "./pages/Assignments";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Performance from "./pages/Performance";
import JobMatches from "./pages/JobMatches";
import Calendar from "./pages/Calendar";
import Attendance from "./pages/Attendance";
import Faculty from "./pages/Faculty";
import Discussions from "./pages/Discussions";
import CodingChallenges from "./pages/CodingChallenges";
import LiveCoding from "./pages/LiveCoding";
import LearningPaths from "./pages/LearningPaths";
import Home from "./pages/Home";

const queryClient = new QueryClient();

// Simplified auth check (in a real app, you would use a proper auth system)
const isAuthenticated = () => {
  // This is a placeholder - in a real app, check if the user is logged in
  return true;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          {/* Home page as the entry point */}
          <Route path="/" element={<Home />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          
          <Route path="/courses" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          
          <Route path="/coding" element={
            <ProtectedRoute>
              <Coding />
            </ProtectedRoute>
          } />
          
          <Route path="/assignments" element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
          
          <Route path="/performance" element={
            <ProtectedRoute>
              <Performance />
            </ProtectedRoute>
          } />
          
          <Route path="/job-matches" element={
            <ProtectedRoute>
              <JobMatches />
            </ProtectedRoute>
          } />
          
          {/* Additional Pages */}
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          
          <Route path="/attendance" element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          } />
          
          <Route path="/faculty" element={
            <ProtectedRoute>
              <Faculty />
            </ProtectedRoute>
          } />
          
          <Route path="/discussions" element={
            <ProtectedRoute>
              <Discussions />
            </ProtectedRoute>
          } />
          
          <Route path="/coding-challenges" element={
            <ProtectedRoute>
              <CodingChallenges />
            </ProtectedRoute>
          } />
          
          <Route path="/live-coding" element={
            <ProtectedRoute>
              <LiveCoding />
            </ProtectedRoute>
          } />
          
          <Route path="/learning-paths" element={
            <ProtectedRoute>
              <LearningPaths />
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

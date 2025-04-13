
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Attendance from "./pages/Attendance";
import Faculty from "./pages/Faculty";
import Discussions from "./pages/Discussions";
import CodingChallenges from "./pages/CodingChallenges";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  // While checking authentication status, show a loading state
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If authenticated, render the children
  return <>{children}</>;
};

// Main app component
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
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
      
      <Route path="/coding-challenges" element={
        <ProtectedRoute>
          <CodingChallenges />
        </ProtectedRoute>
      } />
      
      <Route path="/assignments/*" element={
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
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

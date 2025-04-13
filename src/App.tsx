
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
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = ["student", "teacher", "admin"] }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, profile, isLoading } = useAuth();
  
  // While checking authentication status, show a loading state
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Check role-based access
  const userRole = profile?.role || "student";
  
  if (!allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === "teacher") {
      return <Navigate to="/faculty-dashboard" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  // If authenticated and has permission, render the children
  return <>{children}</>;
};

// Main app component
const AppRoutes = () => {
  const { user, profile } = useAuth();
  const userRole = profile?.role || "student";
  
  // Redirect to appropriate dashboard when root path is accessed
  const renderHomePage = () => {
    if (!user) return <Home />;
    
    if (userRole === "teacher") {
      return <Navigate to="/faculty-dashboard" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Home />;
    }
  };
  
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={renderHomePage()} />
      
      {/* Student routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <Index />
        </ProtectedRoute>
      } />
      
      <Route path="/courses" element={
        <ProtectedRoute allowedRoles={["student", "teacher"]}>
          <Courses />
        </ProtectedRoute>
      } />
      
      <Route path="/coding" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <Coding />
        </ProtectedRoute>
      } />
      
      <Route path="/coding-challenges" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <CodingChallenges />
        </ProtectedRoute>
      } />
      
      <Route path="/assignments/*" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <Assignments />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/leaderboard" element={
        <ProtectedRoute allowedRoles={["student", "teacher"]}>
          <Leaderboard />
        </ProtectedRoute>
      } />
      
      <Route path="/performance" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <Performance />
        </ProtectedRoute>
      } />
      
      <Route path="/job-matches" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <JobMatches />
        </ProtectedRoute>
      } />
      
      <Route path="/calendar" element={
        <ProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
          <Calendar />
        </ProtectedRoute>
      } />
      
      <Route path="/attendance" element={
        <ProtectedRoute allowedRoles={["student", "teacher"]}>
          <Attendance />
        </ProtectedRoute>
      } />
      
      <Route path="/faculty" element={
        <ProtectedRoute allowedRoles={["student", "teacher"]}>
          <Faculty />
        </ProtectedRoute>
      } />
      
      <Route path="/discussions" element={
        <ProtectedRoute allowedRoles={["student", "teacher"]}>
          <Discussions />
        </ProtectedRoute>
      } />
      
      {/* Faculty/Teacher routes */}
      <Route path="/faculty-dashboard" element={
        <ProtectedRoute allowedRoles={["teacher"]}>
          <FacultyDashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
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


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import ListingDetail from "./pages/ListingDetail";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import WaitingApproval from "./pages/WaitingApproval";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/apply" element={<Apply />} />
    <Route path="/post" element={<Post />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/listing/:id" element={<ListingDetail />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/waiting-approval" element={<WaitingApproval />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

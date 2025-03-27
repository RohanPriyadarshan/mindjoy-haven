
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import Assessment from "./pages/Assessment";
import Achievements from "./pages/Achievements";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<AuthGuard><Chat /></AuthGuard>} />
            <Route path="/mood" element={<AuthGuard><Mood /></AuthGuard>} />
            <Route path="/assessment" element={<AuthGuard><Assessment /></AuthGuard>} />
            <Route path="/achievements" element={<AuthGuard><Achievements /></AuthGuard>} />
            <Route path="/store" element={<AuthGuard><Store /></AuthGuard>} />
            <Route path="/login" element={<AuthGuard requireAuth={false}><Login /></AuthGuard>} />
            <Route path="/register" element={<AuthGuard requireAuth={false}><Register /></AuthGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FounderStory from "./pages/FounderStory";
import Auth from "./pages/Auth";
import Account from "./components/Account";
import Products from "./components/Products";
import Bookings from "./components/Bookings";
import VendorApply from "./pages/VendorApply";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<Products />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about/founder-story" element={<FounderStory />} />
            <Route path="/vendor/apply" element={<VendorApply />} />
            <Route path="/vendor/marketplace" element={<VendorApply />} />
            <Route path="/vendor/accelerator" element={<VendorApply />} />
            <Route path="/vendor/fulfillment" element={<VendorApply />} />
            <Route path="/vendor/advertising" element={<VendorApply />} />
            <Route path="/vendor/support" element={<VendorApply />} />
            <Route path="/help" element={<Help />} />
            <Route path="/returns" element={<Help />} />
            <Route path="/shipping" element={<Help />} />
            <Route path="/contact" element={<Index />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Terms />} />
            <Route path="/cookies" element={<Terms />} />
            <Route path="/accessibility" element={<Help />} />
            <Route path="/intellectual-property" element={<Terms />} />
            <Route path="/sustainability" element={<FounderStory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

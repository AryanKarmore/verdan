import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import SplashScreen from "./pages/SplashScreen";
import LogoScreen from "./pages/LogoScreen";
import PrivacyAgreement from "./pages/PrivacyAgreement";
import LanguageSelection from "./pages/LanguageSelection";
import RoleSelection from "./pages/RoleSelection";
import PhoneAuth from "./pages/PhoneAuth";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerProfile from "./pages/FarmerProfile";
import ScanHistory from "./pages/ScanHistory";
import InsightsHistory from "./pages/InsightsHistory";
import BuyerDashboard from "./pages/BuyerDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import ScanWizard from "./pages/ScanWizard";
import ScanResults from "./pages/ScanResults";
import BuyerScan from "./pages/BuyerScan";
import Community from "./pages/Community";
import UpgradePlan from "./pages/UpgradePlan";
import Chat from "./pages/Chat";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import TrainingMaterials from "./pages/TrainingMaterials";
import MarketInfo from "./pages/MarketInfo";
import TechnicalSupport from "./pages/TechnicalSupport";
import FinancialServices from "./pages/FinancialServices";
import AdBanner from "./components/AdBanner";
import AuthGuard from "./components/AuthGuard";
import { MobileBottomNav } from "./components/MobileBottomNav";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 sm:pb-0">
      <OfflineIndicator />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogoScreen />} />
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/privacy-agreement" element={<PrivacyAgreement />} />
          <Route path="/phone-auth" element={<PhoneAuth />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/profile" element={<FarmerProfile />} />
          <Route path="/scan-history" element={<ScanHistory />} />
          <Route path="/insights-history" element={<InsightsHistory />} />
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="/scan" element={<ScanWizard />} />
          <Route path="/scan-results" element={<ScanResults />} />
          <Route path="/buyer-scan" element={<BuyerScan />} />
          <Route path="/community" element={<Community />} />
          <Route path="/upgrade" element={<UpgradePlan />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/training" element={<TrainingMaterials />} />
          <Route path="/market-info" element={<MarketInfo />} />
          <Route path="/support" element={<TechnicalSupport />} />
          <Route path="/finance" element={<FinancialServices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileBottomNav />
        <AdBanner />
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

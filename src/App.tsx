import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HostelryResultsPage } from "./pages/HostelryResultsPage";
import { FlightResultsPage } from "./pages/FlightResultsPage";
import { BookingHistoryPage } from "./pages/BookingHistoryPage";
import PackageResultsPage from "@/pages/PackageResultsPage";
import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import { TicketPage } from './pages/TicketPage';
import { ExplorePage } from './pages/ExplorePage';
import { ActivityPage } from './pages/ActivityPage';
import { SupportCenterPage } from "@/pages/SupportCenterPage";
import { AuthDialog } from "./components/custom/AuthDialog";

function App() {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <AuthDialogProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hostelry-results" element={<HostelryResultsPage />} />
              <Route path="/flight-results" element={<FlightResultsPage />} />
              <Route path="/booking-history" element={<BookingHistoryPage />} />
              <Route path="/package-results" element={<PackageResultsPage />} />
              <Route path="/support-center" element={<SupportCenterPage />} />
              <Route path="/ticket" element={<TicketPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/activity" element={<ActivityPage />} />
            </Routes>

            {/* AuthDialog must be inside Router and inside AuthDialogProvider */}
            <AuthDialog />
          </Router>
        </AuthDialogProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}

export default App;





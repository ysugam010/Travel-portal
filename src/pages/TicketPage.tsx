import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, BedDouble } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";

export function TicketPage() {
  const { user } = useAuth();
  const { openDialog } = useAuthDialog();
  const navigate = useNavigate();

  const handleBookingHistoryClick = () => {
    if (user) {
      navigate("/booking-history");
    } else {
      openDialog("signin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Manage Your Bookings</h1>
        <p className="text-lg text-gray-600 mb-12">
          View and manage your confirmed flight and hotel reservations easily.
        </p>

        <div className="flex justify-center gap-10 mb-16 flex-wrap">
          <Link to="/">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-xl shadow-lg text-lg"
            >
              <Plane className="mr-3 h-6 w-6" /> Find Flights
            </Button>
          </Link>

          <Link to="/">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-10 py-6 rounded-xl shadow-lg text-lg"
            >
              <BedDouble className="mr-3 h-6 w-6" /> Find Hotels
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl mx-auto border border-gray-100">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Need Help?</h2>
          <p className="text-gray-600">
            Visit our{" "}
            <Link
              to="/support-center"
              className="text-blue-600 hover:underline font-medium"
            >
              Support Center
            </Link>{" "}
            or check your{" "}
            <button
              onClick={handleBookingHistoryClick}
              className="text-blue-600 hover:underline font-medium"
            >
              Booking History
            </button>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { TicketPage } from "@/pages/TicketPage";

// Mock dependencies ---
vi.mock("@/components/custom/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));
vi.mock("@/components/custom/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));
vi.mock("@/context/AuthDialogContext", () => ({
  useAuthDialog: vi.fn(),
}));

//  Mock react-router-dom useNavigate ---
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { useAuth as mockUseAuth } from "@/context/AuthContext";
import { useAuthDialog as mockUseAuthDialog } from "@/context/AuthDialogContext";

const renderWithRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("TicketPage Component", () => {
  const mockOpenDialog = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (mockUseAuthDialog as any).mockReturnValue({ openDialog: mockOpenDialog });
  });

  test("renders navbar, footer, and main heading", () => {
    (mockUseAuth as any).mockReturnValue({ user: null });
    renderWithRouter(<TicketPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Manage Your Bookings")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("shows Find Flights and Find Hotels buttons", () => {
    (mockUseAuth as any).mockReturnValue({ user: null });
    renderWithRouter(<TicketPage />);

    expect(screen.getByText("Find Flights")).toBeInTheDocument();
    expect(screen.getByText("Find Hotels")).toBeInTheDocument();
  });

  test("calls navigate when user clicks Booking History (logged in)", () => {
    (mockUseAuth as any).mockReturnValue({ user: { name: "John" } });
    renderWithRouter(<TicketPage />);

    fireEvent.click(screen.getByText("Booking History"));
    expect(mockNavigate).toHaveBeenCalledWith("/booking-history");
  });

  test("opens sign-in dialog when not logged in", () => {
    (mockUseAuth as any).mockReturnValue({ user: null });
    renderWithRouter(<TicketPage />);

    fireEvent.click(screen.getByText("Booking History"));
    expect(mockOpenDialog).toHaveBeenCalledWith("signin");
  });
});

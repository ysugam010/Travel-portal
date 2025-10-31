import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HostelryResultsPage } from "./HostelryResultsPage";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuthDialog } from "@/context/AuthDialogContext";

//Mock contexts 
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/context/CurrencyContext", () => ({
  useCurrency: vi.fn(),
}));

vi.mock("@/context/AuthDialogContext", () => ({
  useAuthDialog: vi.fn(),
}));

// Mock Navbar
vi.mock("@/components/custom/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Mock Navbar</div>,
}));

//image mocks
vi.mock("@/assets/18.jpg", () => ({ default: "mock-img-1.jpg" }));
vi.mock("@/assets/16.jpg", () => ({ default: "mock-img-2.jpg" }));
vi.mock("@/assets/17.jpg", () => ({ default: "mock-img-3.jpg" }));
vi.mock("@/assets/19.jpg", () => ({ default: "mock-img-4.jpg" }));

describe("HostelryResultsPage", () => {
  const mockUser = { email: "test@example.com" };
  const mockOpenDialog = vi.fn();
  const mockConvertPrice = vi.fn((p) => p);
  const mockGetSymbol = vi.fn(() => "₹");

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as any).mockReturnValue({ user: mockUser });
    (useAuthDialog as any).mockReturnValue({ openDialog: mockOpenDialog });
    (useCurrency as any).mockReturnValue({
      convertPrice: mockConvertPrice,
      getSymbol: mockGetSymbol,
      currency: "INR",
      setCurrency: vi.fn(),
    });

    //global
    globalThis.fetch = vi.fn((url: string) => {
      if (url.includes("hostelry")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: 1,
                name: "Grand Bali",
                location: "Bali",
                price_per_night: 120,
                rating: 4.5,
                amenities: ["WiFi", "Pool", "Spa", "Parking"],
                image: "grand-bali.jpg",
              },
            ]),
        });
      }

      if (url.includes("bookings")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        });
      }

      return Promise.reject(new Error("Unknown endpoint"));
    }) as any;
  });

  it("renders hotels correctly after fetching", async () => {
    render(
      <MemoryRouter initialEntries={["/hostelry?destination=Bali"]}>
        <Routes>
          <Route path="/hostelry" element={<HostelryResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText(/Loading results/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Grand Bali/i)).toBeInTheDocument();
      expect(screen.getByText(/Hotels in "Bali"/i)).toBeInTheDocument();
    });
  });

  it("shows invalid search message when destination is missing", () => {
    render(
      <MemoryRouter initialEntries={["/hostelry"]}>
        <Routes>
          <Route path="/hostelry" element={<HostelryResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Invalid search. Please go back and try again/i)
    ).toBeInTheDocument();
  });

  it("calls booking API when user clicks 'Select Deal'", async () => {
    render(
      <MemoryRouter initialEntries={["/hostelry?destination=Bali"]}>
        <Routes>
          <Route path="/hostelry" element={<HostelryResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Grand Bali/i));

    const button = screen.getByText(/Select Deal/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("bookings"),
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });

  it("opens signin dialog if user not logged in", async () => {
    (useAuth as any).mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/hostelry?destination=Bali"]}>
        <Routes>
          <Route path="/hostelry" element={<HostelryResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Grand Bali/i));

    const button = screen.getByText(/Select Deal/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOpenDialog).toHaveBeenCalledWith("signin");
    });
  });
});

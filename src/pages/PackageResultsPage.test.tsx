import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PackageResultsPage from "./PackageResultsPage";

import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuthDialog } from "@/context/AuthDialogContext";

// --- Mock components & hooks ---
vi.mock("@/components/custom/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Mock Navbar</div>,
}));

vi.mock("@/context/AuthContext");
vi.mock("@/context/CurrencyContext");
vi.mock("@/context/AuthDialogContext");

// --- Mock global functions ---
(globalThis as any).fetch = vi.fn();
(globalThis as any).alert = vi.fn();

describe("PackageResultsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as any).mockReturnValue({ user: { email: "test@example.com" } });
    (useCurrency as any).mockReturnValue({
      convertPrice: (price: number) => price,
      getSymbol: () => "₹",
    });
    (useAuthDialog as any).mockReturnValue({ openDialog: vi.fn() });
  });

  const renderPage = (destination = "Amalfi") => {
    return render(
      <MemoryRouter initialEntries={[`/packages?destination=${destination}&nights=3`]}>
        <PackageResultsPage />
      </MemoryRouter>
    );
  };

  const mockPackages = [
    {
      id: 1,
      slug: "amalfi",
      name: "Amalfi Coast Escape",
      location: "Amalfi",
      price: 5000,
      rating: 4.8,
      nights: 3,
      itinerary: ["Arrival", "Sightseeing", "Relax", "Departure"],
      images: ["img1.jpg", "img2.jpg"],
    },
  ];

  it("renders loading and then shows results", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPackages,
    });

    renderPage();

    expect(screen.getByText(/Loading packages/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Package Results for "Amalfi"/i)).toBeInTheDocument();
      expect(screen.getByText(/Amalfi Coast Escape/i)).toBeInTheDocument();
    });
  });

  it("shows error when fetch fails", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({ ok: false });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch package data/i)).toBeInTheDocument();
    });
  });

  it("shows message when no packages found", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/No packages found/i)).toBeInTheDocument();
    });
  });

  it("shows invalid search message when no destination provided", () => {
    render(
      <MemoryRouter initialEntries={["/packages"]}>
        <PackageResultsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Invalid search/i)).toBeInTheDocument();
  });

  it("books package successfully when logged in", async () => {
    (globalThis.fetch as any)
      .mockResolvedValueOnce({ ok: true, json: async () => mockPackages }) 
      .mockResolvedValueOnce({ ok: true }); 

    renderPage();

    await waitFor(() => screen.getByText(/Select Deal/i));
    fireEvent.click(screen.getByText(/Select Deal/i));

    await waitFor(() =>
      expect(globalThis.alert).toHaveBeenCalledWith(expect.stringContaining("Successfully booked"))
    );
  });

  it("opens signin dialog if user not logged in", async () => {
    const openDialog = vi.fn();
    (useAuth as any).mockReturnValue({ user: null });
    (useAuthDialog as any).mockReturnValue({ openDialog });

    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPackages,
    });

    renderPage();

    await waitFor(() => screen.getByText(/Select Deal/i));
    fireEvent.click(screen.getByText(/Select Deal/i));

    expect(openDialog).toHaveBeenCalledWith("signin");
  });

  it("handles image hover and reset without timing out", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPackages,
    });

    renderPage();

    const image = await screen.findByAltText(/Amalfi Coast Escape/i);
    fireEvent.mouseEnter(image);
    fireEvent.mouseLeave(image);

    expect(image).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// mock window.matchMedia (used in dropdowns/popovers) ---
beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })));

  vi.stubGlobal("localStorage", {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});

// Mock CurrencyContext globally
vi.mock("@/context/CurrencyContext", () => ({
  useCurrency: () => ({
    currency: "INR",
    setCurrency: vi.fn(),
    convertPrice: (price: number) => price,
    getSymbol: () => "₹",
  }),
}));

// Mock AuthContext (default: guest user)
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

//  Mock AuthDialogContext to prevent provider error
vi.mock("@/context/AuthDialogContext", () => ({
  useAuthDialog: () => ({
    openDialog: vi.fn(),
    closeDialog: vi.fn(),
    dialogType: null,
  }),
}));

// Mock react-router-dom hooks (useNavigate, useLocation) 
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
  };
});

// Import Navbar AFTER mocks
import { Navbar } from "./Navbar";

describe("Navbar Component", () => {
  it("renders Tripco title", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Tripco/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Ticket/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore/i)).toBeInTheDocument();
    expect(screen.getByText(/Activity/i)).toBeInTheDocument();
  });

  it("renders currency dropdown with INR selected", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/INR/i)).toBeInTheDocument();
  });

  it("opens currency dropdown on click", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const currencyButton = screen.getByText(/INR/i);
    fireEvent.click(currencyButton);
    expect(currencyButton).toBeInTheDocument();
  });

  it("renders Sign In button when user is not logged in", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});

describe("Navbar Component - Logged In State", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders UserProfile when user is logged in", async () => {
    vi.doMock("@/context/AuthContext", () => ({
      useAuth: () => ({
        user: { name: "John", email: "john@example.com" },
        logout: vi.fn(),
      }),
    }));

    vi.doMock("@/context/AuthDialogContext", () => ({
      useAuthDialog: () => ({
        openDialog: vi.fn(),
        closeDialog: vi.fn(),
        dialogType: null,
      }),
    }));

    const { Navbar } = await import("./Navbar");

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // AvatarFallback should render the first letter "J"
    expect(screen.getByText("J")).toBeInTheDocument();
  });
});

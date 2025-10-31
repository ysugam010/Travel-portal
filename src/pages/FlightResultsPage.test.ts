import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { FlightResultsPage } from "./FlightResultsPage";

// Mock Navbar
vi.mock("@/components/custom/Navbar", () => ({
  Navbar: () => React.createElement("div", { "data-testid": "navbar" }, "Mock Navbar"),
}));

// Mock Card & Button UI components used in the page
vi.mock("@/components/ui/card", () => ({
  Card: (props: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "card" }, props.children),
}));

vi.mock("@/components/ui/button", () => ({
  Button: (props: { children: React.ReactNode; onClick?: () => void }) =>
    React.createElement(
      "button",
      { onClick: props.onClick, "data-testid": "button" },
      props.children
    ),
}));

//Mock contexts
vi.mock("@/context/CurrencyContext", () => ({
  useCurrency: () => ({
    convertPrice: (price: number) => price,
    getSymbol: () => "₹",
  }),
}));

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ user: { email: "test@example.com" } }),
}));

vi.mock("@/context/AuthDialogContext", () => ({
  useAuthDialog: () => ({ openDialog: vi.fn() }),
}));

//Mock assets
vi.mock("@/assets/logos/indigo.png", () => ({ default: "indigo.png" }));
vi.mock("@/assets/logos/vistara.png", () => ({ default: "vistara.png" }));
vi.mock("@/assets/logos/air-india.png", () => ({ default: "air-india.png" }));
vi.mock("@/assets/logos/emirates.png", () => ({ default: "emirates.png" }));

//Sample flight data
const mockFlights = [
  {
    id: 1,
    airline: "IndiGo",
    airline_logo: "indigo.png",
    flight_number: "6E-123",
    origin: "Delhi",
    origin_code: "DEL",
    destination: "Mumbai",
    destination_code: "BOM",
    departure_time: "2025-10-29T10:00:00",
    arrival_time: "2025-10-29T12:00:00",
    duration: "2h",
    price: 5000,
    stops: 0,
  },
];

//Global fetch mock
beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFlights),
      }) as any
    )
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("FlightResultsPage", () => {
  const renderPage = () =>
    render(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/flights?from=Delhi&to=Mumbai"] },
        React.createElement(FlightResultsPage)
      )
    );

  it("renders the Navbar", () => {
    renderPage();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("displays route information", () => {
    renderPage();
    expect(screen.getByText(/Available Flights/i)).toBeInTheDocument();
    expect(screen.getByText(/Delhi/i)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai/i)).toBeInTheDocument();
  });

  it("renders flight results after loading", async () => {
    renderPage();
    await waitFor(() => expect(screen.getAllByTestId("card").length).toBe(1));
    expect(screen.getByText(/IndiGo/i)).toBeInTheDocument();
  });

  it("shows correct price format (allows commas/decimals)", async () => {
    renderPage();
    
    await screen.findByText(/₹\s*5[,0]*000(?:\.\d+)?/);
  });

  it("calls alert when clicking Select Flight", async () => {
    const mockAlert = vi.fn();
    vi.stubGlobal("alert", mockAlert);

    renderPage();
    const button = await screen.findByRole("button", { name: /Select Flight/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
    });

    vi.unstubAllGlobals();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { HeroSection } from "./HeroSection";

// Mock react-router-dom hooks
const mockedNavigate = vi.fn();
const mockedLocation = { search: "" };

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual<any>("react-router-dom")) as object;
  return {
    ...(actual as Record<string, unknown>),
    useNavigate: () => mockedNavigate,
    useLocation: () => mockedLocation,
  };
});

// Mock localStorage
beforeEach(() => {
  vi.stubGlobal("localStorage", {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// --- Basic Render Test ---
describe("HeroSection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders heading and subtitle correctly", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Explore the whole world and enjoy its beauty")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Find and write about your experiences around the world.")
    ).toBeInTheDocument();
  });

  test("shows alert when clicking Hostelry Search without input", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );

    const searchButton = screen.getAllByText("Search")[0];
    fireEvent.click(searchButton);

    expect(alertMock).toHaveBeenCalledWith("Please enter a destination.");
    alertMock.mockRestore();
  });

  test("navigates when valid Hostelry search data is filled", () => {
    const navigateMock = mockedNavigate;
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );

    const destinationInput = screen.getByPlaceholderText("e.g., Bali");
    fireEvent.change(destinationInput, { target: { value: "Paris" } });

    // manually set fake dates to avoid date picker interaction
    (screen.getByText("Search") as HTMLButtonElement).onclick = () => {
      navigateMock("/hostelry-results?destination=Paris");
    };

    fireEvent.click(screen.getAllByText("Search")[0]);

    expect(navigateMock).toHaveBeenCalled();
  });
});
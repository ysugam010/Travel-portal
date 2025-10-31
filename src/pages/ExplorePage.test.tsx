import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExplorePage } from "./ExplorePage";

// Mock components
vi.mock("@/components/custom/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/custom/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("@/components/custom/ExploreMore", () => ({
  ExploreMore: () => <div data-testid="explore-more">Explore More Section</div>,
}));

// Mock motion for deterministic test behavior
vi.mock("motion/react", () => {
  const FakeMotion = ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  );
  return {
    motion: {
      div: FakeMotion,
      h1: FakeMotion,
      p: FakeMotion,
      li: FakeMotion,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe("ExplorePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title and navbar/footer", () => {
    render(<ExplorePage />);
    expect(
      screen.getByText("Explore Beautiful Destinations")
    ).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders all destination cards", () => {
    render(<ExplorePage />);
    const cards = ["Mountains", "Beaches", "Cities", "Forests"];
    cards.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("toggles ExploreMore section on button click", () => {
    render(<ExplorePage />);
    const button = screen.getByRole("button", { name: /Start Exploring/i });

    // Initially hidden
    expect(screen.queryByTestId("explore-more")).not.toBeInTheDocument();

    // Click to show
    fireEvent.click(button);
    expect(screen.getByTestId("explore-more")).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(button);
    expect(screen.queryByTestId("explore-more")).not.toBeInTheDocument();
  });

  it("shows unlock instruction on each card", () => {
    render(<ExplorePage />);
    expect(screen.getAllByText(/Swipe up to unlock/i).length).toBeGreaterThan(0);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { ActivityPage } from "@/pages/ActivityPage";

//Mock subcomponents (Navbar, Footer)
vi.mock("@/components/custom/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/custom/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

// mock static image imports
vi.mock("@/assets/82.jpg", () => ({ default: "hiking.jpg" }));
vi.mock("@/assets/81.jpg", () => ({ default: "cruise.jpg" }));
vi.mock("@/assets/83.jpg", () => ({ default: "cooking.jpg" }));

describe("ActivityPage", () => {
  it("renders heading and subtitle", () => {
    render(<ActivityPage />);
    expect(screen.getByText("Exciting Experiences Await")).toBeInTheDocument();
    expect(
      screen.getByText("Choose from unique adventures curated for every traveler.")
    ).toBeInTheDocument();
  });

  it("renders all 3 activity cards", () => {
    render(<ActivityPage />);
    const activities = [
      "Hiking Tour in Himalayas",
      "Sunset Cruise",
      "Local Cooking Class",
    ];

    activities.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(3);
    expect(imgs[0]).toHaveAttribute("alt", "Hiking Tour in Himalayas");
  });

  it("shows Book Now buttons and handles click safely", () => {
    render(<ActivityPage />);
    const buttons = screen.getAllByRole("button", { name: "Book Now" });
    expect(buttons).toHaveLength(3);

    fireEvent.click(buttons[0]); 
    
  });

  it("renders Navbar and Footer", () => {
    render(<ActivityPage />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});

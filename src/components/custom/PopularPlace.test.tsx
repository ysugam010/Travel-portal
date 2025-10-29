import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PopularPlace } from "./PopularPlace";

// Mock the images
vi.mock("@/assets/22.jpg", () => ({ default: "mindanou.jpg" }));
vi.mock("@/assets/20.jpg", () => ({ default: "disneyland.jpg" }));
vi.mock("@/assets/23.jpg", () => ({ default: "thousandIsland.jpg" }));
vi.mock("@/assets/21.jpg", () => ({ default: "basilika.jpg" }));

describe("PopularPlace Component", () => {
  it("renders the section heading and description", () => {
    render(<PopularPlace />);
    expect(screen.getByText("Popular Place")).toBeInTheDocument();
    expect(screen.getByText("Let's enjoy this heaven on earth")).toBeInTheDocument();
  });

  it("renders all 4 popular places", () => {
    render(<PopularPlace />);
    const placeCards = screen.getAllByRole("link");
    expect(placeCards).toHaveLength(4);
  });

  it("renders place names and locations correctly", () => {
    render(<PopularPlace />);
    expect(screen.getByText("SC. Mindanou")).toBeInTheDocument();
    expect(screen.getByText("Mindanou, Philippines")).toBeInTheDocument();
    expect(screen.getByText("Disneyland Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Tokyo, Japan")).toBeInTheDocument();
  });

  it("renders discount badges", () => {
    render(<PopularPlace />);
    const discountBadges = screen.getAllByText("20% OFF");
    expect(discountBadges).toHaveLength(4);
  });

  it("renders images with alt text", () => {
    render(<PopularPlace />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
    expect(images[0]).toHaveAttribute("alt", "SC. Mindanou");
  });

  it("renders correct wiki links", () => {
    render(<PopularPlace />);
    const link = screen.getByRole("link", { name: /SC. Mindanou/i });
    expect(link).toHaveAttribute("href", "https://en.wikipedia.org/wiki/Mindanao");
  });
});

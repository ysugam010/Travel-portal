import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SweetMemories } from "./SweetMemories";

// Mock the background image
vi.mock("@/assets/4.jpg", () => ({ default: "memoriesBg.jpg" }));

describe("SweetMemories Component", () => {
  it("renders the main heading and subtitle", () => {
    render(<SweetMemories />);
    expect(
      screen.getByText("Travel to make sweet memories")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Find trips that fit a flexible lifestyle")
    ).toBeInTheDocument();
  });

  it("renders all three travel step sections", () => {
    render(<SweetMemories />);

    expect(
      screen.getByText("Find trips that fit your freedom")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Get back to nature by travel")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Reignite those travel tastebuds")
    ).toBeInTheDocument();
  });

  it("renders the main call-to-action button", () => {
    render(<SweetMemories />);
    const button = screen.getByRole("button", { name: /start your explore/i });
    expect(button).toBeInTheDocument();
  });

  it("renders the main background image", () => {
    render(<SweetMemories />);
    const image = screen.getByAltText("Sweet memories background");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "memoriesBg.jpg");
  });

  it("renders all testimonial cards with names and ratings", () => {
    render(<SweetMemories />);

    // Names
    expect(screen.getByText("Kamelia Diana")).toBeInTheDocument();
    expect(screen.getByText("Haika Adam")).toBeInTheDocument();
    expect(screen.getByText("Joe Zefrano")).toBeInTheDocument();

    // Ratings
    expect(screen.getAllByText("4.9").length).toBeGreaterThan(0);
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });
});

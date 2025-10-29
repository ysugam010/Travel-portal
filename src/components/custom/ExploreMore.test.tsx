import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ExploreMore } from "./ExploreMore";

// Mocking all image imports to prevent loading errors in test
vi.mock("@/assets/24.jpg", () => ({ default: "amalfi.jpg" }));
vi.mock("@/assets/25.jpg", () => ({ default: "tajmahal.jpg" }));
vi.mock("@/assets/26.jpg", () => ({ default: "baliHotAir.jpg" }));
vi.mock("@/assets/27.jpg", () => ({ default: "osakaCastle.jpg" }));
vi.mock("@/assets/28.jpg", () => ({ default: "capeReinga.jpg" }));
vi.mock("@/assets/29.jpg", () => ({ default: "sorrento.jpg" }));
vi.mock("@/assets/30.jpg", () => ({ default: "boraBora.jpg" }));
vi.mock("@/assets/31.jpg", () => ({ default: "santorini.jpg" }));
vi.mock("@/assets/56.jpg", () => ({ default: "paris.jpg" }));
vi.mock("@/assets/57.jpg", () => ({ default: "london.jpg" }));
vi.mock("@/assets/58.jpg", () => ({ default: "dubai.jpg" }));
vi.mock("@/assets/59.jpg", () => ({ default: "singapore.jpg" }));
vi.mock("@/assets/32.jpg", () => ({ default: "mauiIsland.jpg" }));
vi.mock("@/assets/33.jpg", () => ({ default: "baliIsland.jpg" }));
vi.mock("@/assets/34.jpg", () => ({ default: "bondiBeach.jpg" }));
vi.mock("@/assets/35.jpg", () => ({ default: "waikikiBeach.jpg" }));
vi.mock("@/assets/36.jpg", () => ({ default: "jeffreysBay.jpg" }));
vi.mock("@/assets/54.jpg", () => ({ default: "uluwatu.jpg" }));
vi.mock("@/assets/38.jpg", () => ({ default: "yosemite.jpg" }));
vi.mock("@/assets/39.jpg", () => ({ default: "banff.jpg" }));
vi.mock("@/assets/53.jpg", () => ({ default: "kruger.jpg" }));
vi.mock("@/assets/40.jpg", () => ({ default: "yellowstone.jpg" }));
vi.mock("@/assets/42.jpg", () => ({ default: "lakeComo.jpg" }));
vi.mock("@/assets/43.jpg", () => ({ default: "lakeLouise.jpg" }));
vi.mock("@/assets/44.jpg", () => ({ default: "lakeTahoe.jpg" }));
vi.mock("@/assets/45.jpg", () => ({ default: "lakeBled.jpg" }));
vi.mock("@/assets/46.jpg", () => ({ default: "maldivesBeach.jpg" }));
vi.mock("@/assets/47.jpg", () => ({ default: "pinkBeach.jpg" }));
vi.mock("@/assets/48.jpg", () => ({ default: "copacabana.jpg" }));
vi.mock("@/assets/49.jpg", () => ({ default: "saharaCamp.jpg" }));
vi.mock("@/assets/51.jpg", () => ({ default: "mountCookCamp.jpg" }));
vi.mock("@/assets/52.jpg", () => ({ default: "yosemiteCamp.jpg" }));
vi.mock("@/assets/55.jpg", () => ({ default: "zionCamp.jpg" }));
vi.mock("@/assets/60.jpg", () => ({ default: "navagioBeach.jpg" }));

describe("ExploreMore Component", () => {
  beforeEach(() => {
    render(<ExploreMore />);
  });

  it("renders the heading and subtitle", () => {
    expect(screen.getByText("Explore more")).toBeInTheDocument();
    expect(screen.getByText("Let's go on an adventure")).toBeInTheDocument();
  });

  it("renders all category buttons", () => {
    const categories = ["Popular", "Islands", "Surfing", "Nation Parks", "Lake", "Beach", "Camp"];
    categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it("shows destinations for the active category (Popular by default)", () => {
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("changes destinations when clicking another category", () => {
    const categoryButton = screen.getByText("Islands");
    fireEvent.click(categoryButton);
    expect(screen.getByText("Maui Island")).toBeInTheDocument();
  });

  it("shows and hides more destinations using Show more and Show less buttons", () => {
    const showMoreButton = screen.getByText("Show more");
    fireEvent.click(showMoreButton);
    // After clicking "Show more", more items should appear
    const imagesAfterClick = screen.getAllByRole("img");
    expect(imagesAfterClick.length).toBeGreaterThan(8);

    const showLessButton = screen.getByText("Show less");
    fireEvent.click(showLessButton);
    const imagesAfterLess = screen.getAllByRole("img");
    expect(imagesAfterLess.length).toBe(8);
  });
});

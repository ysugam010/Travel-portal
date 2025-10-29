import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AdventureSection } from "./AdventureSection";

// Mock image and video imports ---
vi.mock("@/assets/61.jpg", () => ({ default: "paris.jpg" }));
vi.mock("@/assets/64.jpg", () => ({ default: "newyork.jpg" }));
vi.mock("@/assets/63.jpg", () => ({ default: "seoul.jpg" }));
vi.mock("@/assets/66.jpg", () => ({ default: "bali.jpg" }));
vi.mock("@/assets/65.jpg", () => ({ default: "rome.jpg" }));
vi.mock("@/assets/62.jpg", () => ({ default: "sydney.jpg" }));
vi.mock("@/assets/videos/travel-video.mp4", () => ({ default: "travel-video.mp4" }));

// --- Mock embla-carousel-react to avoid browser dependency ---
vi.mock("embla-carousel-react", async () => {
  const actual = await vi.importActual<typeof import("embla-carousel-react")>(
    "embla-carousel-react"
  );
  return {
    ...actual,
    useEmblaCarousel: () => [null, { scrollNext: vi.fn(), scrollPrev: vi.fn() }],
  };
});

// Mock matchMedia (used by Embla) ---
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver ---
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock IntersectionObserver (type-safe) ---
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];
  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
}
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Begin Tests ---
describe("AdventureSection Component", () => {
  beforeEach(() => {
    render(<AdventureSection />);
  });

  it("renders main headings correctly", () => {
    expect(screen.getByText("Let's go on an adventure")).toBeInTheDocument();
    expect(screen.getByText("Find and book a great experience.")).toBeInTheDocument();
  });

  it("renders all adventure destination cards", () => {
    const cities = ["Paris", "New York", "Seoul", "Bali", "Rome", "Sydney"];
    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it("renders carousel controls", () => {
    // The buttons don’t have accessible labels; just verify at least 2 buttons exist
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the Book Now button and section text", () => {
    expect(screen.getByText("Book tickets and go now!")).toBeInTheDocument();
    expect(screen.getByText("Book Now")).toBeInTheDocument();
  });

  it("toggles play/pause when video area is clicked", () => {
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video).toBeTruthy();

    // Mock play/pause
    const playMock = vi.fn();
    const pauseMock = vi.fn();
    video.play = playMock;
    video.pause = pauseMock;

    // Click 1: Play
    fireEvent.click(video);
    expect(playMock).toHaveBeenCalled();

    // Click 2: Pause
    fireEvent.click(video);
    expect(pauseMock).toHaveBeenCalled();
  });
});

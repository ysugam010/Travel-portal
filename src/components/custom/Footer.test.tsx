import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  const setup = () => render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  it("renders the company name and description", () => {
    setup();
    expect(screen.getByText("Tripco")).toBeInTheDocument();
    expect(
      screen.getByText(/Your ultimate partner in discovering the world/i)
    ).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    setup();
    // there are 3 social media links
    const socialLinks = screen.getAllByRole("link", { hidden: true });
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("renders quick links section with correct items", () => {
    setup();
    const links = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders services section correctly", () => {
    setup();
    const services = [
      "Flight Booking",
      "Hotel Booking",
      "Explore Destinations",
      "Book Activities",
    ];
    services.forEach((service) => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  it("renders contact info section with address, email, and phone", () => {
    setup();
    expect(
      screen.getByText(/30 Great Peter St, Westminster/i)
    ).toBeInTheDocument();
    expect(screen.getByText("info@tripco.com")).toBeInTheDocument();
    expect(screen.getByText("+44 20 7946 0000")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    setup();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${year} Tripco`, "i"))).toBeInTheDocument();
  });
});

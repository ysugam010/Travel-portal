import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SupportCenterPage } from "./SupportCenterPage";

// Mock Footer so it doesn't break tests
vi.mock("@/components/custom/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe("SupportCenterPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly with title and contact info", () => {
    render(<SupportCenterPage />);
    expect(screen.getByText("Support Center")).toBeInTheDocument();
    expect(screen.getByText("support@tripco.com")).toBeInTheDocument();
  });

  it("renders the contact form fields", () => {
    render(<SupportCenterPage />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("submits the form and triggers alert", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<SupportCenterPage />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello" },
    });

    fireEvent.click(screen.getByText("Send Message"));
    expect(alertSpy).toHaveBeenCalledWith("Message sent successfully!");
  });
});

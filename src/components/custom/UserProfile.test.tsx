import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { UserProfile } from "./UserProfile";

// Correctly mock shadcn's dropdown (your import path)
vi.mock("@/components/ui/dropdown-menu", () => {
  return {
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
      <button data-testid="mock-trigger">{children}</button>
    ),
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-content">{children}</div>
    ),
    DropdownMenuItem: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
    }) => (
      <div role="menuitem" onClick={onClick}>
        {children}
      </div>
    ),
    DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuSeparator: () => <hr />,
  };
});

describe("UserProfile Component", () => {
  const mockLogout = vi.fn();
  const mockLogin = vi.fn();

  const mockUser = { name: "John Doe", email: "john@example.com" };

  const renderUserProfile = (user = mockUser) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user, login: mockLogin, logout: mockLogout }}>
          <UserProfile />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the user avatar with correct initials", () => {
    renderUserProfile();
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("shows user name and email when dropdown opens", async () => {
    renderUserProfile();
    fireEvent.click(screen.getByTestId("mock-trigger"));

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });
  });

  it("shows Booking History link when dropdown opens", async () => {
    renderUserProfile();
    fireEvent.click(screen.getByTestId("mock-trigger"));

    await waitFor(() => {
      expect(screen.getByText(/Booking History/i)).toBeInTheDocument();
    });
  });

  it("calls logout when clicking Log out", async () => {
    renderUserProfile();
    fireEvent.click(screen.getByTestId("mock-trigger"));

    const logoutItem = await screen.findByText(/Log out/i);
    fireEvent.click(logoutItem);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  it("shows '?' fallback when user name is missing", () => {
    renderUserProfile({ name: "", email: "test@example.com" });
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});

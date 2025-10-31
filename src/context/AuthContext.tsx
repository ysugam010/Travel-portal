import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useCurrency } from "./CurrencyContext";

type User = {
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { setCurrency } = useCurrency();

  // Load user info from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // restore logged-in state
    }
  }, []);

  //  Detect user location & set currency automatically
  const detectUserCurrency = async () => {
    if (!navigator.geolocation) {
      console.warn("❌ Geolocation not supported by this browser.");
      alert("Your browser doesn’t support location detection. Defaulting to USD.");
      setCurrency("USD");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const countryCode = data?.address?.country_code?.toUpperCase();
          console.log("🌍 Detected country:", countryCode);

          if (countryCode === "IN") setCurrency("INR");
          else if (countryCode === "US") setCurrency("USD");
          else if (["FR", "DE", "IT", "ES", "NL"].includes(countryCode)) setCurrency("EUR");
          else setCurrency("USD");
        } catch (err) {
          console.error("Error detecting location:", err);
          setCurrency("USD");
        }
      },
      (error) => {
        console.warn("⚠️ Geolocation error:", error);
        alert("Location not available. Defaulting to USD.");
        setCurrency("USD");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 0 }
    );
  };

  // Called after Sign In / Sign Up
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData)); // persist user in localStorage

    // Delay ensures context initializes before location detection
    setTimeout(() => {
      detectUserCurrency();
    }, 500);
  };

  //  Log out user & clear localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser"); 
    localStorage.removeItem("currencyDetected");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//  Hook for easier use in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

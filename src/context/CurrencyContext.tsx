import  { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';

type Currency = "INR" | "USD" | "EUR";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (newCurrency: Currency) => void;
  convertPrice: (priceInINR: number) => number;
  getSymbol: () => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem("preferredCurrency") as Currency) || "EUR";
  });

  // Save in localStorage when changed
  useEffect(() => {
    localStorage.setItem("preferredCurrency", currency);
  }, [currency]);

  // Sync with localStorage (in case AuthContext updated before mount)
  useEffect(() => {
    const stored = localStorage.getItem("preferredCurrency") as Currency;
    if (stored && stored !== currency) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const convertPrice = (priceInINR: number) => {
    switch (currency) {
      case "USD":
        return priceInINR / 83; // Example INR→USD
      case "EUR":
        return priceInINR / 90; // Example INR→EUR
      default:
        return priceInINR;
    }
  };

  const getSymbol = () => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      default:
        return "₹";
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};




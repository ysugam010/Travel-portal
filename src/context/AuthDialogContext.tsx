import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';

type DialogTab = "signin" | "signup";

type AuthDialogContextType = {
  isOpen: boolean;
  activeTab: DialogTab;
  openDialog: (tab?: DialogTab) => void;
  closeDialog: () => void;
};

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DialogTab>("signin");

  const openDialog = (tab: DialogTab = "signin") => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeDialog = () => setIsOpen(false);

  return (
    <AuthDialogContext.Provider value={{ isOpen, activeTab, openDialog, closeDialog }}>
      {children}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) throw new Error("useAuthDialog must be used within AuthDialogProvider");
  return context;
}

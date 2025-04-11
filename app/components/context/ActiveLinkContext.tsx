import { createContext, ReactNode, useContext, useState } from "react";

interface ActiveLinkContextProps {
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const ActiveLinkContext = createContext<ActiveLinkContextProps | undefined>(
  undefined
);

export const ActiveLinkProvider = ({ children }: { children: ReactNode }) => {
  const [activeLink, setActiveLink] = useState("/dashboard");

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);
  if (!context) {
    throw new Error("useActiveLink must be used inside an ActiveLinkProvider");
  }

  return context;
};

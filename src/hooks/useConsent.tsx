import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Consent = "accepted" | "rejected" | "pending";

interface ConsentContextType {
  consent: Consent;
  accept: () => void;
  reject: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<Consent>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("consent");
      if (stored === "accepted" || stored === "rejected") {
        return stored;
      }
    }
    return "pending";
  });

  const accept = useCallback(() => {
    setConsent("accepted");
    if (typeof window !== "undefined") {
      localStorage.setItem("consent", "accepted");
    }
  }, []);

  const reject = useCallback(() => {
    setConsent("rejected");
    if (typeof window !== "undefined") {
      localStorage.setItem("consent", "rejected");
    }
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, accept, reject }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
};

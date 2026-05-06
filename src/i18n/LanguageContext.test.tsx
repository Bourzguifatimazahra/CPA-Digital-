import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

// Test component that uses the language context
const TestComponent = () => {
  const { lang, setLang, t, isRTL } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="isRTL">{isRTL.toString()}</span>
      <span data-testid="translation">{t("testKey")}</span>
      <button onClick={() => setLang("en")}>Change Language</button>
    </div>
  );
};

describe("LanguageContext", () => {
  it("should provide default language as French", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("fr");
  });

  it("should have isRTL as false for French", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId("isRTL")).toHaveTextContent("false");
  });

  it("should change language when setLang is called", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("lang")).toHaveTextContent("en");
    });
  });

  it("should return the key if translation not found", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId("translation")).toHaveTextContent("testKey");
  });

  it("should throw error when useLanguage is used outside provider", () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useLanguage must be used within LanguageProvider");
  });
});
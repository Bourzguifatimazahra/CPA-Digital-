import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    expect(cn("class1", true && "class2", false && "class3")).toBe("class1 class2");
  });

  it("should handle undefined and null values", () => {
    expect(cn("class1", undefined, "class2", null)).toBe("class1 class2");
  });

  it("should handle empty strings", () => {
    expect(cn("class1", "", "class2")).toBe("class1 class2");
  });

  it("should merge Tailwind classes correctly with twMerge", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });

  it("should return empty string for no arguments", () => {
    expect(cn()).toBe("");
  });
});
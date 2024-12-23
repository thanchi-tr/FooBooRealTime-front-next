import { renderHook, act } from "@testing-library/react";
import useResultDisplayToggle from "@/hooks/useResultDisplayToggle";

jest.useFakeTimers();

describe("useResultDisplayToggle", () => {
  it("should initialize with the given Init value", () => {
    const { result } = renderHook(() => useResultDisplayToggle(true, false));
    expect(result.current.isRuleOpen).toBe(true);
  });

  it("should auto-close after 2 seconds if isInitialDisplay is true", () => {
    const { result } = renderHook(() => useResultDisplayToggle(true, true));

    // Initially open
    expect(result.current.isRuleOpen).toBe(true);

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should close
    expect(result.current.isRuleOpen).toBe(false);
  });

  it("should not auto-close if isInitialDisplay is false", () => {
    const { result } = renderHook(() => useResultDisplayToggle(true, false));

    // Initially open
    expect(result.current.isRuleOpen).toBe(true);

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should still be open
    expect(result.current.isRuleOpen).toBe(true);
  });

  it("should toggle state when OpenHandler is called", () => {
    const { result } = renderHook(() => useResultDisplayToggle(false, false));

    // Initially closed
    expect(result.current.isRuleOpen).toBe(false);

    // Toggle open
    act(() => {
      result.current.OpenHandler();
    });
    expect(result.current.isRuleOpen).toBe(true);

    // Toggle closed
    act(() => {
      result.current.OpenHandler();
    });
    expect(result.current.isRuleOpen).toBe(false);
  });

  it("should stay close when OpenHandler is called once, right after open. With automate closer on", () => {
    const { result } = renderHook(() => useResultDisplayToggle(true, true));

    // Initially closed
    expect(result.current.isRuleOpen).toBe(true);

    // Toggle open
    act(() => {
      result.current.OpenHandler();
    });
    expect(result.current.isRuleOpen).toBe(false);

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isRuleOpen).toBe(false);
  });

  it("(automator closer) should be disabled when receive (any) of manual toggle action (OpenHandler is called)", () => {
    const { result } = renderHook(() => useResultDisplayToggle(true, true));

    // Initially closed
    expect(result.current.isRuleOpen).toBe(true);

    // Toggle open
    act(() => {
      result.current.OpenHandler();
      result.current.OpenHandler();
    });
    expect(result.current.isRuleOpen).toBe(true);

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isRuleOpen).toBe(true);
  });
});

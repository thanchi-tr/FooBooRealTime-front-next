import { renderHook, act } from "@testing-library/react";
import useCountDown from "@/hooks/useCountDown";

jest.useFakeTimers();

describe("useCountDown", () => {
  it("should initialize with the given time", () => {
    const { result } = renderHook(() => useCountDown(10));
    expect(result.current.timeRemain).toBe(10);
  });

  it("should start the countdown when triggerStart is called", () => {
    const { result } = renderHook(() => useCountDown(5));
    act(() => {
      result.current.triggerStart();
    });
    expect(result.current.timeRemain).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeRemain).toBe(4);
  });

  it("should stop the countdown when time reaches 0", () => {
    const { result } = renderHook(() => useCountDown(2));

    act(() => {
      result.current.triggerStart();
    });

    // Fast-forward to 0
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeRemain).toBe(0);
  });

  it("should default to 60seconds timer on supply the invalid initial value", () => {
    const { result } = renderHook(() => useCountDown(-1));

    expect(result.current.timeRemain).toBe(60);
  });

  it("should default to 60seconds timer on supply 0 initial count down", () => {
    const { result } = renderHook(() => useCountDown(0));

    expect(result.current.timeRemain).toBe(60);
  });

  it("should reset the countdown when triggerStart is called again", () => {
    const { result } = renderHook(() => useCountDown(3));

    act(() => {
      result.current.triggerStart();
    });

    act(() => {
      jest.advanceTimersByTime(2000); // Fast-forward time
    });

    expect(result.current.timeRemain).toBe(1);

    // Restart the countdown
    act(() => {
      result.current.triggerStart();
    });

    expect(result.current.timeRemain).toBe(3);
  });
});

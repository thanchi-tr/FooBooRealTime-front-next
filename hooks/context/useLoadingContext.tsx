"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface LoadingContext {
  isLoaded: boolean;
  simulateLoadTask: () => void,
  reset: () => void,
  loadComplete: () => void,
  startLoading: () => void,
}

const LoadingContext = createContext<LoadingContext | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within an LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isStartLoading, setIsStartload] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const simulateLoadTask = () => setIsStartload(true);
  const reset = () => setIsLoaded(false);
  //actual loading method
  const loadComplete = () => {
    setIsLoaded(true);
  }
  const startLoading = () => {
    setIsLoaded(false);
  }
  return (
    <LoadingContext.Provider value={
      { isLoaded, simulateLoadTask, reset, startLoading, loadComplete }
    }>
      {children}
    </LoadingContext.Provider>
  );
};

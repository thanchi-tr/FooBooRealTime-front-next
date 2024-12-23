"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const useResultDisplayToggle = (Init: boolean, isInitialDisplay: boolean) => {
  const [isRuleOpen, setIsRuleOpen] = useState<boolean>(Init);
  const automatorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isInitialDisplay)
      automatorRef.current = setTimeout(() => setIsRuleOpen(false), 2000);
  }, []);

  const OpenHandler = useCallback(() => {
    // ensure the automation only run once, during the initial phase
    if (automatorRef.current != null) {
      clearTimeout(automatorRef.current);
      automatorRef.current = null;
    }

    setIsRuleOpen((prev) => !prev);
  }, [isRuleOpen, setIsRuleOpen]);

  return { isRuleOpen, OpenHandler };
};

export default useResultDisplayToggle;

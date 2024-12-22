"use client";

import { useCallback, useEffect, useState } from "react";

const useResultDisplayToggle = (Init: boolean, isInitialDisplay: boolean) => {
  const [isRuleOpen, setIsRuleOpen] = useState<boolean>(Init);

  useEffect(() => {
    if (isInitialDisplay) setTimeout(() => setIsRuleOpen(false), 2000);
  }, []);
  const OpenHandler = useCallback(() => {
    setIsRuleOpen((prev) => !prev);
  }, [isRuleOpen, setIsRuleOpen]);

  return { isRuleOpen, OpenHandler };
};

export default useResultDisplayToggle;

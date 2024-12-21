"use client";

import { useEffect, useMemo, useState } from "react";

const useCountDown = (initTime: number) => {
  const [timeRemain, setTimeRemain] = useState<number>(initTime);
  const [isStart, setIsStart] = useState(false);
  const triggerStart = () => {
    setTimeRemain(initTime);
    setIsStart(true);
  };
  useEffect(() => {
    if (isStart) {
      console.log("start countdowning");
      let timer = setInterval(
        () => setTimeRemain((prev) => (prev > 0 ? prev - 1 : prev)),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [isStart]);

  // stop the countdowner @remain=0
  // this enable to reuse count down
  useEffect(() => {
    if (timeRemain == 0) {
      setIsStart(false);
    }
  });
  return { timeRemain, triggerStart };
};

export default useCountDown;

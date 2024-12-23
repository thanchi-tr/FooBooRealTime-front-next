"use client";

import { useEffect, useState } from "react";

const useCountDown = (initTime: number) => {
  const [timeRemain, setTimeRemain] = useState<number>(60);
  const [isStart, setIsStart] = useState(false);
  const triggerStart = () => {
    setTimeRemain(initTime);
    setIsStart(true);
  };

  useEffect(() => {
    // validate the intial timeer
    if (initTime > 0) setTimeRemain(initTime);
  }, []);

  useEffect(() => {
    if (isStart) {
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

"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSignalRContext } from "./useSignalRContext";

interface Message {
  detail: string;
  time: number; // UTC value of date time
}

interface NotificationContext {
  history: Message[];
}

const NotificationContext = createContext<NotificationContext | undefined>(
  undefined
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context)
    throw new Error("useNotification is found outside the context scope!");
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useSignalRContext();
  const [isPing, setIsPing] = useState(false);
  const [isNotifiable, setIsNotfiable] = useState(true);
  // allow to update without re-rendering
  const [history, setHistory] = useState<Message[]>([])
  // const getMsg = () => {
  //   const msg = history[history.length - 1];
  //   const history = [...history]
  //   setHistory()
  //   return
  // }
  // when ever a new connection establish, attach notification listener to it
  useEffect(() => {
    if (isNotifiable && connection) {
      connection.on("NotifyEvent", (msg: string) => {
        const newMsg: Message = {
          detail: msg,
          time: Date.now(),
        };

        setHistory(
          prev => {
            const newA = [...prev];
            newA.push(newMsg);
            return newA;
          })
      });
    }
  }, [connection]);


  return (
    <NotificationContext.Provider value={{ history }}>
      {children}
    </NotificationContext.Provider>
  );
};

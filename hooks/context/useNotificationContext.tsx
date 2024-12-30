"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSignalRContext } from "./useSignalRContext";

interface Message {
  detail: string;
}

interface NotificationContext {
  history: Message[];
  popHistory: () => void;
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

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useSignalRContext();
  const [isNotifiable] = useState(true);
  // allow to update without re-rendering
  const [history, setHistory] = useState<Message[]>([])
  useEffect(() => {
    if (isNotifiable && connection) {
      connection.on("notifyevent", (msg: string) => {
        const newMsg: Message = {
          detail: msg,
        };

        setHistory(
          prev => {
            if (prev.includes(newMsg))
              return prev;
            const newA = [...prev];
            newA.unshift(newMsg);
            return newA;
          })
      });
    }
  }, [connection]);

  const popHistory = () => {
    setHistory(
      prev => {
        let newA = [...prev];
        newA.pop();
        return newA;
      }
    )
  }

  return (
    <NotificationContext.Provider value={{ history, popHistory }}>
      {children}
    </NotificationContext.Provider>
  );
};

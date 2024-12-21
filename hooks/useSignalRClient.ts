"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HubConnection } from "@microsoft/signalr";
import CreateSignalRConnection from "@/lib/signalrClients";
import { SessionT } from "@/lib/type";

interface clientRegisteredCallBack {
  onSupplyQuesiton?: (question: number) => void; // supply the player a number
  onSupplyInitialQuestion?: (firstQuestion: number) => void;
  onNotifyEvent?: () => void;
  onSupplyGameRule?: () => void;
  onSupplyScoreBoard?: () => void;
  onSupplyAvailableSessions?: () => void;
  onSupplySession?: (session: SessionT) => void;
  onSupplyError?: () => void;
  onSupplySessionInfo?: () => void;
  onNotifyGameEnd?: () => void;
}

const useSignalRClient = (
  hubUrl: string,
  callbacks?: clientRegisteredCallBack
) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const conn = CreateSignalRConnection(hubUrl);

    conn
      .start()
      .then(() => {
        setIsConnected(true);
      })
      .catch((err) => console.error("SignalR connection failed:", err));

    conn.onclose((error) => {
      setIsConnected(false);
    });

    setConnection(conn);

    return () => {
      conn.stop();
    };
  }, [hubUrl]);
};

export default useSignalRClient;

"use client";

import CreateSignalRConnection from "@/lib/signalrClients";
import { SessionT } from "@/lib/type";
import { HubConnection } from "@microsoft/signalr";
import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toGuidId } from "@/lib/generator";


interface SignalRContext {
    isConnect: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    connection: HubConnection | null;
    invoke: (methodName: string, ...args: any[]) => Promise<any>;
    isInSession: boolean;
}
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

const SignalRContext = createContext<SignalRContext | undefined>(undefined);

export const useSignalRContext = () => {
    const context = useContext(SignalRContext);
    if (!context) {
        throw new Error("useSignalRContext must be used within an Signal R Provider");
    }
    return context;
};

export const SignalRProvider = ({ children }: { children: ReactNode }) => {
    const [isConnect, setIsConnect] = useState(false);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isInSession, setIsInSession] = useState(false);
    const { user } = useUser();
    /**
     * Attempt to connect
     */
    const connect = useCallback(async () => {
        if (connection && isConnected) {
            console.warn("Already connected to SignalR.");
            return;
        }
        const conn = CreateSignalRConnection("https://localhost:5001/hub/game");
        conn.onclose((error) => {
            setIsConnected(false);
        });
        conn.on("notifyevent", (msg: string) => {
            console.log("Receive notification: " + msg)
        })
        conn.on("NotifyError", (err: string) => {
            console.error("Error: " + err)
        })
        try {
            console.log(user)
            const playerId = toGuidId(user?.sub ?? "09ac5e84-db5c-4131-0d1c-08dd1c5384cf");
            console.log(playerId)

            await conn.start();
            setConnection(conn);
            setIsConnected(true);
        } catch (err) {
            console.error("Failed to start SignalR connection:", err);
        }
    }, [connection, isConnected]);

    const invoke = useCallback(async (methodName: string, ...args: any[]) => {
        if (connection && isConnected) {
            console.log("Trigger:" + methodName + " in Server side of signal R");
            connection.invoke(methodName, ...args)
                .then(() => console.log("Invoked GetAvailableSessions successfully."))
                .catch((err) => console.error("Error invoking GetAvailableSessions:", err));;
        } else {
            console.warn("SignalR not connected. Cannot invoke:", methodName);
        }
    }, [connection, isConnected]);

    const disconnect = useCallback(async () => {
        if (connection) {
            try {
                await connection.stop();
                setIsConnected(false);
                setConnection(null);
            } catch (err) {
                console.error("Failed to disconnect SignalR:", err);
            }
        }
    }, [connection]);

    return (
        <SignalRContext.Provider value={{ isConnect, connect, disconnect, invoke, connection, isInSession }}>
            {children}
        </SignalRContext.Provider>
    );
};

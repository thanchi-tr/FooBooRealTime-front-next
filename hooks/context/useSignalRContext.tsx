"use client";

import CreateSignalRConnection from "@/lib/signalrClients";
import { SessionT } from "@/lib/type";
import { HubConnection } from "@microsoft/signalr";
import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";


interface SignalRContext {
    isConnect: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    connection: HubConnection | null;
    invoke: (methodName: string, ...args: any[]) => Promise<any>;
    isInSession: boolean;
    connectionId: string;
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
    const [connectionId, setConnectionId] = useState("Not set");
    const { user } = useUser();

    /**
         * A wrapper (UseCallback ) to provide an extra Loging functionality on top of server invokation 
         */
    const invoke = useCallback(async (methodName: string, ...args: any[]) => {
        if (connection && isConnected) {
            connection.invoke(methodName, ...args) // I am experience diffrent way to handle promiss (instead of asynchronous await)
                .then(() => console.log("Invoked " + methodName + " successfully."))
                .catch((err) => console.error("Error invoking " + methodName + ":", err));
        } else {
            console.warn("Connection rejected: Cannot invoke:", methodName);
        }
    }, [connection, isConnected]);

    useEffect(
        () => {
            if (connection && isConnected)
                invoke("RequestConnectionId");
        }, [connection, isConnected]
    )

    /**
     * Attempt to to abstract the connection method:
     *  - automatically include client handler : ON:
     *      x: NotifyEvent: the main method for server to notify general notification
     *      x: NotifyError: Expected to be use along side ErrorContext (not implement yet)
     */
    const connect = useCallback(async () => {
        if (connection && isConnected) {
            console.warn("Already connected to SignalR.");
            return;
        }
        const conn = CreateSignalRConnection(process.env.NEXT_PUBLIC_SIGNALR_HUB_URL ?? "");
        conn.onclose((error) => {
            if (error) {
                console.error("Error:@SignalR:OnDisconnect:" + error)
            }
            setIsConnected(false);
        });
        conn.on("notifyevent", (msg: string) => {
            console.log("SignalR: " + msg)
        })
        conn.on("notifyerror", (err: string) => {
            console.error("Error:@SignalR message stream: " + err)
        })
        conn.on("SupplyConnectionId", (connectionId: string) => {
            setConnectionId(connectionId);
        })
        try {
            await conn.start();
            setConnection(conn);
            setIsConnected(true);
        } catch (err) {
            console.error("Failed to start SignalR connection:", err);
        }
    }, [connection, isConnected]);



    /**
     * Handle disconnecting, reset the context
     */
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
        <SignalRContext.Provider value={{ isConnect, connect, disconnect, invoke, connection, isInSession, connectionId }}>
            {children}
        </SignalRContext.Provider>
    );
};

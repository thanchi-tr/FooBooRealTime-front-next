"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface SessionContext {
    name: string,
    rules: { Key: number, Value: string }[],
    id: string,
    question: number,
    time: number,
    setName: Dispatch<SetStateAction<string>>;
    setRules: Dispatch<SetStateAction<{ Key: number, Value: string }[]>>;
    setId: Dispatch<SetStateAction<string>>;
    setQuestion: Dispatch<SetStateAction<number>>;
    setTime: Dispatch<SetStateAction<number>>;
    reset: () => void;
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useLoading must be used within an LoadingProvider");
    }
    return context;
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState("FooBoo");
    const [rules, setRules] = useState<{ Key: number, Value: string }[]>([]);
    const [id, setId] = useState("");
    const [question, setQuestion] = useState(-1);
    const [time, setTime] = useState(-1);
    const reset = () => {
        setName("FooBoo");
        setRules([]);
        setId("");
        setQuestion(-1);
        setTime(-1);
    }
    return (
        <SessionContext.Provider value={
            { name, rules, id, setName, setRules, setId, question, setQuestion, time, setTime, reset }
        }>
            {children}
        </SessionContext.Provider>
    );
}  
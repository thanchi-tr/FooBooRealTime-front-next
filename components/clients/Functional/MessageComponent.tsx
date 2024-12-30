'use client';

import NotificationDisplay from "@/components/clients/Functional/NotificationDisplay";
import { useNotificationContext } from "@/hooks/context/useNotificationContext";
import { useCallback, useEffect, useState } from "react";

const MessageComponent = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { history, popHistory } = useNotificationContext();
    const time = 2
    const next = useCallback(() => {
        setTimeout(() => popHistory(), time * 0.3 * 1000);
        setIsOpen(false)
        setTimeout(() => setIsOpen(history.length > 0), time * 0.3 * 1000)
    }, [history])
    useEffect(
        () => {
            if (history && history[history.length - 1]?.detail == "Sit tight, Game begine shortly!!") {
                popHistory();
            }
        }, []
    )
    return (< div >
        {
            history.length > 0 &&
            <NotificationDisplay
                clickHandler={next}
                msg={history[history.length - 1].detail}
                isOpen={isOpen}
                timer={time}
            />}
    </div >)
}

export default MessageComponent;
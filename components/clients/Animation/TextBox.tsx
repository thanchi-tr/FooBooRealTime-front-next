'use client';

import { useSignalRContext } from "@/hooks/context/useSignalRContext";
import { ReactNode, useEffect, useState } from "react";

interface textBoxConfig {
    children?: ReactNode,
    isTimeUp: boolean
}
const TextBox = ({ isTimeUp }: textBoxConfig) => {
    const [inputValue, setInputValue] = useState(""); // State to store the input value
    const { connect, connection, invoke } = useSignalRContext();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };
    const handleFormSubmit = (e: React.FormEvent): void => {

        invoke("SendAnswer", inputValue);
        setInputValue("");
        e.preventDefault(); // Prevent the default form submission behavior
    };
    useEffect(
        () => {
            if (connection == null) {
                connect()
            }
        }, [connection]
    )
    return (
        <form
            className={`h-full w-full`}
            onSubmit={handleFormSubmit} // Prevent form submission
        >
            <input
                type="text"
                spellCheck="false"
                value={inputValue}
                onChange={handleInputChange} // Update state on input change
                placeholder="Enter your answer" // Placeholder when empty
                className={`
                
                h-full w-full rounded-sm border-4 border-b-[9.2px] lg:border-b-[5px] lg:border-r-[6px] lg:border-l-[3px]
                 text-xs p-2 tracking-wider font-semibold 
                hover:cursor-text focus:outline-none
                ${isTimeUp
                        ? "border-background text-textColour shadow-black/35 shadow-xl bg-background"
                        : `border-t-foreground/45 focus:border-t-foreground/65
                        border-x-foreground/20 focus:border-x-foreground/25 lg:border-r-foregroundShadow/40
                        border-b-black/30 lg:border-b-foreground/35 lg:border-l-foreground/80
                         focus:border-b-black/35
                     bg-gradient-to-b 
                      from-foreground/80 via-foreground/40 to-foregroundShadow/40 text-transparent bg-clip-text
                 shadow-2xl shadow-foregroundShadow`
                    }
        `}
            />

        </form>

    )
}

export default TextBox;
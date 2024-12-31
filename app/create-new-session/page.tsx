'use client';

import { useSignalRContext } from "@/hooks/context/useSignalRContext";
import { ClientMethods, ServerMethods, SessionT } from "@/lib/type";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation"

const CreateNewSession = () => {
    const { connect, connection, invoke } = useSignalRContext();
    const [nameOptions, setNameOptions] = useState<string[]>([])
    const [isShowOption, setIsShowOption] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [session, setSession] = useState<SessionT | undefined>(undefined);
    const router = useRouter()

    useEffect(
        () => {
            if (connection == null) {
                connect();
                return;
            }
            connection.on(ClientMethods.SupplyGameContexts, (context: string[]) => setNameOptions(context));
            invoke(ServerMethods.RequestAvailableGameContexts);
        }, [connection]
    )

    useEffect(
        () => { // once we obtain all the session information, move to wait room
            if (session != undefined) {
                router.push(`/waitroom/${session.sessionId}?isOpenRule=true`);
            }
        }, [session]
    )

    const handleCreation = useCallback(() => {
        if (selectedOptionIndex >= 0) {
            connection?.on(ClientMethods.SupplySession, (session: SessionT) => {
                setSession(session);
            })
            invoke(ServerMethods.RequestNewSession, nameOptions[selectedOptionIndex]);
        }
    }, [selectedOptionIndex, connection, session])
    return (
        <div
            className={`
                h-screen w-screen bg-background
                flex flex-col justify-between 
                `}
        >

            <div />
            <div
                className={`
                    flex flex-col gap-2 items-center justify-center
                    h-auto w-auto
                    
                    `}
            >
                <div className={`flex gap-1
                        justify-between md:-translate-x-[5%]
                        h-[6vw] w-[52%] md:w-[48%] lg:w-[40%] xl:w-[35%] `}>
                    <Link
                        className={`hover:cursor-pointer hover:animate-pulse hover:underline text-foregroundShadow/90 font-mainfont`}
                        href={"./loby"}>{"<Back"}</Link>
                    <Link
                        className={`
                            uppercase
                            hover:cursor-pointer hover:animate-pulse hover:underline text-foregroundShadow/90 font-mainfont`}
                        href={"./"}> home</Link>
                </div>


                <div
                    className={`
                        flex gap-1
                        w-[52%] md:w-[48%] lg:w-[40%] xl:w-[38%]
                        h-[6vw]  md:h-[4vw] lg:h-[3vw] xl:h-[2.2vw] 2xl:h-[2vw]
                    `}
                >
                    <div
                        className={`
                            relative
                            h-[6vw] md:h-[4vw] lg:h-[3vw] xl:h-[2.2vw] 2xl:h-[2vw]
                            aspect-square
                            rounded-md text-center text-textColour
                            hover:cursor-pointer hover:border-black/80 border-2 border-transparent
                            bg-foreground `}
                        onClick={() => setIsShowOption(prev => !prev)}
                    >...

                    </div>
                    <div className={`
                         relative
                        h-auto w-[calc(100%-6vw)]
                        bg-foregroundShadow/15
                        border-t-[1px] border-x-[0.3px] border-white/30
                        shadow-inner shadow-black/70
                        rounded-md pr-[5%]
                        hover:cursor-pointer
                        font-mainfont text-end
                        ${nameOptions.length == 0 ? "text-textColour/50" : ""}
                        `}
                        onClick={() => {
                            setIsShowOption(prev => !prev)
                        }}

                    >{selectedOptionIndex == -1
                        ? <p className="text-black/30"> Game ID</p>
                        : <p className="text-foreground">{nameOptions[selectedOptionIndex]}</p>
                        }
                        {/* This is a drop down */}
                        <div
                            className={`
                                ${isShowOption ? "flex flex-col" : "hidden"}
                                absolute -bottom-[3vw] translate-y-[100%]
                                min-h-[1vw] max-h-[28vw] overflow-y-auto
                                h-auto w-full rounded-bl-md border-r-2 border-t-2 border-white/30 
                                bg-foregroundShadow/35 shadow-inner shadow-black
                                overflow-clip
                                `}
                        >
                            {nameOptions.map(
                                (name, index) => (
                                    <div
                                        key={`option-${name}`}
                                        className={`
                                            border-2  z-50
                                            ${index % 2 == 0 ? "bg-foregroundShadow/35" : "bg-foregroundShadow/60"}
                                            ${selectedOptionIndex == index ? "border-foreground" : "border-transparent"}
                                        w-full p-1 px-2 
                                        scale-75 rounded-md
                                        text-sm text-end
                                        hover:cursor-pointer
                                        `}

                                        onClick={() => {
                                            setSelectedOptionIndex(prev => (prev != index) ? index : -1);
                                        }}
                                    >{name}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div />
            <div className={`absolute bottom-[10vh] h-auto w-full flex justify-center`}>
                <div
                    className={`
                        overflow-clip group
                        md:-translate-x-[5%] lg:-translate-x-[8%] 2xl:-translate-x-[9%]
                        w-[38%] md:w-[34%] lg:w-[28%] xl:w-[24%]
                        h-auto box-border
                         rounded-md  
                         shadow-black
                        uppercase hover:border-foreground border-2 border-transparent
                        shadow-inner  font-bold bg-foregroundShadow/20
                        hover:cursor-pointer
                `}
                    onClick={handleCreation}
                >

                    <div
                        className={`
                                w-full h-auto p-2 hover:text-foreground/90
                                font-mainfont text-black/80 uppercase tracking-tighter
                            shadow-md shadow-black/70 text-center
                        `}
                    >
                        <p className={`group-hover:hidden`}>new </p>
                        <p className={`hidden group-hover:block `}>click to add</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewSession;
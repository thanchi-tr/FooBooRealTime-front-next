'use client';

import { useSignalRContext } from "@/hooks/context/useSignalRContext";
import { SessionT } from "@/lib/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

const CreateNewSession = (


) => {

    const router = useRouter()
    const { connect, connection, invoke } = useSignalRContext();
    const [nameOptions, setNameOptions] = useState<string[]>([])
    const [isShowOption, setIsShowOption] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [session, setSession] = useState<SessionT | undefined>(undefined);


    useEffect(
        () => {
            if (connection == null) {
                connect();
            } else {
                connection.on("SupplyGameContexts", (context: string[]) => {
                    console.log(context);
                    setNameOptions(context);
                });

                invoke("RequestAvailableGameContexts");
            }
        }, [connection]
    )


    useEffect(
        () => {
            if (session != undefined) {
                router.push(`/waitroom/${session.sessionId}?isOpenRule=true`);
            }
        }, [session]
    )

    const handleCreation = () => {
        if (selectedOptionIndex >= 0) {
            connection?.on("SupplySession", (session: SessionT) => {
                console.log(session);
                setSession(session);
            })
            invoke("RequestNewSession", nameOptions[selectedOptionIndex]);
        }
    }
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
                        justify-between
                        h-[6vw] w-[52%]`}>
                    <Link
                        className={`hover:cursor-pointer hover:animate-pulse hover:underline text-foregroundShadow/90 font-mainfont`}
                        href={"./loby"}>{"<Back"}</Link>
                    <Link
                        className={`
                            uppercase
                            hover:cursor-pointer hover:animate-pulse hover:underline text-foregroundShadow/90 font-mainfont`}
                        href={"./home"}> home</Link>
                </div>


                <div
                    className={`
                        flex gap-1
                        
                        h-[6vw] w-[52%]
                    `}
                >
                    <div
                        className={`
                            relative
                            h-[6vw] aspect-square
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
                                            console.log(index)
                                            setSelectedOptionIndex(prev => (prev != index) ? index : -1);
                                        }}
                                    >{name}</div>
                                )
                            )}
                        </div>

                    </div>

                </div>

                {/**name selection */}

            </div>
            <div />
            <div className={`absolute bottom-[10vh] h-auto w-full flex justify-center`}>
                <div
                    className={`
                        overflow-clip group
                        w-[38%] h-auto box-border
                         rounded-md  
                         shadow-black
                        uppercase hover:border-foreground border-2 border-transparent
                        shadow-inner  font-bold bg-foregroundShadow/20
                        hover:cursor-pointer
                `}
                    onClick={() => { handleCreation() }}
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
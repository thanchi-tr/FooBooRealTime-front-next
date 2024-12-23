'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface gameContext {
    author: string,
    gameId: string,
    idToString: string,
    range: number,
    rules: string
}
const UpdateGamesContext = () => {
    const [contexts, setContexts] = useState<gameContext[]>([])
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const router = useRouter();
    const toHomeClickHandler = useCallback(
        () => { router.push("/") }
        , []
    );
    const GetGamesContext = async () => {
        const playerId = "09ac5e84-db5c-4131-0d1c-08dd1c5384cf";

        const apiUrl = `https://localhost:5001/Api/Players/${playerId}/Games`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            });
            setSelectedOptionIndex(-1);//reset
            setContexts(await response.data)
        } catch (error) {
            console.error("Error creating game:", error);
        }
    }
    const DeleteGameContext = async () => {
        if (selectedOptionIndex == -1)
            return;
        const playerId = "09ac5e84-db5c-4131-0d1c-08dd1c5384cf";

        const apiUrl = `https://localhost:5001/Api/Players/${playerId}/Games/${contexts[selectedOptionIndex].gameId.replaceAll(` `, `%20`)}`;
        try {
            await axios.delete(apiUrl, {
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            });
            // update the list
            GetGamesContext();
        } catch (error) {
            console.error("Error creating game:", error);
        }
    }
    useEffect(
        () => {
            GetGamesContext();
        }, []
    )
    useEffect(
        () => console.log(contexts)
        , [contexts]
    )
    return (<div
        className={`h-screen w-screeen 
                flex flex-col gap-1
                items-start 
                bg-background
                font-mainfont
                text-textColour`}
    >
        <div className={`
                    w-full h-[10vw] bg-foregroundShadow/80
                    
                    flex  items-center 
                    border-r-[3px] border-black/40
                `} >
            <div className={`group z-50
                    flex flex-row justify-between rounded-xl border-2 text-center border-black/20
                    absolute w-[20%] h-auto top-[2vw] left-[22vw] font-mainfont text-black/90 uppercase tracking-tighter
                    hover:cursor-pointer  bg-foreground/80 hover:text-white/80
                    `}>
                <div
                    className={`text-center h-full w-full`}
                    onClick={toHomeClickHandler}><div className={`
                            absolute  left-0
                            h-full w-full 
                            rounded-full scale-y-110 scale-x-[130%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/40
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
                    <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-90 scale-x-[140%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/20
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
                    <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-125 scale-x-[175%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/10
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
                    <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-[200%] scale-x-[185%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground5
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} /> Home</div>
            </div>
            <div className={`group z-50
                    flex flex-row justify-between rounded-xl border-2 text-center border-black/20
                    absolute w-[20%] h-auto top-[2vw] left-[50vw] font-mainfont text-black/90 uppercase tracking-tighter
                    hover:cursor-pointer  bg-foreground/80 hover:text-white/80
                    `}>
                <div
                    className={`text-center h-full w-full`}
                    onClick={toHomeClickHandler}><div className={`
                            absolute  left-0
                            h-full w-full 
                            rounded-full scale-y-110 scale-x-[130%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/40
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
                    <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-90 scale-x-[140%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/20
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
                    <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-125 scale-x-[175%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/10
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
                    <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-[200%] scale-x-[185%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground5
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} /> Logout</div>
            </div>


        </div >
        <div
            className={`
                        flex gap-1
                        ml-[2%]
                        h-[6vw] w-[90%]
                    `}
        >
            <div
                className={`
                            relative
                            h-[6vw] aspect-square
                            rounded-md text-center text-textColour
                            hover:cursor-pointer hover:border-black/80 border-2 border-transparent
                            bg-foreground `}
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
                        
                        `}

            >{selectedOptionIndex == -1
                ? <p className="text-black/30"> Game ID</p>
                : <p className="text-foreground">{contexts[selectedOptionIndex].gameId}</p>
                }
                {/* This is a drop down */}
                <div
                    className={`
                                
                                absolute -bottom-[3vw] translate-y-[100%]
                                min-h-[1vw] max-h-[32vw] overflow-y-auto
                                h-auto w-full rounded-bl-md border-r-2 border-t-2 border-white/30 
                                bg-foregroundShadow/35 shadow-inner shadow-black
                                overflow-clip
                                `}
                >
                    {contexts.map(
                        (context, index) => (
                            <div
                                key={`option-${context.gameId}`}
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
                            >{context.gameId}</div>
                        )
                    )}
                </div>

            </div>

        </div>
        <div
            className={`
                    flex justify-center mt-[36vw]
                    h-[calc(100vh-46vw)] w-full 
                    `}
        >
            <div
                className={`
                    bg-foreground/70 w-[80%] h-[82%] 
                    flex flex-col justify-between overflow-clip
                    rounded-b-3xl border-t-8 border-black/80`}
            >
                {/* Range */}
                <div
                    className={`bg-fadedforeground h-[15%]
                        flex items-center justify-center
                        `}
                >
                    <div
                        className={`
                        flex gap-1
                        h-[6vw] w-[70%]
                    `}
                    >
                        <div
                            className={`
                            relative
                            h-[6vw] w-[45%]
                            rounded-md text-center text-textColour
                            hover:cursor-pointer hover:border-black/80 border-2 border-transparent
                            bg-foreground `}
                        >range

                        </div>
                        {/* <input className="relative  w-[50%]  h-auto py-1
                        group-hover:cursor-pointer text-center
                        border-2 text-black/80
                        bg-foreground/30 rounded-sm
                        "
                            type="number"
                            spellCheck="false"
                            value={(updated != undefined && updated.range > -1) 
                                ? updated.range 
                                : 1
                            }
                            placeholder="Key"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                let potentialTime = Number(e.target.value);
                                potentialTime = potentialTime < 0 ? 0 : potentialTime;
                                setKey(potentialTime);
                            }}
                        /> */}
                    </div>

                </div>
                <div></div>

                <div className={`bg-fadedforeground
                    font-mainfont uppercase
                    text-2xl text-white/90 text-center
                    flex flex-row justify-evenly cursor-pointer
                    `}>
                    <div className={`
                        w-1/2 hover:border-white/65 border-4 border-transparent
                        rounded-bl-3xl
                        `}
                    >update</div>
                    <div className={` w-1/2 hover:border-white/65 border-4 border-transparent
                        rounded-br-3xl
                    `}
                        onClick={DeleteGameContext}
                    >delete</div>
                </div>
            </div>
        </div>
    </div >
    )
}

export default UpdateGamesContext;
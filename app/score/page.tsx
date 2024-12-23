'use client'

import { useLoadingContext } from "@/hooks/context/useLoadingContext";
import { useSessionContext } from "@/hooks/context/useSessionContext";
import { useSignalRContext } from "@/hooks/context/useSignalRContext";
import { scoreT } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ScoreScreen = () => {
    const [playerScores, setPlayerScores] = useState<{ playerName: string, count: number }[]>([])
    const { id, name } = useSessionContext();
    const { connect, invoke, connection } = useSignalRContext();
    const { startLoading } = useLoadingContext();
    const router = useRouter();

    const reTryHandler = () => {
        router.push(`/waitroom/${id}?isOpenRule=false`);
    }
    const toHomeClickHandler = useCallback(
        () => {
            startLoading();
            invoke("LeftSession");
            router.push("/home")
        }
        , []
    );
    const toLobyClickHandler = useCallback(
        () => {
            startLoading();
            invoke("LeftSession");
            router.push("/loby")
        }
        , []
    );
    const sanitisedScores = useCallback((playerScores: { playerName: string, count: number }[]) => [...playerScores].sort((a, b) => b.count - a.count), []);

    //load data
    useEffect(
        () => {
            if (connection == null) {
                connect();
            } else {
                connection.on("SupplyScoreBoard", (scoreBoard: scoreT[]) => {
                    console.log(scoreBoard);
                    const _playerScores = scoreBoard.map(({ correctCount }: scoreT) => {
                        // You can now use these variables to transform the object
                        return {
                            playerName: /*playerConnectionId*/ "June",
                            count: correctCount,
                        };
                    });
                    console.log(_playerScores)
                    setPlayerScores(sanitisedScores(_playerScores));
                });
                invoke("RequestScoreBoard")
            }
        }, [connection]
    )

    return (
        <div className={`h-screen w-screen bg-foregroundShadow`}>
            <div
                className={`
            flex items-center justify-center
            h-full w-full bg-foregroundShadow/70`}
            >
                {/* central display */}
                <div
                    className={`h-[50%] w-[60%] flex flex-col justify-evenly`}
                >
                    <div className={`group
                relative z-50
                font-extrabold tracking-widest text-2xl
                shadow-inner shadow-black
                w-auto text-center rounded-lg
                hover:cursor-pointer 
                hover:shadow-xl hover:bg-foreground/80
                border-4 border-transparent
                group-hover:animate-pulse
                p-[10%]`}
                        onClick={reTryHandler}
                    >

                        <p className={`relative group-hover:hidden z-50`}>{name}</p>
                        <p className={`opacity-0 group-hover:opacity-100 
                    hidden group-hover:relative group-hover:block
                    transition-all duration-500 uppercase z-50`}>try Again</p>
                        <div className={`
                            z-0
                            group-hover:animate-pulse
                            absolute top-0 left-0
                            h-full w-full scale-x-[140%] scale-y-[135%]
                            rounded-2xl
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/20
                            via-foreground/0 to-pink/0 
                            `} />
                        <div className={`
                            z-0
                            group-hover:animate-pulse
                            absolute top-0 left-0
                            h-full w-full scale-x-[115%] scale-y-[110%]

                            rounded-2xl
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/40
                            via-foreground/0 to-pink/0 
                            `} />
                        <div className={`
                            z-0
                            group-hover:animate-pulse
                            absolute top-0 left-0
                            h-full w-full scale-x-[130%] scale-y-[150%]
                            rounded-2xl
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/25
                            backdrop-blur-sm opacity-40
                            via-foreground/0 to-pink/0 
                            `} />
                    </div>

                    <div

                        className={`flex flex-row w-full 
                        justify-between
                        gap-4 pl-[10%]
                        text-xl uppercase font-mainfont
                        `}
                    >

                        <div>
                            <div
                                className={`hover:cursor-pointer hover:animate-pulse hover:underline 
                        text-textColour/60 text-start text-lg`}
                                onClick={toHomeClickHandler}> Home</div>
                            <div
                                className={`hover:cursor-pointer hover:animate-pulse hover:underline 
                        text-textColour/60 text-start text-lg`}
                                onClick={toLobyClickHandler}> Loby</div>
                        </div>

                        <div className={` text-sm `}> Correct</div>
                    </div>
                    {playerScores.map(
                        (score, i) => (<div
                            key={`score-${i}`}
                            className={`flex flex-row w-full pr-[5%]
                        justify-between rounded-sm
                        gap-4 pl-[10%] 
                         ${i == 0 ? "bg-foreground/30" : ""}
                        ${i == 1 ? "bg-white/45" : ""}
                        ${i == 2 ? "bg-red-600/30" : ""}
                        text-xl uppercase font-mainfont
                        `}
                        >
                            <div className={`
                         h-auto w-auto aspect-square flex items-center justify-center
                         rounded-md font-bold
                         px-1 text-textColour
                        ${i == 0 ? "bg-foreground" : ""}
                        ${i == 1 ? "bg-white/95" : ""}
                        ${i == 2 ? "bg-red-700/80" : ""}
                        `}> {(i + 1)}</div>
                            <div className={`
                        ${i == 0 ? "text-white/85" : ""}
                         ${i == 1 ? "text-black/85" : ""}
                         ${i == 2 ? "text-white/75" : "text-textColour"}
                        `}> {score.playerName}</div>
                            <div className={`
                        ${i == 0 ? "text-white/85" : ""}
                        ${i == 1 ? "text-black/85" : ""}
                         ${i == 2 ? "text-white/75" : "text-textColour"}
                        `}> {score.count}</div>
                        </div>)
                    )}
                </div>

            </div >
        </div>
    )
}

export default ScoreScreen;
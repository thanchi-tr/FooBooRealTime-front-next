'use client';

import IluminatedBox from "@/components/clients/Animation/IluminatedBox";
import Rule from "@/components/clients/Animation/RuleDescriptionToggle";
import useResultDisplayToggle from "@/hooks/useResultDisplayToggle";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSignalRContext } from "@/hooks/context/useSignalRContext";
import { useSessionContext } from "@/hooks/context/useSessionContext";
import { useLoadingContext } from "@/hooks/context/useLoadingContext";
import LoadingScreen from "../Animation/LoadingScreen";
import { useSearchParams } from 'next/navigation';
const WaitRoomPage = ({ sessionId }: { sessionId: string }) => {
    const searchParams = useSearchParams();
    const [playerState, setPlayerState] = useState([
        { name: "june", isReady: false },
    ])
    const [isAdjustTime, setIsAdjustTime] = useState(false);
    const { name, rules, id, setName, setRules, setId, setQuestion, time, setTime } = useSessionContext();
    const { isRuleOpen, OpenHandler } = useResultDisplayToggle(!(searchParams.get("isOpenRule") == "false"), !(searchParams.get("isOpenRule") == "false"));
    const { connect, connection, invoke } = useSignalRContext();
    const { isLoaded, startLoading, loadComplete } = useLoadingContext();
    const router = useRouter();



    // load the information in
    useEffect(
        () => {
            if (connection != null) {
                console.log("June join session " + id)
                connection.on("SupplyInitQuestion", (initQuestion: number) => {
                    console.log("INITIAL QUESTION:" + initQuestion)
                    setQuestion(initQuestion);
                });

                connection.on("SupplySessionInfo", (
                    gameName: string,
                    rules_: Map<string, string>,
                ) => {
                    const sanitisedRules = Object.entries(rules_).map(([key, value]) => ({
                        Key: Number(key), // Ensure key is a number if necessary
                        Value: value
                    }))
                    setName(gameName);
                    setRules(sanitisedRules);
                    loadComplete();
                })

                setId(sessionId);
                invoke("JoinSession", sessionId);
                setTime(1);
                invoke("SupplyGameTime", 1);
            }
            else {
                connect();
            }
        }, [connection]
    );
    // Handle loading next phase
    useEffect(
        () => {
            if (playerState.reduce(
                (predicate, player) => predicate && player.isReady,
                true // Initial value for predicate
            )) {
                // All players are ready
                // console.log("All player ready")
                setTimeout(() =>

                    router.push("../game"), 550
                )
            }
        }, [playerState]
    )
    const playerReadyToggle = useCallback((index: number) => {
        if (connection != null) {

            invoke("TogglePlayerReady");
        }
        setPlayerState((prev) => {

            // Create a shallow copy of the array
            const updatedPlayers = [...prev];

            // Create a shallow copy of the specific player object
            updatedPlayers[index] = {
                ...updatedPlayers[index],
                isReady: !updatedPlayers[index].isReady, // Toggle the isReady property
            };
            // Return the updated array
            return updatedPlayers;
        });
    }, [playerState]);
    const toLobyClickHandler = useCallback(
        () => {
            startLoading();
            invoke("LeftSession");
            router.push("/loby")
        }
        , []
    );
    const toHomeClickHandler = useCallback(
        () => {
            startLoading();
            invoke("LeftSession");
            router.push("/home")
        }
        , []
    );
    return (<div
        className={`relative flex flex-row flex-grow justify-evenly
            items-center h-screen w-screen bg-background
            overflow-clip
            `}
    >
        <div className={`absolute 
                ${isLoaded ? "z-0" : "z-[100]"}
                 h-screen w-screen top-0`}>
            <LoadingScreen></LoadingScreen>
        </div>
        <div className={`absolute w-[90vw] h-[90vh] top-0 
             ${isRuleOpen ? "z-50 " : " "}
            `}>
            <Rule isRuleOpen={isRuleOpen} rules={rules} openHandler={OpenHandler} size={1}></Rule>
        </div>
        <div
            className={`z-0 flex flex-col gap-2 relative w-[60%] h-auto 
                ${isRuleOpen ? "opacity-0" : "opacity-100 transition-opacity delay-100 duration-75"}
                `}
        >
            <div className={`
            flex flex-row justify-between
                absolute w-[90%] -top-10 font-mainfont text-black/80 uppercase tracking-tighter
                
                `}

            >
                <div
                    className={`hover:cursor-pointer hover:animate-pulse hover:underline`}
                    onClick={toLobyClickHandler}> back to loby</div>
                <div
                    className={`hover:cursor-pointer hover:animate-pulse hover:underline`}
                    onClick={toHomeClickHandler}> Home</div>
            </div>
            {playerState.map(
                (player, i) =>
                    <div key={`player-${player.name}-${i}`} className={`w-[90%]`}>
                        <IluminatedBox text={player.name} isSelect={player.isReady} clickHandler={() => playerReadyToggle(i)}></IluminatedBox>
                    </div>
            )}
        </div>
        <div className={`group absolute bottom-[4%] p-1 z-20 
            text-xl text-black/80 font-mainfont text-center
            `}>
            <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-[60%] scale-x-110
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/40
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
            <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-75 scale-x-[120%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/20
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
            <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-100 scale-x-[135%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground/10
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
            <div className={`
                            absolute top-[20%] left-0
                            h-full w-full 
                            rounded-full scale-y-125 scale-x-[165%]
                            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                            group-hover:from-foreground5
                            via-foreground/0 to-pink/0 
                            group-hover:animate-pulse
                            `} />
            {name}
            <div className={
                `relative
                bg-foreground/70 rounded-3xl hover:bg-foreground hover:cursor-pointer hover:text-white text-black px-2 `}
                onClick={() => setIsAdjustTime(prev => !prev)}
            >{time} {time < 2 ? "minute " : "minutes"}


            </div>

        </div>
        <form className={`
            absolute 
            ${isAdjustTime ? "flex" : "hidden"}
            flex items-center justify-center
            h-full w-full  z-10
            overflow-clip backdrop-blur-3xl
            bg-foregroundShadow/5 shadow-2xl 
            shadow-black rounded-sm
            `}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault(); // Prevent the default form submission behavior
                setIsAdjustTime((prev) => !prev);
            }}
        >
            <label
                className={`absolute top-[15vw] 
                    p-2 rounded-sm
                    uppercase font-mainfont font-extrabold  
                    bg-foreground/80
                    shadow-inner shadow-black`}
                onClick={() => setIsAdjustTime(prev => !prev)}
            > set game time</label>
            <div
                className="absolute top-0 h-full w-full z-0
                hover:cursor-pointer
                "
                onClick={() => setIsAdjustTime(prev => !prev)}
            ></div>
            <input
                type="number"
                spellCheck="false"
                value={time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let potentialTime = Number(e.target.value);
                    potentialTime = potentialTime < 0 ? 0 : potentialTime;
                    setTime(potentialTime);
                    invoke("SupplyGameTime", potentialTime);
                }} // Update state on input change
                placeholder="Enter your answer"
                className={`box-border z-50
                    bg-foreground rounded-md text-textColour text-3xl pl-2 text-center
                    font-mainfont w-1/6 aspect-square scale-125 overflow-hidden
                    appearance-none focus:outline-none`}
            />
        </form>


    </div>)
}

export default WaitRoomPage;
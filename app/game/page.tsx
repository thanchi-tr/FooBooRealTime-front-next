'use client';
import CountDownClock from "@/components/clients/Animation/CountDownClock";
import LoadingScreen from "@/components/clients/Animation/LoadingScreen";
import Rule from "@/components/clients/Animation/RuleDescriptionToggle";
import TextBox from "@/components/clients/Animation/TextBox";
import { useLoadingContext } from "@/hooks/context/useLoadingContext";
import useCountDown from "@/hooks/useCountDown";
import useResultDisplayToggle from "@/hooks/useResultDisplayToggle";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSessionContext } from "@/hooks/context/useSessionContext";
import { useSignalRContext } from "@/hooks/context/useSignalRContext";


/***
 * Once every information is loaded: 
 *  <check load context> :: it direct how load screen behave
 * 
 */
const Game = () => {
    const { name, rules, id, question, time, setQuestion, reset } = useSessionContext();
    const { timeRemain, triggerStart } = useCountDown(10);
    const { isRuleOpen, OpenHandler } = useResultDisplayToggle(false, false);
    const { startLoading } = useLoadingContext();
    const { connect, invoke, connection } = useSignalRContext();
    const router = useRouter();


    useEffect(
        () => {
            if (connection == null) {
                connect();
            } else {
                triggerStart();
                connection.on("SupplyQuestion", (question) => setQuestion(question))
            }
        },
        [connection]
    )
    //replace with real loading task
    useEffect( // move to score display
        () => {
            if (timeRemain == 0) {
                setTimeout(() => {
                    router.push("../score/" + name)
                }, 200)
            }
        }, [timeRemain]
    )

    const toLobyClickHandler = useCallback(
        () => {
            reset()
            startLoading();
            invoke("LeftSession");
            router.push("/loby")
        }
        , []
    );
    return (


        <div
            className={`
                relative
            flex flex-col flex-grow justify-evenly
            items-center h-screen w-screen 
            bg-background
            `}
        >

            <div className={`
                absolute h-full w-full top-0
                ${timeRemain > 0 ? "" : "bg-foregroundShadow/35"}`}></div>

            <div className={`
            absolute 
            w-[60vw] h-[95vh] 
            -top-[5vh] z-0
            ${isRuleOpen ? "z-50 " : " "}`}>
                <Rule isRuleOpen={isRuleOpen} rules={rules} openHandler={OpenHandler} size={0} isHiding={true}></Rule>
            </div>
            <div className={`
                group absolute hover:cursor-pointer
                -top-[6%] -left-[6%] 
                h-[18%] aspect-square
                `}
                onClick={toLobyClickHandler}
            >
                <div className={`-z-10
                group-hover:z-10 group-hover:delay-200 rotate-[32deg]
                duration-100 
                absolute text-2xl top-[60%] group-hover:top-[90%] -right-[10%] group-hover:-right-[8%]
                ${(timeRemain != 0
                        ? "bg-gradient-to-tl from-foreground/80 via-foreground/40 to-foregroundShadow/40 text-transparent bg-clip-text"
                        : "text-textColour/35")}
                uppercase font-extrabold  text-3xl
                `}>
                    Exit
                </div>
                <div
                    className={`overflow-clip
                 h-full w-full
                 rounded-full  shadow-tl-[20px] 
                 transition-transform duration-500 ease-out
                 group-hover:-translate-x-[46%]  group-hover:-left-[26%]
                 ${timeRemain == 0
                            ? "shadow-none bg-bacground/45 border-[1px] border-black/10"
                            : "shadow-md"}
                  shadow-black/25
                 `}
                >
                    <div className={`relative h-full w-full`}>
                        <div className={`
                    absolute -bottom-[30%] -right-[20%]
                    h-full w-full 
                    rounded-full scale-x-110  
                    transition-all duration-500 ease-out
                    group-hover:-translate-y-[20%]
                    bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                    ${(timeRemain != 0 ? "from-foreground/50 " : "from-textColour/30")}
                    via-foreground/0 to-pink/0 
                    `} />
                        <div className={`
                    absolute bottom-[20%] right-[30%]
                    h-full w-full 
                    rounded-full scale-x-110  
                    transition-all duration-500 ease-out
                    group-hover:-translate-y-[20%]
                    bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                    ${(timeRemain != 0 ? "from-foregroundShadow " : "from-black/30")}
                     via-foreground/0 to-pink/0 
                    `} />
                    </div>

                </div>

            </div>

            <div className={`relative`}>

                <div className={`absolute scale-[200%]
                    flex flex-row gap-2
                    shadow-inner   p-2 
                    ${(timeRemain != 0
                        ? " bg-gradient-to-t from-background via-foregroundShadow/25 to-foreground/15 shadow-black"
                        : "from-black/30 shadow-black/55")}
            
            text-textColour/50 text-2xl 
            uppercase font-extrabold font-mainfont`} >{question} <p className={`text-lg text-black/40`}>?</p></div>
            </div>
            <div className={`relative h-[35vw] w-auto aspect-square`}>
                <CountDownClock timeRemain={timeRemain}></CountDownClock>
            </div>
            <div
                className={`w-1/2 h-auto z-10
                
                `}
            >
                <TextBox isTimeUp={timeRemain == 0}></TextBox>
            </div>
        </div>


    );
}

export default Game;
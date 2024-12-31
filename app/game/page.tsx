'use client';
import CountDownClock from "@/components/clients/Animation/CountDownClock";
import Rule from "@/components/clients/Animation/RuleDescriptionToggle";
import TextBox from "@/components/clients/Animation/TextBox";
import { useLoadingContext } from "@/hooks/context/useLoadingContext";
import useCountDown from "@/hooks/useCountDown";
import useResultDisplayToggle from "@/hooks/useResultDisplayToggle";
import { useCallback, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSessionContext } from "@/hooks/context/useSessionContext";
import { useSignalRContext } from "@/hooks/context/useSignalRContext";
import MessageComponent from "@/components/clients/Functional/MessageComponent";
import { ClientMethods, ServerMethods } from "@/lib/type";
/***
 * Once every information is loaded: 
 *  <check load context> :: it direct how load screen behave
 * 
 */
const Game = () => {
    const { rules, question, time, setQuestion, reset } = useSessionContext();
    const { timeRemain, triggerStart } = useCountDown(time * 60);
    const { isRuleOpen, OpenHandler } = useResultDisplayToggle(false, false);
    const { startLoading } = useLoadingContext();
    const { connect, invoke, connection } = useSignalRContext();
    const router = useRouter();
    const NO_QUESTION = -1;

    useEffect( // ensure if question invalid, navigate back to loby
        () => {
            // for now, as soon as you refresh the game disconnect, and every one get kick out.
            // later on we can create a re-connecting machanism
            if (question == NO_QUESTION)
                router.push("./loby");
        }, []
    )

    useEffect(
        () => {
            if (connection == null) {
                connect();
                return;
            }
            triggerStart();
            connection.on(ClientMethods.SupplyQuestion, (question) => setQuestion(question))
            connection.on(ClientMethods.NotifyGameEnd, () => router.push("../score/"))
        }, [connection]
    )
    useEffect(() => { // short cut mapping
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "tab" && event.shiftKey) {
                event.preventDefault();
                OpenHandler();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [OpenHandler]);
    const toLobyClickHandler = useCallback(
        () => {
            reset()
            startLoading();
            invoke(ServerMethods.LeftSession);
            router.push("/loby")
        }, []
    );
    return (
        <div
            className={`
                relative
                flex flex-col lg:flex-row   
                flex-grow justify-evenly
                items-center h-screen w-screen 
                bg-background
                `}
        >
            <MessageComponent />
            <div className={`
                absolute h-full w-full top-0
                ${timeRemain > 0 ? "" : "bg-foregroundShadow/35"}`}></div>

            <div className={`
                    absolute max-w-[680px]
                    w-[55vw] sm:w-[62vw] md:w-[50vw] xl:w-[54vw]
                    h-[95vh] 
                    -top-[5vh] z-0
                    ${isRuleOpen ? "z-50 " : " "}`}
            >
                <Rule isRuleOpen={isRuleOpen} rules={rules} openHandler={OpenHandler} size={0} isHiding={true}></Rule>
            </div>
            <div className={`
                    group absolute hover:cursor-pointer
                    -top-[6%] -left-[6%]  md:-top-[2%] md:-left-[4%] lg:-left-[3.5%]
                    h-[18%] aspect-square
                    `}
                onClick={toLobyClickHandler}
            >
                <div className={`-z-10
                    group-hover:z-10 group-hover:delay-200 rotate-[32deg] lg:rotate-[22deg]
                    duration-100 
                    absolute text-2xl top-[60%] group-hover:top-[90%] lg:group-hover:top-[75%] -right-[10%] group-hover:-right-[8%]
                    ${(timeRemain != 0
                        ? "bg-gradient-to-tl from-foreground/80 via-foreground/40 to-foregroundShadow/40 md:to-foregroundShadow/5 text-transparent bg-clip-text"
                        : "text-textColour/35")}
                    uppercase font-extrabold  text-3xl
                    `}
                >Exit
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
                                absolute -bottom-[30%] -right-[20%] lg:-right-[28%] lg:-bottom-[20%] lg:scale-125   
                                h-full w-full 
                                rounded-full scale-x-110  
                                transition-all duration-500 ease-out
                                group-hover:-translate-y-[20%]
                                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                                ${(timeRemain != 0 ? "from-foreground/50 " : "from-textColour/30")}
                                via-foreground/0 to-pink/0 
                                `}
                        />
                        <div className={`
                                absolute bottom-[20%] right-[30%]
                                h-full w-full 
                                rounded-full scale-x-110  
                                transition-all duration-500 ease-out
                                group-hover:-translate-y-[20%]
                                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                                ${(timeRemain != 0 ? "from-foregroundShadow " : "from-black/30")}
                                via-foreground/0 to-pink/0 
                                `}
                        />
                    </div>
                </div>
            </div>

            <div className={`relative `}>

                <div className={`
                        absolute scale-[200%]
                        lg:left-[35vw] xl:left-[31vw] 2xl:left-[26vw]
                        lg:top-[10vw] xl:top-[8.5vw]
                        flex flex-row gap-2 lg:bg-background
                        shadow-inner   p-2 
                        ${(timeRemain != 0
                        ? " bg-gradient-to-t from-background via-foregroundShadow/25 to-foreground/15 shadow-black"
                        : "from-black/30 shadow-black/55")}
                        text-textColour/50 text-2xl md:text-xl lg:text-md 
                        uppercase font-extrabold font-mainfont`}
                >{question}
                    <p className={`text-lg text-black/40`}>?</p>
                </div>
            </div>
            <div className={`
                    relative lg:-z-0
                    h-[35vw] max-h-[270px] xl:max-h-[300px]
                    w-auto aspect-square`}
            >
                <CountDownClock timeRemain={timeRemain}></CountDownClock>
            </div>
            <div
                className={`
                    w-1/2 
                    lg:w-1/3 lg:ml-[10%]
                     2xl:w-[28%] 2xl:ml-[7%]
                    h-auto z-10`}
            >
                <TextBox isTimeUp={timeRemain == 0}></TextBox>
            </div>
        </div>


    );
}

export default Game;
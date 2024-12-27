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
import { useUser } from "@auth0/nextjs-auth0/client";
import NumberSetter from "../Functional/NumberSetter";
import { scoreT } from "@/lib/type";
import { toGuidId } from "@/lib/generator";



const WaitRoomPage = ({ sessionId }: { sessionId: string }) => {
    const searchParams = useSearchParams();
    const [playerState, setPlayerState] = useState<{
        name: string,
        id: string,
        IsReady: boolean
    }[]>([])
    const { user } = useUser();
    const { name, rules, setName, setRules, setId, setQuestion, time, setTime, setHost, host } = useSessionContext();
    const { isRuleOpen, OpenHandler } = useResultDisplayToggle(!(searchParams.get("isOpenRule") == "false"), !(searchParams.get("isOpenRule") == "false"));
    const { connect, connection, invoke, connectionId } = useSignalRContext();
    const { isLoaded, startLoading, loadComplete } = useLoadingContext();
    const [isHost, setIsHost] = useState(false);
    const router = useRouter();
    // load the information in
    useEffect(
        () => {
            if (connection != null) {
                connection.on("SupplyGameTime", (gameTime: number) => {
                    setTime(gameTime);
                });
                connection.on("SupplyInitQuestion", (initQuestion: number) => {
                    setQuestion(initQuestion);
                    console.log("All player ready: About to start")
                    router.push("../game")
                });
                connection.on("NotifyReadyStatesChange", (scoreBoard: scoreT[]) => {
                    const _playerScores = scoreBoard.map(({ isReady, playerConnectionId }: scoreT) => {
                        return {
                            name: /*playerConnectionId*/ "June",
                            id: playerConnectionId,
                            IsReady: isReady
                        };
                    });

                    console.log(_playerScores)
                    setPlayerState(_playerScores);
                })
                connection.on("SupplySessionInfo", (
                    gameName: string,
                    rules_: Map<string, string>,
                    hostId: string,
                    time: number
                ) => {

                    console.log(hostId);
                    const sanitisedRules = Object.entries(rules_).map(([key, value]) => ({
                        Key: Number(key), // Ensure key is a number if necessary
                        Value: value
                    }))
                    console.log(hostId);
                    setName(gameName);
                    setHost(hostId);
                    setRules(sanitisedRules);
                    if (time) setTime(time);
                    loadComplete();
                })
                setId(sessionId);
                invoke("JoinSession", sessionId);
            }
            else {
                connect();
            }
        }, [connection]
    );
    useEffect(
        () => {
            if (host != "") {
                const playerId = toGuidId(user?.sub ?? "09ac5e84-db5c-4131-0d1c-08dd1c5384cf");

                if (playerId == host) {
                    console.log("===isHost")
                    setIsHost(true);
                    setTime(1);
                    invoke("SupplyGameTime", 1);
                }
            }
        }, [host]
    )


    const playerReadyToggle = useCallback((index: number) => {
        if (connection != null) {
            invoke("TogglePlayerReady");
        }

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
            router.push("/")
        }
        , []
    );

    return (<><div
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
            {playerState && playerState.map(
                (player, i) =>
                    <div key={`player-${user?.name ?? `${i}`}-${i}`}
                        className={`w-[90%]
                        ${(connectionId == player.id) ? "" : "pointer-events-none"}
                        `}>
                        <IluminatedBox
                            text={(connectionId != player.id) ? user?.name?.split(" ")[0] ?? "" : "You"}
                            isSelect={player.IsReady} clickHandler={() => playerReadyToggle(i)}
                            isDisable={(connectionId != player.id)}

                        />
                    </div>
            )}
        </div>
        {/* Setting time screen */}

        <NumberSetter
            name={name} curValue={time} setterHandler={invoke}
            isAdjustable={isHost}
        ></NumberSetter>


    </div>
        <div
            className={`absolute bottom-0 right-0 font-mainfont text-sm scale-90 text-black/70 tracking-tighter`}
        >
            player:<p className="pl-2 inline text-md text-yellow-400">{playerState.reduce((acc, player) => acc + (player.IsReady ? 1 : 0), 0)}</p> over <p className="inline text-white/80">{playerState.length}</p>
        </div>
    </>)
}

export default WaitRoomPage;
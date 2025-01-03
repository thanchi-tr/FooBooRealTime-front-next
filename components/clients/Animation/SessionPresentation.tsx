'use client'

import { useLoadingContext } from "@/hooks/context/useLoadingContext"
import { useSignalRContext } from "@/hooks/context/useSignalRContext"
import { ClientMethods, ServerMethods, SessionT } from "@/lib/type"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen"
import { useSessionContext } from "@/hooks/context/useSessionContext"

const SessionPresentation = () => {
    const router = useRouter()
    const [sessions, setSessions] = useState<SessionT[]>([]);
    const [rulesCounts, setRuleCounts] = useState<number[]>([]);
    const { isLoaded, loadComplete } = useLoadingContext();
    const { connect, connection, invoke } = useSignalRContext();
    const { reset } = useSessionContext();
    useEffect(
        () => {
            reset();
            if (connection == null) {
                connect();// loading the session
            }
        }, []
    )
    const handleSessionClick = useCallback(
        (id: string) => {
            router.push(`/waitroom/${id}?isOpenRule=true`);
        },
        [router]
    );
    // once the connect the attempt to get the session info
    useEffect(
        () => {
            if (connection != null) {
                connection.on(ClientMethods.SupplyAvailableSessions, (sessions: SessionT[], rules: number[]) => {
                    loadComplete();
                    setRuleCounts(rules);
                    setSessions(sessions);
                });
            }
            if (connection != null && connection.state == "Connected") {
                try {
                    setTimeout(async () => await invoke(ServerMethods.RequestAvailableSessions), 2000);
                } catch (err) {
                    console.error("Error: invoking method:", err);
                }
            }
        }
        , [connection]
    )
    const handleCreateNewSessionClick = useCallback(
        () => router.push(`/create-new-session/`)
        , [router]
    );

    return (
        <>
            <div
                className={`
            overflow-y-auto
            overflow-x-clip
             justify-center
            h-[90%] w-full 
            rounded-xl overflow-clip
            bg-background `}
            >

                <div className={`h-[90%] w-full flex flex-col 
                    grow-0 shrink-0 overflow-clip
                    items-center gap-2`}>
                    {
                        isLoaded
                            ? (sessions.length > 0)

                                ? sessions.map(
                                    (session, index) => (
                                        <div
                                            key={`session-${index}`}
                                            className={`group
                                                flex flex-row  relative
                                                justify-between
                                                w-[60%] h-auto
                                                px-[8%] text-white/60
                                                shadow-inner shadow-black rounded-md 
                                                hover:shadow-2xl hover:bg-foreground/95 hover:cursor-pointer
                                                border-t-2 border-x-[0.06px] hover:text-white
                                                border-white/10 font-bold
                                        `}
                                            onClick={() => handleSessionClick(session.sessionId)}
                                        >
                                            <div >
                                                <p>{session.gameName}</p>
                                                <p className={`
                                                    -translate-y-[30%] group-hover:translate-y-0
                                                    group-hover:duration-200
                                                    absolute opacity-0 group-hover:z-50 -z-50
                                                    group-hover:opacity-100 border-b-2 border-x
                                                    text-white/60 uppercase 
                                                     bg-background p-2 font-mainfont
                                                     rounded-t-none rounded-2xl
                                                     mt-2 text-sm scale-[85%] text-center
                                                    `}> {session.sessionId} </p>
                                            </div>

                                            <div className={``}> {
                                                // session.ruleCount ?? //can add after alter
                                                rulesCounts && (rulesCounts.length > index
                                                    ? rulesCounts[index]
                                                    : 0)
                                            }</div>
                                            <div className={`
                                                group-hover:animate-pulse
                                                absolute top-0 left-0
                                                h-full w-full scale-x-[125%] scale-y-[170%]
                                                rounded-full
                                                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                                                group-hover:from-foreground/20
                                                via-foreground/0 to-pink/0 
                                                `} />
                                            <div className={`
                                                group-hover:animate-pulse
                                                absolute top-0 left-0
                                                h-full w-full scale-x-[110%] scale-y-[150%]
                                                rounded-full
                                                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                                                group-hover:from-foreground/40
                                                via-foreground/0 to-pink/0 
                                                `} />
                                            <div className={`
                                                group-hover:animate-pulse
                                                absolute top-0 left-0
                                                h-full w-full scale-x-[140%] scale-y-[180%]
                                                rounded-full
                                                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                                                group-hover:from-foreground/10
                                                via-foreground/0 to-pink/0 
                                                `} />

                                        </div>))
                                //defaultly no session
                                : <div

                                    className={`group
                                        flex flex-row relative
                                        justify-between font-mainfont
                                        w-[60%] h-auto
                                        px-[8%] z-50
                                        shadow-inner shadow-black rounded-md 
                                        hover:shadow-2xl hover:bg-foreground/70 hover:cursor-pointer
                                        border-t-2 border-x-[0.06px] hover:text-white
                                        border-white/10 font-bold
                                `}
                                    onClick={handleCreateNewSessionClick}
                                >
                                    <div >
                                        <p className={`flex group-hover:hidden text-white/60`}>No session</p>
                                        <p className={`group-hover:flex hidden uppercase text-white`}>Add session</p>
                                    </div>
                                    <div className={``}> </div>
                                    <div className={`
                                        group-hover:animate-pulse
                                        absolute top-0 left-0
                                        h-full w-full scale-x-[125%] scale-y-[170%]
                                        rounded-full
                                        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                                        group-hover:from-foreground/20
                                        via-foreground/0 to-pink/0 
                                        `} />
                                    <div className={`
                                        group-hover:animate-pulse
                                        absolute top-0 left-0
                                        h-full w-full scale-x-[110%] scale-y-[150%]
                                        rounded-full
                                        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                                        group-hover:from-foreground/40
                                        via-foreground/0 to-pink/0 
                                        `} />
                                    <div className={`
                                        group-hover:animate-pulse
                                        absolute top-0 left-0
                                        h-full w-full scale-x-[140%] scale-y-[180%]
                                        rounded-full
                                        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                                        group-hover:from-foreground/10
                                        via-foreground/0 to-pink/0 
                                        `} />

                                </div>


                            : <div
                                className="w-[70%] h-full border-y-4 border-white/20 rounded-lg overflow-clip"
                            >  <LoadingScreen></LoadingScreen> </div>}
                </div>

            </div>
            <div className={`h-auto w-full flex justify-center`}>
                <div
                    className={`
                            overflow-clip group
                        w-[48%] h-auto box-border
                         rounded-md  
                         shadow-black
                        uppercase hover:border-foreground border-2 border-transparent
                        shadow-inner  font-bold bg-foregroundShadow/20
                        hover:cursor-pointer
                `}
                    onClick={handleCreateNewSessionClick}
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
        </>
    )
}

export default SessionPresentation;
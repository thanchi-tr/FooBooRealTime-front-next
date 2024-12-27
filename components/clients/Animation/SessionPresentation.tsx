'use client'

import { useLoadingContext } from "@/hooks/context/useLoadingContext"
import { useSignalRContext } from "@/hooks/context/useSignalRContext"
import { SessionT } from "@/lib/type"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen"

const SessionPresentation = () => {
    const router = useRouter()
    const [sessions, setSessions] = useState<SessionT[]>([]);
    const { isLoaded, loadComplete } = useLoadingContext();
    const { connect, connection, invoke } = useSignalRContext();
    const handleSessionClick = useCallback(
        (id: string) => {

            router.push(`/waitroom/${id}?isOpenRule=true`);
        },
        [router]
    );
    const handleCreateNewSessionClick = useCallback(
        () => {
            // startLoading();
            router.push(`/create-new-session/`);
        },
        [router]
    );
    const asyncWrapper = async () => {
        if (connection != null && connection.state === "Connected") {
            try {
                // await invoke("RequestNewSession", "new Game");
                setTimeout(async () => await invoke("GetAvailableSessions"), 2000);
            } catch (err) {
                console.error("Error: invoking method:", err);
            }
        }
    }
    useEffect(
        () => {
            // loading the session
            if (connection == null) {
                connect();
            }
        }, []
    )
    // once the connect the attempt to get the session info
    useEffect(
        () => {
            if (connection != null) {
                connection.on("SupplyAvailableSessions", (sessions: SessionT[]) => {
                    console.log(sessions)
                    loadComplete();
                    setSessions(sessions);
                });
            }
            if (connection != null && connection.state == "Connected") {
                asyncWrapper();
            }
        }
        , [connection]
    )
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
                            flex flex-row relative
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
                                            <div> {session.gameName}</div>
                                            <div className={``}> {
                                                // session.ruleCount ?? //can add after alter
                                                0}</div>
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
                        justify-between
                        w-[60%] h-auto
                        px-[8%] text-white/60
                        shadow-inner shadow-black rounded-md 
                        hover:shadow-2xl hover:bg-foreground/95 hover:cursor-pointer
                        border-t-2 border-x-[0.06px] hover:text-white
                         border-white/10 font-bold
                `}

                                >
                                    <div> No session</div>
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
                    onClick={() => { handleCreateNewSessionClick() }}
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
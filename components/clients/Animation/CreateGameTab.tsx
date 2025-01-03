'use client';
import { toGuidId } from "@/lib/generator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface gameConfig {
    nameId: string,
    rules: { Key: number, Value: string }[]
}

const CreateGameTab = () => {
    const router = useRouter();
    const [key, setKey] = useState(1);
    const [range, setRange] = useState(10);
    const [value, setValue] = useState("");
    const { user } = useUser();
    const [gameDetail, setGameDetail] = useState<gameConfig>({
        nameId: "",
        rules: [
            // { Key: 1, Value: "Hi" }
        ]
    })
    const toHomeClickHandler = useCallback(
        () => { router.push("/") }
        , []
    );
    const logOutClickHandler = useCallback(
        () => { router.push("/api/auth/logout") }
        , []
    );
    const GameCreationHandler = async () => {
        if (gameDetail.nameId == "")
            return; // name is the key, uniqure and required
        // const playerId = "09ac5e84-db5c-4131-0d1c-08dd1c5384cf";
        const playerId = toGuidId(user?.sub ?? "09ac5e84-db5c-4131-0d1c-08dd1c5384cf");

        const apiUrl = `https://localhost:5001/Api/Players/${playerId}/Games/Game`;

        try {

            const accessKey = await axios.get("/api/get-access-token", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (accessKey.status != 200) {
                console.error("Unauthorized action: Error to retrieve Access key");
            }
            const gameData = {
                authorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                gameId: gameDetail.nameId,
                range: range,
                rules: JSON.stringify({
                    RuleList: gameDetail.rules,
                }),
            };
            console.log(gameData);
            const response = await axios.post(apiUrl, gameData, {
                headers: {
                    "Content-Type": "application/json-patch+json",
                    "Authorization": `Bearer ${accessKey.data}`,
                },
            });
            if (response.status == 201) {
                router.push("/home");
            }
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    return (
        <div
            className={`h-full w-full 
                flex items-center 

                font-mainfont
                text-textColour`}
        >
            <div className={`
                    w-1/2 h-full
                    flex  items-center 
                    border-r-[3px] border-black/40
                `} >

                <div className={`group z-50
                    
                    flex flex-row justify-between rounded-xl border-2 text-center border-black/20
                    absolute w-auto px-2 h-auto top-[3vw] left-[4vw] font-mainfont text-black/90 uppercase tracking-tighter
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
                    left-[24vw] md:left-[16vw] lg:left-[13vw] xl:left-[11.5vw]
                    flex flex-row justify-between rounded-xl border-2 text-center border-black/20
                    absolute w-auto px-2 h-auto top-[3vw]  font-mainfont text-black/90 uppercase tracking-tighter
                    hover:cursor-pointer  bg-foreground/80 hover:text-white/80
                    `}>
                    <div
                        className={`text-center h-full w-full`}
                        onClick={logOutClickHandler}><div className={`
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
                <form className={`
                    md:ml-[25%] lg:ml-[20%] xl:ml-[20%]
                    w-full md:w-[85%] lg:w-[80%] xl:w-[60%] 2xl:w-1/2
                    gap-4 
                    flex flex-col items-center
                `}>
                    <div className={`flex justify-between w-[95%]`}>
                        <div
                            className={`
                            relative w-1/2 py-4
                            rounded-md text-center text-white/60
                             border-2 border-transparent
                            bg-foreground/70 p-1`}

                        >Range

                        </div>
                        <input
                            type="number"
                            spellCheck="false"
                            autoComplete="false"
                            placeholder="set"
                            value={range ?? 100}
                            onChange={(e) =>
                                setRange(Number(e.target.value))
                            }
                            className={`
                        pl-4 w-[40%] py-4
                        rounded-lg
                        outline-none bg-background 
                        shadow-inner shadow-black
                    `}
                        />
                    </div>

                    <input
                        type="text"
                        spellCheck="false"
                        autoComplete="false"
                        placeholder="Your Game . ."
                        value={gameDetail.nameId ?? ""}
                        onChange={(e) =>
                            setGameDetail(prev => ({
                                ...prev, // Spread the previous state
                                nameId: e.target.value, // Update the `nameId` field correctly
                            }))
                        }
                        className={`
                        pl-4 w-[95%] py-4
                        rounded-lg
                        outline-none bg-background 
                        shadow-inner shadow-black
                    `}
                    />

                    <div
                        className={`
                            overflow-clip group
                        w-[48%] h-auto box-border
                         rounded-md  
                         shadow-black
                        uppercase hover:border-foreground border-2 border-transparent
                        shadow-inner  font-bold bg-foregroundShadow/20
                        hover:cursor-pointer
                `}>

                        <div
                            className={`
                                w-full h-auto p-2 hover:text-foreground/90
                                font-mainfont text-black/80 uppercase tracking-tighter
                            shadow-md shadow-black/70 text-center
                        `}
                            onClick={GameCreationHandler}
                        >
                            <p className={`group-hover:hidden`}>submit</p>
                            <p className={`hidden group-hover:block `}>click</p>
                        </div>
                    </div>
                </form>
            </div>

            <div className={`
                flex flex-col items-center
               text-white/65
                
                w-1/2 h-screen bg-black/20
                shadow-inner shadow-black
                `}>

                <div className={`
                    
                    w-full md:w-3/4 lg:w-[60%] xl:w-[50%] 2xl:w-[36%]
                    text-sm items-center
                    bg-foreground/60 
                    flex flex-col justify-between shrink-0 grow-0`}>
                    <div>
                        <div className={`p-3
                        bg-fadedforeground shadow-sm shadow-black
                        text-pretty h-auto font-bold font-mainfont`}>

                            <p className="inline uppercase underline text-black/80">combining</p> the
                            <p className="inline text-black/80">  Key</p> if the question is <p className="inline uppercase underline text-black/80"> divisible</p> by corresponding <p className="inline text-black/80"> Substitute</p>.
                        </div>
                    </div>
                    <div
                        className={`
                                flex flex-row 
                                justify-between
                                w-[60%]
                                text-sm 
                                gap-2 text-black/40
                                font-mainfont`}
                    >
                        <p className={`rounded-full underline uppercase`}> Key </p>
                        <p className={`underline uppercase`}> Sub </p>
                    </div>
                    <div className={`h-[40vh] 
                            
                        `}>
                        {gameDetail.rules.map(
                            (rule, index) => (
                                <div key={`r-${index}`}
                                    className={`
                                flex flex-row 
                                justify-between
                                w-[60%]
                                
                                gap-10 text-2xl
                                font-mainfont`}
                                >
                                    <p className={`rounded-full text-black/80 w-full `}> {rule.Key} </p>
                                    <p className={`rounded-full  w-full  `}> {rule.Value} </p>
                                </div>)
                        )}
                    </div>

                </div>

                <div className={`h-[15vh] md:h-[20vh] lg:h-[25vh] xl:h-[13vh]
                    w-full md:w-3/4 lg:w-[60%] xl:w-[50%] 2xl:w-[36%]
                    flex flex-col bg-fadedforeground
                                    shadow-2xl shadow-black/80
                                    rounded-b-3xl
                    `}>
                    <div
                        className={`
                            
                        relative group
                        overflow-clip
                         flex flex-row
                         justify-between
                        w-full h-full
                    `}
                    >
                        <input className="relative  w-[50%]  h-auto py-1
                        group-hover:cursor-pointer text-center
                        border-2 text-black/80
                        bg-foreground/30 rounded-sm
                        "
                            type="number"
                            spellCheck="false"
                            value={(key > -1) ? key : 1}
                            placeholder="Key"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                let potentialKey = Number(e.target.value);

                                potentialKey = potentialKey < 0 ? 0 : potentialKey;
                                setKey(potentialKey);
                            }}
                        />
                        <input className="relative  w-[50%] h-auto py-1
                        group-hover:cursor-pointer text-white/40
                        border-2 text-center
                        bg-foreground/30 rounded-sm
                        "
                            type="string"
                            spellCheck="false"
                            value={value}
                            placeholder="Sub"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setValue(e.target.value);
                            }}
                        />

                    </div>
                    <div className={`
                        text-white
                        flex flex-row
                        font-mainfont uppercase
                        text-xl self-center p-2 
                        w-auto hover:cursor-pointer`}
                        onClick={() => {
                            if (key > -1) {
                                if (gameDetail.rules[key]) {
                                    console.log("duplciated key")
                                    setValue("");
                                    return;
                                }
                                setGameDetail(prev => {
                                    const newS = { ...prev };
                                    if (newS.rules.filter((rule) => rule.Key == key).length == 0)
                                        newS.rules.push(
                                            { Key: key, Value: value }
                                        );
                                    return newS;
                                }
                                )
                            }

                        }}
                    >

                        Add rule</div>
                </div>
            </div>
        </div >
    )
}

export default CreateGameTab;
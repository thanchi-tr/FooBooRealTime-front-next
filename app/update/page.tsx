'use client';

import { toGuidId } from "@/lib/generator";
import { useUser } from "@auth0/nextjs-auth0/client";
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
interface ruleT {
    key: number,
    val: string
}
const UpdateGamesContext = () => {
    const [contexts, setContexts] = useState<gameContext[]>([])
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [tempKey, setTempKey] = useState(1)
    const [tempRange, setTempRange] = useState(100)
    const [tempVal, setTempVal] = useState("")
    const [rules, setRule] = useState<ruleT[]>([])
    const { user } = useUser();
    const router = useRouter();
    const toHomeClickHandler = useCallback(
        () => { router.push("/") }
        , []
    );

    useEffect(
        () => {
            if (selectedOptionIndex > -1 && contexts.length > 0) {
                if (contexts[selectedOptionIndex].rules != "") {
                    try {
                        const parsedData = JSON.parse(contexts[selectedOptionIndex].rules);
                        const rules = parsedData.RuleList.map((item: { Key: number, Value: string }) => ({
                            key: item.Key,
                            val: item.Value,
                        }));
                        setRule(rules)
                        setTempRange(contexts[selectedOptionIndex].range);
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        },
        [selectedOptionIndex]
    )
    const GetGamesContext = async () => {
        const playerId = toGuidId(user?.sub ?? "09ac5e84-db5c-4131-0d1c-08dd1c5384cf");

        const apiUrl = `https://localhost:5001/Api/Players/${playerId}/Games`;
        try {
            const accessKey = await axios.get("/api/get-access-token", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (accessKey.status != 200) {
                console.error("Error to retrieve Access key");

            }
            const response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json-patch+json",
                    "Authorization": `Bearer ${accessKey.data}`,
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
        const playerId = toGuidId(user?.sub ?? "09ac5e84-db5c-4131-0d1c-08dd1c5384cf");

        const apiUrl = `https://localhost:5001/Api/Players/${playerId}/Games/${contexts[selectedOptionIndex].gameId.replaceAll(` `, `%20`)}`;

        try {
            const accessKey = await axios.get("/api/get-access-token", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (accessKey.status != 200) {
                console.error("Error to retrieve Access key");

            }
            await axios.delete(apiUrl, {
                headers: {
                    "Content-Type": "application/json-patch+json",
                    "Authorization": `Bearer ${accessKey.data}`,
                },
            });
            // update the list
            GetGamesContext();
        } catch (error) {
            console.error("Error creating game:", error);
        }
    }
    const UpdateGameContext = async () => {
        if (selectedOptionIndex == -1)
            return;
        const playerId = toGuidId(user?.sub ?? "09ac5e84-db5c-4131-0d1c-08dd1c5384cf");

        const apiUrl = `https://localhost:5001/Api/Players/${playerId}/Games/${contexts[selectedOptionIndex].gameId.replaceAll(` `, `%20`)}`;

        const gameData = {
            authorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            gameId: contexts[selectedOptionIndex].gameId,
            range: tempRange,
            rules: JSON.stringify({
                RuleList: rules.map((rule) => {
                    return ({
                        Key: rule.key,
                        Value: rule.val
                    })
                })
            }),
        };
        try {
            const accessKey = await axios.get("/api/get-access-token", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (accessKey.status != 200) {
                console.error("Error to retrieve Access key");

            }
            await axios.patch(apiUrl, gameData, {
                headers: {
                    "Content-Type": "application/json-patch+json",
                    "Authorization": `Bearer ${accessKey.data}`,
                },
            });
            // update the list
            GetGamesContext();
            router.push("/update");
        } catch (error) {
            console.error("Error creating game:", error);
        }
    }
    useEffect(
        () => {
            GetGamesContext();
        }, []
    )

    const submitNewKey = () => {
        setRule(
            prev => {
                const newRules = [...prev];
                // ensure that the key is unique
                if (rules[tempKey] != null) {
                    return prev;
                }
                newRules.push({ key: tempKey, val: tempVal });
                setTempKey(1);
                setTempVal("");
                return newRules;
            }
        )
    }
    const updateKey = (index: number, key: number) => {
        setRule(
            prev => {
                const newRule = [...prev];

                newRule[index].key = (key < 1) ? 1 : key;
                return newRule;
            }
        )
    }
    const updateVal = (index: number, val: string) => {
        setRule(
            prev => {
                const newRule = [...prev];

                newRule[index].val = val;
                return newRule;
            }
        )
    }
    const deleteTempVal = (index: number) => {
        setRule(
            prev => {
                const newRule = [...prev];
                newRule.splice(index, 1);
                return newRule;
            }
        )
    }
    return (
        <div className={`
            h-screen w-screeen 
          bg-background
            font-mainfont
            text-textColour
        `}>
            <div className={`
                    w-full 
                    h-[10vw] sm:h-[8vw] md:h-[6vw] lg:h-[4vw]
                    bg-foregroundShadow/80
                    mb-[1vw]
                    flex  items-center 
                    border-r-[3px] border-black/40
                `} >
                <div className={`group z-50
                    flex flex-row justify-between rounded-xl border-2 text-center border-black/20
                    absolute w-[20%] h-auto 
                    top-[2vw] lg:top-[1vw]
                    left-[22vw] font-mainfont text-black/90 uppercase tracking-tighter
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
                    absolute w-[20%] h-auto 
                    top-[2vw] lg:top-[1vw]
                    left-[50vw] font-mainfont text-black/90 uppercase tracking-tighter
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
                h-full w-full
                flex flex-col md:flex-row
                gap-1
                items-start 
               `}
            >

                <div
                    className={`relative
                        flex gap-1 
                        ml-[8%]
                        h-[6vw] md:h-1/12
                        w-[90%]
                    `}
                >

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
                                h-[31vw] sm:h-[22vw] md:h-[40vh] lg:h-[16vw]
                                w-full
                                overflow-y-auto rounded-bl-md border-r-2 border-t-2 border-white/30 
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
                                            setSelectedOptionIndex(prev => (prev != index) ? index : -1);
                                        }}
                                    >{context.gameId}</div>
                                )
                            )}
                        </div>

                    </div>

                </div>
                {/* Form */}
                <div
                    className={`
                    flex justify-center mt-[36vw] md:mt-0
                    h-[calc(100vh-46vw)] md:h-[90%] w-full 
                    `}
                >
                    <div
                        className={`
                            bg-foreground/70 
                            w-[80%] md:w-[60%] lg:w-[50%] xl:w-[45%]
                            h-[82%] flex-grow-0 flex-shrink-0
                            flex flex-col overflow-clip
                            rounded-b-3xl border-t-8 border-black/80`}
                    >
                        <div
                            className={`bg-fadedforeground h-[15%]
                                flex items-center justify-center
                                `}
                        >
                            <div
                                className={`
                                    flex gap-1 items-center
                                    h-[6vw] w-[70%]
                                `}
                            >
                                <form
                                    className={`
                                        relative  overflow-clip
                                        h-[6vw] md:h-[5svw]  lg:h-[4vw] xl:h-[3vw] 2xl:h-[2vw]
                                        w-[45%]
                                        rounded-md text-center text-textColour
                                        hover:cursor-pointer hover:border-black/80 border-2 border-transparent
                                        bg-foreground `}
                                >

                                    {<input className={`w-5/6 h-full bg-foreground scale-y-110`}
                                        type="number"
                                        value={tempRange}
                                        placeholder="Range"
                                        onChange={(e) => setTempRange(Number(e.target.value))}
                                    />}
                                </form>

                            </div>

                        </div>
                        <form
                            className={`
                                flex flex-col
                                h-[75%]  w-full
                                
                                `}
                        >
                            <div className="h-[85%] w-full
                                    overflow-y-scroll
                            ">

                                {(selectedOptionIndex != -1)
                                    ? rules.map(
                                        (rule, index) => <div
                                            key={"rule-" + index}
                                            className={`flex flex-row relative`}>
                                            <input className={`w-1/2 border-r-2 text-center
                                                    ${index % 2 == 0 ? "" : "bg-white/70"}
                                            `}
                                                value={rule.key}
                                                onChange={(e) => updateKey(index, Number(e.target.value))}
                                            />
                                            <input className={`w-1/2
                                                    ${index % 2 == 0 ? "" : "bg-white/70"}
                                            `}
                                                value={rule.val}
                                                onChange={(e) => updateVal(index, e.target.value)}
                                            />
                                            <div className="
                                                absolute bg-midground-1 h-full w-auto text-white border-[1px] border-black scale-x-125 translate-x-1
                                                hover:cursor-pointer
                                                "
                                                onClick={() => { deleteTempVal(index) }}
                                            >X</div>
                                        </div>
                                    )
                                    : <></>
                                }

                            </div>
                            <div className="flex flex-row ">
                                <input className="w-1/2 border-r-2 text-center"
                                    value={tempKey}
                                    type="number"
                                    onChange={(e) => {
                                        let val = Number(e.target.value);
                                        val = (val > 1) ? val : 1;
                                        setTempKey(val)
                                    }}
                                />
                                <input className="w-1/2 text-center"
                                    value={tempVal}
                                    placeholder="sub"
                                    onChange={(e) => setTempVal(e.target.value)}
                                />
                            </div>
                            <div className={`text-center uppercase 
                                    hover:text-white hover:cursor-pointer
                                    bg-foregroundShadow/10 hover:bg-foregroundShadow/30
                                `}
                                onClick={submitNewKey}
                            > submit</div>

                        </form>

                        <div className={`relative bg-fadedforeground
                                font-mainfont uppercase
                                text-2xl lg:text-xl text-white/90 text-center
                                flex flex-row justify-evenly cursor-pointer
                                md:p-1 lg:p-2
                    `}>
                            <div className={`
                                w-1/2 hover:border-white/65 border-4 
                                border-transparent
                                rounded-bl-3xl
                                `}
                                onClick={UpdateGameContext}
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
        </div>

    )
}

export default UpdateGamesContext;
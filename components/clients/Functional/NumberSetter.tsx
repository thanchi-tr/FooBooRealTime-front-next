'use client';

import { useCallback, useEffect, useState } from "react";

interface Setter {
    name: string,
    curValue: number,
    setterHandler: (methodId: string, value: number) => void,
    isAdjustable: boolean
}
const NumberSetter = ({ name, setterHandler, curValue, isAdjustable }: Setter) => {
    const [tempValue, setTempValue] = useState(curValue);
    const [isOpen, setIsOpen] = useState(false);
    const ToggleSetTime = useCallback(() => {
        if (!isAdjustable)
            return;
        if (tempValue != curValue) // out of synce
        {

            setterHandler("SupplyGameTime", tempValue);
        }
        setIsOpen(prev => !prev)
    }, [tempValue, isOpen])

    // keep the adjustment time start from the actual value
    useEffect(
        () => {
            setTempValue(curValue);
        }, [curValue]
    )
    return (<>
        <div className={`group absolute bottom-[4%] p-1 z-20 
            ${!isAdjustable ? "pointer-events-none" : ""}
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
                `relative ${isAdjustable ? "border-[1.2px] border-white/40" : ""}
                bg-foreground/70 rounded-3xl hover:bg-foreground hover:cursor-pointer hover:text-white text-black px-2 `}
                onClick={ToggleSetTime}
            >{curValue} {curValue < 2 ? "minute " : "minutes"}


            </div>

        </div>
        <form className={`
            absolute 
            ${isOpen ? "flex" : "hidden"}
            flex items-center justify-center
            h-full w-full  z-10
            overflow-clip backdrop-blur-3xl
            bg-foregroundShadow/5 shadow-2xl 
            shadow-black rounded-sm
            `}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault(); // Prevent the default form submission behavior
                ToggleSetTime();
            }}
        >
            <label
                className={`absolute top-[15vw] 
                    p-2 rounded-sm
                    uppercase font-mainfont font-extrabold  
                    bg-foreground/80
                    shadow-inner shadow-black`}
                onClick={ToggleSetTime}
            > set game time</label>
            <div
                className="absolute top-0 h-full w-full z-0
                hover:cursor-pointer
                "
                onClick={ToggleSetTime}
            ></div>
            <input
                type="number"
                spellCheck="false"
                value={tempValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let potentialcurValue = Number(e.target.value);
                    potentialcurValue = potentialcurValue < 1 ? 1 : potentialcurValue;
                    setTempValue(potentialcurValue);

                }} // Update state on input change
                placeholder="Enter your answer"
                className={`box-border z-50
                    bg-foreground rounded-md text-textColour text-3xl pl-2 text-center
                    font-mainfont w-1/6 aspect-square scale-100 overflow-hidden
                    appearance-none focus:outline-none`}
            />
        </form>
    </>)
}

export default NumberSetter;
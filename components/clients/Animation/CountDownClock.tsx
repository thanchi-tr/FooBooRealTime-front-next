'use client';
import { color, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
/**
 * This is a square count down timer
 * native design size (mobile) h-[35vw]
 * @param param0 
 * @returns 
 */
interface clockConfig {
    timeRemain: number // in second,

}
const CountDownClock = ({ timeRemain }: clockConfig) => {


    const luminateEffectVariant = {
        "init": {
            scale: 2,
            transition: { duration: 1 }
        },
        "level1": {
            scale: [2.05, 1.9, 1.2, 1.3, 1.85, 2.05],
        },
        "level1-done": {
            scale: 2.05
        },
        "level4": {
            scale: [1, 0.5, 0.7, 0.3, 0.85, 1.45],
        },
        "level4-done": {
            scale: 1
        }
    }

    const textMorphismVariants = {
        "init": { opacity: 0.7 },
        "done": { opacity: 0.75 },
        "tick": {
            opacity: [0.75, 0.75, 0.75, 0.75, 0.65],
        },
    }
    return (
        <div className={`
            relative flex group hover:cursor-pointer
            w-full h-auto aspect-square
            rounded-full bg-transparent
            border-[2vw] border-white
            `}>
            {/* Emitted light */}
            <motion.div className={`
                absolute top-0 left-0
                h-full w-full scale-[205%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                ${(timeRemain != 0 ? "from-foreground " : "from-midground-1")} via-foreground/0 to-pink/0 
                `}
                variants={luminateEffectVariant}
                transition={(timeRemain != 0) ? {
                    duration: 1,
                    type: 'spring',
                    velocity: 1.5,
                    repeat: Infinity, // Repeat infinitely
                    repeatType: "loop",
                } : {}}
                initial={"init"}
                animate={(timeRemain != 0) ? "level1" : "level1-done"}
            />
            <div className={`
                absolute top-0 left-0
                h-full w-full scale-[185%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                ${(timeRemain != 0 ? "from-foreground/50 " : "from-textColour")}
                 via-foreground/0 to-pink/0 
                `} />
            <div className={`
                absolute top-0 left-0 opacity-10
                group-hover:opacity-100
                h-full w-full 
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                ${(timeRemain != 0 ? "from-foreground/60 scale-[248%]" : "from-textColour/80 scale-[200%]")}
                 via-foreground/0 to-pink/0 
                `} />
            <div className={`
                absolute top-0 left-0
                h-full w-full scale-[175%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-midground-3/80 via-foreground/0 to-pink/0 
                `} />
            <motion.div className={`
                absolute top-0 left-0
                h-full w-full scale-[100%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-midground-3/70 via-foreground/10 to-foreground/0 
                `}
                variants={luminateEffectVariant}
                transition={(timeRemain != 0) ? {
                    duration: 1,
                    type: 'spring',
                    velocity: 1.5,
                    repeat: Infinity, // Repeat infinitely
                    repeatType: "loop",
                } : {}}
                animate={(timeRemain != 0) ? "level4" : "level4-done"}
            />
            {/* inner ring */}
            <div className={`
                absolute top-0 left-0
                bg-transparent h-full w-full
                rounded-full 
                border-8 border-white/75
                `} />


            <motion.div className={`
                    flex
                    h-auto w-full font-mainfont
                    items-center justify-center z-10
                    text-3xl 
                    ${timeRemain >= 100
                    ? "scale-[140%]"
                    : timeRemain > 10 ? "scale-[170%]" : "scale-[190%]"}
                     ${timeRemain != 0 ? "bg-black/65" : "bg-white/45"}  text-transparent bg-clip-text
                    
                    ${timeRemain > 0 ? "shadow-2xl" : "shadow-lg"}
                      rounded-full
                `}
                transition={(timeRemain != 0) ? {
                    duration: 1,
                    ease: "easeIn",
                    repeat: Infinity, // Repeat infinitely
                    repeatType: "loop",
                } : {}}
                initial={"init"}
                variants={textMorphismVariants}
                animate={timeRemain != 0 ? "tick" : "done"}
            >{/* Watch face */}
                {timeRemain}
            </motion.div>
        </div>
    )
}

export default CountDownClock
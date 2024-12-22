'use client';

import { useLoadingContext } from "@/hooks/context/useLoadingContext";
import { motion } from "framer-motion";



const LoadingScreen = () => {
    const { isLoaded } = useLoadingContext();
    const container = {
        init: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 1.2, // Delay between children animations
                delayChildren: 0.3,  // Initial delay before animation starts
            },
        },
    };
    const dotVariants = {
        init: { rotate: ["45%"] },
        animate: {
            scale: [1, 1, 1.1, 1, 1],
            translateY: [0, -12, -12, -12, 0],
            borderRadius: ["45%", "45%", "5%", "45%", "45%"],
            rotate: ["0", "180deg", "0"],

        },
    }
    return (<div
        className={`
            ${isLoaded ? "hidden" : "flex"}
             flex-col  
            justify-between items-center
            h-full w-full
            bg-foregroundShadow    
        `}
    >
        <div />
        <div className={`
            text-2xl text-textColour uppercase
            font-mainfont tracking-widest
            `}> Loading</div>
        <div />
        <div className={`
            flex justify-center
            absolute bottom-[15%]
            h-[10vh] w-full
            `}>
            <motion.div className={`
                flex justify-evenly
                h-full w-[40%] `}
                variants={container}
                initial={"init"}
                animate={"animate"}

            >
                {Array.from({ length: 3 }, (_, i) => (<motion.div
                    key={`loading-${i}`}
                    className={`
                        overflow-clip
                        w-[20px] h-[20px]
                      bg-foreground`}
                    variants={dotVariants}
                    transition={{
                        duration: 2.5, // Duration of each animation cycle
                        repeat: Infinity, // Repeats the animation infinitely
                        repeatType: "loop", // Ensures seamless looping
                        ease: "easeInOut",
                        repeatDelay: 2.5
                    }}
                >

                </motion.div>))}
            </motion.div>


        </div>
    </div>)
}

export default LoadingScreen;
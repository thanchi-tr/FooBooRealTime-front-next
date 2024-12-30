'use client'
import { motion } from 'framer-motion';
import { useEffect } from 'react';
interface NotificationConfig {
    clickHandler: () => void
    msg: string,
    isOpen: boolean,
    timer: number
}
const Notification = ({ clickHandler, msg, isOpen, timer = 2 }: NotificationConfig) => {

    useEffect(
        () => {
            const target = setTimeout(() => clickHandler(), timer * 1000);

            return () => clearTimeout(target);
        }, [msg]
    )

    const variants = {
        "closed": {
            scaleX: 0,
            opacity: [1, 1, 1, 0.8, 0]
        },
        "opened": {
            scaleX: 1,
            opacity: [0, 1, 1, 1]
        }
    }

    return (

        <div
            className={`flex
                    absolute left-0 top-0 
                    content-center mt-[5%]
                    h-screen w-screen
                    md:w-3/4 md:ml-[12.5%] lg:mt-[8%]
                    xl:w-1/2 xl:ml-[25%] 
                    2xl:w-[40%] 2xl:ml-[30%]
            `}
        >
            <motion.div
                className={`
                        relative justify-between    
                        flex flex-row z-50 contents-center
                        rounded-lg ml-[15%] 
                        w-[70%] h-[120px] md:h-[60px]
                        bg-white/95  p-2
                        text-black/40`
                }

                variants={variants}
                initial={"closed"}
                animate={(isOpen) ? "opened" : "closed"}
                transition={{
                    delay: 0.17,
                    duration: 0.5,
                    ease: "anticipate"
                }}
            >
                <p className={`
                        transition-all duration-150
                        font-mainfont text-black/90
                        ${isOpen ? "opacity-100" : "opacity-0"}
                        h-auto w-auto text-xs pl-4
                        `}>{msg}</p>
                <div className={`
                        relative group
                        hover:cursor-pointer
                        self-start rounded-md
                        duration-150
                        h-1/2 md:h-full aspect-square 
                        ${isOpen ? "scale-100 delay-[0.67s]" : "scale-0"}
                        bg-fadedforeground/95`}
                    onClick={clickHandler}
                >
                    <span className={`absolute group-hover:scale-x-100
                        group-hover:rotate-45 transition-transform duration-300 scale-x-75 delay-75
                        top-1/2 translate-y-[-50%] h-[5px] w-full bg-white`} />
                    <span className={`absolute group-hover:scale-x-100
                        group-hover:-rotate-45 transition-transform duration-300 scale-x-75 delay-75
                        top-1/2 translate-y-[-50%] h-[5px] w-full bg-white`} />
                </div>
            </motion.div>

        </div>

    )
}

export default Notification;
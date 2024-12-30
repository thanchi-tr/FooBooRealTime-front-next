"use client"
import Brand from '@/components/clients/Functional/UserNLogOut';
import { useSignalRContext } from '@/hooks/context/useSignalRContext';
import Link from 'next/link';
const Guess = () => {
    const { disconnect } = useSignalRContext();
    disconnect();
    return (
        <div
            className={`
                relative flex overflow-clip
                h-screen w-screen bg-background`}
        >
            <div className={`absolute flex mt-[24%] rotate-0 sm:rotate-6 xl:rotate-[15deg]
                w-full h-auto border-r-4 border-foregroundShadow/80
                
                `}>
                {/* Navigation */}
                <Link className={`flex  h-auto
                        w-[40%] ml-[2%] tracking-widest hover:bg-foreground/70 hover:text-white
                        md:w-[38%] md:ml-[9%] 
                        lg:w-[30%]
                        xl:w-[25%]
                        lg:ml-[14%]
                        rounded-full border-2 border-white/10 
                        items-center pl-2 py-2 justify-evenly grow-0 shrink-0 font-mainfont
                        shadow-inner shadow-foregroundShadow uppercase 
                        transition-all duration-700 ease-in-out
                    `} href={'/home'}>
                    <p className='rotate-0 sm:-rotate-6 xl:-rotate-[15deg]'>Login</p>


                </Link>

            </div>
            <div className={`w-4/5 h-full
                border-l-2 border-white/20
                `}></div>
            <div
                className={`
                    absolute lg:scale-110
                    bottom-20 right-12 lg:right-20
                    `}
            >
                <Brand></Brand>
            </div>
        </div>
    )
}

export default Guess;
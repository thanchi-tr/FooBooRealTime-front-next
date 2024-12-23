
import SessionPresentation from "@/components/clients/Animation/SessionPresentation";
import Brand from "@/components/clients/Functional/UserNLogOut";
import Link from "next/link";

const Loby = async () => {

    return (<div
        className={`
            flex flex-col
            h-screen w-screen
             bg-background items-center justify-center`}
    >
        <div
            className={`uppercase 
                text-xl md:text-2xl lg:text-3xl 2xl:text-5xl
                font-mainfont p-[10vw] xl:p-[2vw] xl:pb-[7vw] 
                text-white/80 2xl:text-foreground/50
                `}
        >available sessions
            <div
                className={`
                    opacity-70 hover:opacity-90
                    absolute scale-[60%] 2xl:scale-75
                    top-10 
                    left-[42%] 2xl:left-[46%]
                    `}
            >
                <Brand></Brand>
            </div>
        </div>
        <div
            className={`
                relative
                w-[90%] md:w-[68%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]
                h-[45%] xl:h-[36%]
                `}
        >
            <div className={`flex justify-between w-[58%] ml-[21%] pb-1`}>
                <Link
                    className={`hover:cursor-pointer hover:animate-pulse hover:underline text-foregroundShadow/90 font-mainfont`}
                    href={"./"}> Home</Link>
                <p className={`font-mainfont text-sm text-foreground/50`}>rule count</p>
            </div>
            <SessionPresentation

            ></SessionPresentation>

        </div>
    </div >)
}
export default Loby;
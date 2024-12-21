
import SessionPresentation from "@/components/clients/Animation/SessionPresentation";
import Link from "next/link";

const Loby = async () => {

    return (<div
        className={`
            flex flex-col
            h-screen w-screen
             bg-background items-center justify-center`}
    >
        <div
            className={`uppercase text-xl font-mainfont p-[10vw]
                text-white/80
                `}
        >available sessions</div>
        <div
            className={`
                relative
                w-[90%] h-[45%] 
                
                `}
        >
            <div className={`flex justify-between w-[58%] ml-[21%] pb-1`}>
                <Link
                    className={`hover:cursor-pointer hover:animate-pulse hover:underline text-foregroundShadow/90 font-mainfont`}
                    href={"./home"}> Home</Link>
                <p className={`font-mainfont text-sm text-foreground/50`}>rule count</p>
            </div>
            <SessionPresentation

            ></SessionPresentation>

        </div>
    </div >)
}
export default Loby;
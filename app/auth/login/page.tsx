import Link from "next/link";

const Login = () => {
    return (
        <div
            className={`
                h-screen w-screen bg-background
                
                `}
        >
            <div className={`
                absolute -top-20 left-0
                h-full w-full scale-[60%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-foreground/60
                 via-foreground/0 to-pink/0 
                `} />
            <div className={`
                absolute -top-20 left-0
                h-full w-full scale-[100%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-foreground/20
                 via-foreground/0 to-pink/0 
                `} />
            <div className={`
                absolute -top-20 left-0
                h-full w-full scale-[28%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-white
                 via-foreground/0 to-pink/0 
                `} />
            <div className={`
                absolute -top-20 left-0
                h-full w-full scale-[18%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-white
                 via-foreground/0 to-pink/0 
                `} />
            <div className={`
                absolute -top-20 left-0
                h-full w-full scale-[12%]
                rounded-full
                bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
                from-white
                 via-foreground/0 to-pink/0 
                `} />
            <div
                className={`
                    relative
                    flex justify-center items-center
                    h-full w-full
                    backdrop-blur-lg opacity-80
                    `}
            >
                <div className={`
                    scale-y-[95%]
                    flex items-center justify-center
                    w-8/12 h-1/6
                    border-t-4 border-foreground
                    border-x-[1px] border-b-[0.1px]
                    shadow-inner shadow-white
                    bg-background rounded-2xl
                    `}>
                    <Link
                        className={`
                            h-autp w-[90%] bg-foregroundShadow/60
                            border-[12px] border-foregroundShadow/5
                            p-2 rounded-xl text-center

                            font-mainfont tracking-widest uppercase
                            text-foreground
                            `} href={"../../home"}                    >Log In</Link>
                </div>

            </div>
        </div>
    )
}

export default Login;
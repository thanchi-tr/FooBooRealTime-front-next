
import Link from 'next/link';
const Home = () => {
    const navs: { name: string, url: string }[] = [
        { name: "Home", url: "/home" },
        { name: "Add", url: "/create-game" },
        { name: "update", url: "/update" },
        { name: "Loby", url: "/loby" },
    ]

    return (
        <div
            className={`
                relative flex
                h-screen w-screen bg-background`}
        >
            <div className={`absolute flex mt-[24%] rotate-6
                w-full h-auto border-r-4 border-foregroundShadow/80
                
                `}>
                {/* Navigation */}
                <div className={`flex  h-auto w-[94%] ml-[2%] rounded-full border-2 border-white/10 
                        items-center pl-2 py-2 justify-evenly grow-0 shrink-0 font-mainfont
                        shadow-inner shadow-foregroundShadow uppercase 
                    `}>
                    {navs.map(

                        (nav, index) => (
                            <Link
                                key={`nav-${nav.name}`}
                                className={`
                                w-[20%] h-auto
                                ${(nav.name == "Loby") ? "scale-125 rounded-xl bg-foreground/80 border-white translate-x-[4%]" : "rounded-md bg-foreground/80"}
                                shadow-inner shadow-foregroundShadow -rotate-6
                                  hover:text-white
                                hover:bg-foreground border-[0.05px] hover:border-background/80 border-white/0
                                text-center text-black/80 text-sm
                                `} href={nav.url}                            >
                                {nav.name}
                            </Link>
                        )
                    )}


                </div>

            </div>
            <div className={`w-4/5 h-full
                border-l-2 border-white/20
                `}></div>
            <div
                className={`
                    absolute bottom-20 right-12 tracking-widest uppercase
                    font-mainfont text-5xl text-white/20
                    `}
            >
                June
            </div>
        </div>
    )
}

export default Home;
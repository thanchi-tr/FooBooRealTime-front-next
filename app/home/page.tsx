
import Link from 'next/link';
const Home = () => {
    const navs: { name: string, url: string }[] = [
        { name: "Home", url: "/home" },
        { name: "Loby", url: "/loby" },
        { name: "New", url: "/create-game" },
        { name: "update", url: "/update" }
    ]

    return (
        <div
            className={`
                relative flex
                h-screen w-screen bg-background`}
        >
            <div className={`absolute flex mt-[20%] 
                w-full h-auto border-r-4 border-foregroundShadow/80
                
                `}>
                {/* Navigation */}
                <div className={`flex  h-auto w-[90%] ml-[5%] rounded-full border-2 border-white/10 
                        items-center p-2 justify-evenly grow-0 shrink-0 font-mainfont
                        shadow-inner shadow-foregroundShadow
                    `}>
                    {navs.map(

                        (nav, index) => (
                            <Link
                                key={`nav-${nav.name}`}
                                className={`
                                w-[19%] h-auto
                                shadow-inner shadow-foregroundShadow
                                bg-foreground/80 rounded-xl hover:text-white
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
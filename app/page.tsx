"use client"
import Brand from '@/components/clients/Functional/UserNLogOut';
import Link from 'next/link';
const Home = () => {
  const navs: { name: string, url: string }[] = [
    { name: "Home", url: "/" },
    { name: "Add", url: "/create-game" },
    { name: "update", url: "/update" },
    { name: "Loby", url: "/loby" },
  ]
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
        <div className={`flex  h-auto 
                        w-[94%] ml-[2%] 
                        md:w-[82%] md:ml-[9%] 
                        lg:w-[72%] lg:ml-[14%]
                        rounded-full border-2 border-white/10 
                        items-center pl-2 py-2 justify-evenly grow-0 shrink-0 font-mainfont
                        shadow-inner shadow-foregroundShadow uppercase 
                        transition-all duration-700 ease-in-out
                    `}>
          {navs.map(

            (nav) => (
              <Link
                key={`nav-${nav.name}`}
                className={`
                                w-[20%] md:w-[18%] lg:w-[15%] xl:w-[12%]
                                h-auto lg:py-2 xl:py-1 lg:rounded-2xl lg:text-lg 
                                ${(nav.name == "Loby") ? "scale-125 rounded-xl bg-foreground/80 border-white translate-x-[4%]" : "rounded-md bg-foreground/80"}
                                shadow-inner shadow-foregroundShadow rotate-0 sm:-rotate-6 xl:-rotate-[15deg]
                                  hover:text-white
                                hover:bg-foreground border-[0.05px] hover:border-background/80 border-white/0
                                text-center text-black/80 text-sm
                                transition-all duration-700 ease-in-out
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
                    absolute lg:scale-110
                    bottom-20 right-12 lg:right-20
                    `}
      >
        <Brand></Brand>
      </div>
    </div>
  )
}

export default Home;
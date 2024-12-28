'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
const Brand = () => {

    const { user } = useUser();
    if (!user) {
        return (
            <div className="tracking-widest uppercase font-mainfont text-3xl text-white/40 scale-y-110">
                <p className="
                    tracking-tighter scale-y-[70%]
                    text-black/35
                "> Welcome</p> Guest
            </div>
        );
    }
    return <div
        className={`
         tracking-widest uppercase
        font-mainfont text-3xl text-white/20
        `}
    >
        {
            <div
                className={`
            pt-[5%] 
            text-lg text-black/40 tracking-normal
            hover:text-foreground/60
            hover:underline hover:animate-pulse`}>
                <Link href="/api/auth/logout">logout</Link>

            </div>
        }
        {(user.name?.split(" ")
            .map(
                (word, i) => <p key={`name-${i}`}> {word}</p>))}

    </div>
}

export default Brand;
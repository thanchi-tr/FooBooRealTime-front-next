'use client';

import { useUser } from "@auth0/nextjs-auth0/client";

const Brand = () => {
    const { user } = useUser();
    return <div
        className={`
         tracking-widest uppercase
        font-mainfont text-3xl text-white/20
        `}
    >
        {user
            &&
            <div
                className={`
            pt-[5%] 
            text-lg text-black/40 tracking-normal
            hover:text-foreground/60
            hover:underline hover:animate-pulse`}>
                <a href="/api/auth/logout">logout</a>

            </div>
        }
        {user
            &&
            (user.name?.split(" ")
                .map(
                    (word, i) => <p key={`name-${i}`}> {word}</p>))}

    </div>
}

export default Brand;
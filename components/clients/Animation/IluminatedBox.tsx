'use client';

interface boxConfig {
    text: string,
    isSelect: boolean,
    clickHandler: () => void // task that this button suppose to do
}
const IluminatedBox = ({ text, isSelect, clickHandler }: boxConfig) => {
    // const [isSelect, setIsSelect] = useState(false);
    return (<div
        className={`
            flex flex-row gap-6 group
            h-full w-full font-semibold font-mainfont
            text-xl  p-2 justify-evenly
            rounded-md hover:cursor-pointer
            hover:border-foreground border-2 border-transparent
             shadow-black
            ${isSelect ? "shadow-lg bg-foreground/75 tracking-wide" : "shadow-inner text-foreground/90 font-bold bg-foregroundShadow/20"}
            `}

        onClick={clickHandler}
    >
        {<p className={`uppercase 
           ${!isSelect ? " group-hover:hidden" : ""}`}>{text}</p>} <p className={`text-sm text-black/65   ${!isSelect ? " group-hover:hidden" : ""}`}> {(isSelect ? "Ready" : "Idling")}</p>
        {<p className={` ${!isSelect ? " group-hover:block" : ""} hidden uppercase`}> Ready?</p>}
    </div>)
}

export default IluminatedBox;
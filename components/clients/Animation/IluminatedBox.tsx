'use client';

interface boxConfig {
    isDisable: boolean,
    text: string,
    isSelect: boolean,
    clickHandler: () => void // task that this button suppose to do
}
const IluminatedBox = ({ text = "", isSelect, clickHandler, isDisable }: boxConfig) => {
    // const [isSelect, setIsSelect] = useState(false);
    return (<div
        className={`
            flex flex-row gap-6 group
            h-full w-full font-semibold font-mainfont
            text-xl  p-2 justify-evenly
            rounded-md hover:cursor-pointer
            hover:border-foreground border-2 border-transparent
             shadow-black
            ${isSelect
                ? ` ${!isDisable ? "bg-foreground/75 shadow-lg" : "shadow-md bg-white/15 text-black/65"} tracking-wide`
                : `shadow-inner ${!isDisable ? "text-foreground/90" : "text-black/65 shadow-inner "} font-bold bg-foregroundShadow/20`}
            `}

        onClick={clickHandler}
    >
        {<p className={`uppercase 
           ${!isSelect ? " group-hover:hidden" : ""}`}>{text}</p>} <p className={`text-sm text-black/65   ${!isSelect ? " group-hover:hidden" : ""}`}> {(isSelect ? "Ready" : "Idling")}</p>
        {<p className={` ${!isSelect ? " group-hover:block" : ""} hidden uppercase`}> Ready?</p>}
    </div>)
}

export default IluminatedBox;
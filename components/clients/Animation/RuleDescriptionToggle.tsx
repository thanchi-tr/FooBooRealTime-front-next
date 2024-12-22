

interface RuleTogglerConfig {
    isRuleOpen: boolean,
    rules: { Key: number, Value: string }[],
    openHandler: () => void,
    size: number,
    isHiding?: boolean
}
const Rule = ({ isRuleOpen, rules, openHandler, size = 1, isHiding = false }: RuleTogglerConfig) => {
    return (
        <div className={` justify-between overflow-clip
             flex flex-col 
                ${size == 0 ? "gap-1" : "gap-5"}
             top-0 
            h-full w-full
            bg-fadedforeground z-50
            shadow-2xl shadow-black
            transition-all duration-200 ease-in-out
            ${isHiding
                ? (isRuleOpen) ? "" : "opacity-15 hover:opacity-100"
                : ""
            }
            ${isRuleOpen ? "" : "-translate-y-[80vh]"}
            rounded-b-3xl `}>

            <div className={`p-8
                ${size == 2 ? "scale-125" :
                    size == 0 ? "scale-[85%]" : "scale-100"
                }
                text-pretty h-auto font-bold font-mainfont`}>
                The answer is determined by
                <p className="inline uppercase underline text-black/80">combining</p> the
                <p className="inline text-black/80"> right terms</p> if the question is <p className="inline uppercase underline text-black/80"> divisible</p> by the corresponding <p className="inline text-black/80"> left number</p>.
            </div>

            <div className={`
                bg-foreground/40 overflow-auto
                flex flex-col pt-[10%] ${size == 0 ? "" : ""}
                h-full w-full
                items-center 
                shadow-inner shadow-background
                gap-4`}>
                <div className={`w-[40%] 
                    flex flex-col justify-between shrink-0 grow-0`}>
                    <div
                        className={`
                                flex flex-row 
                                justify-between
                                w-full
                                
                                gap-10 text-black/40
                                font-mainfont`}
                    >
                        <p className={`rounded-full underline`}> left </p>
                        <p className={`underline`}> Right </p>
                    </div>
                    {rules.map(
                        (rule, index) => (
                            <div key={`r-${index}`}
                                className={`
                                flex flex-row 
                                justify-between
                                w-full
                                
                                gap-10 text-2xl
                                font-mainfont`}
                            >
                                <p className={`rounded-full text-black/80`}> {rule.Key} </p>
                                <p className={`text-end`}> {rule.Value} </p>
                            </div>)
                    )}
                </div>

            </div>
            <div className={`
                flex flex-row
                font-mainfont uppercase
                text-3xl self-center p-2 
                w-auto hover:cursor-pointer`}
                onClick={openHandler}
            >
                <p className={`text-black/80`}>{!isRuleOpen ? "Open" : "Close"}</p>
                Rule</div>
        </div>
    )
}

export default Rule;
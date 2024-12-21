import ScoreScreen from "@/components/clients/Animation/ScoreScreen";
const Score = async ({ params }: { params: { gameName: string } }) => {
    const { gameName } = await params ?? { gameName: "FooBooDefault" }
    return (<div
        className={`h-screen w-screen bg-background`}
    >
        {/* <LoadingScreen></LoadingScreen> */}
        <ScoreScreen  ></ScoreScreen>
    </div>)
}

export default Score;
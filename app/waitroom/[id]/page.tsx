import WaitRoomPage from "@/components/clients/page/WaitRoomPage";


const ServerWaitRoom = async ({ params }: { params: { id: string; } }) => {

    let { id } = await params;
    return <WaitRoomPage sessionId={id}></WaitRoomPage>
}

export default ServerWaitRoom;
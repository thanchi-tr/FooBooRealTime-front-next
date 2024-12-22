import WaitRoomPage from "@/components/clients/page/WaitRoomPage";


const ServerWaitRoom = async ({ params }: { params: Promise<{ id: string }> }) => {

    return <WaitRoomPage sessionId={(await params).id}></WaitRoomPage>
}

export default ServerWaitRoom;
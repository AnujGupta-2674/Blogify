import ChatSideBar from "../Components/ChatSideBar.jsx"
import NoChatSelected from "../Components/NoChatSelected.jsx"
import ChatContainer from "../Components/ChatContainer.jsx";
import { useSelectedUser } from "../store/SelectedUserContext.jsx";

const CollaboratePage = () => {
    const { selectedUser } = useSelectedUser();

    return (
        <div className="flex items-center justify-center mt-10 px-4">
            <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
                <div className="flex h-full rounded-lg overflow-hidden">
                    <ChatSideBar />
                    {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                </div>
            </div>
        </div>
    )
}

export default CollaboratePage
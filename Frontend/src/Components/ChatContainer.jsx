import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.jsx'
// import MessageSkeleton from "../Components/Skeletons/MessageSkeleton.jsx"
import ChatHeader from './ChatHeader.jsx'
import MessageInput from './MessageInput.jsx'
import useAuthUser from '../hooks/useAuthUser.js'
import { useSelectedUser } from "../store/SelectedUserContext.jsx";
// import { useQuery } from '@tanstack/react-query'
import { formatMessageTime } from '../lib/formatMessageTime.js'

const ChatContainer = () => {
    const { subscribeToMessages, unsubscribeFromMessages, getMessages, messages } = useChatStore();

    const { authUser } = useAuthUser();

    const messageEndRef = useRef(null);

    const { selectedUser } = useSelectedUser();

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages(selectedUser._id);

        return () => unsubscribeFromMessages();

    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />

            <div className='flex-1 flex flex-col overflow-auto p-4 space-y-4'>
                {messages.length > 0 && messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className='chat-bubble flex flex-col'>
                            {message.text && (
                                <h1 className='font-medium text-xl'>{message.text}</h1>
                            )}
                        </div>
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className='flex items-center justify-center h-full'>
                        <h1 className='text-2xl text-gray-500'>No messages yet</h1>
                    </div>
                )}
            </div>

            <MessageInput />
        </div>
    )
}

export default ChatContainer
import React, { useState, useEffect } from "react";
import socket from "../../socket";
import "./ChatPage.css";
import ChatSideBar from "../../Components/ChatSidebar/ChatSideBar";
import ChatWindow from "../../Components/ChatWindow/ChatWindow";
import ProfileOverlay from "../../Components/ProfileOverlay/ProfileOverlay";
import { DUMMY_ONLINE_USERS, DUMMY_USERS } from "../../constants";

const ChatPage = () => {
    const [users, setUsers] = useState(DUMMY_USERS)
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [profileVisible, setProfileVisible] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [onlineUsers, setOnlineUsers] = useState(DUMMY_ONLINE_USERS);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const toggleProfile = () => setProfileVisible(!profileVisible);

    useEffect(() => {
        if (currentUser?.email) {
            socket.emit("register", currentUser.email);
        }

        socket.on("online-users", (users) => {
            setOnlineUsers(users);
        });

        socket.on("receive-message", (msg) => {
            setUsers((prevUsers) => prevUsers.map((user) => {
                if (user.email === msg.from) {
                    const isActive = selectedUser.email === msg.from;
                    return {
                        ...user, messages: [...user.messages, msg], unreadCount: isActive ? 0 : (user.unreadCount || 0) + 1
                    };
                }
                return user;
            }));

            if (selectedUser?.email === msg.from) {
                setSelectedUser((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const msg = {
            to: selectedUser.email,
            from: currentUser.email,
            message: newMessage,
            timestamp: Date.now()
        }

        socket.emit("send-message", msg);
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.email === selectedUser.email ? { ...user, messages: [...user.messages, msg] } : user
            );

            const updatedSelected = updatedUsers.find(u => u.email === selectedUser.email);
            setSelectedUser(updatedSelected);

            return updatedUsers;
        });
        setNewMessage("");
    };

    return (
        <div className="chat-container">
            {/* Sidebar */}
            <ChatSideBar users={users} onlineUsers={onlineUsers} currentUser={currentUser} setSelectedUser={(user) => {
                setUsers(prevUsers => prevUsers.map((u) => u.email === user.email ? { ...u, unreadCount: 0 } : u))
                setSelectedUser(user);
            }} />

            {/* Chat Window */}
            <ChatWindow onlineUsers={onlineUsers} currentUser={currentUser} selectedUser={selectedUser}
                sendMessage={sendMessage} toggleProfile={toggleProfile} setNewMessage={setNewMessage} newMessage={newMessage} />

            {/* Profile Overlay */}
            {profileVisible && (
                <ProfileOverlay selectedUser={selectedUser} toggleProfile={toggleProfile} />
            )}
        </div>
    );
};

export default ChatPage;
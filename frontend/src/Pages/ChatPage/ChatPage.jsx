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

    // Toggle profile overlay visibility
    const toggleProfile = () => setProfileVisible(!profileVisible);


    // Setup socket listeners on component mount
    useEffect(() => {
        // Register current user with the server
        if (currentUser?.email) {
            socket.emit("register", currentUser.email);
        }

        // Listen for updates on the list of online users
        socket.on("online-users", (users) => {
            setOnlineUsers(users);
        });

        // Listen for incoming messages
        socket.on("receive-message", (msg) => {
            // Update user list with the new message and unread count
            setUsers((prevUsers) => prevUsers.map((user) => {
                if (user.email === msg.from) {
                    const isActive = selectedUser.email === msg.from;
                    return {
                        ...user, messages: [...user.messages, msg], unreadCount: isActive ? 0 : (user.unreadCount || 0) + 1
                    };
                }
                return user;
            }));

            // If the message is from the currently selected user, update the chat window
            if (selectedUser?.email === msg.from) {
                setSelectedUser((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
            }
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);


    // Function to send a message to the selected user
    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const msg = {
            to: selectedUser.email,
            from: currentUser.email,
            message: newMessage,
            timestamp: Date.now()
        }

        // Emit message to server
        socket.emit("send-message", msg);

        // Update local state with the sent message
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.email === selectedUser.email ? { ...user, messages: [...user.messages, msg] } : user
            );

            // Update selected user to reflect new message
            const updatedSelected = updatedUsers.find(u => u.email === selectedUser.email);
            setSelectedUser(updatedSelected);

            return updatedUsers;
        });
        setNewMessage("");  // Clear input box after sending
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
import React, { useState } from "react";
import Img from "../../chat_logo.png";

const ChatSideBar = ({ users, onlineUsers, currentUser, setSelectedUser }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const filterUsers = (user) => {
        const query = searchQuery.trim().toLowerCase();

        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query)
        );
    }

    return (
        <div className="sidebar">
            <h1>
                <img src={Img} width={"112px"} height={"42px"} />
            </h1>
            <input placeholder="Search" className="search-bar" value={searchQuery} onChange={handleSearchQueryChange} />
            {users.filter(filterUsers).map((user, idx) => {
                const lastMsg = user.messages[user.messages.length - 1];
                const isOnline = onlineUsers.filter((onlineUser) => {
                    return user.email === onlineUser.email;
                });
                return (
                    <div key={idx} className="chat-user" onClick={() => setSelectedUser(user)} >
                        <div className="chat-user-wrapper">
                            <div className="avatar-wrapper">
                                {isOnline.length > 0 && <span className="online-indicator" />}
                                <img src={user.avatar} alt="avatar" className="chat-avatar" />
                            </div>
                            <div className="chat-users-details">
                                <div className="name">{user.name}</div>
                                <div className="preview">{lastMsg ? `${lastMsg.from === currentUser.email ? "You: " : ""}${lastMsg.message}` : 'Start a Chat'}</div>
                            </div>
                        </div>
                        <div className="right-section">
                            {lastMsg && (
                                <div className="timestamp">
                                    {new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            )}
                            {user.unreadCount > 0 && (
                                <div className="unread-badge">{user.unreadCount}</div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChatSideBar;
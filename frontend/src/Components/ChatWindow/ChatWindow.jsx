import React from "react";

const ChatWindow = ({ selectedUser, currentUser, onlineUsers, toggleProfile, sendMessage, setNewMessage, newMessage }) => {


  return (
    <div className="chat-area">
      <div className="chat-header" onClick={toggleProfile}>
        <div className="user-info">
          <img src={selectedUser.avatar} alt="avatar" />
          <span>{selectedUser.name}</span>
          {onlineUsers.includes(selectedUser.email) && <span className="online-indicator" />}
        </div>
      </div>
      <div className="chat-messages">
        {selectedUser.messages.map((msg, idx) => (
          <div key={idx} className={msg.from === currentUser.email ? "message self" : "message other"}>
            <div>{msg.message}</div>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
      </div>
    </div>
  )
}

export default ChatWindow;
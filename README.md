# 📬 Real-Time Chat Application

This is a full-stack real-time peer-to-peer chat application built using *React* on the frontend and *Node.js with Socket.IO* on the backend. It supports user registration, real-time messaging, delivery of pending messages, online status tracking, and a clean UI to switch between users and view new message counters.

---

## 📁 Project Structure
chat-app/
├── frontend/                # React frontend
│   ├── public/              # Static assets (HTML, favicon, etc.)
│   ├── src/                 # Source code
│   │   ├── Components/      # Reusable UI components
│   │   │   ├── ChatSidebar/     # Sidebar with users and search
│   │   │   ├── ChatWindow/      # Chat window for messages
│   │   │   └── ProfileOverlay/  # User profile UI
│   │   ├── pages/           # Page-level components
│   │   │   ├── SignupPage.js     # Signup route
│   │   │   └── ChatPage.js       # Main chat interface
│   │   ├── constants.js     # Dummy user and online user data
│   │   ├── socket.js        # Socket.IO frontend setup
│   │   ├── App.js           # Route management (Signup and Chat)
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Express backend with Socket.IO
│   ├── index.js             # Socket server logic
│
├── README.md                # You're here!


---

## 🚀 Features

- ✅ Real-time messaging with WebSocket (Socket.IO)
- 🔁 Stores and delivers pending messages when the user comes online
- 👤 Online status indicators
- 🧠 Sidebar with:
  - User search
  - Latest message preview
  - Timestamp formatting (hh:mm)
  - Unread message counter
- 🧩 Profile overlay toggle
- 📲 Responsive layout

---

## 🛠️ Technologies Used

### Frontend (React)
- react
- react-dom
- socket.io-client
- react-scripts

### Backend (Node.js)
- express
- cors
- socket.io

---

## 📦 Installation and Running

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2. Start the Backend

```cd server
npm install
node index.js
```

The backend runs on http://localhost:5000

---

### 3. Start the Frontend in a new terminal

```cd client
npm install
npm start
```

The frontend runs on http://localhost:3000
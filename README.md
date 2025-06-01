# 📬 Real-Time Chat Application

This is a full-stack real-time peer-to-peer chat application built using *React* on the frontend and *Node.js with Socket.IO* on the backend. It supports user registration, real-time messaging, delivery of pending messages, online status tracking, and a clean UI to switch between users and view new message counters.

---

## 📁 Project Structure
chat-app/
├── frontend # React frontend
│ ├── public/
│ ├── src/
│ │ ├── Components/
│ │ │ ├── ChatSidebar/
│ │ │ ├── ChatWindow/
│ │ │ └── ProfileOverlay/
│ │ ├── constants.js
│ │ ├── socket.js
│ │ └── App.js / ChatPage.js
├── backend/ # Express backend with Socket.IO
│ ├── index.js
├── README.md


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

---

### 2. Start the Backend

cd server
npm install
node index.js

The backend runs on http://localhost:5000

---

### 3. Start the Frontend in a new terminal

cd client
npm install
npm start

The frontend runs on http://localhost:3000
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',               // Allow all origins (not recommended for production)
    }
});

app.use(cors());


// In-memory store to track users and their socket connections
let users = {};                    // { email: socketID }
let pendingMessages = {};          // Store messages for users who are offline: { recipientEmail: [ { from, message } ] }


// Handle socket connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user registration with email
    socket.on("register", (email) => {
        users[email] = socket.id;
        console.log(`${email} registered with socket ${socket.id}`);

        // If the user has any pending messages, send them now
        if (pendingMessages[email]) {
            pendingMessages[email].forEach((msg) => {
                socket.emit('receive-message', msg);
            });
            delete pendingMessages[email];
        }

        // Broadcast updated online users list to all connected clients
        io.emit('online-users', Object.keys(users));
    });


    // Handle sending a message
    socket.on("send-message", ({ to, message, from, timeStamp }) => {
        const receiverSocket = users[to];

        if (receiverSocket) {
            // If recipient is online, send message directly
            io.to(receiverSocket).emit("receive-message", { from, message, timeStamp });
        } else {
            // If recipient is offline, store the message
            if (!pendingMessages[to]) {
                pendingMessages[to] = [];
            }
            pendingMessages[to].push({ from, message });
            console.log(`Stored message for ${to} from ${from}`);
        }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        // Remove the user from users list
        for (const [email, id] of Object.entries(users)) {
            if (id === socket.id) {
                delete users[email];
                break;
            }
        }

        // Broadcast updated online users list
        io.emit('online-users', Object.keys(users));
        console.log(`User disconnected: ${socket.id}`);
    })
});

// Start the server on port 5000
server.listen(5000, ()=>{
    console.log('Server running on port 5000');
})
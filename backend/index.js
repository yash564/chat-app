const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());

let users = {};                    // { email: socketID }
let pendingMessages = {};          // { recipientEmail: [ { from, message } ] }

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("register", (email) => {
        users[email] = socket.id;
        console.log(`${email} registered with socket ${socket.id}`);

        // Send pending messages if any
        if (pendingMessages[email]) {
            pendingMessages[email].forEach((msg) => {
                socket.emit('receive-message', msg);
            });
            delete pendingMessages[email];
        }

        io.emit('online-users', Object.keys(users));
    });

    socket.on("send-message", ({ to, message, from }) => {
        const receiverSocket = users[to];

        if (receiverSocket) {
            io.to(receiverSocket).emit("receive-message", { from, message, timeStamp: Date.now() });
        } else {
            if (!pendingMessages[to]) {
                pendingMessages[to] = [];
            }
            pendingMessages[to].push({ from, message });
            console.log(`Stored message for ${to} from ${from}`);
        }
    });

    socket.on("disconnect", () => {
        for (const [email, id] of Object.entries(users)) {
            if (id === socket.id) {
                delete users[email];
                break;
            }
        }
        io.emit('online-users', Object.keys(users));
        console.log(`User disconnected: ${socket.id}`);
    })
});

server.listen(5000, ()=>{
    console.log('Server running on port 5000');
})
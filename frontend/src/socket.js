import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');  // Create a socket connection to the backend server running on localhost:5000
export default socket;
import { io } from 'socket.io-client';

// home: 192.168.0.12
// codeworks: 192.168.1.185

const socket = io('http://192.168.1.185:3000/');
socket.on('connect', () => console.log('sockets connected'));

export default socket;

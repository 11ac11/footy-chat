import { io } from 'socket.io-client';
import connection_url from './../connectionString';
const url = connection_url;

const socket = io(url);
socket.on('connect', () => console.log('sockets connected'));

export default socket;

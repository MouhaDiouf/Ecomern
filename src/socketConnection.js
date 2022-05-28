import io from "socket.io-client";
const socketConnection = io("http://localhost:8080");
export default socketConnection;

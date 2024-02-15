import io from "socket.io-client";

const PORT = process.env.PORT || 3000;

export const socket = io(PORT.toString());

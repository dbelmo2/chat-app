import socketio from "socket.io-client";
import React from 'react';

export const socket = socketio.connect("https://161.35.53.205:5000");
export const SocketContext = React.createContext();
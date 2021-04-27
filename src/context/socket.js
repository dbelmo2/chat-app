import socketio from "socket.io-client";
import React from 'react';

export const socket = socketio.connect("http://161.35.53.205:8000");
export const SocketContext = React.createContext();
import socketio from "socket.io-client";
import React from 'react';

export const socket = socketio.connect("https://192.168.0.14:8443");
export const SocketContext = React.createContext();
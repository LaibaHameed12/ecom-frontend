// src/context/SocketContext.jsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// create the context
const SocketContext = createContext(null);

// provider component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // connect to your backend socket server
        const newSocket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
            transports: ["websocket"], // force websockets
            withCredentials: true,
        });

        setSocket(newSocket);

        // example event listeners
        newSocket.on("connect", () => {
            console.log("✅ Socket connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
        });

        // listen to custom events from backend
        newSocket.on("notification", (data) => {
            console.log("📩 Notification received:", data);
        });

        // cleanup on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

// custom hook to use socket easily
export const useSocket = () => {
    return useContext(SocketContext);
};

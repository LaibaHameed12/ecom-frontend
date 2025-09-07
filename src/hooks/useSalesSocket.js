// src/hooks/useSalesSocket.js
"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

export default function useSalesSocket() {
    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/sales`, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ Connected to Sales socket");
        });

        socket.on("saleStarted", (data) => {
            toast.info("🔥 A new sale has started! Check products now!");
            console.log("Sale started event:", data);
        });

        socket.on("saleEnded", (data) => {
            toast.warn("⚠️ The sale has ended.");
            console.log("Sale ended event:", data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);
}

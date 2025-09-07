// src/providers/SalesSocketProvider.jsx
"use client";

import useSalesSocket from "@/hooks/useSalesSocket";

export default function SalesSocketProvider({ children }) {
    useSalesSocket(); // hook runs only on client
    return <>{children}</>;
}

'use client';
import { useState } from "react";
import { Button } from "@mui/material";
import { SummarizeOutlined } from "@mui/icons-material";
import { useAuth } from "@/components/authContext/authContext";

type SidebarState = 'open' | 'preview' | 'closed'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user } = useAuth();
    const [sidebarState, setSidebarState] = useState<SidebarState>('open');



    let sidebarClass: string = '';
    switch (sidebarState) {
        case 'open': sidebarClass = 'w-64'; break;
        case 'closed': sidebarClass = 'w-0'; break;
        case 'preview': sidebarClass = 'w-16'; break;
    }

    function toggleSidebar() {
        switch (sidebarState) {
            case 'open': setSidebarState('preview'); break;
            case 'preview': setSidebarState('closed'); break;
            case 'closed': setSidebarState('open'); break;
        }
    }

    return (
        <div className="flex h-full">
            <section className={`h-full bg-gray-100 overflow-hidden transition-all ${sidebarClass}`}>
                <div className="p-4">
                    <div className="w-64"><SummarizeOutlined htmlColor="grey"></SummarizeOutlined> Hello there how are you doinjg?</div>
                </div>
            </section>
            <section className="p-4 sm:p-6 md:p-8 lg:p-12">
                {user ? children : <div></div>}

                <Button variant="outlined" onClick={toggleSidebar}>Click</Button>
            </section>
        </div>
    );

}
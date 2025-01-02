'use client'
import { Button } from "@mui/material";
import Menu from '@mui/icons-material/Menu'
import { useAuth } from '../authContext/authContext';
import { IsAuthenticated } from "../authContext/isAuthenticated";
import { NotAuthenticated } from "../authContext/notAuthenticated";
import { useState } from "react";
import Link from "next/link";


export default function Navbar() {
    // const { user, isHydrating } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const { logOut } = useAuth();

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen);
    }


    return (
        <section className="relative">
            <div className="h-16 bg-white border-b shadow-md flex items-center justify-between px-4">
                <div>
                    <Link className="font-bold text-2xl p-2" href="/">
                        <span className="text-orange-500">Source</span>
                        <span className="text-gray-700">Booster</span>
                    </Link>
                </div>
                <div className="">
                    <div className="flex sm:hidden" onClick={toggleDrawer}>
                        <Menu />
                    </div>
                    <div className="hidden sm:flex">
                        <IsAuthenticated>
                            <a href="/authentication/logout">
                                <Button variant="contained" onClick={logOut}>Sign Out</Button>
                            </a>
                        </IsAuthenticated>
                        <NotAuthenticated>
                            <a href="/authentication/login">
                                <Button variant="contained">Sign In</Button>
                            </a>
                        </NotAuthenticated>
                    </div>
                </div>
            </div>
            <div className={`shadow-md p-8 flex-col absolute transition-all bg-white left-0 w-full flex sm:hidden overflow-hidden box-border ${isDrawerOpen ? '' : 'max-h-0'}`}>

            </div>
        </section>
    )
}
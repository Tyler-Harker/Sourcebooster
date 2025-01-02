'use client'
import { auth } from "@/lib/firebase/clientConfig";
import Cookies from 'js-cookie'

export default function LogoutPage() {
    return (
        <div>
            You have been signed out.
        </div>
    )
}
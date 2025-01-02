'use client';

import { auth } from "@/lib/firebase/clientConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import User from "../../../Models/user";
import Cookies from 'js-cookie'

interface AuthContextProps {
    initialUser?: User,
    children: ReactNode
}

interface AuthContextProviderProps {
    user: User | undefined,
    logInWithEmailAndPassword: (email: string, password: string) => void,
    logOut: () => void
}

const authContext = createContext({
    user: undefined
} as AuthContextProviderProps);

export function AuthContext({ children, initialUser }: AuthContextProps) {
    console.log(initialUser, 'initial user')
    const [user, setUser] = useState<User | undefined>(initialUser);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user === null) {
                setUser(undefined);
                return;
            }
            setUser({
                id: user.uid ?? '',
                email: user.email ?? '',
            });

        })
        return () => unsubscribe();
    }, [])

    const logInWithEmailAndPassword = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        Cookies.remove('token');
        location.href = '/authentication/logout'
        return signOut(auth);
    }

    return (
        <authContext.Provider value={{ user, logInWithEmailAndPassword, logOut }}>
            {children}
        </authContext.Provider>
    );
}


export function useAuth() {
    return useContext(authContext);
}
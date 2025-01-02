'use client';

import { auth } from "@/lib/firebase/clientConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import IUser from "../../../Models/user";
import Cookies from 'js-cookie'

interface AuthContextProps {
    initialUser?: IUser,
    children: ReactNode
}

interface AuthContextProviderProps {
    user: IUser | undefined,
    isHydrating: boolean,
    logInWithEmailAndPassword: (email: string, password: string) => void,
    logOut: () => void
}

const authContext = createContext({
    user: undefined
} as AuthContextProviderProps);

export function AuthContext({ children, initialUser }: AuthContextProps) {
    console.log(initialUser, 'initial user')
    const [user, setUser] = useState<IUser | undefined>(initialUser);
    const [isHydrating, setIsHydrating] = useState<boolean>(false);
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
        <authContext.Provider value={{ user, isHydrating, logInWithEmailAndPassword, logOut }}>
            {children}
        </authContext.Provider>
    );
}


export function useAuth() {
    return useContext(authContext);
}
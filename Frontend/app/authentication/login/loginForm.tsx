'use client';

import { FormEvent, useState } from "react";
import { auth } from "@/lib/firebase/clientConfig";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";

interface LoginFormProps {
    initialEmail: string,
    initialPassword: string,
    initialError: string | null
}

export function LoginForm({ initialEmail, initialPassword, initialError }: LoginFormProps) {
    const [email, setEmail] = useState<string>(initialEmail);
    const [password, setPassword] = useState<string>(initialPassword);
    const [error, setError] = useState<string | null>(initialError);


    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const creds = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await creds.user.getIdToken();

            const decodedToken = jwtDecode(idToken);
            Cookies.set('token', idToken, {
                sameSite: 'Strict',
                secure: true,
                expires: decodedToken.exp ?? 0 * 1000
            })
            window.location.href = '/dashboard'
        }
        catch {
            setError('Invalid email or password.')
        }
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-xl">Login</h2>
            {error && <span className="bg-red-100 p-4 rounded-md border-red-200 border">{error}</span>}
            <TextField
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                value={email}
                variant="outlined"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" name="login">Login</Button>

            <hr />
            <span>Forgot your email password? Click <a href="/authentication/forgotPassword" className="text-blue-600 underline">here</a></span>
            <span>Don&apos;t have an account? <a href="/authentication/register" className="text-blue-600 underline">Register Here</a></span>
        </form>
    );
}
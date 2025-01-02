'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientConfig';
import { Button, TextField } from '@mui/material';

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with display name
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            setSuccess('Registration successful! You can now log in.');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <h2>Register</h2>
            <TextField
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Register</Button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}
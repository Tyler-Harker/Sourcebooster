'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { auth } from '@/lib/firebase/clientConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordPage() {
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('A password reset email has been sent to your email address.');
            setError('');
            setHasSubmitted(true);
        } catch (err: any) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1>Forgot Password</h1>
            {message && <span className="bg-green-100 border border-green-200 p-4 rounded-md">{message}</span>}
            <TextField
                type="email"
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" disabled={hasSubmitted}>Send Reset Link</Button>
            <hr />
            <span>Back to <a href="/authentication/login" className="text-blue-600 underline">login</a></span>
        </form>
    );
}
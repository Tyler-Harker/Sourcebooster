import { ReactNode } from "react"
import { AuthContext } from "./authContext"
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import User from "../../../Models/user";

export const AuthContextServer = async ({ children }: { children: ReactNode }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    let user: User | undefined = undefined;
    if (token) {
        const decodedToken = jwtDecode(token);
        user = {
            id: decodedToken.sub,
            email: 'email'
        } as User
    }

    return <AuthContext initialUser={user}>
        {children}
    </AuthContext>
}
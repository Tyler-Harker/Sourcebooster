import { ReactNode } from "react";
import { useAuth } from "./authContext";

interface UnauthorizedProps {
    children: ReactNode
}

export function NotAuthenticated({ children }: UnauthorizedProps) {
    const { user } = useAuth();
    return user ? null : children;
}
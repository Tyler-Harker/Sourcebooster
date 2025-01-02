import { useAuth } from "./authContext";
import { ReactNode } from "react";

interface AuthorizedProps {
    children: ReactNode
}

export function IsAuthenticated({ children }: AuthorizedProps) {
    const { user } = useAuth();
    return user ? children : null;
}
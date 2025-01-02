import { User } from "firebase/auth";
import { useAuth } from "./authContext";
import { ReactNode } from "react";

interface AuthorizedProps {
    children: ReactNode
}

export function IsAuthenticated({ children }: AuthorizedProps) {
    const { user, isHydrating } = useAuth();
    return user && !isHydrating ? children : null;
}
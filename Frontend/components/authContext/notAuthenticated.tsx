import { User } from "firebase/auth";
import { ReactNode } from "react";
import { useAuth } from "./authContext";

interface UnauthorizedProps {
    children: ReactNode
}

export function NotAuthenticated({ children }: UnauthorizedProps) {
    const { user, isHydrating } = useAuth();
    return user || isHydrating ? null : children;
}
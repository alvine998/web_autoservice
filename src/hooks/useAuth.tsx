import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { Admin } from "@/types";

interface AuthContextType {
    user: Admin | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for persisted session
        const storedUser = localStorage.getItem("as_admin_session");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        // Mock login delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockAdmin: Admin = {
            id: "admin-1",
            name: "Super Admin",
            email: email,
            role: "super_admin",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        };

        setUser(mockAdmin);
        localStorage.setItem("as_admin_session", JSON.stringify(mockAdmin));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("as_admin_session");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

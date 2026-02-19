import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import {
    Menu,
    Search,
    Sun,
    Moon,
    ChevronDown,
} from "lucide-react";
import { LivePulse } from "@/components/shared/StatusBadge";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
    onMenuClick: () => void;
    collapsed: boolean;
}

export function Header({ onMenuClick, collapsed }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <header
            className={cn(
                "fixed top-0 right-0 z-20 h-16 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)] flex items-center justify-between px-4 lg:px-6 transition-all duration-300",
                collapsed ? "lg:left-16" : "lg:left-64",
                "left-0"
            )}
        >
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Live indicator */}
                <div className="hidden sm:flex items-center gap-2 bg-success-50 dark:bg-success-700/10 px-3 py-1.5 rounded-full">
                    <LivePulse />
                    <span className="text-xs font-medium text-success-600 dark:text-success-400">
                        System Online
                    </span>
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications dropdown */}
                <NotificationDropdown />

                {/* User avatar */}
                <div
                    onClick={logout}
                    className="flex items-center gap-2 ml-1 px-2 py-1 rounded-lg hover:bg-danger-50 dark:hover:bg-danger-900/10 cursor-pointer transition-colors group"
                    title="Click to Logout"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {user?.name.charAt(0) || "AD"}
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-xs font-semibold text-[var(--text-primary)]">
                            {user?.name || "Admin"}
                        </p>
                        <p className="text-[10px] text-[var(--text-tertiary)] group-hover:text-danger-500 transition-colors">
                            {user?.role === "super_admin" ? "Super Admin" : user?.role || "Admin"} (Logout)
                        </p>
                    </div>
                    <ChevronDown
                        size={14}
                        className="hidden md:block text-[var(--text-tertiary)]"
                    />
                </div>
            </div>
        </header>
    );
}


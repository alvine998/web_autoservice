import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarCheck,
    Wrench,
    Building2,
    Users,
    CreditCard,
    Settings as SettingsIcon,
    Bell,
    Activity,
    Layers,
    ChevronLeft,
    ChevronRight,
    Car,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

const navGroups: { title: string; items: NavItem[] }[] = [
    {
        title: "Main",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "Bookings", href: "/bookings", icon: CalendarCheck, badge: 12 },
            { label: "Mechanics", href: "/mechanics", icon: Wrench },
            { label: "Workshops", href: "/workshops", icon: Building2 },
            { label: "Users", href: "/users", icon: Users },
        ],
    },
    {
        title: "Finance",
        items: [
            { label: "Payments", href: "/finance", icon: CreditCard },
            { label: "Services", href: "/services", icon: Layers },
        ],
    },
    {
        title: "System",
        items: [
            { label: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
            { label: "Monitoring", href: "/monitoring", icon: Activity },
            { label: "Settings", href: "/settings", icon: SettingsIcon },
        ],
    },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

export function Sidebar({
    collapsed,
    onToggle,
    mobileOpen,
    onMobileClose,
}: SidebarProps) {
    const router = useRouter();

    const isActive = (href: string) => {
        if (href === "/dashboard") return router.pathname === "/dashboard";
        return router.pathname.startsWith(href);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div
                className={cn(
                    "flex items-center gap-3 px-4 h-16 border-b border-[var(--sidebar-border)] shrink-0",
                    collapsed && "justify-center px-2"
                )}
            >
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                    <Car size={20} className="text-white" />
                </div>
                {!collapsed && (
                    <div>
                        <h1 className="text-sm font-bold text-[var(--text-primary)]">
                            Auto Services
                        </h1>
                        <p className="text-[10px] text-[var(--text-tertiary)]">
                            Admin Panel
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.title}>
                        {!collapsed && (
                            <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-widest px-3 mb-2">
                                {group.title}
                            </p>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onMobileClose}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                        isActive(item.href)
                                            ? "bg-primary-600 text-white shadow-sm shadow-primary-500/20"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]",
                                        collapsed && "justify-center px-2"
                                    )}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <item.icon size={18} />
                                    {!collapsed && (
                                        <>
                                            <span className="flex-1">{item.label}</span>
                                            {item.badge && (
                                                <span className="bg-danger-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Collapse button (desktop) */}
            <div className="hidden lg:block border-t border-[var(--sidebar-border)] p-3">
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Mobile sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] transform transition-transform duration-300 lg:hidden",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {sidebarContent}
            </aside>

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "hidden lg:block fixed inset-y-0 left-0 z-30 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] transition-all duration-300",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                {sidebarContent}
            </aside>
        </>
    );
}

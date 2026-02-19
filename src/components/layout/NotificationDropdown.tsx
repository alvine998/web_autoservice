import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn, formatTimeAgo } from "@/lib/utils";
import { mockAdminNotifications } from "@/data/mockData";
import {
    Bell,
    Calendar,
    CreditCard,
    Wrench,
    AlertTriangle,
    Settings,
    ExternalLink,
    Check,
    CheckCheck,
} from "lucide-react";

const typeConfig: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string }
> = {
    booking: {
        icon: <Calendar size={14} />,
        color: "text-primary-600 dark:text-primary-400",
        bg: "bg-primary-100 dark:bg-primary-900/30",
    },
    payment: {
        icon: <CreditCard size={14} />,
        color: "text-success-600 dark:text-success-400",
        bg: "bg-success-100 dark:bg-success-700/20",
    },
    mechanic: {
        icon: <Wrench size={14} />,
        color: "text-info-600 dark:text-info-400",
        bg: "bg-info-100 dark:bg-info-600/20",
    },
    system: {
        icon: <Settings size={14} />,
        color: "text-[var(--text-secondary)]",
        bg: "bg-[var(--bg-tertiary)]",
    },
    alert: {
        icon: <AlertTriangle size={14} />,
        color: "text-warning-600 dark:text-warning-400",
        bg: "bg-warning-100 dark:bg-warning-700/20",
    },
};

export function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [notifications, setNotifications] = useState(mockAdminNotifications);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const recent = notifications.slice(0, 6);

    return (
        <div ref={ref} className="relative">
            {/* Bell button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors"
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-danger-500 text-white text-[10px] font-bold rounded-full px-1 border-2 border-[var(--bg-primary)]">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                                Notifications
                            </h3>
                            {unreadCount > 0 && (
                                <span className="text-[10px] font-bold bg-danger-500 text-white px-1.5 py-0.5 rounded-full">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            >
                                <CheckCheck size={14} />
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* Notification list */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {recent.map((notif) => {
                            const config = typeConfig[notif.type] || typeConfig.system;
                            return (
                                <div
                                    key={notif.id}
                                    onClick={() => {
                                        setNotifications((prev) =>
                                            prev.map((n) =>
                                                n.id === notif.id
                                                    ? { ...n, isRead: true }
                                                    : n
                                            )
                                        );
                                        setOpen(false);
                                        router.push(`/notifications/${notif.id}`);
                                    }}
                                    className={cn(
                                        "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--hover-bg)]",
                                        !notif.isRead &&
                                        "bg-primary-50/50 dark:bg-primary-900/10"
                                    )}
                                >
                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                                            config.bg,
                                            config.color
                                        )}
                                    >
                                        {config.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <p
                                                className={cn(
                                                    "text-sm leading-tight",
                                                    notif.isRead
                                                        ? "text-[var(--text-secondary)] font-normal"
                                                        : "text-[var(--text-primary)] font-semibold"
                                                )}
                                            >
                                                {notif.title}
                                            </p>
                                            {!notif.isRead && (
                                                <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                                            )}
                                        </div>
                                        <p className="text-xs text-[var(--text-tertiary)] line-clamp-2 mt-0.5">
                                            {notif.message}
                                        </p>
                                        <p className="text-[10px] text-[var(--text-tertiary)] mt-1">
                                            {formatTimeAgo(notif.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-[var(--border-color)] px-4 py-2.5">
                        <Link
                            href="/notifications/list"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                            View all notifications
                            <ExternalLink size={12} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

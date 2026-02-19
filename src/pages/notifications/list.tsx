import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockAdminNotifications } from "@/data/mockData";
import { AdminNotification } from "@/types";
import { cn, formatTimeAgo, formatDateTime } from "@/lib/utils";
import {
    Bell,
    Calendar,
    CreditCard,
    Wrench,
    AlertTriangle,
    Settings,
    CheckCheck,
    Filter,
    Search,
    ChevronRight,
    Inbox,
} from "lucide-react";

const typeConfig: Record<
    string,
    {
        icon: React.ReactNode;
        color: string;
        bg: string;
        label: string;
        badgeVariant: "primary" | "success" | "info" | "warning" | "danger";
    }
> = {
    booking: {
        icon: <Calendar size={16} />,
        color: "text-primary-600 dark:text-primary-400",
        bg: "bg-primary-100 dark:bg-primary-900/30",
        label: "Booking",
        badgeVariant: "primary",
    },
    payment: {
        icon: <CreditCard size={16} />,
        color: "text-success-600 dark:text-success-400",
        bg: "bg-success-100 dark:bg-success-700/20",
        label: "Payment",
        badgeVariant: "success",
    },
    mechanic: {
        icon: <Wrench size={16} />,
        color: "text-info-600 dark:text-info-400",
        bg: "bg-info-100 dark:bg-info-600/20",
        label: "Mechanic",
        badgeVariant: "info",
    },
    system: {
        icon: <Settings size={16} />,
        color: "text-[var(--text-secondary)]",
        bg: "bg-[var(--bg-tertiary)]",
        label: "System",
        badgeVariant: "warning",
    },
    alert: {
        icon: <AlertTriangle size={16} />,
        color: "text-warning-600 dark:text-warning-400",
        bg: "bg-warning-100 dark:bg-warning-700/20",
        label: "Alert",
        badgeVariant: "danger",
    },
};

export default function NotificationListPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(mockAdminNotifications);
    const [filter, setFilter] = useState<string>("all");
    const [search, setSearch] = useState("");

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const filtered = notifications.filter((n) => {
        const matchFilter =
            filter === "all"
                ? true
                : filter === "unread"
                    ? !n.isRead
                    : n.type === filter;
        const matchSearch =
            search === "" ||
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.message.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const filterTabs = [
        { key: "all", label: "All", count: notifications.length },
        {
            key: "unread",
            label: "Unread",
            count: unreadCount,
        },
        {
            key: "booking",
            label: "Bookings",
            count: notifications.filter((n) => n.type === "booking").length,
        },
        {
            key: "payment",
            label: "Payments",
            count: notifications.filter((n) => n.type === "payment").length,
        },
        {
            key: "mechanic",
            label: "Mechanics",
            count: notifications.filter((n) => n.type === "mechanic").length,
        },
        {
            key: "alert",
            label: "Alerts",
            count: notifications.filter((n) => n.type === "alert").length,
        },
        {
            key: "system",
            label: "System",
            count: notifications.filter((n) => n.type === "system").length,
        },
    ];

    return (
        <>
            <Head>
                <title>All Notifications - Auto Services Admin</title>
            </Head>

            <PageHeader
                title="All Notifications"
                subtitle={`${unreadCount} unread notifications`}
                action={
                    unreadCount > 0 ? (
                        <Button variant="secondary" onClick={markAllRead}>
                            <CheckCheck size={16} />
                            Mark All as Read
                        </Button>
                    ) : undefined
                }
            />

            {/* Search & Filter */}
            <Card className="mb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="flex items-center gap-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-3 py-2 flex-1">
                        <Search
                            size={16}
                            className="text-[var(--text-tertiary)]"
                        />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none w-full"
                        />
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                                filter === tab.key
                                    ? "bg-primary-600 text-white shadow-sm"
                                    : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
                            )}
                        >
                            {tab.label}
                            <span
                                className={cn(
                                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                                    filter === tab.key
                                        ? "bg-white/20"
                                        : "bg-[var(--border-color)]"
                                )}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Notification list */}
            <Card padding="none">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-3">
                            <Inbox
                                size={24}
                                className="text-[var(--text-tertiary)]"
                            />
                        </div>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                            No notifications found
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-1">
                            {search
                                ? "Try a different search term"
                                : "All caught up!"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[var(--border-color)]">
                        {filtered.map((notif) => {
                            const config =
                                typeConfig[notif.type] || typeConfig.system;
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
                                        router.push(
                                            `/notifications/${notif.id}`
                                        );
                                    }}
                                    className={cn(
                                        "flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-[var(--hover-bg)] group",
                                        !notif.isRead &&
                                        "bg-primary-50/50 dark:bg-primary-900/10"
                                    )}
                                >
                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                            config.bg,
                                            config.color
                                        )}
                                    >
                                        {config.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
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
                                                        <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-[var(--text-tertiary)] mt-1 line-clamp-2">
                                                    {notif.message}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <Badge
                                                    variant={
                                                        config.badgeVariant
                                                    }
                                                >
                                                    {config.label}
                                                </Badge>
                                                <ChevronRight
                                                    size={16}
                                                    className="text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-[var(--text-tertiary)] mt-1.5">
                                            {formatDateTime(notif.createdAt)}
                                            {" · "}
                                            {formatTimeAgo(notif.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </>
    );
}

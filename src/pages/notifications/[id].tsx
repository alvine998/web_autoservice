import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockAdminNotifications } from "@/data/mockData";
import { cn, formatDateTime, formatTimeAgo } from "@/lib/utils";
import {
    ArrowLeft,
    Calendar,
    CreditCard,
    Wrench,
    AlertTriangle,
    Settings,
    ExternalLink,
    Clock,
    Tag,
    FileText,
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
        icon: <Calendar size={20} />,
        color: "text-primary-600 dark:text-primary-400",
        bg: "bg-primary-100 dark:bg-primary-900/30",
        label: "Booking",
        badgeVariant: "primary",
    },
    payment: {
        icon: <CreditCard size={20} />,
        color: "text-success-600 dark:text-success-400",
        bg: "bg-success-100 dark:bg-success-700/20",
        label: "Payment",
        badgeVariant: "success",
    },
    mechanic: {
        icon: <Wrench size={20} />,
        color: "text-info-600 dark:text-info-400",
        bg: "bg-info-100 dark:bg-info-600/20",
        label: "Mechanic",
        badgeVariant: "info",
    },
    system: {
        icon: <Settings size={20} />,
        color: "text-[var(--text-secondary)]",
        bg: "bg-[var(--bg-tertiary)]",
        label: "System",
        badgeVariant: "warning",
    },
    alert: {
        icon: <AlertTriangle size={20} />,
        color: "text-warning-600 dark:text-warning-400",
        bg: "bg-warning-100 dark:bg-warning-700/20",
        label: "Alert",
        badgeVariant: "danger",
    },
};

export default function NotificationDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const notification = mockAdminNotifications.find((n) => n.id === id);

    if (!notification) {
        return (
            <>
                <Head>
                    <title>Notification Not Found - Auto Services Admin</title>
                </Head>
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-4">
                        <FileText
                            size={32}
                            className="text-[var(--text-tertiary)]"
                        />
                    </div>
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                        Notification not found
                    </h2>
                    <p className="text-sm text-[var(--text-tertiary)] mb-4">
                        The notification you&apos;re looking for doesn&apos;t
                        exist or has been removed.
                    </p>
                    <Button
                        variant="secondary"
                        onClick={() => router.push("/notifications/list")}
                    >
                        <ArrowLeft size={16} />
                        Back to Notifications
                    </Button>
                </div>
            </>
        );
    }

    const config = typeConfig[notification.type] || typeConfig.system;

    return (
        <>
            <Head>
                <title>
                    {notification.title} - Auto Services Admin
                </title>
            </Head>

            {/* Back button */}
            <button
                onClick={() => router.push("/notifications/list")}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4"
            >
                <ArrowLeft size={16} />
                Back to Notifications
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main content */}
                <div className="lg:col-span-2">
                    <Card>
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                                    config.bg,
                                    config.color
                                )}
                            >
                                {config.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h1 className="text-lg font-semibold text-[var(--text-primary)]">
                                            {notification.title}
                                        </h1>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant={config.badgeVariant}
                                            >
                                                {config.label}
                                            </Badge>
                                            {!notification.isRead && (
                                                <Badge variant="primary" dot>
                                                    Unread
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[var(--border-color)] my-4" />

                        {/* Message */}
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                                Message
                            </h3>
                            <p className="text-sm text-[var(--text-primary)] leading-relaxed bg-[var(--bg-tertiary)] rounded-lg p-4">
                                {notification.message}
                            </p>
                        </div>

                        {/* Action */}
                        {notification.link && (
                            <div className="flex gap-2">
                                <Link href={notification.link}>
                                    <Button variant="primary">
                                        <ExternalLink size={16} />
                                        Go to Related Page
                                    </Button>
                                </Link>
                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        router.push("/notifications/list")
                                    }
                                >
                                    Back to List
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Details card */}
                    <Card>
                        <CardHeader title="Details" />
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-tertiary)]">
                                    <Tag size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">
                                        Type
                                    </p>
                                    <p className="text-sm text-[var(--text-primary)] capitalize">
                                        {notification.type}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-tertiary)]">
                                    <Clock size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">
                                        Received
                                    </p>
                                    <p className="text-sm text-[var(--text-primary)]">
                                        {formatDateTime(notification.createdAt)}
                                    </p>
                                    <p className="text-xs text-[var(--text-tertiary)]">
                                        {formatTimeAgo(notification.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-tertiary)]">
                                    <FileText size={14} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">
                                        Status
                                    </p>
                                    <p className="text-sm text-[var(--text-primary)]">
                                        {notification.isRead ? "Read" : "Unread"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Metadata card */}
                    {notification.metadata &&
                        Object.keys(notification.metadata).length > 0 && (
                            <Card>
                                <CardHeader title="Additional Info" />
                                <div className="space-y-2.5">
                                    {Object.entries(notification.metadata).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center justify-between"
                                            >
                                                <span className="text-xs text-[var(--text-tertiary)] capitalize">
                                                    {key.replace(
                                                        /([A-Z])/g,
                                                        " $1"
                                                    )}
                                                </span>
                                                <span className="text-xs font-medium text-[var(--text-primary)]">
                                                    {value}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Card>
                        )}
                </div>
            </div>
        </>
    );
}

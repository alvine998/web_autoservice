import React, { useState } from "react";
import Head from "next/head";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { DataTable, Column } from "@/components/ui/DataTable";
import { mockNotifications } from "@/data/mockData";
import { Notification } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
    Bell,
    Send,
    Users,
    Wrench,
    Building2,
    Globe,
    MessageSquare,
    AlertTriangle,
    Radio,
} from "lucide-react";

export default function NotificationsPage() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [target, setTarget] = useState("all");
    const [notifType, setNotifType] = useState("push");
    const { addToast } = useToast();

    const typeIcons: Record<string, React.ReactNode> = {
        push: <Bell size={14} />,
        system: <AlertTriangle size={14} />,
        broadcast: <Radio size={14} />,
    };

    const typeColors: Record<string, "primary" | "warning" | "info"> = {
        push: "primary",
        system: "warning",
        broadcast: "info",
    };

    const targetIcons: Record<string, React.ReactNode> = {
        all: <Globe size={14} />,
        users: <Users size={14} />,
        mechanics: <Wrench size={14} />,
        workshops: <Building2 size={14} />,
    };

    const columns: Column<Notification>[] = [
        {
            key: "title",
            title: "Notification",
            render: (n) => (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${n.type === "push" ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" :
                            n.type === "system" ? "bg-warning-100 dark:bg-warning-700/20 text-warning-600 dark:text-warning-400" :
                                "bg-info-100 dark:bg-info-600/20 text-info-600 dark:text-info-400"
                        }`}>
                        {typeIcons[n.type]}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{n.title}</p>
                        <p className="text-xs text-[var(--text-tertiary)] max-w-[300px] truncate">{n.message}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "type",
            title: "Type",
            render: (n) => <Badge variant={typeColors[n.type]}>{n.type.charAt(0).toUpperCase() + n.type.slice(1)}</Badge>,
        },
        {
            key: "target",
            title: "Target",
            render: (n) => (
                <div className="flex items-center gap-1.5">
                    {targetIcons[n.target]}
                    <span className="text-sm text-[var(--text-secondary)] capitalize">{n.target}</span>
                </div>
            ),
        },
        {
            key: "readCount",
            title: "Read Rate",
            render: (n) => {
                const rate = Math.round((n.readCount / n.totalRecipients) * 100);
                return (
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{rate}%</span>
                            <span className="text-xs text-[var(--text-tertiary)]">{n.readCount}/{n.totalRecipients}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary-500 rounded-full transition-all"
                                style={{ width: `${rate}%` }}
                            />
                        </div>
                    </div>
                );
            },
        },
        {
            key: "sentAt",
            title: "Sent",
            render: (n) => <span className="text-xs text-[var(--text-secondary)]">{formatDateTime(n.sentAt)}</span>,
        },
    ];

    return (
        <>
            <Head><title>Notifications - Auto Services Admin</title></Head>

            <PageHeader title="Notification Center" subtitle="Send notifications and manage alerts" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Compose */}
                <Card className="lg:col-span-1">
                    <CardHeader title="Compose Notification" subtitle="Send push notification or broadcast" />
                    <div className="space-y-3">
                        <Select
                            label="Type"
                            options={[
                                { value: "push", label: "Push Notification" },
                                { value: "system", label: "System Alert" },
                                { value: "broadcast", label: "Broadcast Message" },
                            ]}
                            value={notifType}
                            onChange={(e) => setNotifType(e.target.value)}
                        />
                        <Select
                            label="Target Audience"
                            options={[
                                { value: "all", label: "All Users" },
                                { value: "users", label: "Customers Only" },
                                { value: "mechanics", label: "Mechanics Only" },
                                { value: "workshops", label: "Workshops Only" },
                            ]}
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                        />
                        <Input
                            label="Title"
                            placeholder="Notification title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Message
                            </label>
                            <textarea
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 resize-none"
                            />
                        </div>
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => {
                                addToast("success", "Notification Sent", `Message sent to ${target} audience`);
                                setTitle("");
                                setMessage("");
                            }}
                        >
                            <Send size={16} />
                            Send Notification
                        </Button>
                    </div>
                </Card>

                {/* History */}
                <div className="lg:col-span-2">
                    <Card padding="none">
                        <div className="p-5 pb-0">
                            <CardHeader title="Notification History" subtitle="Previously sent notifications" />
                        </div>
                        <DataTable columns={columns} data={mockNotifications} keyExtractor={(n) => n.id} pageSize={5} />
                    </Card>
                </div>
            </div>
        </>
    );
}

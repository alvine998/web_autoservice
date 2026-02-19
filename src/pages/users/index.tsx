import React, { useState } from "react";
import Head from "next/head";
import { PageHeader, StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockUsers } from "@/data/mockData";
import { User } from "@/types";
import { formatDate, formatTimeAgo, getInitials } from "@/lib/utils";
import { Search, UserPlus, Shield, ShieldOff, Mail, Calendar, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { addToast } = useToast();

    const filtered = mockUsers.filter((u) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.phone.toLowerCase().includes(q) ||
            u.city.toLowerCase().includes(q)
        );
    });

    const isFiltered = searchQuery !== "";

    const columns: Column<User>[] = [
        {
            key: "name",
            title: "User",
            render: (u) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-info-400 to-info-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {getInitials(u.name)}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{u.name}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">{u.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "phone",
            title: "Phone",
            render: (u) => <span className="text-sm text-[var(--text-secondary)]">{u.phone}</span>,
        },
        {
            key: "city",
            title: "City",
            render: (u) => <span className="text-sm text-[var(--text-secondary)]">{u.city}</span>,
        },
        {
            key: "totalBookings",
            title: "Bookings",
            sortable: true,
            render: (u) => (
                <span className="text-sm font-medium text-[var(--text-primary)]">{u.totalBookings}</span>
            ),
        },
        {
            key: "joinedAt",
            title: "Joined",
            sortable: true,
            render: (u) => (
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">{formatDate(u.joinedAt)}</p>
                </div>
            ),
        },
        {
            key: "lastActive",
            title: "Last Active",
            render: (u) => (
                <span className="text-xs text-[var(--text-tertiary)]">{formatTimeAgo(u.lastActive)}</span>
            ),
        },
        {
            key: "isBlocked",
            title: "Status",
            render: (u) => (
                <Badge variant={u.isBlocked ? "danger" : "success"} dot>
                    {u.isBlocked ? "Blocked" : "Active"}
                </Badge>
            ),
        },
        {
            key: "actions",
            title: "",
            render: (u) => (
                <Button
                    variant={u.isBlocked ? "success" : "danger"}
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        addToast(
                            u.isBlocked ? "success" : "warning",
                            u.isBlocked ? "User Unblocked" : "User Blocked",
                            `${u.name} has been ${u.isBlocked ? "unblocked" : "blocked"}`
                        );
                    }}
                >
                    {u.isBlocked ? <Shield size={14} /> : <ShieldOff size={14} />}
                    {u.isBlocked ? "Unblock" : "Block"}
                </Button>
            ),
        },
    ];

    return (
        <>
            <Head><title>Users - Auto Services Admin</title></Head>

            <PageHeader
                title="User Management"
                subtitle={`${mockUsers.length} registered users`}
            />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-[var(--text-primary)]">{mockUsers.length}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Total Users</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-success-600 dark:text-success-400">{mockUsers.filter(u => !u.isBlocked).length}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Active</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-danger-600 dark:text-danger-400">{mockUsers.filter(u => u.isBlocked).length}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Blocked</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {mockUsers.reduce((sum, u) => sum + u.totalBookings, 0)}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Total Bookings</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search users by name, email, city, phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-10 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                        >
                            <XCircle size={14} />
                        </button>
                    )}
                </div>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setSearchQuery("")}
                        className="text-danger-500 hover:text-danger-600"
                    >
                        Reset
                    </Button>
                )}
            </div>

            <DataTable columns={columns} data={filtered} keyExtractor={(u) => u.id} pageSize={8} />
        </>
    );
}

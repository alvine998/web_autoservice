import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader, StatusBadge, LivePulse } from "@/components/shared/StatusBadge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { mockMechanics } from "@/data/mockData";
import { Mechanic } from "@/types";
import { formatCurrency, getInitials } from "@/lib/utils";
import { Search, UserPlus, Star, MapPin, Wallet, Wrench, XCircle } from "lucide-react";

export default function MechanicsPage() {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = mockMechanics.filter((m) => {
        if (statusFilter !== "all" && m.status !== statusFilter) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return (
                m.name.toLowerCase().includes(q) ||
                m.email.toLowerCase().includes(q) ||
                m.phone.toLowerCase().includes(q) ||
                m.city.toLowerCase().includes(q) ||
                m.specializations.some(s => s.toLowerCase().includes(q)) ||
                m.verificationStatus.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const isFiltered = statusFilter !== "all" || searchQuery !== "";

    const columns: Column<Mechanic>[] = [
        {
            key: "name",
            title: "Mechanic",
            render: (m) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {getInitials(m.name)}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{m.name}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">{m.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "status",
            title: "Status",
            render: (m) => (
                <div className="flex items-center gap-2">
                    <StatusBadge status={m.status} />
                </div>
            ),
        },
        {
            key: "verificationStatus",
            title: "Verification",
            render: (m) => <StatusBadge status={m.verificationStatus} />,
        },
        {
            key: "rating",
            title: "Rating",
            sortable: true,
            render: (m) => (
                <div className="flex items-center gap-1">
                    <Star size={14} className="text-warning-400 fill-warning-400" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">{m.rating > 0 ? m.rating.toFixed(1) : "N/A"}</span>
                </div>
            ),
        },
        {
            key: "totalJobs",
            title: "Jobs",
            sortable: true,
            render: (m) => (
                <div>
                    <p className="text-sm text-[var(--text-primary)]">{m.completedJobs}/{m.totalJobs}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)]">completed</p>
                </div>
            ),
        },
        {
            key: "walletBalance",
            title: "Wallet",
            sortable: true,
            render: (m) => (
                <span className="text-sm font-medium text-[var(--text-primary)]">
                    {formatCurrency(m.walletBalance)}
                </span>
            ),
        },
        {
            key: "city",
            title: "City",
            render: (m) => (
                <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-[var(--text-tertiary)]" />
                    <span className="text-sm text-[var(--text-secondary)]">{m.city}</span>
                </div>
            ),
        },
        {
            key: "actions",
            title: "Actions",
            render: (m) => (
                <div className="flex items-center gap-1">
                    {m.verificationStatus === "pending" && (
                        <>
                            <Button variant="success" size="sm">Approve</Button>
                            <Button variant="danger" size="sm">Reject</Button>
                        </>
                    )}
                    {m.verificationStatus === "approved" && m.isActive && (
                        <Button variant="ghost" size="sm">Suspend</Button>
                    )}
                    {m.verificationStatus === "approved" && !m.isActive && (
                        <Button variant="primary" size="sm">Activate</Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <Head>
                <title>Mechanics - Auto Services Admin</title>
            </Head>

            <PageHeader
                title="Mechanic Management"
                subtitle={`${mockMechanics.length} registered mechanics`}
                action={
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-success-50 dark:bg-success-700/10 px-3 py-1.5 rounded-full">
                            <LivePulse />
                            <span className="text-xs font-medium text-success-600 dark:text-success-400">
                                {mockMechanics.filter(m => m.status === "online").length} Online
                            </span>
                        </div>
                    </div>
                }
            />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search by name, email, city, specialty..."
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
                <Select
                    options={[
                        { value: "all", label: "All Status" },
                        { value: "online", label: "Online" },
                        { value: "offline", label: "Offline" },
                        { value: "busy", label: "Busy" },
                    ]}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-40"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                        }}
                        className="text-danger-500 hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/10"
                    >
                        Reset
                    </Button>
                )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                    { label: "Total", value: mockMechanics.length, color: "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" },
                    { label: "Online", value: mockMechanics.filter(m => m.status === "online").length, color: "bg-success-100 dark:bg-success-700/20 text-success-600 dark:text-success-400" },
                    { label: "Busy", value: mockMechanics.filter(m => m.status === "busy").length, color: "bg-warning-100 dark:bg-warning-700/20 text-warning-600 dark:text-warning-400" },
                    { label: "Pending Verify", value: mockMechanics.filter(m => m.verificationStatus === "pending").length, color: "bg-danger-100 dark:bg-danger-700/20 text-danger-600 dark:text-danger-400" },
                ].map(stat => (
                    <div key={stat.label} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</p>
                        <p className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase">{stat.label}</p>
                    </div>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={filtered}
                keyExtractor={(m) => m.id}
                onRowClick={(m) => router.push(`/mechanics/${m.id}`)}
                pageSize={8}
            />
        </>
    );
}

import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/shared/StatusBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockBookings } from "@/data/mockData";
import { Booking } from "@/types";
import { formatCurrency, formatDateTime, formatTimeAgo } from "@/lib/utils";
import { Search, Filter, Download, CalendarCheck, XCircle } from "lucide-react";

export default function BookingsPage() {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = mockBookings.filter((b) => {
        if (statusFilter !== "all" && b.status !== statusFilter) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return (
                b.bookingNumber.toLowerCase().includes(q) ||
                b.customer.name.toLowerCase().includes(q) ||
                b.service.name.toLowerCase().includes(q) ||
                b.mechanic?.name.toLowerCase().includes(q) ||
                b.location.city.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const isFiltered = statusFilter !== "all" || searchQuery !== "";

    const columns: Column<Booking>[] = [
        {
            key: "bookingNumber",
            title: "Booking ID",
            sortable: true,
            render: (b) => (
                <div>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{b.bookingNumber}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)]">{formatTimeAgo(b.createdAt)}</p>
                </div>
            ),
        },
        {
            key: "customer",
            title: "Customer",
            render: (b) => (
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {b.customer.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{b.customer.name}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">{b.customer.phone}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "service",
            title: "Service",
            render: (b) => (
                <div>
                    <p className="text-sm text-[var(--text-primary)]">{b.service.name}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)]">{b.service.category}</p>
                </div>
            ),
        },
        {
            key: "mechanic",
            title: "Mechanic",
            render: (b) => (
                <span className="text-sm text-[var(--text-secondary)]">
                    {b.mechanic?.name || <span className="italic text-[var(--text-tertiary)]">Unassigned</span>}
                </span>
            ),
        },
        {
            key: "status",
            title: "Status",
            sortable: true,
            render: (b) => <StatusBadge status={b.status} />,
        },
        {
            key: "paymentStatus",
            title: "Payment",
            render: (b) => <StatusBadge status={b.paymentStatus} />,
        },
        {
            key: "location",
            title: "City",
            render: (b) => (
                <span className="text-sm text-[var(--text-secondary)]">{b.location.city}</span>
            ),
        },
        {
            key: "amount",
            title: "Amount",
            sortable: true,
            render: (b) => (
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {formatCurrency(b.amount)}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head>
                <title>Bookings - Auto Services Admin</title>
            </Head>

            <PageHeader
                title="Booking Management"
                subtitle={`${mockBookings.length} total bookings`}
                action={
                    <Button variant="primary" size="md">
                        <Download size={16} />
                        Export
                    </Button>
                }
            />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search by ID, customer, mechanic, city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-10 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500"
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
                        { value: "all", label: "All Statuses" },
                        { value: "pending", label: "Pending" },
                        { value: "confirmed", label: "Confirmed" },
                        { value: "in_progress", label: "In Progress" },
                        { value: "completed", label: "Completed" },
                        { value: "cancelled", label: "Cancelled" },
                    ]}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-44"
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

            {/* Status summary */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {[
                    { status: "all", label: "All", count: mockBookings.length },
                    { status: "pending", label: "Pending", count: mockBookings.filter(b => b.status === "pending").length },
                    { status: "in_progress", label: "Active", count: mockBookings.filter(b => b.status === "in_progress").length },
                    { status: "completed", label: "Completed", count: mockBookings.filter(b => b.status === "completed").length },
                    { status: "cancelled", label: "Cancelled", count: mockBookings.filter(b => b.status === "cancelled").length },
                ].map(item => (
                    <button
                        key={item.status}
                        onClick={() => setStatusFilter(item.status)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === item.status
                            ? "bg-primary-600 text-white"
                            : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
                            }`}
                    >
                        {item.label}
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${statusFilter === item.status
                            ? "bg-white/20 text-white"
                            : "bg-[var(--border-color)] text-[var(--text-tertiary)]"
                            }`}>
                            {item.count}
                        </span>
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={filteredBookings}
                keyExtractor={(b) => b.id}
                onRowClick={(b) => router.push(`/bookings/${b.id}`)}
                pageSize={8}
            />
        </>
    );
}

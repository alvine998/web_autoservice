import React from "react";
import Head from "next/head";
import { PageHeader, StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/charts/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockTransactions } from "@/data/mockData";
import { Transaction } from "@/types";
import { cn, formatCurrency, formatDateTime } from "@/lib/utils";
import {
    DollarSign,
    TrendingUp,
    Wallet,
    ArrowDownRight,
    CreditCard,
    PieChart as PieIcon,
    Download,
    Search,
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const pieData = [
    { name: "Booking Payments", value: 3100000, color: "#6366f1" },
    { name: "Mechanic Payouts", value: 1657500, color: "#22c55e" },
    { name: "Platform Commission", value: 292500, color: "#f59e0b" },
    { name: "Refunds", value: 150000, color: "#ef4444" },
];

const revenueLineData = [
    { month: "Jan", revenue: 320000000, commission: 48000000 },
    { month: "Feb", revenue: 380000000, commission: 57000000 },
    { month: "Mar", revenue: 420000000, commission: 63000000 },
    { month: "Apr", revenue: 390000000, commission: 58500000 },
    { month: "May", revenue: 470000000, commission: 70500000 },
    { month: "Jun", revenue: 510000000, commission: 76500000 },
];

export default function FinancePage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typeFilter, setTypeFilter] = React.useState("all");

    const filteredTransactions = mockTransactions.filter((t) => {
        const matchSearch =
            searchQuery === "" ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchType = typeFilter === "all" || t.type === typeFilter;
        return matchSearch && matchType;
    });

    const typeLabels: Record<string, string> = {
        booking_payment: "Booking Payment",
        mechanic_payout: "Mechanic Payout",
        platform_commission: "Commission",
        withdrawal: "Withdrawal",
        refund: "Refund",
    };

    const typeColors: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
        booking_payment: "primary",
        mechanic_payout: "success",
        platform_commission: "warning",
        withdrawal: "info",
        refund: "danger",
    };

    const columns: Column<Transaction>[] = [
        {
            key: "id",
            title: "Transaction ID",
            render: (t) => (
                <span className="text-sm font-mono text-primary-600 dark:text-primary-400">{t.id}</span>
            ),
        },
        {
            key: "type",
            title: "Type",
            render: (t) => (
                <Badge variant={typeColors[t.type] || "default"}>
                    {typeLabels[t.type] || t.type}
                </Badge>
            ),
        },
        {
            key: "description",
            title: "Description",
            render: (t) => (
                <span className="text-sm text-[var(--text-secondary)]">{t.description}</span>
            ),
        },
        {
            key: "amount",
            title: "Amount",
            sortable: true,
            render: (t) => (
                <span className={`text-sm font-semibold ${t.type === "refund" || t.type === "mechanic_payout"
                    ? "text-danger-500"
                    : "text-success-600 dark:text-success-400"
                    }`}>
                    {t.type === "refund" || t.type === "mechanic_payout" ? "-" : "+"}
                    {formatCurrency(t.amount)}
                </span>
            ),
        },
        {
            key: "escrowStatus",
            title: "Escrow",
            render: (t) => t.escrowStatus ? <StatusBadge status={t.escrowStatus} /> : <span className="text-xs text-[var(--text-tertiary)]">N/A</span>,
        },
        {
            key: "status",
            title: "Status",
            render: (t) => (
                <Badge variant={t.status === "completed" ? "success" : t.status === "pending" ? "warning" : "danger"} dot>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            title: "Date",
            sortable: true,
            render: (t) => (
                <span className="text-xs text-[var(--text-secondary)]">{formatDateTime(t.createdAt)}</span>
            ),
        },
    ];

    return (
        <>
            <Head><title>Finance - Auto Services Admin</title></Head>

            <PageHeader
                title="Payments & Finance"
                subtitle="Financial overview and transaction management"
                action={
                    <Button variant="secondary"><Download size={16} /> Export Report</Button>
                }
            />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Total Transactions"
                    value={mockTransactions.length.toString()}
                    icon={CreditCard}
                    iconColor="text-primary-600 dark:text-primary-400"
                    iconBgColor="bg-primary-100 dark:bg-primary-900/30"
                />
                <StatCard
                    title="Total Revenue"
                    value={formatCurrency(487500000)}
                    change={18.3}
                    changeLabel="this month"
                    icon={DollarSign}
                    iconColor="text-success-600 dark:text-success-400"
                    iconBgColor="bg-success-100 dark:bg-success-700/20"
                />
                <StatCard
                    title="Commission Earned"
                    value={formatCurrency(73125000)}
                    change={15}
                    icon={TrendingUp}
                    iconColor="text-warning-600 dark:text-warning-400"
                    iconBgColor="bg-warning-100 dark:bg-warning-700/20"
                />
                <StatCard
                    title="Pending Withdrawals"
                    value={formatCurrency(5000000)}
                    icon={Wallet}
                    iconColor="text-info-600 dark:text-info-400"
                    iconBgColor="bg-info-100 dark:bg-info-600/20"
                />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={16} />
                    <input
                        type="text"
                        placeholder="Search by ID or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                    />
                </div>
                <div className="flex gap-2 bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--border-color)] overflow-x-auto">
                    {[
                        { value: "all", label: "All" },
                        { value: "booking_payment", label: "Payments" },
                        { value: "mechanic_payout", label: "Payouts" },
                        { value: "platform_commission", label: "Commissions" },
                        { value: "refund", label: "Refunds" },
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setTypeFilter(tab.value)}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                                typeFilter === tab.value
                                    ? "bg-white dark:bg-[var(--bg-tertiary)] text-[var(--text-primary)] shadow-sm border border-[var(--border-color)]"
                                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <Card className="lg:col-span-2">
                    <CardHeader title="Revenue & Commission Trend" subtitle="Monthly breakdown" />
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueLineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} axisLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", fontSize: "12px" }}
                                    formatter={(value: any) => [formatCurrency(Number(value))]}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="Revenue" />
                                <Line type="monotone" dataKey="commission" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Commission" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <CardHeader title="Transaction Breakdown" />
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", fontSize: "12px" }}
                                    formatter={(value: any) => [formatCurrency(Number(value))]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[var(--text-secondary)] flex-1">{item.name}</span>
                                <span className="font-medium text-[var(--text-primary)]">{formatCurrency(item.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card padding="none">
                <div className="p-5 pb-0">
                    <CardHeader title="Recent Transactions" subtitle="All financial transactions" />
                </div>
                <DataTable columns={columns} data={filteredTransactions} keyExtractor={(t) => t.id} pageSize={8} />
            </Card>
        </>
    );
}

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { PageHeader, LivePulse, StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockActivityLogs, mockBookings, mockMechanics } from "@/data/mockData";
import { formatTimeAgo, formatCurrency, getInitials } from "@/lib/utils";
import {
    Activity,
    Radio,
    Zap,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    MapPin,
    User,
    Wrench,
    Search,
} from "lucide-react";
import { Select } from "@/components/ui/Input";

const incomingBookings = [
    { id: "ib-1", customer: "Andi Setiawan", service: "Oil Change", city: "Jakarta", amount: 350000, time: "2 min ago" },
    { id: "ib-2", customer: "Lina Marlina", service: "Brake Check", city: "Bandung", amount: 200000, time: "5 min ago" },
    { id: "ib-3", customer: "Riko Pratama", service: "AC Service", city: "Surabaya", amount: 500000, time: "8 min ago" },
    { id: "ib-4", customer: "Sari Dewi", service: "Full Service", city: "Jakarta", amount: 2500000, time: "12 min ago" },
];

const mechanicAcceptance = [
    { id: "ma-1", mechanic: "Budi Santoso", booking: "BK-2024-0009", action: "accepted", time: "1 min ago" },
    { id: "ma-2", mechanic: "Agus Hermawan", booking: "BK-2024-0010", action: "accepted", time: "3 min ago" },
    { id: "ma-3", mechanic: "Dedi Prasetyo", booking: "BK-2024-0011", action: "declined", time: "6 min ago" },
    { id: "ma-4", mechanic: "Yanto Kurniawan", booking: "BK-2024-0012", action: "accepted", time: "10 min ago" },
];

const liveTrips = [
    { id: "lt-1", booking: "BK-2024-0001", mechanic: "Budi Santoso", customer: "Ahmad Rizky", status: "en_route", service: "Oil Change" },
    { id: "lt-2", booking: "BK-2024-0008", mechanic: "Yanto Kurniawan", customer: "Dewi Lestari", status: "working", service: "Full Service" },
    { id: "lt-3", booking: "BK-2024-0013", mechanic: "Agus Hermawan", customer: "Rina Sari", status: "en_route", service: "Tire Rotation" },
];

export default function MonitoringPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [logSearch, setLogSearch] = useState("");
    const [logTypeFilter, setLogTypeFilter] = useState("all");

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const filteredLogs = mockActivityLogs.filter((log) => {
        const matchSearch = logSearch === "" || log.message.toLowerCase().includes(logSearch.toLowerCase());
        const matchType = logTypeFilter === "all" || log.type.includes(logTypeFilter);
        return matchSearch && matchType;
    });

    const typeColors: Record<string, string> = {
        booking_created: "bg-primary-500",
        booking_accepted: "bg-success-500",
        booking_completed: "bg-info-500",
        mechanic_online: "bg-success-500",
        mechanic_offline: "bg-surface-400",
        payment_received: "bg-warning-500",
        system_alert: "bg-danger-500",
    };

    const typeIcons: Record<string, React.ReactNode> = {
        booking_created: <Zap size={12} />,
        booking_accepted: <CheckCircle size={12} />,
        booking_completed: <CheckCircle size={12} />,
        mechanic_online: <User size={12} />,
        mechanic_offline: <User size={12} />,
        payment_received: <Zap size={12} />,
        system_alert: <AlertTriangle size={12} />,
    };

    return (
        <>
            <Head><title>Monitoring - Auto Services Admin</title></Head>

            <PageHeader
                title="Realtime Monitoring"
                subtitle="Live system activity and booking tracking"
                action={
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-success-50 dark:bg-success-700/10 px-3 py-1.5 rounded-full">
                            <LivePulse />
                            <span className="text-xs font-medium text-success-600 dark:text-success-400">Live</span>
                        </div>
                        <div className="text-xs text-[var(--text-tertiary)] font-mono">
                            {currentTime.toLocaleTimeString()}
                        </div>
                    </div>
                }
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                        <span className="text-[10px] text-[var(--text-tertiary)] uppercase">Online Mechanics</span>
                    </div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">
                        {mockMechanics.filter(m => m.status === "online").length}
                    </p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-warning-500 animate-pulse" />
                        <span className="text-[10px] text-[var(--text-tertiary)] uppercase">Active Trips</span>
                    </div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{liveTrips.length}</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="text-[10px] text-[var(--text-tertiary)] uppercase">Pending</span>
                    </div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{incomingBookings.length}</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-info-500 animate-pulse" />
                        <span className="text-[10px] text-[var(--text-tertiary)] uppercase">Events / min</span>
                    </div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">24</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Incoming Bookings */}
                <Card>
                    <CardHeader
                        title="Incoming Bookings"
                        subtitle="Waiting to be assigned"
                        action={<Badge variant="warning" dot pulse>{incomingBookings.length} pending</Badge>}
                    />
                    <div className="space-y-3">
                        {incomingBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-primary-500/30 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{booking.customer}</p>
                                        <p className="text-xs text-[var(--text-tertiary)]">{booking.service}</p>
                                    </div>
                                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                                        {formatCurrency(booking.amount)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={10} className="text-[var(--text-tertiary)]" />
                                        <span className="text-[10px] text-[var(--text-tertiary)]">{booking.city}</span>
                                    </div>
                                    <span className="text-[10px] text-[var(--text-tertiary)]">{booking.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Mechanic Acceptance */}
                <Card>
                    <CardHeader
                        title="Mechanic Responses"
                        subtitle="Accept / decline activity"
                        action={<LivePulse />}
                    />
                    <div className="space-y-3">
                        {mechanicAcceptance.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                    {getInitials(item.mechanic)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[var(--text-primary)]">
                                        <span className="font-medium">{item.mechanic}</span>
                                    </p>
                                    <p className="text-[10px] text-[var(--text-tertiary)]">{item.booking}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <Badge variant={item.action === "accepted" ? "success" : "danger"}>
                                        {item.action === "accepted" ? "Accepted" : "Declined"}
                                    </Badge>
                                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Live Trips */}
                <Card>
                    <CardHeader
                        title="Live Trips"
                        subtitle="Currently active bookings"
                        action={<Badge variant="success" dot pulse>{liveTrips.length} active</Badge>}
                    />
                    <div className="space-y-3">
                        {liveTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono text-primary-600 dark:text-primary-400">{trip.booking}</span>
                                    <Badge variant={trip.status === "working" ? "success" : "warning"} dot pulse>
                                        {trip.status === "working" ? "Working" : "En Route"}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                        <Wrench size={10} className="text-[var(--text-tertiary)]" />
                                        <span className="text-xs text-[var(--text-secondary)]">{trip.mechanic}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User size={10} className="text-[var(--text-tertiary)]" />
                                        <span className="text-xs text-[var(--text-secondary)]">{trip.customer}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Activity size={10} className="text-[var(--text-tertiary)]" />
                                        <span className="text-xs text-[var(--text-secondary)]">{trip.service}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* System Activity Log */}
            <Card className="mt-4">
                <CardHeader
                    title="System Activity Log"
                    subtitle="Real-time system events"
                    action={
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search logs..."
                                    value={logSearch}
                                    onChange={(e) => setLogSearch(e.target.value)}
                                    className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none w-48 focus:ring-1 focus:ring-primary-500/40"
                                />
                            </div>
                            <Select
                                value={logTypeFilter}
                                onChange={(e) => setLogTypeFilter(e.target.value)}
                                options={[
                                    { value: "all", label: "All Events" },
                                    { value: "booking", label: "Bookings" },
                                    { value: "mechanic", label: "Mechanics" },
                                    { value: "payment", label: "Payments" },
                                    { value: "system", label: "System" },
                                ]}
                                className="w-32 h-8 text-[10px]"
                            />
                        </div>
                    }
                />
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {filteredLogs.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-xs text-[var(--text-tertiary)]">No matching logs found</p>
                        </div>
                    ) : (
                        filteredLogs.map((log) => (
                            <div key={log.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-white shrink-0 ${typeColors[log.type] || "bg-surface-400"}`}>
                                    {typeIcons[log.type] || <Activity size={12} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[var(--text-primary)] leading-tight">{log.message}</p>
                                    <p className="text-[10px] text-[var(--text-tertiary)] mt-1">{formatTimeAgo(log.timestamp)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </>
    );
}

import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { PageHeader, LivePulse } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/charts/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockDashboardStats, mockBookingsChartData, mockRevenueChartData, mockBookings, mockActivityLogs } from "@/data/mockData";
import { formatCurrency, formatNumber, formatDateTime, formatTimeAgo } from "@/lib/utils";
import {
  CalendarCheck,
  Activity,
  CheckCircle,
  XCircle,
  DollarSign,
  Percent,
  Users,
  UserPlus,
  MapPin,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const stats = mockDashboardStats;

  return (
    <>
      <Head>
        <title>Dashboard - Auto Services Admin</title>
        <meta name="description" content="Auto Services admin dashboard overview" />
      </Head>

      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back, Admin. Here's what's happening today."
        action={
          <div className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full">
            <LivePulse />
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
              Live Updates
            </span>
          </div>
        }
      />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Bookings Today"
          value={stats.totalBookingsToday.toString()}
          change={12.5}
          changeLabel="vs yesterday"
          icon={CalendarCheck}
          iconColor="text-primary-600 dark:text-primary-400"
          iconBgColor="bg-primary-100 dark:bg-primary-900/30"
        />
        <StatCard
          title="Active Bookings"
          value={stats.activeBookings.toString()}
          change={8}
          changeLabel="live now"
          icon={Activity}
          iconColor="text-success-600 dark:text-success-400"
          iconBgColor="bg-success-100 dark:bg-success-700/20"
        />
        <StatCard
          title="Completed"
          value={formatNumber(stats.completedBookings)}
          change={5.2}
          changeLabel="this week"
          icon={CheckCircle}
          iconColor="text-info-600 dark:text-info-400"
          iconBgColor="bg-info-100 dark:bg-info-600/20"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelledBookings.toString()}
          change={-3.1}
          changeLabel="vs last week"
          icon={XCircle}
          iconColor="text-danger-600 dark:text-danger-400"
          iconBgColor="bg-danger-100 dark:bg-danger-700/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={18.3}
          changeLabel="this month"
          icon={DollarSign}
          iconColor="text-success-600 dark:text-success-400"
          iconBgColor="bg-success-100 dark:bg-success-700/20"
        />
        <StatCard
          title="Platform Commission"
          value={formatCurrency(stats.platformCommission)}
          change={15}
          changeLabel="of revenue"
          icon={Percent}
          iconColor="text-warning-600 dark:text-warning-400"
          iconBgColor="bg-warning-100 dark:bg-warning-700/20"
        />
        <StatCard
          title="Active Mechanics"
          value={stats.activeMechanics.toString()}
          change={4}
          changeLabel="online now"
          icon={Users}
          iconColor="text-primary-600 dark:text-primary-400"
          iconBgColor="bg-primary-100 dark:bg-primary-900/30"
        />
        <StatCard
          title="New Users"
          value={stats.newUsers.toString()}
          change={22}
          changeLabel="this week"
          icon={UserPlus}
          iconColor="text-info-600 dark:text-info-400"
          iconBgColor="bg-info-100 dark:bg-info-600/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Bookings Chart */}
        <Card>
          <CardHeader title="Bookings This Week" subtitle="Daily booking count" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockBookingsChartData}>
                <defs>
                  <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#bookingGrad)" name="Bookings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader title="Revenue This Week" subtitle="Daily revenue in IDR" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRevenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: any) => [formatCurrency(Number(value)), "Revenue"]}
                />
                <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Recent Bookings + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2" padding="none">
          <div className="p-5 pb-0">
            <CardHeader title="Recent Bookings" subtitle="Latest booking activity" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase">Booking</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase">Customer</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase">Service</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-tertiary)] uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {mockBookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-[var(--hover-bg)] transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{booking.bookingNumber}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{formatTimeAgo(booking.createdAt)}</p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-bold">
                          {booking.customer.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm text-[var(--text-primary)]">{booking.customer.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{booking.service.name}</td>
                    <td className="px-5 py-3"><StatusBadge status={booking.status} /></td>
                    <td className="px-5 py-3 text-sm font-medium text-[var(--text-primary)] text-right">{formatCurrency(booking.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader
            title="Activity Feed"
            subtitle="Real-time system events"
            action={<LivePulse />}
          />
          <div className="space-y-3">
            {mockActivityLogs.slice(0, 6).map((log) => {
              const typeColors: Record<string, string> = {
                booking_created: "bg-primary-500",
                booking_accepted: "bg-success-500",
                booking_completed: "bg-info-500",
                mechanic_online: "bg-success-500",
                mechanic_offline: "bg-surface-400",
                payment_received: "bg-warning-500",
                system_alert: "bg-danger-500",
              };

              return (
                <div key={log.id} className="flex gap-3">
                  <div className="relative mt-1">
                    <div className={`w-2 h-2 rounded-full ${typeColors[log.type] || "bg-surface-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                      {log.message}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                      {formatTimeAgo(log.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
}

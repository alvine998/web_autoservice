import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge, PageHeader } from "@/components/shared/StatusBadge";
import { mockBookings } from "@/data/mockData";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
    ArrowLeft,
    MapPin,
    Phone,
    Calendar,
    Car,
    User,
    Wrench,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Circle,
} from "lucide-react";

export default function BookingDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const booking = mockBookings.find((b) => b.id === id);

    if (!booking) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-lg font-semibold text-[var(--text-primary)]">Booking Not Found</p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-1">The booking you&apos;re looking for doesn&apos;t exist.</p>
                    <Button variant="primary" className="mt-4" onClick={() => router.push("/bookings")}>
                        Back to Bookings
                    </Button>
                </div>
            </div>
        );
    }

    const statusTimeline = [
        { status: "created", label: "Booking Created", time: booking.createdAt, icon: Circle, done: true },
        { status: "confirmed", label: "Confirmed", time: booking.createdAt, icon: CheckCircle, done: ["confirmed", "in_progress", "completed"].includes(booking.status) },
        { status: "in_progress", label: "In Progress", time: booking.scheduledAt, icon: Wrench, done: ["in_progress", "completed"].includes(booking.status) },
        { status: "completed", label: "Completed", time: booking.completedAt || "", icon: CheckCircle, done: booking.status === "completed" },
    ];

    return (
        <>
            <Head>
                <title>{booking.bookingNumber} - Auto Services Admin</title>
            </Head>

            <div className="mb-6">
                <Link
                    href="/bookings"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-3"
                >
                    <ArrowLeft size={16} />
                    Back to Bookings
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">{booking.bookingNumber}</h1>
                            <StatusBadge status={booking.status} />
                        </div>
                        <p className="text-sm text-[var(--text-tertiary)] mt-0.5">Created {formatDateTime(booking.createdAt)}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">Assign Mechanic</Button>
                        <Button variant="danger" size="sm">Cancel Booking</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left column */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Status Timeline */}
                    <Card>
                        <CardHeader title="Status Timeline" />
                        <div className="flex items-center gap-0">
                            {statusTimeline.map((step, i) => (
                                <div key={step.status} className="flex-1 flex items-center">
                                    <div className="flex flex-col items-center text-center flex-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step.done
                                                ? "bg-success-100 dark:bg-success-700/20 text-success-600 dark:text-success-400"
                                                : "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
                                            }`}>
                                            <step.icon size={16} />
                                        </div>
                                        <p className={`text-xs font-medium ${step.done ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>
                                            {step.label}
                                        </p>
                                        {step.time && step.done && (
                                            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{formatDateTime(step.time)}</p>
                                        )}
                                    </div>
                                    {i < statusTimeline.length - 1 && (
                                        <div className={`h-0.5 flex-1 -mt-6 ${step.done ? "bg-success-500" : "bg-[var(--border-color)]"}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Service & Vehicle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader title="Service Details" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Wrench size={14} className="text-[var(--text-tertiary)]" />
                                    <span className="text-sm text-[var(--text-primary)]">{booking.service.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-[var(--text-tertiary)]" />
                                    <span className="text-sm text-[var(--text-secondary)]">{formatDateTime(booking.scheduledAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-[var(--text-tertiary)]" />
                                    <span className="text-sm text-[var(--text-secondary)]">{booking.location.address}</span>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <CardHeader title="Vehicle Info" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Car size={14} className="text-[var(--text-tertiary)]" />
                                    <span className="text-sm text-[var(--text-primary)]">
                                        {booking.vehicleInfo.make} {booking.vehicleInfo.model} ({booking.vehicleInfo.year})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-[var(--bg-tertiary)] px-2 py-1 rounded font-mono text-[var(--text-primary)]">
                                        {booking.vehicleInfo.plate}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Price Breakdown */}
                    <Card>
                        <CardHeader title="Price Breakdown" />
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">Service Fee</span>
                                <span className="font-medium text-[var(--text-primary)]">{formatCurrency(booking.amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">Platform Commission (15%)</span>
                                <span className="text-danger-500">-{formatCurrency(booking.platformFee)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-secondary)]">Mechanic Earning</span>
                                <span className="text-success-600 dark:text-success-400">{formatCurrency(booking.mechanicEarning)}</span>
                            </div>
                            <div className="border-t border-[var(--border-color)] pt-3 flex justify-between">
                                <span className="text-sm font-semibold text-[var(--text-primary)]">Total</span>
                                <span className="text-sm font-bold text-[var(--text-primary)]">{formatCurrency(booking.amount)}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Customer */}
                    <Card>
                        <CardHeader title="Customer" />
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                                {booking.customer.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--text-primary)]">{booking.customer.name}</p>
                                <p className="text-xs text-[var(--text-tertiary)]">{booking.customer.phone}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Mechanic */}
                    <Card>
                        <CardHeader title="Assigned Mechanic" />
                        {booking.mechanic ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center text-white text-sm font-bold">
                                    {booking.mechanic.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{booking.mechanic.name}</p>
                                    <p className="text-xs text-[var(--text-tertiary)]">{booking.mechanic.phone}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-[var(--text-tertiary)] mb-2">No mechanic assigned</p>
                                <Button variant="primary" size="sm">Assign Now</Button>
                            </div>
                        )}
                    </Card>

                    {/* Payment Status */}
                    <Card>
                        <CardHeader title="Payment" />
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[var(--text-secondary)]">Status</span>
                                <StatusBadge status={booking.paymentStatus} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[var(--text-secondary)]">Amount</span>
                                <span className="text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(booking.amount)}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

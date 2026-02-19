import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge, PageHeader } from "@/components/shared/StatusBadge";
import { mockMechanics } from "@/data/mockData";
import { formatCurrency, getInitials, formatDate } from "@/lib/utils";
import {
    ArrowLeft,
    Star,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Wallet,
    Wrench,
    CheckCircle,
    Shield,
} from "lucide-react";

export default function MechanicDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const mechanic = mockMechanics.find((m) => m.id === id);

    if (!mechanic) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-lg font-semibold text-[var(--text-primary)]">Mechanic Not Found</p>
                    <Button variant="primary" className="mt-4" onClick={() => router.push("/mechanics")}>
                        Back to Mechanics
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{mechanic.name} - Auto Services Admin</title>
            </Head>

            <Link
                href="/mechanics"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4"
            >
                <ArrowLeft size={16} />
                Back to Mechanics
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Profile */}
                <Card className="lg:col-span-1">
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                            {getInitials(mechanic.name)}
                        </div>
                        <h2 className="text-lg font-bold text-[var(--text-primary)]">{mechanic.name}</h2>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <StatusBadge status={mechanic.status} />
                            <StatusBadge status={mechanic.verificationStatus} />
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-2 text-sm">
                            <Mail size={14} className="text-[var(--text-tertiary)]" />
                            <span className="text-[var(--text-secondary)]">{mechanic.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-[var(--text-tertiary)]" />
                            <span className="text-[var(--text-secondary)]">{mechanic.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-[var(--text-tertiary)]" />
                            <span className="text-[var(--text-secondary)]">{mechanic.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm pt-2">
                            <Shield size={14} className="text-[var(--text-tertiary)]" />
                            <span className="text-xs text-[var(--text-tertiary)] uppercase font-medium">KTP/NIK:</span>
                            <span className="text-[var(--text-secondary)] font-mono">{mechanic.ktpNumber || "Not provided"}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex gap-2">
                        {mechanic.isActive ? (
                            <Button variant="danger" size="sm" className="flex-1">Suspend</Button>
                        ) : (
                            <Button variant="success" size="sm" className="flex-1">Activate</Button>
                        )}
                        <Button variant="secondary" size="sm" className="flex-1">Message</Button>
                    </div>
                </Card>

                {/* Stats & Details */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Card className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Star size={16} className="text-warning-400 fill-warning-400" />
                                <span className="text-xl font-bold text-[var(--text-primary)]">
                                    {mechanic.rating > 0 ? mechanic.rating.toFixed(1) : "N/A"}
                                </span>
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Rating</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-xl font-bold text-[var(--text-primary)]">{mechanic.totalJobs}</p>
                            <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Total Jobs</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-xl font-bold text-success-600 dark:text-success-400">{mechanic.completedJobs}</p>
                            <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Completed</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-xl font-bold text-[var(--text-primary)]">{formatCurrency(mechanic.walletBalance)}</p>
                            <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Wallet</p>
                        </Card>
                    </div>

                    {/* Financial Information */}
                    <Card>
                        <CardHeader title="Financial Information" subtitle="Bank account details for payouts" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Bank Name</p>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">{mechanic.bankName || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Account Number</p>
                                    <p className="text-sm font-semibold text-[var(--text-primary)] font-mono">{mechanic.bankAccountNumber || "-"}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Account Holder Name</p>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">{mechanic.bankAccountName || "-"}</p>
                                </div>
                                <div className="p-3 bg-success-50 dark:bg-success-900/10 rounded-lg border border-success-200 dark:border-success-900/20">
                                    <p className="text-[10px] uppercase tracking-wider text-success-600 dark:text-success-400 font-medium">Payout Status</p>
                                    <p className="text-xs text-success-700 dark:text-success-300">Verified & Ready</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Specializations */}
                    <Card>
                        <CardHeader title="Specializations" />
                        <div className="flex flex-wrap gap-2">
                            {mechanic.specializations.map((spec) => (
                                <Badge key={spec} variant="primary">
                                    <Wrench size={10} className="mr-1" />
                                    {spec}
                                </Badge>
                            ))}
                        </div>
                    </Card>

                    {/* Map placeholder */}
                    <Card>
                        <CardHeader title="Location" subtitle="Last known position" />
                        <div className="h-48 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <MapPin size={24} className="text-[var(--text-tertiary)] mx-auto mb-2" />
                                <p className="text-xs text-[var(--text-tertiary)]">
                                    {mechanic.location
                                        ? `${mechanic.location.lat.toFixed(4)}, ${mechanic.location.lng.toFixed(4)}`
                                        : "Location unavailable"}
                                </p>
                                <p className="text-[10px] text-[var(--text-tertiary)]">Map integration placeholder</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

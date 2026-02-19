import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockWorkshops } from "@/data/mockData";
import {
    ChevronLeft,
    Edit,
    Star,
    MapPin,
    Clock,
    Mail,
    Phone,
    Shield,
    ShieldAlert,
    Building2,
    Briefcase
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function WorkshopDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { addToast } = useToast();

    // Use mock data for now
    const workshop = mockWorkshops.find(w => w.id === id) || mockWorkshops[0];

    const toggleStatus = () => {
        addToast(
            workshop.isActive ? "warning" : "success",
            workshop.isActive ? "Workshop Deactivated" : "Workshop Activated",
            `${workshop.name} has been ${workshop.isActive ? "deactivated" : "activated"}`
        );
    };

    if (!workshop) return null;

    return (
        <>
            <Head><title>{workshop.name} - Workshop Detail</title></Head>

            <PageHeader
                title={workshop.name}
                subtitle="Workshop Profile & Management"
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => router.push(`/workshops/${id}/edit`)}>
                            <Edit size={16} /> Edit Profile
                        </Button>
                        <Button variant={workshop.isActive ? "danger" : "success"} onClick={toggleStatus}>
                            {workshop.isActive ? <ShieldAlert size={16} /> : <Shield size={16} />}
                            {workshop.isActive ? "Deactivate" : "Activate"}
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-warning-400 to-warning-600" />
                        <div className="px-6 pb-6">
                            <div className="relative -mt-12 mb-4">
                                <div className="w-24 h-24 rounded-2xl bg-[var(--card-bg)] p-1 shadow-xl">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-warning-500 to-warning-700 flex items-center justify-center text-white">
                                        <Building2 size={40} />
                                    </div>
                                </div>
                                <div className="absolute top-14 left-20">
                                    <Badge variant={workshop.isActive ? "success" : "danger"} dot className="bg-[var(--card-bg)] shadow-md">
                                        {workshop.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-[var(--text-primary)]">{workshop.name}</h2>
                            <div className="flex items-center gap-1 mt-1">
                                <Star size={16} className="text-warning-400 fill-warning-400" />
                                <span className="text-sm font-bold">{workshop.rating.toFixed(1)}</span>
                                <span className="text-xs text-[var(--text-tertiary)]">({workshop.totalJobs} jobs completed)</span>
                            </div>

                            <hr className="my-6 border-[var(--border-color)]" />

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-[var(--text-tertiary)] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{workshop.city}</p>
                                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{workshop.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-[var(--text-tertiary)] shrink-0" />
                                    <p className="text-sm text-[var(--text-secondary)]">{workshop.email}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-[var(--text-tertiary)] shrink-0" />
                                    <p className="text-sm text-[var(--text-secondary)]">+62 812 3456 7890</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-[var(--text-tertiary)] shrink-0" />
                                    <p className="text-sm text-[var(--text-secondary)]">{workshop.operatingHours}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="focus-within:ring-0">
                        <CardHeader title="Quick Actions" />
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-[var(--text-secondary)]" size="md">
                                <Mail size={16} /> Send Email Broadcast
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-[var(--text-secondary)]" size="md">
                                <Briefcase size={16} /> View All Jobs
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Statistics & Services */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4">
                            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Lifetime Jobs</p>
                            <p className="text-2xl font-black text-[var(--text-primary)]">{workshop.totalJobs}</p>
                        </div>
                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4">
                            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Avg. Rating</p>
                            <div className="flex items-end gap-1">
                                <p className="text-2xl font-black text-[var(--text-primary)]">{workshop.rating.toFixed(1)}</p>
                                <p className="text-xs text-warning-500 font-bold mb-1">Top Rated</p>
                            </div>
                        </div>
                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4">
                            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Commission Rate</p>
                            <p className="text-2xl font-black text-[var(--text-primary)]">15%</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader title="Provided Services" />
                        <div className="flex flex-wrap gap-2">
                            {workshop.services.map(service => (
                                <div
                                    key={service}
                                    className="px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-warning-500" />
                                    {service}
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <CardHeader title="Performance History" />
                        <div className="h-64 flex items-center justify-center text-[var(--text-tertiary)] bg-[var(--bg-tertiary)]/50 rounded-xl border border-dashed border-[var(--border-color)]">
                            Performance charts will be rendered here
                        </div>
                    </Card>

                    <div className="flex justify-start">
                        <Button variant="ghost" onClick={() => router.back()}>
                            <ChevronLeft size={16} /> Back to Workshops
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import {
    ChevronLeft,
    Save,
    MapPin,
    Building2,
    Clock,
    Wrench,
    Check,
    Shield
} from "lucide-react";
import { mockWorkshops } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function EditWorkshopPage() {
    const router = useRouter();
    const { id } = router.query;
    const { addToast } = useToast();

    // Find the workshop or use first mock item for preview
    const workshop = mockWorkshops.find(w => w.id === id) || mockWorkshops[0];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "+62 812 3456 7890",
        city: "",
        address: "",
        services: [] as string[],
        operatingHours: "",
        description: "Leading automotive repair center specializing in general maintenance and advanced diagnostics.",
    });

    useEffect(() => {
        if (workshop) {
            setFormData({
                ...formData,
                name: workshop.name,
                email: workshop.email,
                city: workshop.city.toLowerCase(),
                address: workshop.address,
                services: workshop.services,
                operatingHours: workshop.operatingHours,
            });
        }
    }, [id]);

    const handleSubmit = () => {
        addToast("success", "Workshop Updated", `${formData.name} profile has been successfully updated.`);
        router.back();
    };

    if (!workshop) return null;

    return (
        <>
            <Head><title>Edit {workshop.name} - Auto Services Admin</title></Head>

            <PageHeader
                title={`Edit ${workshop.name}`}
                subtitle="Modify workshop profile and settings"
                action={
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ChevronLeft size={16} /> Cancel
                    </Button>
                }
            />

            <div className="max-w-5xl mx-auto space-y-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader title="Workshop Information" />
                            <div className="space-y-4 p-1">
                                <Input
                                    label="Workshop Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    label="Bio / Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Business Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Input
                                        label="Business Phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <CardHeader title="Services & Capacity" />
                            <div className="space-y-4 p-1">
                                <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Configure Offered Services</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {["Oil Change", "Brake Service", "Engine Tune-up", "AC Service", "Tire Service", "General Inspection"].map(service => (
                                        <button
                                            key={service}
                                            onClick={() => {
                                                const current = formData.services;
                                                if (current.includes(service)) {
                                                    setFormData({ ...formData, services: current.filter(s => s !== service) });
                                                } else {
                                                    setFormData({ ...formData, services: [...current, service] });
                                                }
                                            }}
                                            className={cn(
                                                "p-3 rounded-xl border text-sm font-semibold transition-all text-center flex items-center justify-center gap-2",
                                                formData.services.includes(service)
                                                    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600 shadow-sm"
                                                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-primary-300"
                                            )}
                                        >
                                            {formData.services.includes(service) && <Check size={14} />}
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader title="Location & Hours" />
                            <div className="space-y-4 p-1">
                                <Select
                                    label="City"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    options={[
                                        { value: "jakarta", label: "Jakarta" },
                                        { value: "bandung", label: "Bandung" },
                                        { value: "surabaya", label: "Surabaya" },
                                    ]}
                                />
                                <Input
                                    label="Address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                                <Input
                                    label="Operating Hours"
                                    value={formData.operatingHours}
                                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                                />
                            </div>
                        </Card>

                        <div className="p-6 rounded-2xl bg-warning-50 dark:bg-warning-900/10 border border-warning-200 dark:border-warning-800">
                            <div className="flex gap-3 mb-4">
                                <Shield size={20} className="text-warning-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-warning-700 dark:text-warning-400">Security Check</p>
                                    <p className="text-[10px] text-warning-600 dark:text-warning-500 mt-0.5 uppercase tracking-wide">Verification Status</p>
                                </div>
                            </div>
                            <p className="text-xs text-warning-700 dark:text-warning-500 mb-4 leading-relaxed">
                                This workshop is currently <strong>Verified</strong>. Major changes to the name or primary address may trigger a re-verification process.
                            </p>
                            <Badge variant="success">Verified Merchant</Badge>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" onClick={() => router.back()}>
                        Cancel Changes
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSubmit}>
                        <Save size={18} /> Update Workshop Profile
                    </Button>
                </div>
            </div>
        </>
    );
}

import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import {
    ChevronLeft,
    ChevronRight,
    Building2,
    MapPin,
    Wrench,
    Clock,
    Check,
    Save
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, title: "Basic Info", icon: Building2 },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Services", icon: Wrench },
    { id: 4, title: "Hours & Contact", icon: Clock },
];

export default function AddWorkshopPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        services: ["Oil Change"],
        operatingHours: "09:00 - 17:00",
        description: "",
    });

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else router.back();
    };

    const handleSubmit = () => {
        addToast("success", "Workshop Created", `${formData.name} has been successfully added.`);
        router.push("/workshops");
    };

    return (
        <>
            <Head><title>Add Workshop - Auto Services Admin</title></Head>

            <PageHeader
                title="Add New Workshop"
                subtitle="Register a new workshop to the platform"
                action={
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ChevronLeft size={16} /> Back to List
                    </Button>
                }
            />

            <div className="max-w-4xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 px-4">
                    {STEPS.map((s, idx) => {
                        const Icon = s.icon;
                        const isCompleted = step > s.id;
                        const isActive = step === s.id;

                        return (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center gap-2 z-10">
                                    <div
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                            isCompleted ? "bg-success-500 border-success-500 text-white" :
                                                isActive ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30" :
                                                    "bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-tertiary)]"
                                        )}
                                    >
                                        {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider",
                                        isActive ? "text-primary-600" : "text-[var(--text-tertiary)]"
                                    )}>
                                        {s.title}
                                    </span>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className="flex-1 h-[2px] bg-[var(--border-color)] -mt-6 mx-2 relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-success-500 transition-transform duration-500"
                                            style={{ transform: `translateX(${step > s.id ? '0' : '-100'}%)` }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <Card className="min-h-[400px] flex flex-col">
                    <div className="flex-1 p-6">
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-lg font-bold text-[var(--text-primary)]">Basic Workshop Information</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        label="Workshop Name"
                                        placeholder="e.g. Paramount Auto Center"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <Input
                                        label="Description"
                                        placeholder="A brief description of the workshop..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="contact@workshop.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <Input
                                            label="Phone Number"
                                            placeholder="+62 812 3456 7890"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-lg font-bold text-[var(--text-primary)]">Location Details</h3>
                                <div className="space-y-4">
                                    <Select
                                        label="City"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        options={[
                                            { value: "", label: "Select City" },
                                            { value: "jakarta", label: "Jakarta" },
                                            { value: "bandung", label: "Bandung" },
                                            { value: "surabaya", label: "Surabaya" },
                                        ]}
                                    />
                                    <Input
                                        label="Full Address"
                                        placeholder="Street name, building number, etc."
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                    <div className="h-48 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)] flex items-center justify-center text-[var(--text-tertiary)] italic">
                                        Map selection placeholder
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-lg font-bold text-[var(--text-primary)]">Select Services</h3>
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
                                                "p-3 rounded-lg border text-sm font-medium transition-all text-center",
                                                formData.services.includes(service)
                                                    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600 shadow-sm"
                                                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-primary-300"
                                            )}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-lg font-bold text-[var(--text-primary)]">Operating Hours</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        label="Working Hours"
                                        placeholder="e.g. 08:00 - 18:00"
                                        value={formData.operatingHours}
                                        onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                                    />
                                    <div className="p-4 rounded-lg bg-info-50 dark:bg-info-900/10 border border-info-200 dark:border-info-800">
                                        <div className="flex gap-3">
                                            <Save size={20} className="text-info-600 mt-1" />
                                            <div>
                                                <p className="text-sm font-semibold text-info-700 dark:text-info-400">Review Information</p>
                                                <p className="text-xs text-info-600 dark:text-info-500 mt-1 line-clamp-2">
                                                    Ensure all details are correct. You'll be able to edit this information later from the workshop management dashboard.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-tertiary)]/30 flex justify-between">
                        <Button variant="secondary" onClick={handleBack}>
                            {step === 1 ? "Cancel" : <><ChevronLeft size={16} /> Previous</>}
                        </Button>
                        <Button variant="primary" onClick={step === 4 ? handleSubmit : handleNext}>
                            {step === 4 ? <><Check size={16} /> Complete Registration</> : <><ChevronRight size={16} /> Continue</>}
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}

import React, { useState } from "react";
import Head from "next/head";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockSettings } from "@/data/mockData";
import { useToast } from "@/components/ui/Toast";
import {
    Save,
    Settings as SettingsIcon,
    DollarSign,
    Percent,
    MapPin,
    Users,
    XCircle,
    Zap,
    Shield,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState(mockSettings);
    const { addToast } = useToast();

    const handleSave = () => {
        addToast("success", "Settings Saved", "System configuration has been updated successfully");
    };

    const updateSetting = (key: keyof typeof settings, value: number | boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <Head><title>Settings - Auto Services Admin</title></Head>

            <PageHeader
                title="System Settings"
                subtitle="Configure platform rules and parameters"
                action={
                    <Button variant="primary" onClick={handleSave}>
                        <Save size={16} />
                        Save Changes
                    </Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Pricing Rules */}
                <Card>
                    <CardHeader
                        title="Pricing Rules"
                        subtitle="Configure pricing and commission settings"
                    />
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                <Zap size={14} className="text-warning-500" />
                                Surge Multiplier
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.1"
                                    value={settings.surgeMultiplier}
                                    onChange={(e) => updateSetting("surgeMultiplier", parseFloat(e.target.value))}
                                    className="flex-1 h-2 bg-[var(--bg-tertiary)] rounded-full appearance-none cursor-pointer accent-primary-600"
                                />
                                <span className="text-sm font-bold text-[var(--text-primary)] w-12 text-right">
                                    {settings.surgeMultiplier.toFixed(1)}x
                                </span>
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Applied during high demand periods</p>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                <Percent size={14} className="text-success-500" />
                                Platform Commission
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="5"
                                    max="30"
                                    step="1"
                                    value={settings.commissionPercentage}
                                    onChange={(e) => updateSetting("commissionPercentage", parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-[var(--bg-tertiary)] rounded-full appearance-none cursor-pointer accent-primary-600"
                                />
                                <span className="text-sm font-bold text-[var(--text-primary)] w-12 text-right">
                                    {settings.commissionPercentage}%
                                </span>
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Commission taken from each booking</p>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                <XCircle size={14} className="text-danger-500" />
                                Cancellation Fee
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="25"
                                    step="1"
                                    value={settings.cancellationFeePercentage}
                                    onChange={(e) => updateSetting("cancellationFeePercentage", parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-[var(--bg-tertiary)] rounded-full appearance-none cursor-pointer accent-primary-600"
                                />
                                <span className="text-sm font-bold text-[var(--text-primary)] w-12 text-right">
                                    {settings.cancellationFeePercentage}%
                                </span>
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Fee charged for late cancellations</p>
                        </div>
                    </div>
                </Card>

                {/* Service Configuration */}
                <Card>
                    <CardHeader
                        title="Service Configuration"
                        subtitle="General service and radius settings"
                    />
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                <MapPin size={14} className="text-primary-500" />
                                Service Radius (km)
                            </label>
                            <Input
                                type="number"
                                value={settings.serviceRadiusKm}
                                onChange={(e) => updateSetting("serviceRadiusKm", parseInt(e.target.value) || 0)}
                            />
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Maximum search radius for nearby mechanics</p>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                <Users size={14} className="text-info-500" />
                                Max Active Bookings per Mechanic
                            </label>
                            <Input
                                type="number"
                                value={settings.maxActiveBookingsPerMechanic}
                                onChange={(e) => updateSetting("maxActiveBookingsPerMechanic", parseInt(e.target.value) || 1)}
                            />
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Maximum concurrent bookings per mechanic</p>
                        </div>
                    </div>
                </Card>

                {/* Feature Toggles */}
                <Card>
                    <CardHeader
                        title="Feature Toggles"
                        subtitle="Enable or disable system features"
                    />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex items-center gap-3">
                                <Zap size={16} className="text-primary-500" />
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">Auto-Assign Mechanic</p>
                                    <p className="text-[10px] text-[var(--text-tertiary)]">Automatically assign nearest available mechanic</p>
                                </div>
                            </div>
                            <button
                                onClick={() => updateSetting("autoAssignEnabled", !settings.autoAssignEnabled)}
                                className="text-primary-500"
                            >
                                {settings.autoAssignEnabled ? (
                                    <ToggleRight size={28} className="text-success-500" />
                                ) : (
                                    <ToggleLeft size={28} className="text-[var(--text-tertiary)]" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex items-center gap-3">
                                <Shield size={16} className="text-danger-500" />
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">Maintenance Mode</p>
                                    <p className="text-[10px] text-[var(--text-tertiary)]">Temporarily disable all bookings</p>
                                </div>
                            </div>
                            <button
                                onClick={() => updateSetting("maintenanceMode", !settings.maintenanceMode)}
                                className="text-primary-500"
                            >
                                {settings.maintenanceMode ? (
                                    <ToggleRight size={28} className="text-danger-500" />
                                ) : (
                                    <ToggleLeft size={28} className="text-[var(--text-tertiary)]" />
                                )}
                            </button>
                        </div>
                    </div>
                </Card>

                {/* System Info */}
                <Card>
                    <CardHeader title="System Information" />
                    <div className="space-y-3">
                        {[
                            { label: "Platform Version", value: "1.0.0" },
                            { label: "API Version", value: "v1" },
                            { label: "Environment", value: "Development" },
                            { label: "Last Deployment", value: "Feb 20, 2026 08:00 AM" },
                            { label: "Uptime", value: "99.97%" },
                            { label: "Database", value: "MySQL 8.0" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                                <span className="text-xs text-[var(--text-tertiary)]">{item.label}</span>
                                <span className="text-xs font-medium text-[var(--text-primary)]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </>
    );
}

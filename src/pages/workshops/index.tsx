import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader, StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockWorkshops } from "@/data/mockData";
import { Workshop } from "@/types";
import { Search, Star, MapPin, Clock, Building2, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function WorkshopsPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = mockWorkshops.filter((w) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            w.name.toLowerCase().includes(q) ||
            w.city.toLowerCase().includes(q) ||
            w.address.toLowerCase().includes(q) ||
            w.services.some(s => s.toLowerCase().includes(q))
        );
    });

    const isFiltered = searchQuery !== "";

    const toggleStatus = (id: string, currentStatus: boolean, name: string) => {
        addToast(
            currentStatus ? "warning" : "success",
            currentStatus ? "Workshop Deactivated" : "Workshop Activated",
            `${name} has been ${currentStatus ? "deactivated" : "activated"}`
        );
    };

    const columns: Column<Workshop>[] = [
        {
            key: "name",
            title: "Workshop",
            render: (w) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-warning-400 to-warning-600 flex items-center justify-center text-white shrink-0">
                        <Building2 size={16} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{w.name}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">{w.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "city",
            title: "Location",
            render: (w) => (
                <div>
                    <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-[var(--text-tertiary)]" />
                        <span className="text-sm text-[var(--text-secondary)]">{w.city}</span>
                    </div>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5 max-w-[200px] truncate">{w.address}</p>
                </div>
            ),
        },
        {
            key: "services",
            title: "Services",
            render: (w) => (
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {w.services.slice(0, 2).map((s) => (
                        <Badge key={s} variant="default" size="sm">{s}</Badge>
                    ))}
                    {w.services.length > 2 && (
                        <Badge variant="default" size="sm">+{w.services.length - 2}</Badge>
                    )}
                </div>
            ),
        },
        {
            key: "rating",
            title: "Rating",
            sortable: true,
            render: (w) => (
                <div className="flex items-center gap-1">
                    <Star size={14} className="text-warning-400 fill-warning-400" />
                    <span className="text-sm font-medium">{w.rating.toFixed(1)}</span>
                </div>
            ),
        },
        {
            key: "totalJobs",
            title: "Jobs",
            sortable: true,
            render: (w) => <span className="text-sm">{w.totalJobs}</span>,
        },
        {
            key: "operatingHours",
            title: "Hours",
            render: (w) => (
                <div className="flex items-center gap-1">
                    <Clock size={12} className="text-[var(--text-tertiary)]" />
                    <span className="text-xs text-[var(--text-secondary)]">{w.operatingHours}</span>
                </div>
            ),
        },
        {
            key: "isActive",
            title: "Status",
            render: (w) => (
                <Badge variant={w.isActive ? "success" : "danger"} dot>
                    {w.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "actions",
            title: "",
            render: (w) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/workshops/${w.id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant={w.isActive ? "danger" : "success"}
                        size="sm"
                        onClick={() => toggleStatus(w.id, w.isActive, w.name)}
                    >
                        {w.isActive ? "Deactivate" : "Activate"}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head><title>Workshops - Auto Services Admin</title></Head>

            <PageHeader
                title="Workshop Management"
                subtitle={`${mockWorkshops.length} registered workshops`}
                action={<Button variant="primary" onClick={() => router.push("/workshops/add")}><Building2 size={16} /> Add Workshop</Button>}
            />

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search workshops by name, city, service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-10 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
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
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setSearchQuery("")}
                        className="text-danger-500 hover:text-danger-600"
                    >
                        Reset
                    </Button>
                )}
            </div>

            <DataTable
                columns={columns}
                data={filtered}
                keyExtractor={(w) => w.id}
                pageSize={8}
                onRowClick={(w) => router.push(`/workshops/${w.id}`)}
            />
        </>
    );
}

import React, { useState } from "react";
import Head from "next/head";
import { PageHeader } from "@/components/shared/StatusBadge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Select } from "@/components/ui/Input";
import { mockServiceCategories } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
    Plus,
    Edit,
    Trash2,
    Clock,
    DollarSign,
    ChevronDown,
    ChevronRight,
    Layers,
    Wrench,
    Settings,
    Search as SearchIcon,
} from "lucide-react";

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(mockServiceCategories[0]?.id || null);
    const [showAddModal, setShowAddModal] = useState(false);
    const { addToast } = useToast();

    // Auto-expand categories if search query matches a child service
    React.useEffect(() => {
        if (searchQuery) {
            const match = mockServiceCategories.find(cat =>
                cat.services.some(s =>
                    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            if (match) setExpandedCategory(match.id);
        }
    }, [searchQuery]);

    const filteredCategories = mockServiceCategories.map(cat => ({
        ...cat,
        filteredServices: cat.services.filter(s =>
            searchQuery === "" ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.filteredServices.length > 0);

    const categoryIcons: Record<string, React.ReactNode> = {
        "cat-001": <Wrench size={16} />,
        "cat-002": <Settings size={16} />,
        "cat-003": <SearchIcon size={16} />,
    };

    return (
        <>
            <Head><title>Services - Auto Services Admin</title></Head>

            <PageHeader
                title="Service & Category Management"
                subtitle="Manage service categories and individual services"
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setShowAddModal(true)}>
                            <Plus size={16} /> Add Category
                        </Button>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>
                            <Plus size={16} /> Add Service
                        </Button>
                    </div>
                }
            />

            {/* Search Input */}
            <div className="relative mb-6">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={16} />
                <input
                    type="text"
                    placeholder="Search by service name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-[var(--text-primary)]">{mockServiceCategories.length}</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Categories</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-[var(--text-primary)]">
                        {mockServiceCategories.reduce((sum, c) => sum + c.services.length, 0)}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Services</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-success-600 dark:text-success-400">
                        {mockServiceCategories.reduce((sum, c) => sum + c.services.filter(s => s.isActive).length, 0)}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Active</p>
                </div>
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-[var(--text-primary)]">
                        {formatCurrency(
                            mockServiceCategories.reduce(
                                (sum, c) => sum + c.services.reduce((s, sv) => s + sv.basePrice, 0),
                                0
                            ) / mockServiceCategories.reduce((sum, c) => sum + c.services.length, 0)
                        )}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Avg Price</p>
                </div>
            </div>

            {/* Category Accordion */}
            <div className="space-y-3">
                {filteredCategories.map((category) => (
                    <Card key={category.id} padding="none">
                        <button
                            onClick={() =>
                                setExpandedCategory(
                                    expandedCategory === category.id ? null : category.id
                                )
                            }
                            className="w-full flex items-center justify-between p-4 hover:bg-[var(--hover-bg)] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                    {categoryIcons[category.id] || <Layers size={16} />}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">{category.name}</p>
                                    <p className="text-xs text-[var(--text-tertiary)]">
                                        {category.filteredServices.length} services · {category.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="primary">{category.filteredServices.length}</Badge>
                                {expandedCategory === category.id ? (
                                    <ChevronDown size={16} className="text-[var(--text-tertiary)]" />
                                ) : (
                                    <ChevronRight size={16} className="text-[var(--text-tertiary)]" />
                                )}
                            </div>
                        </button>

                        {expandedCategory === category.id && (
                            <div className="border-t border-[var(--border-color)]">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[var(--border-color)]">
                                                <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">Service</th>
                                                <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">Base Price</th>
                                                <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">Duration</th>
                                                <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">Price Type</th>
                                                <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">Status</th>
                                                <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border-color)]">
                                            {category.filteredServices.map((service) => (
                                                <tr key={service.id} className="hover:bg-[var(--hover-bg)] transition-colors">
                                                    <td className="px-4 py-3">
                                                        <p className="text-sm font-medium text-[var(--text-primary)]">{service.name}</p>
                                                        <p className="text-[10px] text-[var(--text-tertiary)]">{service.description}</p>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(service.basePrice)}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} className="text-[var(--text-tertiary)]" />
                                                            <span className="text-sm text-[var(--text-secondary)]">{service.duration} min</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant="default">{service.priceType}</Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={service.isActive ? "success" : "danger"} dot>
                                                            {service.isActive ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button variant="ghost" size="sm"><Edit size={14} /></Button>
                                                            <Button variant="ghost" size="sm"><Trash2 size={14} className="text-danger-500" /></Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {/* Add Service Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add New Service"
                size="md"
            >
                <div className="space-y-4">
                    <Input label="Service Name" placeholder="e.g. Engine Oil Change" />
                    <Select
                        label="Category"
                        options={[
                            { value: "", label: "Select category..." },
                            ...mockServiceCategories.map((c) => ({ value: c.id, label: c.name })),
                        ]}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Base Price (IDR)" type="number" placeholder="350000" />
                        <Input label="Duration (minutes)" type="number" placeholder="60" />
                    </div>
                    <Select
                        label="Price Type"
                        options={[
                            { value: "fixed", label: "Fixed" },
                            { value: "hourly", label: "Hourly" },
                            { value: "estimate", label: "Estimate" },
                        ]}
                    />
                    <Input label="Description" placeholder="Brief description of the service" />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setShowAddModal(false);
                                addToast("success", "Service Created", "New service has been added successfully");
                            }}
                        >
                            Create Service
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

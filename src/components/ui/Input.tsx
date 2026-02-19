import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({
    label,
    error,
    icon,
    className,
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        "w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500",
                        "transition-all duration-200",
                        icon && "pl-9",
                        error && "border-danger-500 focus:ring-danger-500/40",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-danger-500 mt-1">{error}</p>
            )}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    {label}
                </label>
            )}
            <select
                className={cn(
                    "w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500",
                    "transition-all duration-200 appearance-none cursor-pointer",
                    className
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

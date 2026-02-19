import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
        secondary:
            "bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)]",
        ghost:
            "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]",
        danger:
            "bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 shadow-sm",
        success:
            "bg-success-600 text-white hover:bg-success-700 active:bg-success-800 shadow-sm",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs font-medium rounded-lg",
        md: "px-4 py-2 text-sm font-medium rounded-lg",
        lg: "px-6 py-2.5 text-base font-medium rounded-xl",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
}

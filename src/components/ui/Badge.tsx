import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
    variant?: "primary" | "success" | "warning" | "danger" | "info" | "default";
    size?: "sm" | "md";
    children: React.ReactNode;
    className?: string;
    dot?: boolean;
    pulse?: boolean;
}

export function Badge({
    variant = "default",
    size = "sm",
    children,
    className,
    dot = false,
    pulse = false,
}: BadgeProps) {
    const variants = {
        primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400",
        success: "bg-success-100 text-success-700 dark:bg-success-700/20 dark:text-success-400",
        warning: "bg-warning-100 text-warning-700 dark:bg-warning-700/20 dark:text-warning-400",
        danger: "bg-danger-100 text-danger-700 dark:bg-danger-700/20 dark:text-danger-400",
        info: "bg-info-100 text-info-600 dark:bg-info-600/20 dark:text-info-400",
        default: "bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400",
    };

    const dotColors = {
        primary: "bg-primary-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        danger: "bg-danger-500",
        info: "bg-info-500",
        default: "bg-surface-400",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {dot && (
                <span className="relative flex h-2 w-2">
                    {pulse && (
                        <span
                            className={cn(
                                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                dotColors[variant]
                            )}
                        />
                    )}
                    <span
                        className={cn(
                            "relative inline-flex rounded-full h-2 w-2",
                            dotColors[variant]
                        )}
                    />
                </span>
            )}
            {children}
        </span>
    );
}

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: "none" | "sm" | "md" | "lg";
    hover?: boolean;
}

export function Card({
    children,
    className,
    padding = "md",
    hover = false,
}: CardProps) {
    const paddings = {
        none: "",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
    };

    return (
        <div
            className={cn(
                "bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-card",
                hover && "hover:shadow-card-hover hover:border-primary-500/20 transition-all duration-200 cursor-pointer",
                paddings[padding],
                className
            )}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between mb-4", className)}>
            <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    changeLabel?: string;
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    change,
    changeLabel,
    icon: Icon,
    iconColor = "text-primary-600",
    iconBgColor = "bg-primary-100 dark:bg-primary-900/30",
    className,
}: StatCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div
            className={cn(
                "bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 hover:shadow-card-hover hover:border-primary-500/20 transition-all duration-200",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-[var(--text-primary)] mt-2">
                        {value}
                    </p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            {isPositive && (
                                <TrendingUp size={14} className="text-success-500" />
                            )}
                            {isNegative && (
                                <TrendingDown size={14} className="text-danger-500" />
                            )}
                            {!isPositive && !isNegative && (
                                <Minus size={14} className="text-[var(--text-tertiary)]" />
                            )}
                            <span
                                className={cn(
                                    "text-xs font-medium",
                                    isPositive && "text-success-500",
                                    isNegative && "text-danger-500",
                                    !isPositive && !isNegative && "text-[var(--text-tertiary)]"
                                )}
                            >
                                {isPositive ? "+" : ""}
                                {change}%
                            </span>
                            {changeLabel && (
                                <span className="text-xs text-[var(--text-tertiary)]">
                                    {changeLabel}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className={cn("p-3 rounded-xl", iconBgColor)}>
                    <Icon size={22} className={iconColor} />
                </div>
            </div>
        </div>
    );
}

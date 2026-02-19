import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circle" | "rect";
    width?: string | number;
    height?: string | number;
}

export function Skeleton({
    className,
    variant = "rect",
    width,
    height,
}: SkeletonProps) {
    const variants = {
        text: "rounded h-4 w-full",
        circle: "rounded-full",
        rect: "rounded-lg",
    };

    return (
        <div
            className={cn("skeleton", variants[variant], className)}
            style={{ width, height }}
        />
    );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                    {Array.from({ length: cols }).map((_, j) => (
                        <Skeleton key={j} className="h-10 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
        </div>
    );
}

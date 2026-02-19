import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
}

interface ToastContextType {
    addToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = React.createContext<ToastContextType>({
    addToast: () => { },
});

export function useToast() {
    return React.useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
        (type: ToastType, title: string, message?: string) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, type, title, message }]);
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({
    toast,
    onClose,
}: {
    toast: Toast;
    onClose: (id: string) => void;
}) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(toast.id), 4000);
        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const icons = {
        success: <CheckCircle size={18} className="text-success-500" />,
        error: <AlertCircle size={18} className="text-danger-500" />,
        info: <Info size={18} className="text-info-500" />,
        warning: <AlertTriangle size={18} className="text-warning-500" />,
    };

    const borders = {
        success: "border-l-success-500",
        error: "border-l-danger-500",
        info: "border-l-info-500",
        warning: "border-l-warning-500",
    };

    return (
        <div
            className={cn(
                "bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-modal p-4 flex items-start gap-3 animate-slide-in border-l-4",
                borders[toast.type]
            )}
        >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                    {toast.title}
                </p>
                {toast.message && (
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {toast.message}
                    </p>
                )}
            </div>
            <button
                onClick={() => onClose(toast.id)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
                <X size={14} />
            </button>
        </div>
    );
}

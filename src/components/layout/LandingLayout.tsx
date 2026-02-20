import React, { ReactNode } from "react";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";

interface LandingLayoutProps {
    children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
            <LandingNav />
            <main>
                {children}
            </main>
            <LandingFooter />
        </div>
    );
};

export default LandingLayout;

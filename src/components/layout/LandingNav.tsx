import React from "react";
import Link from "next/link";

const LandingNav = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3">
            <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center justify-center gap-10 shadow-lg shadow-black/[0.03] border border-slate-200/60">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-primary-600/25 group-hover:shadow-primary-600/40 transition-shadow">
                        AS
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-slate-900 hidden sm:block">
                        Auto<span className="text-primary-600">Service</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
                    <Link href="/#services" className="hover:text-primary-600 transition-colors">Services</Link>
                    <Link href="/about" className="hover:text-primary-600 transition-colors">About</Link>
                    <Link href="/#testimonials" className="hover:text-primary-600 transition-colors">Reviews</Link>
                    <Link href="/#contact" className="hover:text-primary-600 transition-colors">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default LandingNav;

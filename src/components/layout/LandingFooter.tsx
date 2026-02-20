import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const LandingFooter = () => {
    return (
        <footer id="contact" className="py-16 px-6 bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-sm">
                                AS
                            </div>
                            <span className="font-extrabold text-xl text-white tracking-tight">
                                Auto<span className="text-primary-400">Service</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-5">
                            Premium car &amp; motorcycle care for enthusiasts and daily riders alike.
                            Serving Jakarta &amp; Greater Jabodetabek since 2026.
                        </p>
                        <div className="flex gap-3">
                            {["Instagram", "Facebook", "WhatsApp"].map((social) => (
                                <Link
                                    key={social}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 text-xs font-bold transition-all"
                                >
                                    {social[0]}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-sm font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-white transition-colors">Reviews</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-white mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                +62 21 555 0123
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                info@autoservice.id
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                                Jl. TB Simatupang No.40, Jakarta Selatan, 12430
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">&copy; 2026 AutoService. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;

import React, { ReactElement } from "react";
import Head from "next/head";
import LandingLayout from "@/components/layout/LandingLayout";
import { Gavel, CreditCard, Clock, AlertTriangle } from "lucide-react";

const TermsOfServicePage = () => {
    const terms = [
        {
            icon: Clock,
            title: "Service Bookings",
            content: "By booking a service, you agree to provide accurate information about yourself and your vehicle. We reserve the right to reschedule or cancel appointments due to unforeseen circumstances.",
        },
        {
            icon: CreditCard,
            title: "Payment Terms",
            content: "Payments are due upon completion of the service unless otherwise agreed. We accept various payment methods as indicated at our workshop.",
        },
        {
            icon: AlertTriangle,
            title: "Liability",
            content: "AutoService is responsible for damage caused by our negligence. However, we are not liable for pre-existing conditions or issues arising from unauthorized modifications to your vehicle.",
        },
        {
            icon: Gavel,
            title: "Governing Law",
            content: "These terms are governed by the laws of the Republic of Indonesia. Any disputes shall be resolved through amicable discussion or in the courts of South Jakarta.",
        },
    ];

    return (
        <>
            <Head>
                <title>Terms of Service — AutoService</title>
                <meta name="description" content="Terms of service for AutoService customers." />
            </Head>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">Terms of Service</h1>
                        <p className="text-lg text-slate-500">Last updated: February 20, 2026</p>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed mb-12 text-lg">
                            Please read these Terms of Service carefully before using our services. By accessing our website or booking a service, you agree to be bound by these terms.
                        </p>

                        <div className="grid gap-12">
                            {terms.map((term, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <term.icon className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">{term.title}</h2>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{term.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-500">
                            By continuing to use our platform, you acknowledge that you have read and understood these terms.
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

TermsOfServicePage.getLayout = (page: ReactElement) => {
    return <LandingLayout>{page}</LandingLayout>;
};

export default TermsOfServicePage;

import React, { ReactElement } from "react";
import Head from "next/head";
import LandingLayout from "@/components/layout/LandingLayout";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicyPage = () => {
    const sections = [
        {
            icon: Eye,
            title: "Information We Collect",
            content: "We collect information you provide directly to us, such as when you book a service, create an account, or contact us for support. This may include your name, email address, phone number, and vehicle details.",
        },
        {
            icon: Shield,
            title: "How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, to process your bookings, and to communicate with you about your vehicle's service history and upcoming appointments.",
        },
        {
            icon: Lock,
            title: "Data Security",
            content: "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.",
        },
        {
            icon: FileText,
            title: "Your Choices",
            content: "You may update, correct or delete account information at any time by logging into your account or contacting us directly.",
        },
    ];

    return (
        <>
            <Head>
                <title>Privacy Policy — AutoService</title>
                <meta name="description" content="Privacy policy for AutoService customers." />
            </Head>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">Privacy Policy</h1>
                        <p className="text-lg text-slate-500">Last updated: February 20, 2026</p>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed mb-12 text-lg">
                            At AutoService, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you use our website and services.
                        </p>

                        <div className="grid gap-12">
                            {sections.map((section, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                            <section.icon className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{section.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-500">
                            If you have any questions about this Privacy Policy, please contact us at info@autoservice.id.
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

PrivacyPolicyPage.getLayout = (page: ReactElement) => {
    return <LandingLayout>{page}</LandingLayout>;
};

export default PrivacyPolicyPage;

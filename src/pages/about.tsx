import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { Award, CheckCircle2, Users, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import LandingLayout from "@/components/layout/LandingLayout";

/* ─── Intersection Observer for scroll reveal (Redefined here for simplicity or can be shared) ─── */
function useReveal() {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref]);

    return { setRef, visible };
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const { setRef, visible } = useReveal();
    return (
        <div
            ref={setRef}
            className={cn(
                "transition-all duration-700 ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

const AboutPage = () => {
    return (
        <>
            <Head>
                <title>About Us — AutoService</title>
                <meta name="description" content="Learn about our mission to revolutionize auto care in Jakarta, starting in 2026." />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-gradient-to-br from-primary-100/40 to-indigo-100/20 rounded-full blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 text-primary-700 rounded-full text-xs font-bold mb-7">
                            <Award className="w-3.5 h-3.5" />
                            Our Story
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                            Dedicated to the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                                art of auto care.
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            Founded in 2026, AutoService began with a mission to bring modern, laboratory-grade precision to vehicle owners in Jakarta.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Precision",
                                desc: "We use laboratory-grade diagnostic tools and follow strict manufacturer protocols for every screw and sensor.",
                                icon: ShieldCheck,
                                color: "bg-blue-500",
                            },
                            {
                                title: "Transparency",
                                desc: "Every job comes with a detailed digital report, including photos and clear explanations of every part replaced.",
                                icon: Users,
                                color: "bg-emerald-500",
                            },
                            {
                                title: "Passion",
                                desc: "We don't just fix machines; we preserve the performance and legacy of your prized vehicles.",
                                icon: Star,
                                color: "bg-amber-500",
                            },
                        ].map((value, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6", value.color)}>
                                        <value.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{value.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{value.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Certifications */}
            <section className="py-24 px-6 border-t border-slate-100">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <Reveal>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Master-Certified Excellence.</h2>
                        </Reveal>
                        <Reveal delay={100}>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                                Our technicians aren't just mechanics — they are enthusiasts who have completed rigorous training programs at official manufacturer academies across Asia and Europe.
                            </p>
                        </Reveal>
                        <div className="space-y-4">
                            {[
                                "Authorized BMW Specialist",
                                "Certified Kawasaki Master Technicians",
                                "Advanced Hybrid & Electric Vehicle Certified",
                                "Master-Grade Paint & Detailing Experts"
                            ].map((cert, i) => (
                                <Reveal key={i} delay={200 + i * 50}>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        <span className="font-bold text-slate-700">{cert}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <Reveal delay={300}>
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-slate-200">
                                <img
                                    src="https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80&w=1200"
                                    alt="Our specialized workshop"
                                    className="w-full aspect-[4/5] object-cover"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
};

AboutPage.getLayout = (page: ReactElement) => {
    return <LandingLayout>{page}</LandingLayout>;
};

export default AboutPage;

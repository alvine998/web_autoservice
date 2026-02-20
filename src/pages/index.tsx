import React, { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Wrench,
  Settings,
  ShieldCheck,
  Clock,
  ArrowRight,
  Car,
  Bike,
  CheckCircle2,
  Users,
  MapPin,
  Phone,
  Star,
  Zap,
  Award,
  ChevronRight,
  Mail,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LandingLayout from "@/components/layout/LandingLayout";

/* ─── Animated counter hook ─── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, start: () => setStarted(true) };
}

/* ─── Intersection Observer for scroll reveal ─── */
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

/* ─── Section reveal wrapper ─── */
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

const services = [
  {
    icon: Settings,
    title: "Full Maintenance",
    desc: "Oil changes, filters, chain adjustments, and scheduled service intervals for cars & bikes.",
    color: "from-indigo-500 to-primary-600",
    bgLight: "bg-indigo-50",
  },
  {
    icon: Wrench,
    title: "Engine Repair",
    desc: "Expert diagnostics for car and motorcycle engines using cutting-edge tools.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Safety Inspection",
    desc: "Comprehensive brakes, suspension, tyre, and electrical health checks.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    desc: "ECU remapping, exhaust upgrades, and dyno-tested power gains for cars & motorcycles.",
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50",
  },
];

const testimonials = [
  {
    name: "Andi Pratama",
    role: "BMW M4 Owner",
    quote: "Best service experience in Jakarta. They treat my car like their own. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rizky Fadillah",
    role: "Kawasaki Ninja ZX-25R Owner",
    quote: "Finally found a shop that truly understands sportbikes. My Ninja runs smoother than ever!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Toyota Fortuner Owner",
    quote: "Quick turnaround and professional communication. My family car is always in safe hands.",
    rating: 5,
  },
];

const LandingPage = () => {
  const jobsCounter = useCounter(12000, 2500);
  const clientCounter = useCounter(500, 2000);
  const ratingCounter = useCounter(49, 1800); // 4.9

  // start counters when about section is visible
  const aboutReveal = useReveal();
  useEffect(() => {
    if (aboutReveal.visible) {
      jobsCounter.start();
      clientCounter.start();
      ratingCounter.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aboutReveal.visible]);

  return (
    <>
      <Head>
        <title>AutoService — Premium Car & Motorcycle Care in Jakarta</title>
        <meta
          name="description"
          content="Expert car and motorcycle repair & maintenance with certified technicians and genuine parts. Trusted by 500+ vehicle owners in Jakarta."
        />
      </Head>

      {/* ────────────── HERO ────────────── */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-gradient-to-br from-primary-100/60 to-indigo-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-gradient-to-tr from-emerald-100/40 to-teal-50/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 text-primary-700 rounded-full text-xs font-bold mb-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
                </span>
                #1 Rated Car & Motorcycle Care in Jakarta
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl sm:text-6xl lg:text-[3.5rem] xl:text-6xl font-black text-slate-900 leading-[1.08] mb-7 tracking-tight">
                Expert care for
                <br />
                your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                    car & bike.
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-primary-200/50 rounded -z-0" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg text-slate-500 mb-9 leading-relaxed max-w-lg">
                We combine state-of-the-art diagnostic equipment with master-certified
                technicians to keep your car or motorcycle performing at its absolute best.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/booking"
                  className="group flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/15 active:scale-[0.97] transition-all"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#services"
                  className="group flex items-center gap-2 px-6 py-4 text-slate-600 hover:text-primary-600 text-base font-semibold transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition-colors">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  See How We Work
                </Link>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">500+</div>
                  <div className="text-xs text-slate-400 font-semibold">Happy Clients</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">2026</div>
                  <div className="text-xs text-slate-400 font-semibold">Est. Year</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">4.9</div>
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Google
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right image */}
          <Reveal delay={200}>
            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-[6px] border-white ring-1 ring-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=1600"
                  alt="Professional mechanic servicing a car and motorcycle"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div className="text-white">
                    <div className="text-sm font-bold">Expert Diagnostics</div>
                    <div className="text-xs text-white/70">Cars & Motorcycles</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/20">
                    ✓ Certified
                  </div>
                </div>
              </div>

              {/* Floating card — bottom-left */}
              <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Service Complete</div>
                    <div className="text-xs text-slate-400">BMW 320i • Ready</div>
                  </div>
                </div>
              </div>

              {/* Floating card — top-right */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-20">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">4.9</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-1">500+ Reviews</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────── TRUSTED BRANDS BAR ────────────── */}
      <section className="py-10 px-6 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-8">Trusted by owners of</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-slate-300">
            {["BMW", "Mercedes-Benz", "Toyota", "Honda", "Kawasaki", "Yamaha"].map((brand) => (
              <span key={brand} className="text-lg sm:text-xl font-black tracking-tight text-slate-300 hover:text-slate-500 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── SERVICES ────────────── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold mb-5">
                <Zap className="w-3.5 h-3.5" />
                What We Offer
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Premium Services</h2>
              <p className="text-slate-500 max-w-lg mx-auto text-base">
                From routine oil changes to full engine rebuilds — for both cars and motorcycles — we deliver precision and care.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative p-7 bg-white rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 cursor-default h-full">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 bg-gradient-to-br", s.color, "group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500")}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold mb-2 text-slate-900">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-primary-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── WHY US / ABOUT ────────────── */}
      <section id="about" className="py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary-600/15 to-transparent blur-[100px] -z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-indigo-600/10 to-transparent blur-[80px] rounded-full -z-0" />

        <div ref={aboutReveal.setRef} className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-primary-400 rounded-full text-xs font-bold mb-7">
                <Award className="w-3.5 h-3.5" />
                Why Choose Us
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-4xl lg:text-5xl font-black mb-10 leading-[1.1] tracking-tight">
                The trusted choice for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
                  cars & motorcycles.
                </span>
              </h2>
            </Reveal>

            <div className="space-y-7">
              {[
                {
                  icon: CheckCircle2,
                  title: "Founded in 2026",
                  desc: "We started with a vision to revolutionize auto care in Jakarta with modern precision and tech.",
                  gradient: "from-emerald-400 to-teal-500",
                },
                {
                  icon: Users,
                  title: "Certified Master Technicians",
                  desc: "Our team is certified by top car and motorcycle manufacturers including BMW, Toyota, and Kawasaki.",
                  gradient: "from-blue-400 to-indigo-500",
                },
                {
                  icon: ShieldCheck,
                  title: "Genuine OEM Parts Only",
                  desc: "We never compromise — every replacement uses 100% original manufacturer parts.",
                  gradient: "from-amber-400 to-orange-500",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={200 + i * 100}>
                  <div className="flex gap-4 group">
                    <div className={cn("mt-0.5 w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg flex-shrink-0", item.gradient)}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right stats */}
          <Reveal delay={300}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-10">
                <div className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="text-4xl font-black text-primary-400 mb-1">{jobsCounter.count.toLocaleString()}+</div>
                  <div className="text-sm font-semibold text-slate-300">Jobs Completed</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="text-4xl font-black text-emerald-400 mb-1">98%</div>
                  <div className="text-sm font-semibold text-slate-300">Client Retention</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-600 to-indigo-600 p-7 rounded-3xl shadow-2xl shadow-primary-600/20">
                  <div className="text-4xl font-black text-white mb-1">{clientCounter.count}+</div>
                  <div className="text-sm font-semibold text-primary-100">Happy Clients</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="text-4xl font-black text-amber-400 mb-1 flex items-baseline gap-1">
                    {(ratingCounter.count / 10).toFixed(1)}
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400 relative -top-0.5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-300">Google Rating</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────── TESTIMONIALS ────────────── */}
      <section id="testimonials" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 text-amber-700 rounded-full text-xs font-bold mb-5">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                Client Reviews
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">What Our Clients Say</h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Real feedback from car and motorcycle owners who trust us with their rides.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {t.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── CTA BANNER ────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-12 sm:p-16 overflow-hidden text-center">
              {/* Decorative glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary-600/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-indigo-500/15 blur-[80px] rounded-full" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight">
                  Ready to experience <br className="hidden sm:block" />
                  premium auto care?
                </h2>
                <p className="text-slate-400 max-w-md mx-auto mb-9">
                  Book your appointment today and let our certified technicians
                  take care of the rest.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/booking"
                    className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white rounded-2xl text-base font-bold shadow-xl shadow-primary-600/20 hover:shadow-2xl active:scale-[0.97] transition-all"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#contact"
                    className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl text-base font-semibold border border-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

LandingPage.getLayout = (page: ReactElement) => {
  return <LandingLayout>{page}</LandingLayout>;
};

export default LandingPage;

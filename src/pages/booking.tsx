import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { ArrowRight, Calendar, Car, Bike, User, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import LandingLayout from "@/components/layout/LandingLayout";

const BookingPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        vehicleType: "car",
        vehicleModel: "",
        serviceType: "maintenance",
        date: "",
        serviceLocation: "workshop",
        address: "",
        selectedWorkshop: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 4) {
            handleNext();
            return;
        }

        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8 animate-bounce">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-4">Booking Received!</h1>
                    <p className="text-slate-500 mb-10 leading-relaxed">
                        Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our service consultant will contact you within 30 minutes to confirm your appointment.
                    </p>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Book an Appointment — AutoService</title>
                <meta name="description" content="Schedule your premium car or motorcycle service in just a few clicks." />
            </Head>

            <section className="pt-32 pb-24 px-6 min-h-screen bg-slate-50/50">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Schedule Your Service</h1>
                        <p className="text-slate-500">Quick, easy, and professional care for your vehicle.</p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                        {/* Progress Bar */}
                        <div className="flex h-2 bg-slate-100">
                            <div
                                className="bg-primary-600 transition-all duration-500 ease-out"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 sm:p-14">
                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                                placeholder="+62"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!formData.name || !formData.phone}
                                        className="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <Car className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Vehicle Details</h2>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, vehicleType: "car" })}
                                            className={cn(
                                                "flex-1 p-6 rounded-2xl border-2 transition-all text-center group",
                                                formData.vehicleType === "car"
                                                    ? "border-primary-600 bg-primary-50/50 text-primary-900"
                                                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                                            )}
                                        >
                                            <Car className={cn("w-8 h-8 mx-auto mb-3", formData.vehicleType === "car" ? "text-primary-600" : "text-slate-400")} />
                                            <span className="font-bold block">Car</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, vehicleType: "motorcycle" })}
                                            className={cn(
                                                "flex-1 p-6 rounded-2xl border-2 transition-all text-center group",
                                                formData.vehicleType === "motorcycle"
                                                    ? "border-primary-600 bg-primary-50/50 text-primary-900"
                                                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                                            )}
                                        >
                                            <Bike className={cn("w-8 h-8 mx-auto mb-3", formData.vehicleType === "motorcycle" ? "text-primary-600" : "text-slate-400")} />
                                            <span className="font-bold block">Motorcycle</span>
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Make & Model</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.vehicleModel}
                                            onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="e.g. BMW 320i or Kawasaki Ninja"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={handleBack} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700 transition-colors">Back</button>
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={!formData.vehicleModel}
                                            className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                                        >
                                            Continue <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Service & Schedule</h2>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Service Type</label>
                                            <select
                                                value={formData.serviceType}
                                                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none"
                                            >
                                                <option value="maintenance">Routine Maintenance</option>
                                                <option value="engine">Engine Diagnostics</option>
                                                <option value="safety">Safety Inspection</option>
                                                <option value="tuning">Performance Tuning</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Preferred Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={handleBack} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700">Back</button>
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={!formData.date}
                                            className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                                        >
                                            Continue <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Service Location</h2>
                                    </div>

                                    <div className="flex gap-4 p-1.5 bg-slate-100 rounded-2xl">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, serviceLocation: "workshop" })}
                                            className={cn(
                                                "flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all",
                                                formData.serviceLocation === "workshop"
                                                    ? "bg-white text-slate-900 shadow-sm"
                                                    : "text-slate-500 hover:text-slate-700"
                                            )}
                                        >
                                            Come to Workshop
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, serviceLocation: "home" })}
                                            className={cn(
                                                "flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all",
                                                formData.serviceLocation === "home"
                                                    ? "bg-white text-slate-900 shadow-sm"
                                                    : "text-slate-500 hover:text-slate-700"
                                            )}
                                        >
                                            Home Service
                                        </button>
                                    </div>

                                    {formData.serviceLocation === "workshop" ? (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Select Workshop</label>
                                            <select
                                                required
                                                value={formData.selectedWorkshop}
                                                onChange={(e) => setFormData({ ...formData, selectedWorkshop: e.target.value })}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none"
                                            >
                                                <option value="">Select a location</option>
                                                <option value="jakarta-south">AutoService South Jakarta (Radio Dalam)</option>
                                                <option value="jakarta-west">AutoService West Jakarta (Puri Indah)</option>
                                                <option value="tangerang">AutoService Tangerang (BSD City)</option>
                                                <option value="bekasi">AutoService Bekasi (Summarecon)</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Service Address</label>
                                            <textarea
                                                required
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none min-h-[120px]"
                                                placeholder="Enter your full address for home service..."
                                            />
                                        </div>
                                    )}

                                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                                        <div className="flex items-center gap-3 mb-4 opacity-70">
                                            <ShieldCheck className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Service Guarantee</span>
                                        </div>
                                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                            {formData.serviceLocation === "workshop"
                                                ? "By booking, you receive priority queuing and a 12-month warranty on any original parts installed."
                                                : "Home service includes a professional mechanic visit with basic diagnostic tools. Service fee may apply."}
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={handleBack} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700">Back</button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || (formData.serviceLocation === "workshop" ? !formData.selectedWorkshop : !formData.address)}
                                            className="flex-[2] py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

BookingPage.getLayout = (page: ReactElement) => {
    return <LandingLayout>{page}</LandingLayout>;
};

export default BookingPage;

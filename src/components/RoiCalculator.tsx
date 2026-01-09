import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Clock, Users, Sparkles, ArrowDown } from "lucide-react";

const RoiCalculator = () => {
    const [teamSize, setTeamSize] = useState(3);
    const [hoursPerWeek, setHoursPerWeek] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(45);
    const [animatedYearly, setAnimatedYearly] = useState(0);

    // Logic: Calculate cost of manual work vs automation
    const weeklyCost = teamSize * hoursPerWeek * hourlyRate;
    const yearlyCost = weeklyCost * 52;

    // Simple number animation effect for the result
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedYearly(yearlyCost);
        }, 50);
        return () => clearTimeout(timer);
    }, [yearlyCost]);

    const handleScrollToBooking = () => {
        const element = document.getElementById("book-call");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    {/* Left Column: Inputs */}
                    <div className="flex-1 w-full space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                                <Calculator className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">
                                    ROI Estimator
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold">
                                The Cost of <span className="text-primary">Manual Work</span>
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                See how much revenue you&apos;re leaving on the table by not
                                automating repetitive workflows.
                            </p>
                        </div>

                        {/* Sliders Container */}
                        <div className="space-y-8 p-6 sm:p-8 rounded-3xl border border-border bg-card/50">
                            {/* Team Size Input */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 font-medium">
                                        <Users className="w-4 h-4 text-primary" /> Team Size
                                    </label>
                                    <span className="font-bold text-primary">{teamSize} people</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(Number(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Hours Input */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 font-medium">
                                        <Clock className="w-4 h-4 text-primary" /> Weekly Hours / Person
                                    </label>
                                    <span className="font-bold text-primary">{hoursPerWeek} hrs</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Time spent on repetitive data entry, emails, or admin.
                                </p>
                                <input
                                    type="range"
                                    min="1"
                                    max="40"
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Rate Input */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 font-medium">
                                        <DollarSign className="w-4 h-4 text-primary" /> Avg. Hourly Rate
                                    </label>
                                    <span className="font-bold text-primary">${hourlyRate}/hr</span>
                                </div>
                                <input
                                    type="range"
                                    min="15"
                                    max="200"
                                    step="5"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 w-full"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-primary/10 border border-primary/20 p-8 sm:p-12 text-center shadow-2xl shadow-primary/5">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />

                            <h3 className="text-xl font-medium text-muted-foreground mb-2">
                                Potential Yearly Savings
                            </h3>
                            <div className="text-5xl sm:text-6xl font-bold text-foreground mb-2 tracking-tight">
                                ${animatedYearly.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground mb-8">
                                *Based on reclaiming {hoursPerWeek * teamSize * 52} hours annually
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={handleScrollToBooking}
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:bg-primary/90 glow"
                                >
                                    Reclaim This Revenue
                                    <ArrowDown className="w-5 h-5" />
                                </button>
                                <p className="text-xs text-muted-foreground">
                                    Let&apos;s build a system to automate this.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RoiCalculator;
import { ShieldCheck, Lightbulb, History } from "lucide-react";

const BookingTrust = () => {
    const benefits = [
        {
            icon: ShieldCheck,
            title: "Zero Commitment",
            description: "No hard sales pitch. Just a friendly discovery chat to see if we're a fit."
        },
        {
            icon: Lightbulb,
            title: "Free Strategy",
            description: "You'll walk away with at least one actionable insight, guaranteed."
        },
        {
            icon: History,
            title: "Proven Expertise",
            description: "Specialized in high-performance web & AI systems that drive revenue."
        }
    ];

    return (
        <section className="py-12 bg-card/30 border-y border-border/40">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <benefit.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                                <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookingTrust;
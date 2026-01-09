import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface IFormInput {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot
}

const Contact = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "work.17akki.akash@gmail.com",
      href: "mailto:work.17akki.akash@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/yadav-akash17",
      href: "https://www.linkedin.com/in/yadav-akash17",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/akashyadav",
      href: "https://github.com/akashyadav",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong on the server.");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error(error);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-card/30">
      {/* 
        Add the Toaster component to your root layout file (e.g., src/app/layout.tsx)
        for notifications to be displayed globally.
        <Toaster position="top-center" />
      */}
      <Toaster position="top-center" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a project in mind? Let's discuss how I can help you build something great.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Left side: Social Links */}
          <div className="flex flex-col gap-6">
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-card rounded-xl border border-border card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="font-medium text-foreground">{link.label}</p>
                <p className="text-sm text-muted-foreground truncate">{link.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Right side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 bg-card rounded-2xl border border-border"
          >
            <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required." })}
                  className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${errors.name ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'}`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  {...register("company")}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${errors.email ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", {
                    required: "Message is required.",
                    minLength: { value: 10, message: "Message must be at least 10 characters long." }
                  })}
                  className={`w-full p-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${errors.message ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'}`}
                  placeholder="Your message..."
                ></textarea>
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-card transition-colors disabled:bg-primary/70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

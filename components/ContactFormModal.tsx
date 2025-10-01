"use client";

import { useEffect, useState } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const services = [
    "Video Production",
    "Conversion Rate Optimization",
    "E-commerce Growth Strategies",
    "Lead Generation & Sales Funnels",
    "Branding & Creative Design",
    "Social Media Management",
    "Website Design & Optimization",
    "SEO & Content Marketing",
    "Paid Advertising (Meta, Google)",
  ];

  const deadlines = ["ASAP", "4 Weeks", "8 Weeks", "12 Weeks", "More Than 12 Weeks"];
  const budgets = [
    "LKR50000",
    "LKR50000 - LKR100000",
    "LKR100000 - LKR150000",
    "LKR150000 - LKR200000",
    "No Preferred Choice",
  ];

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Toggle service selection
  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedServices.length || !deadline || !budget) {
      alert("Please select services, deadline, and budget.");
      return;
    }

    setFormStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
          deadline,
          budget,
        }),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", company: "", email: "", phone: "", message: "" });
        setSelectedServices([]);
        setDeadline("");
        setBudget("");
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-3xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Let’s Talk About Your <span className="text-red-600">Next Big Move</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Have questions or ready to start your project? Get in touch with us today!
        </p>

        {/* ✅ Contact Form */}
        {formStatus === "success" ? (
          <div className="text-center py-10">
            <p className="text-green-600 font-semibold text-lg">✅ Your inquiry has been sent!</p>
            <p className="text-gray-500 mt-2">We’ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Services */}
            <div>
              <label className="block font-medium mb-2">You can select multiple services *</label>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      selectedServices.includes(service)
                        ? "bg-red-600 text-white border-red-600"
                        : "border-red-500 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium mb-2">Do You Have A Deadline? *</label>
              <div className="flex flex-wrap gap-2">
                {deadlines.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setDeadline(time)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      deadline === time
                        ? "bg-red-600 text-white border-red-600"
                        : "border-red-500 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block font-medium mb-2">Have You Allocated A Budget? *</label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      budget === b
                        ? "bg-red-600 text-white border-red-600"
                        : "border-red-500 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Company */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">What’s Your Name? *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Your Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-sm mb-1">Tell us more about your project</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm mb-2">Send us your brief</label>
              <input
                type="file"
                className="block w-full border border-dashed border-gray-400 p-3 rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum file size: 100 MB</p>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full py-3 rounded-full bg-gradient-to-r from-red-600 to-indigo-700 text-white font-medium hover:opacity-90 disabled:opacity-50"
              >
                {formStatus === "loading" ? "Sending..." : "Send Us"}
              </button>
              {formStatus === "error" && (
                <p className="text-red-600 text-center mt-2">❌ Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

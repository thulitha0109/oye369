"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Building2,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactLocation {
  id: string
  name: string
  type: "head" | "branch"
  address: string
  city: string
  phone: string
  email: string
  hours: string
  mapUrl: string
  coordinates?: {
    lat: number
    lng: number
  }
}

const locations: ContactLocation[] = [
  {
    id: "1",
    name: "Head Office",
    type: "head",
    address: "123 Main Street, Colombo 03",
    city: "Colombo",
    phone: "+94 11 234 5678",
    email: "info@oye369.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    mapUrl: "https://www.google.com/maps/embed?...",
    coordinates: { lat: 6.9271, lng: 79.8612 }
  },
  {
    id: "2",
    name: "Kurunegala Branch",
    type: "branch",
    address: "456 Kandy Road, Kurunegala",
    city: "Kurunegala",
    phone: "+94 37 222 3344",
    email: "kurunegala@oye369.com",
    hours: "Mon-Sat: 8:30 AM - 5:30 PM",
    mapUrl: "https://www.google.com/maps/embed?...",
    coordinates: { lat: 7.4871, lng: 80.3663 }
  }
]

type FormStatus = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [activeLocation, setActiveLocation] = React.useState<ContactLocation>(locations[0])
  const [formStatus, setFormStatus] = React.useState<FormStatus>("idle")
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setFormStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
        setTimeout(() => setFormStatus("idle"), 3000)
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="container w-full py-16 px-4 sm:px-6 lg:px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </p>
        </motion.div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Send us a Message</h3>
              
              {formStatus === "success" ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 sm:py-12"
                >
                  <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-green-500 mb-4" />
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground text-center text-sm sm:text-base">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full py-3 sm:py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {formStatus === "error" && (
                    <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>

            {/* ✅ Quick Contact Cards - now only 2 and below form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
            >
              <div className="bg-card rounded-xl p-5 sm:p-6 border text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  Mon-Fri from 9am to 6pm
                </p>
                <a href="tel:+94112345678" className="text-primary font-medium hover:underline text-sm sm:text-base">
                  +94 11 234 5678
                </a>
              </div>

              <div className="bg-card rounded-xl p-5 sm:p-6 border text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  We'll respond within 24 hours
                </p>
                <a href="mailto:info@company.lk" className="text-primary font-medium hover:underline text-sm sm:text-base">
                  info@company.lk
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Map + Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
              <iframe
                src={activeLocation.mapUrl}
                width="100%"
                height="300"
                className="w-full h-[350px] lg:h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Location selector + details */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(location)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 text-sm sm:text-base",
                    activeLocation.id === location.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {location.type === "head" && <Building2 className="w-4 h-4" />}
                  {location.name}
                </button>
              ))}
            </div>

            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold">{activeLocation.name}</h3>
              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{activeLocation.address}</p>
                    <p className="text-muted-foreground">{activeLocation.city}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${activeLocation.phone}`} className="text-muted-foreground hover:text-primary">
                      {activeLocation.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${activeLocation.email}`} className="text-muted-foreground hover:text-primary">
                      {activeLocation.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">{activeLocation.hours}</p>
                  </div>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.coordinates?.lat},${activeLocation.coordinates?.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-center font-medium"
              >
                Get Directions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

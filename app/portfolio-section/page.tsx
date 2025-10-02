"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import { ArrowRight, ExternalLink, Calendar, Camera, Code, Sprout, X } from "lucide-react"
import { cn } from "@/lib/utils"
import RetroGrid from "@/components/magicui/retro-grid"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

interface Project {
  id: string
  title: string
  category: "events" | "photography" | "software" | "agro"
  description: string
  images: string[]
  beforeImage?: string
  afterImage?: string
  highlights: string[]
  tags: string[]
  link?: string
  date: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Corporate Summit 2024",
    category: "events",
    description:
      "A high-profile corporate event bringing together 500+ industry leaders for networking and innovation discussions.",
    images: ["/events/summit-1.jpg", "/events/summit-2.jpg", "/events/summit-3.jpg"],
    beforeImage: "/events/summit-before.jpg",
    afterImage: "/events/summit-after.jpg",
    highlights: ["500+ attendees", "5 keynote speakers", "Zero incidents", "98% satisfaction rate"],
    tags: ["Corporate", "Networking", "Large Scale"],
    date: "March 2024",
  },
  {
    id: "2",
    title: "Wedding Story Collection",
    category: "photography",
    description: "Capturing the magic of love through cinematic photography and videography.",
    images: ["/photo/wedding-1.jpg", "/photo/wedding-2.jpg", "/photo/wedding-3.jpg"],
    beforeImage: "/photo/raw-shot.jpg",
    afterImage: "/photo/edited-shot.jpg",
    highlights: ["12 hour coverage", "500+ edited photos", "4K video", "Same-day highlights"],
    tags: ["Wedding", "Cinematic", "Documentary Style"],
    link: "https://example.com",
    date: "February 2024",
  },
  {
    id: "3",
    title: "AgriTech Dashboard",
    category: "software",
    description: "Real-time farm monitoring system with AI-powered crop health analysis and yield prediction.",
    images: ["/software/agritech-1.jpg", "/software/agritech-2.jpg"],
    beforeImage: "/software/old-system.jpg",
    afterImage: "/software/new-dashboard.jpg",
    highlights: ["40% efficiency increase", "Real-time monitoring", "AI predictions", "Mobile-first design"],
    tags: ["React", "Node.js", "AI/ML", "IoT"],
    link: "https://example.com",
    date: "January 2024",
  },
  {
    id: "4",
    title: "Organic Farm Transformation",
    category: "agro",
    description:
      "Converting 50 acres to sustainable organic farming with modern irrigation and crop rotation systems.",
    images: ["/agro/farm-1.jpg", "/agro/farm-2.jpg", "/agro/farm-3.jpg"],
    beforeImage: "/agro/before-farm.jpg",
    afterImage: "/agro/after-farm.jpg",
    highlights: ["50 acres transformed", "100% organic", "Water savings 60%", "Yield increase 35%"],
    tags: ["Organic", "Sustainable", "Innovation"],
    date: "December 2023",
  },
]

const categories = [
  { id: "all", label: "All Projects", icon: null },
  { id: "events", label: "Events", icon: Calendar },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "software", label: "Software", icon: Code },
  { id: "agro", label: "Agro", icon: Sprout },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all")
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [showBeforeAfter, setShowBeforeAfter] = React.useState(false)

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="portfolio w-full px-4">
      <RetroGrid className="z-0 absolute inset-0 max-w-[1000]" />
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse range of projects across multiple industries, showcasing innovation and excellence
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                  View Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Gallery */}
              <div className="relative h-96">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  effect="fade"
                  className="h-full"
                >
                  {selectedProject.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        src={img}
                        alt={`${selectedProject.title} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-muted-foreground">{selectedProject.date}</p>
                  </div>
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Visit Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-lg mb-8">{selectedProject.description}</p>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-secondary text-center">
                        <p className="font-semibold">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before/After Section */}
                {selectedProject.beforeImage && selectedProject.afterImage && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Transformation</h3>
                      <button
                        onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
                      >
                        {showBeforeAfter ? "Hide" : "Show"} Before/After
                      </button>
                    </div>

                    {showBeforeAfter && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-2 gap-4 overflow-hidden"
                      >
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          <Image
                            src={selectedProject.beforeImage}
                            alt="Before"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-sm font-medium">
                            Before
                          </div>
                        </div>
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          <Image
                            src={selectedProject.afterImage}
                            alt="After"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            After
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technologies & Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-lg bg-secondary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
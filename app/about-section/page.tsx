import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react"

export function AboutUsRight() {
  const teamMembers = [
    {
      name: "Naveen Dissanayaka",
      position: "CEO & Founder",
      image: "/team/ceo.jpeg",
      bio: "Visionary leader with 10+ years experience in digital innovation and business strategy.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "john@oyeproductions.com"
      }
    },
    {
      name: "Jane Smith",
      position: "Secretary",
      image: "/team/sec.jpeg",
      bio: "Expert in operations management and corporate governance with exceptional organizational skills.",
      social: {
        linkedin: "#",
        instagram: "#",
        email: "jane@oyeproductions.com"
      }
    },
    {
      name: "Mike Johnson",
      position: "Chief Marketing Officer",
      image: "/team/cmo.jpeg",
      bio: "Creative marketing strategist specializing in digital campaigns and brand development.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        email: "mike@oyeproductions.com"
      }
    }
  ]

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />
      case 'twitter': return <Twitter className="w-5 h-5" />
      case 'github': return <Github className="w-5 h-5" />
      case 'instagram': return <Instagram className="w-5 h-5" />
      case 'email': return <Mail className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className=" w-auto flex flex-col items-start justify-start ">
      {/* Title & Company Description */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Us</span>
          </h2>
      <p className="text-muted-foreground max-w-2xl pb-4 lg:pb-8 leading-normal sm:text-lg sm:leading-7">
        A diverse holding company 🚀
      </p>
      <p className="max-w-[700px] text-lg sm:text-xl text-accent-foreground text-left z-10">
        OYE PRODUCTIONS 369 (PVT) LTD is a diverse holding company involved in 
        Social Media Marketing, Software Development, Event Organising & 
        Coordinating, Event Marketing, Graphic Design (3D Animation, VFX), 
        Photography & Videography, and Agriculture.
      </p>

      {/* Team Profiles */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-[900px]">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative overflow-hidden cursor-pointer"
          >
            {/* Profile Image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-muted max-h-[320px]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay that appears on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-4 text-center">
                {/* Bio */}
                <p className="text-white text-sm mb-4 leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <Link
                      key={platform}
                      href={url}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110 text-white"
                    >
                      {getSocialIcon(platform)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Name & Position Below Image */}
            <div className="mt-3 space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {member.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

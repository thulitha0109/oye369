import { Facebook } from "lucide-react"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Oye Productions 369",
  logo: "/logo01.png",
  description:
    "A diverse holding company leading the way in media, technology, events, and agriculture.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About Us",
      href: "#about",
    },
    {
      title: "Services",
      href: "#services"
    },

    {
      title: "Portfolio",
      href: "#portfolio"
    },
    {
      title: "Partners",
      href: "#partners"
    },
    {
      title: "Contact",
      href: "#contact"
    },
  ],
  links: {
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },
}

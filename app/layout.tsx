import "@/styles/globals.css"
import { Metadata, Viewport }from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import RetroGrid from "@/components/magicui/retro-grid"
import TextReveal from "@/components/magicui/text-reveal"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { AnimatedListDemo } from "@/components/magicui/animated-list";
import GlobePage from "./globe-section/page"
import NostalgiaPage from "./nostalgia-section/page"
import GameCard from "./game-card/page"
import { SiteFooter } from "@/components/site-footer"

import ModernSlider from "@/components/Slider";
import  AboutUsRight  from "./about-section/page"
import Partners  from "./companies/page"
import  Portfolio  from "./portfolio-section/page"
import  Contact  from "./contact-section/page"  

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

// ✅ Move themeColor here
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "max-h-auto bg-background font-sans antialiased",
            fontSans.variable
          )}
        suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex flex-col items-center w-full">
                {children}

                {/* Modern Slider */}
                <div className="w-full">
                  <ModernSlider />
                </div>

                {/* About + Animated List */}
                <div className="container mt-24 w-full flex flex-col lg:flex-row justify-center items-center gap-8 px-8 ">
                  <AboutUsRight />
                  <AnimatedListDemo />
                </div>

                <div id="services" className="mt-24 w-full flex flex-col lg:flex-row justify-center items-center gap-8">
                  <GameCard />
                  {/* Add more cards if needed */}
                </div>

                <div className="container mx-auto mt-24 flex flex-col lg:flex-row justify-between items-start gap-8 px-8">
                  {/* Partners Section */}
                  <div className=" w-full lg:w-1/2 flex justify-center">
                    <Partners />
                  </div>

                  {/* Globe Section */}
                  <div id="partners" className="w-full lg:w-1/2 flex justify-end">
                    <GlobePage />
                  </div>
                </div>

                <div id="portfolio" className="container mx-auto mt-24 flex flex-col lg:flex-row justify-between items-start gap-8 px-4">
                  {/* portfolio Section */}
                  <Portfolio />
                </div>

                <div id="contact" className="container mx-auto mt-24 flex flex-col lg:flex-row justify-between items-start gap-8 px-4">
                  <Contact />
                </div>

              </div>

            </div>
      
            {/* </div> */}
            <SiteFooter className="  border-t bottom-0 inset-x-0 sm:static" />
            
            {/* <div className="fixed bottom-0 inset-x-0 sm:static bg-neutral-900/3"> */}
             
            {/* </div> */}
            <TailwindIndicator />
            
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}


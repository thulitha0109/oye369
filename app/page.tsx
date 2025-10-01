"use client";
import Link from "next/link"
import { useState } from "react";
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import ContactFormModal from "@/components/ContactFormModal";
import { SubCompanies } from "@/components/SubCompanies"
import LinearGradient from "@/components/magicui/linear-gradient"
import RetroGrid from "@/components/magicui/retro-grid"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import  GradientText  from "@/components/magicui/text-gradient"

export default function IndexPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 mx-auto justify-center mt-20">

      <div className="flex max-w-[980px] flex-col items-center gap-6 retro-theme relative">
        <div
          className={cn(
            "group rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 z-10",
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black text-neutral-600 z-10">
            <span>{" 🧩 "}Introducing Oye 369</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>

        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel font-bold leading-tight tracking-wider text-accent-foreground text-center z-10">
          Designing the Hype. {" "}
          <p className=" decoration-gray-400 decoration-4 underline-offset-2 mt-0 lg:mt-3 md:mt-0 sm:mt-0 z-10">
            <GradientText>Creating the Experience.</GradientText>
          </p>
        </h1>

        <p className="max-w-[700px] text-lg sm:text-xl text-accent-foreground text-center z-10">
          A diverse holding company leading the way in media, technology, events, and
agriculture.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className={buttonVariants({ variant: "call" })}
        >
           Get a quote
        </button>

        {isOpen && (
          <ContactFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </section>
    
  );
}

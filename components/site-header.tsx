"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons"; 
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src={siteConfig.logo} alt={siteConfig.name} className="h-8 w-8" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <MainNav items={siteConfig.mainNav} />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-3">
          {Object.entries(siteConfig.links).map(([key, href]) =>
            href ? (
              <Link key={key} href={href} target="_blank" rel="noreferrer">
                <div className={buttonVariants({ size: "icon", variant: "ghost" })}>
                  {Icons[key as keyof typeof Icons] && 
                    React.createElement(Icons[key as keyof typeof Icons], { className: "h-5 w-5" })}
                  <span className="sr-only">{key}</span>
                </div>
              </Link>
            ) : null
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Icons.close className="h-6 w-6" /> : <Icons.menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-background z-40 overflow-auto transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          <div className="flex items-center space-x-4 mt-4">
            {Object.entries(siteConfig.links).map(([key, href]) =>
              href ? (
                <Link key={key} href={href} target="_blank" rel="noreferrer">
                  {Icons[key as keyof typeof Icons] && 
                    React.createElement(Icons[key as keyof typeof Icons], { className: "h-6 w-6" })}
                </Link>
              ) : null
            )}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

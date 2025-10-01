import * as React from "react";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items?: NavItem[];
  className?: string; // added optional className
}

export function MainNav({ items, className }: MainNavProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-4 md:gap-6", className)}>
      {items?.length ? (
        <nav className="flex flex-col md:flex-row gap-2 md:gap-6">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                    item.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}

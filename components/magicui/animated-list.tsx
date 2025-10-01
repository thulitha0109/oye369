"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Notification, NotificationItem } from "@/components/magicui/Notification";

interface AnimatedListProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedList = React.memo(
  ({ children, delay = 1000, className }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      if (paused) return;
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);
      return () => clearInterval(interval);
    }, [childrenArray.length, delay, paused]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <div
        className={`flex flex-col items-center gap-4 ${className}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export const AnimatedListItem = ({ children }: { children: React.ReactNode }) => {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
};

// Example usage:
export const AnimatedListDemo = () => {
  const notifications: NotificationItem[] = [
    { name: "Oye space", description: "Event Marketing (flyers, ads, content, paid ads)", time: "15m ago", icon: "/logo/6.png", color: "#00C9A7" },
    { name: "Green Heaven Agro", description: "Dehiattakandiya (Agro & Export)", time: "10m ago", icon: "/logo/2.png", color: "#FFB800" },
    { name: "OYE Photography", description: "Event Photography & Videography", time: "5m ago", icon: "/logo/3.png", color: "#FF3D71" },
    { name: "Rignscape", description: "Wedding Photography & Videography", time: "2m ago", icon: "/logo/4.png", color: "#1E86FF" },
    { name: "Growers Win Plantation", description: "Kurunegala (Agro & Export)", time: "2m ago", icon: "/logo/5.png", color: "#1E86FF" },
    { name: "OYE Developers", description: "Software, Web Development, CCTV Solutions", time: "2m ago", icon: "/logo/7.png", color: "#1E86FF" },
    { name: "Better Days Ahead", description: "In-house Events (e.g., Plein Air)", time: "2m ago", icon: "/logo/8.png", color: "#1E86FF" },
  ];

  const repeatedNotifications = Array.from({ length: 10 }, () => notifications).flat();

  return (
    <div className="relative flex max-h-[400px] min-h-[600px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg border bg-background p-4 shadow-lg">
      <AnimatedList>
        {repeatedNotifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
};

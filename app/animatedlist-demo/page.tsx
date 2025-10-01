"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface NotificationItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

export const Notification = ({ name, description, icon, color, time }: NotificationItem) => {
  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hovered && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  }, [hovered]);

  const tooltip = hovered && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-[2em] fixed z-[9999] w-max max-w-xs -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-xl pointer-events-none"
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
        }}
      >
        {description}
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <figure
        ref={elementRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:scale-[103%] bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl">
            <img src={icon} alt={name} className="h-12 w-12" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex items-center text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg">{name}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-gray-500">{time}</span>
            </figcaption>
          </div>
        </div>
      </figure>
      
      {/* Portal tooltip to document body */}
      {typeof document !== 'undefined' && tooltip && createPortal(tooltip, document.body)}
    </>
  );
};
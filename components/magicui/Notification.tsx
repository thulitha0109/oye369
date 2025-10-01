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
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, width: 0 });
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hovered && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left,
        y: rect.bottom + 8, // 8px gap below the notification
        width: rect.width
      });
    }
  }, [hovered]);

  const tooltip = hovered && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed z-[9999] rounded-lg bg-gray-800 px-3 py-2 text-xs text-white shadow-xl pointer-events-none"
      style={{
        left: tooltipPosition.x + 16, // 16px margin from left
        top: tooltipPosition.y,
        width: tooltipPosition.width - 32, // 32px total margin (16px each side)
        maxWidth: '368px' // max-w-[400px] - 32px margin
      }}
    >
      {description}
      {/* Tooltip arrow pointing up */}
      <div className="absolute -top-1 left-6 w-2 h-2 bg-gray-800 rotate-45"></div>
    </motion.div>
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
            <img src={icon} alt={name} className="h-8 w-8" />
          </div>
          <div className="flex flex-col overflow-hidden flex-1">
            <figcaption className="flex items-center text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg truncate">{name}</span>
              <span className="mx-1 flex-shrink-0">·</span>
              <span className="text-xs text-gray-500 flex-shrink-0">{time}</span>
            </figcaption>
          </div>
        </div>
      </figure>
      
      {/* Portal tooltip to document body */}
      {typeof document !== 'undefined' && hovered && tooltip && createPortal(
        <AnimatePresence mode="wait">
          {tooltip}
        </AnimatePresence>, 
        document.body
      )}
    </>
  );
};
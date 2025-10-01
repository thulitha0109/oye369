'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Play, Camera } from 'lucide-react';

const ModernMediaSlider = () => {
  const mediaItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop', alt: 'Creative Team Collaboration', title: 'Digital Innovation', subtitle: 'Transforming Ideas into Reality' },
    { type: 'video', src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', poster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop', alt: 'Modern Technology', title: 'Tech Solutions', subtitle: 'Cutting-edge Development' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', alt: 'Data Analytics Dashboard', title: 'Analytics & Insights', subtitle: 'Data-Driven Decisions' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop', alt: 'Team Meeting', title: 'Strategic Planning', subtitle: 'Building Future Success' },
    { type: 'video', src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', poster: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop', alt: 'Coding Development', title: 'Web Development', subtitle: 'Modern Web Solutions' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop', alt: 'Mobile App Design', title: 'Mobile Innovation', subtitle: 'Apps That Inspire' },
  ];

  const allItems = [...mediaItems, ...mediaItems]; // duplicate for infinite loop
  const x = useMotionValue(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const speed = 0.5;

  // Update slideWidth dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (!sliderRef.current) return;
      const containerWidth = sliderRef.current.offsetWidth;
      let slidesVisible = 4;
      if (window.innerWidth < 1024) slidesVisible = 2;
      if (window.innerWidth < 640) slidesVisible = 1;
      setSlideWidth(containerWidth / slidesVisible);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Automatic sliding
  useAnimationFrame(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    if ((slider as any)._isDragging) return;

    let newX = x.get() - speed;
    const maxTranslate = -mediaItems.length * slideWidth;

    if (newX <= maxTranslate) newX = 0;
    x.set(newX);
  });

  return (
    <div className="container mx-auto py-12">
      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          ref={sliderRef}
          className="flex gap-4 cursor-grab"
          drag="x"
          dragConstraints={{ left: -Infinity, right: 0 }}
          style={{ x }}
          onDragStart={() => ((sliderRef.current as any)._isDragging = true)}
          onDragEnd={() => ((sliderRef.current as any)._isDragging = false)}
          whileTap={{ cursor: 'grabbing' }}
        >
          {allItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0"
              style={{ width: slideWidth }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-80 rounded-xl overflow-hidden group">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.subtitle}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    {item.type === 'video' ? (
                      <div className="bg-red-500/80 rounded-full p-2">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="bg-blue-500/80 rounded-full p-2">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <div id="about" className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-center">
        {[
          { value: '200+', label: 'Projects Completed' },
          { value: '05+', label: 'Years Experience' },
          { value: '120K+', label: 'Happy Clients' },
          { value: '20+', label: 'Team Members' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#221F1F] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#E50914] to-[#B81D24] bg-clip-text text-transparent mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernMediaSlider;

import {
  MagicCard,
  MagicContainer,
} from "@/components/magicui/magic-card";

export default function GameCard() {
  return (
    <div className="container flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Services</span>
          </h2>
      <p className="text-muted-foreground max-w-2xl pb-4 lg:pb-8 leading-normal sm:text-lg sm:leading-7">
        A diverse holding company 🚀
      </p>

      <MagicContainer className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {/* 1. Social Media Marketing */}
        <MagicCard className="flex flex-col items-center justify-center p-16 shadow-xl rounded-2xl">
          <svg
            className="h-12 w-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 5.92v12.16c0 1.66-1.34 3-3 3H5c-1.66 
              0-3-1.34-3-3V5.92c0-1.66 1.34-3 3-3h14c1.66 
              0 3 1.34 3 3zM8 12l5 3V9l-5 3z" />
          </svg>
          <p className="mt-4 text-xl font-semibold">Social Media Marketing</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Drive engagement and growth through smart, creative social campaigns.
          </p>
        </MagicCard>

        {/* 2. Software Development */}
        <MagicCard className="flex flex-col items-center justify-center p-16 shadow-xl rounded-2xl">
          <svg
            className="h-12 w-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15 8H9l3-6zm0 20l-3-6h6l-3 6zM2 
              12l6-3v6l-6-3zm20 0l-6 3V9l6 3z" />
          </svg>
          <p className="mt-4 text-xl font-semibold">Software Development</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Build scalable, secure, and modern software tailored to your needs.
          </p>
        </MagicCard>

        {/* 3. Event Marketing */}
        <MagicCard className="flex flex-col items-center justify-center p-16 shadow-xl rounded-2xl">
          <svg
            className="h-12 w-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v2H4V4zm0 6h16v10H4V10zm4 
              2v6l6-3-6-3z" />
          </svg>
          <p className="mt-4 text-xl font-semibold">Event Marketing</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Promote your events effectively and maximize audience engagement.
          </p>
        </MagicCard>

        {/* 4. Event Organising & Coordinating */}
        <MagicCard className="flex flex-col items-center justify-center p-16 shadow-xl rounded-2xl">
          <svg
            className="h-12 w-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 
              2v14c0 1.1.9 2 2 2h14c1.1 
              0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 
              12h10v2H7v-2z" />
          </svg>
          <p className="mt-4 text-xl font-semibold">
            Event Organising & Coordinating
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Plan and manage seamless events from start to finish with ease.
          </p>
        </MagicCard>

        {/* 5. Graphic Design */}
        <MagicCard className="flex flex-col items-center justify-center p-16 shadow-xl rounded-2xl">
          <svg
            className="h-12 w-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l4 4-4 4-4-4 
              4-4zm0 12l4 4-4 4-4-4 
              4-4zm10-6l-4 4-4-4 4-4 
              4 4zm-20 0l4 4 4-4-4-4-4 
              4z" />
          </svg>
          <p className="mt-4 text-xl font-semibold">
            Graphic Design (3D, VFX, Animation)
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Bring ideas to life with cutting-edge 3D, VFX, and motion graphics.
          </p>
        </MagicCard>

        {/* 6. Photography & Videography */}
        <MagicCard className="flex flex-col items-center justify-center p-16 shadow-xl rounded-2xl">
          <svg
            className="h-12 w-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 7a5 5 0 100 10 5 
              5 0 000-10zm9-2h-3.17l-1.84-2H7.99L6.15 
              5H3c-1.1 0-2 .9-2 
              2v12c0 1.1.9 2 2 
              2h18c1.1 0 2-.9 
              2-2V7c0-1.1-.9-2-2-2z" />
          </svg>
          <p className="mt-4 text-xl font-semibold">
            Photography & Videography
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Capture and create stunning visuals that tell powerful stories.
          </p>
        </MagicCard>
      </MagicContainer>
    </div>
  );
}

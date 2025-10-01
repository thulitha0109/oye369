import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const GradientText = ({ 
  children, 
  as: Component = "span",
  className = ""
}: GradientTextProps) => {
  return (
    <>
      <Component
        className={`tracking-tight text-transparent bg-clip-text ${className}`}
        style={{
          backgroundImage:
            "linear-gradient(270deg, #221f1f, #f5f5f1, #b81d24, #e50914)",
          backgroundSize: "300% 300%",
          animation: "gradient-text 6s ease infinite",
        }}
      >
        {children}
      </Component>
      <style jsx>{`
        @keyframes gradient-text {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default GradientText;
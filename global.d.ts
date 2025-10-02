// global.d.ts
import "framer-motion";

declare module "framer-motion" {
  export const AnimatePresence: React.ComponentType<{
    children?: React.ReactNode;
    mode?: "sync" | "popLayout" | "wait";
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
}

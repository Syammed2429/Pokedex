export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const imageVariants = {
  loading: {
    scale: 0.9,
    opacity: 0,
    filter: "blur(2px)",
  },
  loaded: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

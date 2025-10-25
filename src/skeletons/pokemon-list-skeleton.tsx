import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

export const PokemonListSkeleton = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <motion.div
        className='container mx-auto px-4 py-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Header */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className='text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4'
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Pokédex
          </motion.h1>
          <motion.p
            className='text-lg text-muted-foreground mb-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover and explore the world of Pokémon
          </motion.p>

          {/* Animated Progress Bar */}
          <motion.div
            className='max-w-md mx-auto mb-8'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <div className='relative'>
              <motion.div
                className='h-2 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full overflow-hidden'
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className='h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full'
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.div
                className='absolute -top-1 left-0 w-4 h-4 bg-amber-400 rounded-full shadow-lg'
                animate={{
                  left: ["0%", "calc(100% - 16px)", "0%"],
                  boxShadow: [
                    "0 0 0 0 rgba(251, 191, 36, 0.4)",
                    "0 0 0 10px rgba(251, 191, 36, 0)",
                    "0 0 0 0 rgba(251, 191, 36, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <motion.p
              className='text-sm text-center mt-3 text-muted-foreground'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading Pokémon data...
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Animated Loading Cards */}
        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
          initial={{ opacity: 1 }} // Start visible for debugging
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 1 }} // Start fully visible
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className='p-4 bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-800 dark:to-slate-900 border-2 border-amber-200/50 dark:border-slate-700/50 hover:border-amber-400/30 transition-all duration-300'>
                <motion.div
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.98, 1, 0.98],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                >
                  <Skeleton className='w-full aspect-square mb-3 rounded-lg bg-gradient-to-br from-amber-200/20 to-orange-200/20' />
                  <Skeleton className='h-4 w-1/3 mx-auto mb-2 bg-gradient-to-r from-amber-200 to-orange-300 dark:from-slate-600 dark:to-slate-700' />
                  <Skeleton className='h-5 w-2/3 mx-auto bg-gradient-to-r from-orange-300 to-red-400 dark:from-slate-700 dark:to-slate-600' />
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

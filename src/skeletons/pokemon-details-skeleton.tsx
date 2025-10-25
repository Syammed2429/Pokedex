import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export const PokemonDetailsSkeleton = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <motion.div
        className='container mx-auto px-4 py-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Link to='/'>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Button variant='ghost' className='mb-6 hover:text-black'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to List
            </Button>
          </motion.div>
        </Link>

        {/* Loading Content */}
        <motion.div
          className='flex flex-col items-center justify-center min-h-[60vh] gap-8'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Animated Loader */}
          <motion.div
            className='relative'
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className='w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 flex items-center justify-center'>
              <Spinner className='w-10 h-10 text-white animate-spin' />
            </div>
            <motion.div
              className='absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 opacity-20'
              animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h2
              className='text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3'
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
              Discovering Pokémon...
            </motion.h2>

            {/* Animated Progress Bar */}
            <div className='relative w-80 mx-auto'>
              <div className='h-2 bg-amber-100 dark:bg-slate-700 rounded-full overflow-hidden'>
                <motion.div
                  className='h-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400'
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <motion.div
                className='absolute -top-1 w-4 h-4 bg-amber-400 rounded-full shadow-lg'
                animate={{
                  left: ["0%", "calc(100% - 16px)", "0%"],
                  boxShadow: [
                    "0 0 0 0 rgba(251, 191, 36, 0.4)",
                    "0 0 0 8px rgba(251, 191, 36, 0)",
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
              className='text-muted-foreground mt-4'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Pokémon details...
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

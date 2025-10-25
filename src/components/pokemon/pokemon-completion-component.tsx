import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const PokemonCompletionComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className='text-center py-16'
    >
      <motion.div
        className='relative mx-auto w-24 h-24 mb-6'
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className='w-full h-full rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-4xl'>
          🎉
        </div>
        <motion.div
          className='absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 opacity-20'
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      <motion.h3
        className='text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Congratulations, Trainer!
      </motion.h3>

      <motion.p
        className='text-lg text-muted-foreground mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        You've caught them all!
      </motion.p>

      <motion.div
        className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full font-medium'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className='w-5 h-5' />
        You've caught all Pokémon
        <Sparkles className='w-5 h-5' />
      </motion.div>
    </motion.div>
  );
};

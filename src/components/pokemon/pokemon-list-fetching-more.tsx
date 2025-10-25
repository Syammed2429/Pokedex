import { motion } from "motion/react";

import { Spinner } from "../ui/spinner";

interface PokemonListFetchingMoreProps {
  totalPokemon: number;
}

export const PokemonListFetchingMore = ({
  totalPokemon,
}: PokemonListFetchingMoreProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className='flex flex-col items-center py-12'
    >
      <motion.div
        className='relative mb-6'
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className='w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 flex items-center justify-center'>
          <Spinner className='w-8 h-8 text-white animate-spin' />
        </div>
        <motion.div
          className='absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-20'
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className='text-center max-w-md'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2'>
          Catching more Pokémon...
        </h3>

        {/* Animated Progress Bar */}
        <div className='relative w-64 mx-auto mb-3'>
          <div className='h-2 bg-amber-200 dark:bg-slate-700 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.div
            className='absolute -top-1 w-4 h-4 bg-amber-400 rounded-full shadow-lg'
            animate={{
              left: ["0%", "calc(100% - 16px)"],
              boxShadow: [
                "0 0 0 0 rgba(250, 204, 21, 0.4)",
                "0 0 0 8px rgba(250, 204, 21, 0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.p
          className='text-sm text-muted-foreground'
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {totalPokemon} Pokémon loaded so far
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

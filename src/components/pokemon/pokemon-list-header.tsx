import { motion } from "motion/react";
export const PokemonListHeader = () => {
  return (
    <motion.header
      className='mb-12 text-center'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className='text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4'
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
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
        transition={{ delay: 0.3 }}
      >
        Discover and explore the world of Pokémon
      </motion.p>
    </motion.header>
  );
};

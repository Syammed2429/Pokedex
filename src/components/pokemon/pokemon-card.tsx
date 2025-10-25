import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { useState } from "react";

import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import type { PokemonListResult } from "@/types/pokemon-types";
import {
  cardVariants,
  imageVariants,
} from "@/motion-variants/pokemon-card-variant";

interface PokemonCardProps {
  pokemon: PokemonListResult;
  index: number;
  imageData?: { imageUrl: string; id: number };
}

export const PokemonCard = ({
  pokemon,
  imageData,
  index,
}: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

  const capitalizedName = pokemon.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <motion.div
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      whileHover='hover'
      whileTap='tap'
      transition={{
        delay: Math.min(index * 0.02, 0.3),
      }}
      className='group'
    >
      <Link to={`/pokemon/${pokemon.name}`}>
        <Card className='relative overflow-hidden border-2 border-gray-200/50 dark:border-slate-700/50 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-slate-800 dark:via-slate-800/50 dark:to-slate-900 hover:shadow-xl hover:shadow-primary/10'>
          <CardContent className='p-4'>
            {/* Animated Background Glow */}
            <motion.div
              className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100'
              transition={{ duration: 0.3 }}
            />

            {/* Image Container */}
            <div className='aspect-square relative mb-3 rounded-lg overflow-hidden '>
              {/* Loading Skeleton with Pulse */}
              {(!imageData?.imageUrl || !imageLoaded) && !imageError && (
                <motion.div
                  className='absolute inset-0'
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.95, 1, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Skeleton className='w-full h-full rounded-lg bg-gradient-to-br from-amber-200/20 via-orange-200/20 to-red-200/20' />
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent'
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              )}

              {/* Fallback Image */}
              {(!imageData?.imageUrl || imageError) && (
                <motion.div
                  className='w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-800 relative z-10'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='text-center'>
                    <div className='text-4xl mb-2 text-amber-500'>🎯</div>
                    <p className='text-xs text-amber-600 dark:text-amber-400 font-medium'>
                      {capitalizedName}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Pokemon Image */}
              {imageData?.imageUrl && !imageError && (
                <motion.img
                  src={imageData.imageUrl}
                  alt={capitalizedName}
                  className='w-full h-full object-contain relative z-10'
                  variants={imageVariants}
                  initial='loading'
                  animate={imageLoaded ? "loaded" : "loading"}
                  whileHover='hover'
                  transition={{
                    delay: Math.min(index * 0.02 + 0.1, 0.4),
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading='lazy'
                />
              )}
            </div>

            {/* Content Section */}
            <motion.div
              className='text-center relative z-10'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: Math.min(index * 0.02 + 0.15, 0.3),
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              {/* Pokemon ID */}
              <motion.p
                className='text-xs font-mono text-muted-foreground mb-1 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full inline-block'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                #{(imageData?.id || pokemonId)?.toString().padStart(3, "0")}
              </motion.p>

              {/* Pokemon Name */}
              <motion.h3
                className='font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {capitalizedName}
              </motion.h3>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

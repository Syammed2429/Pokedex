import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useState } from "react";

import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import type { PokemonListResult } from "@/types/pokemon-types";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: PokemonListResult;
  index: number;
  imageData?: { imageUrl: string; id: number };
}

export const PokemonCard = ({ pokemon, imageData }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

  const capitalizedName = pokemon.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/pokemon/${pokemon.name}`}>
        <Card className='group hover:shadow-lg transition-all duration-300  overflow-hidden border-2 hover:border-primary/50'>
          <CardContent className='p-4'>
            <div className='aspect-square relative mb-2 flex items-center justify-center  rounded-lg'>
              {(!imageData?.imageUrl || !imageLoaded) && (
                <Skeleton className='absolute inset-0 rounded-lg bg-yellow-200/10' />
              )}
              {imageData?.imageUrl && (
                <img
                  src={imageData.imageUrl}
                  alt={capitalizedName}
                  className={cn(
                    "w-full opacity-0 h-full object-contain group-hover:scale-110 group-hover:rotate-y-12 group-hover:rotate-x-6 transition-all duration-300 transform-gpu perspective-1000",
                    {
                      "opacity-100": imageLoaded,
                    }
                  )}
                  style={{
                    transform: imageLoaded ? "translateZ(0)" : undefined,
                  }}
                  loading='lazy'
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>
            <div className='text-center'>
              <p className='text-sm text-muted-foreground mb-1'>
                #{(imageData?.id || pokemonId)?.toString().padStart(3, "0")}
              </p>
              <p className='font-semibold group-hover:text-primary transition-colors'>
                {capitalizedName}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

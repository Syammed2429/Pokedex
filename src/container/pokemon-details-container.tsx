import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { pokemonApi } from "@/services/pokemon-service";
import { ArrowLeft, Zap, Heart, Shield, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { PokemonDetailsSkeleton } from "@/skeletons/pokemon-details-skeleton";
import { ErrorComponent } from "@/components/error-component";
import { PokemonAbilities } from "@/components/pokemon-details/pokemon-abilities";
import { PokemonStats } from "@/components/pokemon-details/pokemon-stats";
import { cn } from "@/lib/utils";
import { PokemonTypes } from "@/components/pokemon-details/pokemon-types";

export const PokemonDetailsContainer = () => {
  const { name } = useParams<{ name: string }>();

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => pokemonApi.getPokemon(name!),
    enabled: !!name,
  });

  if (isLoading) {
    return <PokemonDetailsSkeleton />;
  }

  if (isError || !pokemon) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Link to='/'>
          <Button variant='ghost' className='mb-4'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to List
          </Button>
        </Link>
        <ErrorComponent error={error} refetch={refetch} />
      </div>
    );
  }

  const capitalizedName = pokemon.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  const maxStatValue = 255;

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <motion.div
        className='container mx-auto px-4 py-8 max-w-5xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced Back Button */}
        <Link to='/'>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant='ghost'
              className='mb-6 hover:text-black hover:shadow-lg transition-all duration-300'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to List
            </Button>
          </motion.div>
        </Link>

        {/* Main Pokemon Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className='overflow-hidden p-0 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 dark:from-slate-800 dark:via-slate-800/50 dark:to-slate-900 border-2 border-amber-200/50 dark:border-slate-700/50 shadow-2xl shadow-amber-500/10'>
            {/* Enhanced Header with Animated Background */}
            <CardHeader className='py-3 relative bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-red-100/20 overflow-hidden'>
              {/* Animated Background Pattern */}
              <motion.div
                className='absolute inset-0 opacity-10'
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
              />

              <div className='flex flex-col md:flex-row gap-8 items-center relative z-10'>
                {/* Enhanced Pokemon Image */}
                <motion.div
                  className='relative w-64 h-64 flex items-center justify-center'
                  initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-amber-300/20 via-orange-300/10 to-red-300/20 rounded-full blur-xl'
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <img
                    src={imageUrl}
                    alt={capitalizedName}
                    className='w-full h-full object-contain drop-shadow-2xl relative z-10'
                  />

                  {/* Sparkle Effects */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-2 h-2 bg-amber-400 rounded-full'
                      style={{
                        top: `${20 + i * 20}%`,
                        left: `${10 + i * 25}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                {/* Enhanced Pokemon Info */}
                <motion.div
                  className='flex-1 text-center md:text-left'
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.p
                    className='text-muted-foreground text-lg mb-2 font-mono bg-amber-50/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-1 inline-block border border-amber-200'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    #{pokemon.id.toString().padStart(3, "0")}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <CardTitle className='text-5xl mb-4 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent'>
                      {capitalizedName}
                    </CardTitle>
                  </motion.div>

                  {/* Animated Type Badges */}
                  <motion.div
                    className='flex flex-wrap gap-2 justify-center md:justify-start mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {pokemon.types.map((type) => (
                      <PokemonTypes key={type.type.name} type={type} />
                    ))}
                  </motion.div>

                  {/* Enhanced Stats Grid */}
                  <motion.div
                    className='grid grid-cols-2 gap-6 text-sm'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <HeightWeightBox pokemonHeight={pokemon.height} />
                    <HeightWeightBox pokemonWeight={pokemon.weight} />
                  </motion.div>
                </motion.div>
              </div>
            </CardHeader>

            {/* Enhanced Card Content */}
            <CardContent className='p-8 space-y-8 bg-gradient-to-b from-transparent to-amber-50/20 dark:to-slate-800/30'>
              {/* Abilities Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className='flex items-center gap-3 mb-4'>
                  <Zap className='w-6 h-6 text-amber-500' />
                  <h3 className='text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent'>
                    Abilities
                  </h3>
                </div>
                <div className='flex flex-wrap gap-3'>
                  {pokemon.abilities.map((ability) => (
                    <PokemonAbilities
                      key={ability.ability.name}
                      ability={ability}
                    />
                  ))}
                </div>
              </motion.div>

              <Separator className='bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent' />

              {/* Enhanced Base Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='flex gap-1'>
                    <Heart className='w-6 h-6 text-red-500' />
                    <Shield className='w-6 h-6 text-blue-500' />
                    <Sword className='w-6 h-6 text-orange-500' />
                  </div>
                  <h3 className='text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent'>
                    Base Stats
                  </h3>
                </div>

                <div className='space-y-4'>
                  {pokemon.stats.map((stat, index) => {
                    const statName = stat.stat.name
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");
                    const percentage = (stat.base_stat / maxStatValue) * 100;
                    return (
                      <PokemonStats
                        key={stat.stat.name}
                        stat={stat}
                        index={index}
                        percentage={percentage}
                        statName={statName}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

const HeightWeightBox = ({
  pokemonHeight,
  pokemonWeight,
}: {
  pokemonHeight?: number | null;
  pokemonWeight?: number | null;
}) => {
  return (
    <motion.div
      className='bg-amber-50/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-amber-50/70 dark:hover:bg-slate-800/70 transition-all duration-300 border border-amber-200/50'
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <p className='text-muted-foreground flex items-center gap-2'>
        <span
          className={cn("w-2 h-2  rounded-full", {
            "bg-blue-500": pokemonHeight,
            "bg-green-500": pokemonWeight,
          })}
        ></span>
        Height
      </p>
      <p
        className={cn("font-bold text-xl dark:text-blue-400", {
          "text-blue-600": pokemonHeight,
          "text-green-600": pokemonWeight,
        })}
      >
        {pokemonHeight && `${pokemonHeight / 10} m`}
        {pokemonWeight && ` ${pokemonWeight / 10} kg`}
      </p>
    </motion.div>
  );
};

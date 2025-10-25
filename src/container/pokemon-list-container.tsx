import { useInfiniteQuery, useQueries } from "@tanstack/react-query";

import { motion } from "motion/react";
import { pokemonApi } from "@/services/pokemon-service";
import { PokemonCard } from "@/components/pokemon/pokemon-card";

import { useInView } from "react-intersection-observer";

import { PokemonListSkeleton } from "@/skeletons/pokemon-list-skeleton";
import { ErrorComponent } from "@/components/error-component";

import { PokemonListFetchingMore } from "@/components/pokemon/pokemon-list-fetching-more";
import { PokemonCompletionComponent } from "@/components/pokemon/pokemon-completion-component";
import { PokemonListHeader } from "@/components/pokemon/pokemon-list-header";
import { useMemo } from "react";

export const PokemonListContainer = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 0 }) => pokemonApi.getPokemonList(50, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined;
      return pages.length * 50;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  // Get all Pokemon from all pages
  const allPokemon = data?.pages.flatMap((page) => page.results) ?? [];

  // Use useQueries to fetch images for all Pokemon in parallel
  const imageQueries = useQueries({
    queries: allPokemon.map((pokemon) => {
      const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
      return {
        queryKey: ["pokemon-image", pokemonId],
        queryFn: () => pokemonApi.getPokemonImageUrl(pokemonId!),
        enabled: !!pokemonId,
        staleTime: 1000 * 60 * 10, // Cache images for 10 minutes
        refetchOnWindowFocus: false,
      };
    }),
  });

  //  Map of Pokemon names to their image data
  const pokemonImageMap = new Map();

  useMemo(() => {
    allPokemon.forEach((pokemon, index) => {
      const imageQuery = imageQueries[index];
      if (imageQuery?.data) {
        const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
        pokemonImageMap.set(pokemon.name, {
          imageUrl: imageQuery.data,
          id: parseInt(pokemonId || "0"),
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemon, imageQueries]);

  // Intersection observer for infinite scroll
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: "300px",
  });

  // Trigger fetchNextPage when in view
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (isLoading) {
    return <PokemonListSkeleton />;
  }

  if (isError) {
    return <ErrorComponent error={error} refetch={refetch} />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <motion.div
        className='container mx-auto px-4 py-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <PokemonListHeader />

        {/* Enhanced Pokemon Grid */}
        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.2,
                staggerChildren: 0.02,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {allPokemon.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              index={index % 25} // Only stagger within groups of 25 to avoid long delays
              imageData={pokemonImageMap.get(pokemon.name)}
            />
          ))}
        </motion.div>

        {/* Enhanced Loading More Section */}
        {isFetchingNextPage && (
          <PokemonListFetchingMore totalPokemon={allPokemon.length} />
        )}

        {/* Enhanced Completion State */}
        {!isFetchingNextPage && !hasNextPage && allPokemon.length > 0 && (
          <PokemonCompletionComponent />
        )}

        <div ref={inViewRef} className='h-px' />
      </motion.div>
    </div>
  );
};

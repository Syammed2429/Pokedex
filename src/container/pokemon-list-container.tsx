import { useInfiniteQuery, useQueries } from "@tanstack/react-query";

import { Loader2 } from "lucide-react";

import { motion } from "framer-motion";
import { pokemonApi } from "@/services/pokemon-service";
import { PokemonCard } from "@/components/pokemon/pokemon-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className='p-4'>
            <Skeleton className='w-full aspect-square mb-3' />
            <Skeleton className='h-5 w-3/4 mx-auto' />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4'>
        <Alert variant='destructive' className='max-w-md'>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load Pokémon"}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {allPokemon.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            index={index}
            imageData={pokemonImageMap.get(pokemon.name)}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex justify-center py-8'
        >
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Loader2 className='h-6 w-6 animate-spin' />
            <span>Loading more Pokémon...</span>
          </div>
        </motion.div>
      )}

      {!isFetchingNextPage && !hasNextPage && allPokemon.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center py-8'
        >
          <p className='text-muted-foreground'>You've caught 'em all! 🎉</p>
        </motion.div>
      )}

      <div ref={inViewRef} className='h-px' />
    </div>
  );
};

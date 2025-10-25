import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonListContainer } from "@/container/pokemon-list-container";
import { PokemonDetailsContainer } from "@/container/pokemon-details-container";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className='min-h-screen bg-background'>
          <Routes>
            <Route path='/' element={<PokemonListContainer />} />
            <Route
              path='/pokemon/:name'
              element={<PokemonDetailsContainer />}
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

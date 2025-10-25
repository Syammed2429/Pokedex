import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className='min-h-screen font-noto-sans'>
      <div className='container mx-auto px-4 py-8'>
        <header className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-yellow-500 mb-2'>Pokédex</h1>
          <p className='text-muted-foreground'>Discover and explore Pokémon</p>
        </header>
      </div>
    </main>
  );
}

export default App;

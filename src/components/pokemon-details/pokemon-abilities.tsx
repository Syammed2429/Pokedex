import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface PokemonAbilitiesProps {
  ability: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };
}
export const PokemonAbilities = ({ ability }: PokemonAbilitiesProps) => {
  return (
    <motion.div
      key={ability.ability.name}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
      }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <Badge
        variant={ability.is_hidden ? "secondary" : "outline"}
        className={`text-sm px-4 py-2 font-medium transition-all duration-300 ${
          ability.is_hidden
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl border-amber-300"
            : "bg-amber-50/50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-slate-700 border-2 border-amber-200"
        }`}
      >
        {ability.is_hidden && <Sparkles className='w-3 h-3 mr-1' />}
        {ability.ability.name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
        {ability.is_hidden && " (Hidden)"}
      </Badge>
    </motion.div>
  );
};

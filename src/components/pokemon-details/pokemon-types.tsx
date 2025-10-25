import { motion } from "motion/react";
import type { FC } from "react";
import type { PokemonType } from "@/types/pokemon-types";
import { TYPE_COLORS } from "@/constants/type-colors";
import { Badge } from "../ui/badge";

interface PokemonTypesProps {
  type: PokemonType;
}

export const PokemonTypes: FC<PokemonTypesProps> = ({ type }) => {
  return (
    <motion.div
      key={type.type.name}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.1,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge
        className={`${
          TYPE_COLORS[type.type.name]
        } text-sm px-4 py-2 font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 border`}
      >
        {type.type.name.toUpperCase()}
      </Badge>
    </motion.div>
  );
};

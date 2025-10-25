import { getStatColor, getStatIcon } from "@/utils/pokemin-stats";
import { motion } from "motion/react";
import type { FC } from "react";

interface PokemonStatsProps {
  stat: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  };
  index: number;
  percentage: number;
  statName: string;
}

export const PokemonStats: FC<PokemonStatsProps> = ({
  stat,
  index,
  percentage,
  statName,
}) => {
  return (
    <motion.div
      key={stat.stat.name}
      className='bg-amber-50/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 hover:bg-amber-50/50 dark:hover:bg-slate-800/50 transition-all duration-300 border border-amber-200/30'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 + index * 0.1 }}
    >
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-2'>
          {getStatIcon(statName)}
          <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
            {statName}
          </span>
        </div>
        <motion.span
          className='text-lg font-bold text-gray-800 dark:text-gray-200'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.6 + index * 0.1,
            type: "spring",
          }}
        >
          {stat.base_stat}
        </motion.span>
      </div>

      {/* Enhanced Progress Bar */}
      <div className='relative h-3 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden'>
        <motion.div
          className={`h-full bg-gradient-to-r ${getStatColor(
            stat.base_stat
          )} relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            delay: 1.7 + index * 0.1,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 2 + index * 0.1,
            }}
          />
        </motion.div>

        {/* Percentage indicator */}
        <motion.div
          className='absolute right-2 top-0 bottom-0 flex items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 + index * 0.1 }}
        >
          <span className='text-xs font-medium text-black drop-shadow-sm'>
            {Math.round(percentage)}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

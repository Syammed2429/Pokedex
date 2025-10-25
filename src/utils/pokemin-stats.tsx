import { Heart, Shield, Sparkles, Sword, Zap } from "lucide-react";
// Stat color based on value
const getStatColor = (value: number) => {
  if (value >= 150) return "from-emerald-500 to-green-600";
  if (value >= 100) return "from-amber-500 to-orange-500";
  if (value >= 70) return "from-orange-400 to-red-400";
  return "from-stone-400 to-slate-500";
};

const getStatIcon = (statName: string) => {
  if (statName.includes("Hp"))
    return <Heart className='w-4 h-4 text-red-500' />;
  if (statName.includes("Attack"))
    return <Sword className='w-4 h-4 text-orange-500' />;
  if (statName.includes("Defense"))
    return <Shield className='w-4 h-4 text-emerald-500' />;
  if (statName.includes("Speed"))
    return <Zap className='w-4 h-4 text-amber-500' />;
  return <Sparkles className='w-4 h-4 text-purple-500' />;
};

export { getStatColor, getStatIcon };

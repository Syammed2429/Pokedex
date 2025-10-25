import { motion } from "motion/react";
interface FallbackImageProps {
  title: string;
}

export const FallbackImage = ({ title }: FallbackImageProps) => {
  return (
    <motion.div
      className='w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-800 relative z-10'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className='text-center'>
        <div className='text-4xl mb-2 text-amber-500'>🎯</div>
        <p className='text-xs text-amber-600 dark:text-amber-400 font-medium'>
          {title}
        </p>
      </div>
    </motion.div>
  );
};

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface ErrorComponentProps {
  error: Error | unknown;
  refetch: () => void;
}
export const ErrorComponent = ({ error, refetch }: ErrorComponentProps) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col items-center justify-center min-h-[60vh] gap-6'>
          <Card className='max-w-md p-8 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-amber-200 dark:border-slate-700 shadow-lg'>
            <div className='text-6xl mb-4'>😕</div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>
              Oops! Something went wrong
            </h3>
            <p className='text-muted-foreground mb-6'>
              {error instanceof Error
                ? error.message
                : "Failed to load Pokémon"}
            </p>
            <Button
              onClick={() => refetch()}
              className='bg-gradient-to-r active:scale-95 from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
            >
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

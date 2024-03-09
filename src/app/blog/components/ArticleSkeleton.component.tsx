import Button from '@/shared/theme/Button';
import { Avatar, Chip, cn } from '@nextui-org/react';

interface ArticleProps {
  isMain?: boolean;
}

/**
 * Vignette d'un article de blog
 * @param article Article à afficher
 */
export default function ArticleSkeleton({isMain }: ArticleProps) {

  return (
    <div
      className={cn(
        isMain
          ? 'lg:flex items-center gap-16 w-full rounded-medium shadow-medium'
          : 'rounded-medium shadow-medium hover:scale-105 max-w-xl',
        'min-w-[350px] p-6 relative transition-all animate-pulse',
      )}
    >
      <div className={cn ("flex items-center justify-center w-96 h-52 bg-gray-300 rounded dark:bg-gray-700", !isMain && 'w-full')}>
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
      </div>
      <div className={cn('flex flex-col gap-5 mt-5', isMain && 'lg:w-2/3')}>
        <div className="flex gap-2 w-64">
          <Chip color="primary" variant="flat" className="w-64 max-w-none">
          </Chip>
          <Chip color="primary" variant="flat" className="w-64 max-w-none"> 
          </Chip>
        </div> 
        <div className="flex flex-col gap-6">
          <div className='flex flex-col gap-4'>
            <h5 className="h-3.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full line-clamp-2"></h5>
            <h5 className="h-3.5 bg-gray-400 rounded-full dark:bg-gray-700 w-5/12 line-clamp-2"></h5>
          </div>
          <div className='flex flex-col gap-4'>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-full line-clamp-2"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-7/12 line-clamp-2"></div>
          </div>
  
          <small className="h-1.5 bg-gray-100 rounded-full dark:bg-gray-700 w-48"></small>
        </div>
        <div className="flex items-center justify-between">
          <Button
            color="primary"
          >
          </Button>
          <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10 text-dark"/>
              <p className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></p>
          </div> 
        </div>
      </div>
    </div>
  );
}

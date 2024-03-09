import { BlogPost } from '@/class/BlogPost.class';
import Button from '@/shared/theme/Button';
import { arrayToString } from '@/utils/utils';
import { Avatar, AvatarGroup, Chip, Image, cn } from '@nextui-org/react';
import { format, isDate } from 'date-fns';
import Link from 'next/link';

interface ArticleProps {
  article?: BlogPost;
  isMain?: boolean;
  loading: boolean;
}

export default function Article({ article, isMain, loading }: ArticleProps) {
  const ArticleComponent = loading ? (
    <div
      className={cn(
        isMain
          ? 'lg:flex items-center gap-16 w-full rounded-medium shadow-medium'
          : 'rounded-medium shadow-medium hover:scale-105 max-w-xl',
        'min-w-[350px] p-6 relative transition-all animate-pulse',
      )}
    >
      <div className={cn("flex items-center justify-center w-96 h-52 bg-gray-300 rounded dark:bg-gray-700")}>
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
          <Button color="primary">
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 text-dark"/>
            <p className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></p>
          </div> 
        </div>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        isMain
          ? 'lg:flex items-center gap-16 w-full rounded-medium shadow-medium'
          : 'rounded-medium shadow-medium hover:scale-105 max-w-xl',
        'min-w-[350px] p-6 relative transition-all',
      )}
    >
      <Image
        src={article?.cover}
        width="100%"
        className={cn(
          'object-cover aspect-video',
          isMain && 'aspect-auto max-w-4xl',
        )}
      />
      <div className={cn('flex flex-col gap-5 mt-5', isMain && 'lg:w-2/3')}>
        { article?.categories && article.categories.length > 0 &&
        <div className="flex gap-2">
          {article.categories.map((categorie: string) => (
            <Chip key={categorie} color="primary" variant="flat">
              {categorie}
            </Chip>
          ))}
        </div> } 
        <div className="flex flex-col gap-2">
          <h5 className='line-clamp-2'>{article?.title}</h5>
          <p className="line-clamp-2">{article?.description}</p>
          <small>
            Publié le{' '}
            {isDate(article?.publicationDate)
              ? format(article?.publicationDate, 'dd/MM/yyyy')
              : null}
          </small>
        </div>
        <div className="flex items-center justify-between">
          <Button
            color="primary"
            className="w-fit"
            as={Link}
            href={`/blog/${article?.url}`}
          >
            Lire plus
          </Button>

          { article?.authors && article?.authors.length > 0 &&
          <div className="flex items-center">
            <AvatarGroup max={2} total={article?.authors.length - 2}>
              {article?.authors.map((author) => (
                <Avatar key={author.id} src={author.imageUrl} />
              ))}
            </AvatarGroup>
            <div className="flex flex-col ml-2 mr-6">
              <p className="text-sm font-bold">
                {arrayToString(article?.authors.map((author) => author.name))}
              </p>
            </div> 
          </div> }
        </div>
      </div>
    </div>
  );

  return ArticleComponent;
}

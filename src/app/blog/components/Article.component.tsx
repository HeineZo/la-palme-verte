import { BlogPost } from '@/class/BlogPost.class';
import Button from '@/shared/theme/Button';
import { arrayToString } from '@/utils/utils';
import { format, isDate } from 'date-fns';
import Link from 'next/link';

interface ArticleProps {
  article: BlogPost;
  isMain?: boolean;
}

/**
 * Vignette d'un article de blog
 * @param article Article à afficher
 */
export default function Article({ article, isMain }: ArticleProps) {
  const { title, description, cover, categories, authors, publicationDate } =
    article;
  return (
    <div
      className={cn(
        isMain
          ? 'lg:flex items-center gap-16 rounded-medium shadow-medium'
          : 'rounded-medium shadow-medium hover:scale-105 max-w-xl',
        ' p-6 relative w-full transition-all',
      )}
    >
      <Image
        src={cover}
        width="100%"
        className={cn(
          'object-cover aspect-video',
          isMain && 'aspect-auto max-w-4xl',
        )}
      />
      <div className={cn('flex flex-col justify-between gap-5 mt-5', isMain && 'lg:w-2/3')}>
        <div className='flex flex-col gap-5'>
          <div className="flex gap-2 overflow-x-hidden">
            <ScrollShadow
              orientation="horizontal"
              className="flex items-center gap-2 overflow-x-auto w-full"
            >
              {categories.map((categorie: string) => (
                <Chip key={categorie} color="primary" variant="flat">
                  {categorie}
                </Chip>
              ))}
            </ScrollShadow>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="line-clamp-2">{title}</h5>
            <p className="line-clamp-2">{description}</p>
            <small>Publié le {format(publicationDate, 'dd/MM/yyyy')}</small>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            color="primary"
            className="w-fit"
            as={Link}
            href={`/blog/${article.url}`}
          >
            Lire plus
          </Button>
          <div className="flex items-center">
            <AvatarGroup max={2} total={authors.length - 2}>
              {authors.map((author) => (
                <Avatar key={author.id} src={author.imageUrl} />
              ))}
            </AvatarGroup>
            <div className="flex flex-col ml-2 mr-6">
              <p className="text-sm font-bold">
                {arrayToString(article.authors.map((author) => author.name))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

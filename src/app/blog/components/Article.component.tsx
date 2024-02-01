
import { Avatar, AvatarGroup, Chip, Image, cn } from '@nextui-org/react';
import Button from '@/shared/theme/Button';
import { format, isDate } from 'date-fns';
import { FullBlogPost } from '@/utils/type';
import { Category } from '@prisma/client';
import { BlogPost } from '@/class/BlogPost.class';
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
  const { title, description, cover, categories, authors } = article;
  return (
    <div
      className={cn(
        isMain
          ? 'lg:flex items-center gap-16 w-full rounded-medium shadow-medium'
          : 'rounded-medium shadow-medium hover:scale-105 max-w-xl',
        'min-w-[350px] p-6 relative transition-all',
      )}
    >
      <Image
        src={cover}
        width="100%"
        className={cn('object-cover aspect-video', isMain && 'aspect-auto max-w-4xl')}
      />
      <div className="flex flex-col gap-5 mt-5 lg:w-2/3">
        <div className="flex gap-2">
          {categories.map((categorie: string) => (
            <Chip key={categorie} color="primary" variant="flat">
              {categorie}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h5>{title}</h5>
          <p className="line-clamp-2">{description}</p>
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
                <Avatar
                  key={author.id}
                  src={author.imageUrl}
                />
              ))}
            </AvatarGroup>
            <div className="flex flex-col ml-2 mr-6">
              <p className="text-sm font-bold">{article.authors[0].name}</p>
              <p>
                {isDate(article.publicationDate)
                  ? format(article.publicationDate, 'dd/MM/yyyy')
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

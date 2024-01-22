'use client';

import { Avatar, AvatarGroup, Chip, Image, cn } from '@nextui-org/react';
import Button from '@/shared/theme/Button';
import { format, isDate } from 'date-fns';
import { FullBlogPost } from '@/utils/type';
import { Category } from '@prisma/client';

interface ArticleProps {
  article: FullBlogPost;
  isMain?: boolean;
}

/**
 * Vignette d'un article de blog
 * @param article Article à afficher
 */
export default function Article({ article, isMain }: ArticleProps) {
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
        // TODO: mettre une image placeholder correcte
        src={article.imageCover ?? undefined}
        width="100%"
        className={cn('object-cover aspect-video', isMain && 'aspect-auto max-w-4xl')}
      />
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-2">
          {article.categories.map((categorie: Category) => (
            <Chip key={categorie.id} color="primary" variant="flat">
              {categorie.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h5>{article.title}</h5>
          <p className="line-clamp-2">{article.content}</p>
        </div>
        <div className="flex items-center justify-between">
          <Button
            color="primary"
            className="w-fit"
            href="/blog/article-test"
          >
            Lire plus
          </Button>
          <div className="flex items-center">
            <AvatarGroup max={2} total={article.authors.length - 2}>
              {article.authors.map((author) => (
                <Avatar
                  key={author.id}
                  src={author.profilePicture ?? undefined}
                />
              ))}
            </AvatarGroup>
            <div className="flex flex-col ml-2 mr-6">
              <p className="text-sm font-bold">{article.authors[0].name}</p>
              <p>
                {isDate(article.createdAt)
                  ? format(article.createdAt, 'dd/MM/yyyy')
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

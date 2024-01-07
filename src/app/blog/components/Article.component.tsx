'use client';

import { Avatar, Chip, Image } from '@nextui-org/react';
import Button from '@/shared/theme/Button';

interface ArticleProps {
  article: any; // TODO: type Article
  isMain?: boolean;
}

/**
 * Vignette d'un article de blog
 * @param article Article à afficher
 */
export default function Article({ article, isMain }: ArticleProps) {
  return (
    <div
      className={`${isMain
        ? 'lg:flex items-center gap-16'
        : 'rounded-medium shadow-medium hover:scale-105 max-w-xl'
        } min-w-[350px] p-6 relative transition-all`}
    >
      <Image
        src={article.photo}
        width="100%"
        className={`object-cover ${isMain ? 'h-[500px]' : 'h-[300px]'
          }`}
      />
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-2">
          {article.categories.map((categorie: string) => (
            <Chip key={categorie} color="primary" variant="flat">
              {categorie}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h5>{article.titre}</h5>
          <p className="line-clamp-2">{article.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="light" color="primary" className="w-fit">
            Lire plus
          </Button>
          <div className="flex items-center">
            <Avatar />
            <div className="flex flex-col ml-2 mr-6">
              <p className="text-sm font-bold">{article.auteur}</p>
              <p>
                {`${article.date} ${article.timeToRead
                  ? `• ${article.timeToRead} min de lecture`
                  : ''
                  } `}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

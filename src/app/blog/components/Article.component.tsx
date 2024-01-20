'use client';

import { Avatar, Chip, Image } from '@nextui-org/react';
import Button from '@/shared/theme/Button';
import { BlogPost } from '@prisma/client';
import { format, isDate } from 'date-fns';

interface ArticleProps {
  article: BlogPost;
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
        // TODO: mettre une image placeholder correcte
        src={article.imageCover ?? undefined}
        width="100%"
        className={`object-cover ${isMain ? 'h-[500px]' : 'h-[300px]'
          }`}
      />
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-2">
          {/* TODO: jointure avec la table categories pour récupérer les catégories liées à l'article */}
          {/* {article.categories.map((categorie: string) => (
            <Chip key={categorie} color="primary" variant="flat">
              {categorie}
            </Chip>
          ))} */}
        </div>
        <div className="flex flex-col gap-2">
          <h5>{article.title}</h5>
          <p className="line-clamp-2">{article.content}</p>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="light"
            color="primary"
            className="w-fit"
            href="/blog/article-test"
          >
            Lire plus
          </Button>
          <div className="flex items-center">
            <Avatar />
            <div className="flex flex-col ml-2 mr-6">
              {/* TODO: jointure avec la table User lors de la requête de l'article */}
              {/* <p className="text-sm font-bold">{article.author.name}</p> */}
              <p className="text-sm font-bold">{article.authorId}</p>
              <p>
                {isDate(article.createdAt) ?
                  `${format(article.createdAt, 'dd/MM/yyyy')} ${article.readTime
                    ? `• ${article.readTime} min de lecture`
                    : ''
                  }`
                  : 'Date invalide'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

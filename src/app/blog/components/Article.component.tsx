'use client';

import { Chip, Image } from '@nextui-org/react';
import Button from '@/shared/theme/Button';
import { BlogPost } from '@prisma/client';

interface ArticleProps {
  article: BlogPost;
}

/**
 * Vignette d'un article de blog
 * @param article Article à afficher
 */
export default function Article({ article }: ArticleProps) {
  return (
    <div className="flex flex-col min-w-[350px] max-w-xl gap-6 flex-1 p-6 rounded-medium relative shadow-medium hover:scale-105 transition-all">
      <Image
        className="object-cover h-[300px]"
        src={article.imageCover ?? undefined}
        width="100%"
      />
      <div className="flex gap-2">
        {/* {article.categories.map((categorie: string) => (
          <Chip color="primary" key={categorie} variant="flat">
            {categorie}
          </Chip>
        ))} */}
      </div>
      <div className="flex flex-col gap-2">
        <h5>{article.title}</h5>
        <p className="line-clamp-2">{article.content}</p>
      </div>
      <Button className="w-fit" color="primary" variant="light">
        Lire plus
      </Button>
    </div>
  );
}

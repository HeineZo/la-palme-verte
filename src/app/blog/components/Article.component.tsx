"use client";
import { Chip, Image } from "@nextui-org/react";
import { Button } from "@/shared/theme/Button";

interface ArticleProps {
  article: any; // TODO: type Article
}

/**
 * Vignette d'un article de blog
 * @param article Article à afficher
 */
export default function Article({ article }: ArticleProps) {
  return (
    <div className="flex flex-col min-w-[350px] max-w-xl gap-6 flex-1 p-6 rounded-medium relative shadow-medium hover:scale-105 transition-all">
      <Image
        src={article.photo}
        width="100%"
        className="object-cover h-[300px]"
      />
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
      <Button variant="light" color="primary" className="w-fit">
        Lire plus
      </Button>
    </div>
  );
}

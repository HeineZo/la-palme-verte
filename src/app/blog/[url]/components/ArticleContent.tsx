import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarGroup, Chip } from '@nextui-org/react';
import { BlogPost } from '@/class/BlogPost.class';
import { format, formatRelative, isDate, parseISO, subDays } from 'date-fns';
import { fr } from 'date-fns/locale'

interface ArticleContentProps {
  article: BlogPost
  htmlContent: string;
}

export default function ArticleContent({
  article,
  htmlContent
}: ArticleContentProps) {
  return (
    <article className="w-full mb-10 flex flex-col items-center pt-20">
      <div className='relative w-full h-64'>
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('chemin/vers/votre/image.jpg');"></div>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        {/* <Image  src={article.cover} alt="Image de couverture"/> */}
        <div>
          <div>
            {article.categories.map((category, index) => (
              <Chip key={index} color="primary" variant="flat">
                {category}
              </Chip>
            ))}
          </div>
          <h1>{article.title}</h1>
          <div>
            <AvatarGroup total={article.authors.length - 2}>
              {article.authors.map((author) => (
                <Avatar key={author.id} src={author.imageUrl} />
              ))}
            </AvatarGroup>
          </div>
          <div className="flex ml-2 mr-6">
            <p>Publié le&nbsp;
              {isDate(article.publicationDate)
                ? format(article.publicationDate, 'd MMMM yyyy', { locale: fr })
                : null}
            </p>
          </div>
        </div>
      </div>
      <div
        className="text-xl mt-4 max-w-3xl leading-10 prose prose-white prosee-headings:text-white"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}

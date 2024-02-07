import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarGroup, Chip } from '@nextui-org/react';
import { BlogPost } from '@/class/BlogPost.class';
import { format, isDate } from 'date-fns';
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
    <article className={`w-full mb-10 flex flex-col items-center pt-20`}>
      <div className='overflow-hidden relative w-full h-96 text-white'>
        <Image className='absolute inset-0 left-0 top-0 w-full h-auto' src={article.cover} alt="Image de couverture" width={1920} height={500} />
        <div className='absolute inset-0 bg-black opacity-40 left-0 top-0 w-full h-auto'></div>
        <div className='relative flex flex-col items-center mt-20'>
          <div className='flex gap-4'>
            {article.categories.map((category, index) => (
              <Chip key={index} classNames={{ base: "bg-white" }} variant="flat">
                {category}
              </Chip>
            ))}
          </div>
          <h1 className='mt-4'>{article.title}</h1>
          <div className='mt-9'>
            <AvatarGroup total={article.authors.length - 2}>
              {article.authors.map((author) => (
                <Avatar key={author.id} src={author.imageUrl} />
              ))}
            </AvatarGroup>
          </div>
          <p className='mt-4'>Publié le&nbsp;
            {isDate(article.publicationDate)
              ? format(article.publicationDate, 'd MMMM yyyy', { locale: fr })
              : null}
          </p>
        </div>
        {/* </div> */}
      </div>
      <div
        className="text-xl max-w-3xl leading-10 mt-32 prose prose-white prosee-headings:text-white"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}

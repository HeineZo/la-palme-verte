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
    <article className='w-full mb-10 flex flex-col items-center'>
      <div className='overflow-hidden relative w-full min-h-[520px] h-auto text-white'>
        <Image className='absolute inset-0 left-0 top-0 w-full h-full object-cover' src={article.cover} alt="Image de couverture" width={1920} height={1080} />
        <div className='absolute inset-0 bg-black opacity-40 left-0 top-0 w-full h-full' />
        <div className='relative flex flex-col items-center justify-center gap-8 py-28 px-16 text-center'>
          <div className='flex gap-4'>
            {article.categories.map((category, index) => (
              <Chip key={index} classNames={{ base: "bg-white" }} variant="flat">
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
          <p>Publié le&nbsp;
            {isDate(article.publicationDate)
              ? format(article.publicationDate, 'd MMMM yyyy', { locale: fr })
              : null}
          </p>
        </div>
      </div>
      <div
        className="text-xl max-w-3xl leading-10 mt-10 2xl:mx-32 mx-10 prose prose-headings:text-white"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}

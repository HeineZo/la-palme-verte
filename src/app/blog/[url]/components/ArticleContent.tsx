import Image from 'next/image';
import React from 'react';

interface ArticleContentProps {
  title: string;
  categories: string[];
  cover: string;
  content: string;
}

export default function ArticleContent({
  title,
  categories,
  cover,
  content,
}: ArticleContentProps) {
  return (
    <article className="w-full mb-10 flex flex-col items-center pt-20">
      <h1>{title}</h1>
      <Image src={cover} alt="Image de couverture" width={500} height={300} />
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
      <div
        className="text-xl mt-4 max-w-3xl leading-10 prose prose-white prosee-headings:text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

'use client';

import { Tabs, Tab, Pagination } from '@nextui-org/react';
import Searchbar from './Searchbar.component';
import Reveal from '@/shared/utils/Reveal.component';
import Article from './Article.component';
import { BlogPost } from '@prisma/client';

interface ArticleBrowerProps {
  articles: BlogPost[]; // TODO: type Article
}

export default function ArticlesBrowser({ articles }: ArticleBrowerProps) {
  type Tag = 'Tous' | 'Algues' | 'Consommation' | 'Plage' | 'Voyage';

  const tags: Tag[] = ['Tous', 'Algues', 'Consommation', 'Plage', 'Voyage'];

  return (
    <section className="flex flex-col gap-10">
      <div className="md:flex justify-between">
        <Tabs
          variant="light"
          color="secondary"
          radius="full"
          classNames={{
            tabList: 'gap-6',
            cursor: 'bg-accent',
          }}
        >
          {tags.map((tag) => (
            <Tab key={tag} title={tag} />
          ))}
        </Tabs>
        <div className='max-w-[400px] w-full'>
          <Searchbar />
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-8">
        {articles.map((article, index) => (
          <Reveal index={index} key={article.title}>
            <Article article={article} />
          </Reveal>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          initialPage={1}
          // total={articles.length / 9}
          total={3}
        />
      </div>
    </section>
  );
}

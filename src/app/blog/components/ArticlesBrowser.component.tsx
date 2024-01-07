'use client';

import { Tabs, Tab, Pagination } from '@nextui-org/react';
import Searchbar from './Searchbar.component';
import Reveal from '@/shared/utils/Reveal.component';
import Article from './Article.component';

interface ArticleBrowerProps {
  articles: any[]; // TODO: type Article
}

export default function ArticlesBrowser({ articles }: ArticleBrowerProps) {
  type Tag = 'Tous' | 'Algues' | 'Consommation' | 'Plage' | 'Voyage';

  const tags: Tag[] = ['Tous', 'Algues', 'Consommation', 'Plage', 'Voyage'];

  return (
    <>
      <div className="md:flex mt-10 justify-between">
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
        <Searchbar />
      </div>
      <div className="flex w-full flex-wrap gap-8 mt-10 justify-around">
        {articles.map((article, index) => (
          <Reveal index={index} key={article.titre}>
            <Article article={article} />
          </Reveal>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination
          initialPage={1}
          // total={articles.length / 9}
          total={3}
        />
      </div>
    </>
  );
}

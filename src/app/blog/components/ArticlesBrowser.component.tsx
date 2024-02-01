'use client';

import { Tabs, Tab, Pagination, ScrollShadow } from '@nextui-org/react';
import Searchbar from './Searchbar.component';
import Reveal from '@/shared/utils/Reveal.component';
import Article from './Article.component';
import { FullBlogPost } from '@/utils/type';
import { BlogPost } from '@/class/BlogPost.class';

interface ArticleBrowerProps {
  articles: BlogPost[];
  categories: string[];
}

export default function ArticlesBrowser({ articles, categories }: ArticleBrowerProps) {
  return (
    <section className="flex flex-col gap-10 section w-full">
      {/* <h3>Découvrir</h3> */}
      <div className="flex flex-wrap justify-between gap-5 overflow-x-hidden ">
        <ScrollShadow orientation='horizontal' className='flex items-center h-16'>
          <Tabs
            variant="light"
            color="secondary"
            radius="full"
            classNames={{
              tabList: 'gap-6',
              cursor: 'bg-accent',
            }}
          >
            {categories.map((tag) => (
              <Tab key={tag} title={tag} />
            ))}
          </Tabs>
        </ScrollShadow>
        <div className="max-w-[400px] w-full">
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

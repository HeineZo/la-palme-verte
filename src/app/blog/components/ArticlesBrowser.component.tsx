'use client';
import { Pagination, ScrollShadow } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import Searchbar from './Searchbar.component';
import Reveal from '@/shared/utils/Reveal.component';
import Article from './Article.component';
import { BlogPost } from '@/class/BlogPost.class';
import { Key, useState } from 'react';

interface ArticleBrowerProps {
  articles: BlogPost[];
  categories: string[];
}

export default function ArticlesBrowser({ articles, categories }: ArticleBrowerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // État local pour stocker la catégorie sélectionnée

  const handleCategorySelection = (category: string | null) => {
    setSelectedCategory(category === "Tout" ? null : category);
  };

  const filteredArticles = selectedCategory ? articles.filter(article =>
    article.categories.includes(selectedCategory)
  ) : articles; // Filtrer les articles en fonction de la catégorie sélectionnée, si elle existe

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
            onSelectionChange={(key: Key) => {
              handleCategorySelection(key as string);
            }}
          >
            <Tab key={"Tout"} title={"Tout"} />
            {categories.map((category) => (
              <Tab
                key={category}
                title={category}
              />
            ))}
          </Tabs>
        </ScrollShadow>
        <div className="max-w-[400px] w-full">
          <Searchbar />
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-8">
        {filteredArticles.map((article, index) => (
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

'use client';
import SearchbarAutocomplete from '@/app/blog/components/SearchbarAutocomplete.component';
import { BlogPost } from '@/class/BlogPost.class';
import Reveal from '@/shared/utils/Reveal.component';
import { Pagination, ScrollShadow } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Key, useState } from 'react';
import Article from './Article.component';

interface ArticleBrowerProps {
  articles: BlogPost[];
  categories: string[];
}

export default function ArticlesBrowser({ articles, categories }: ArticleBrowerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 3;
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(articles.length / articlesPerPage));


  const handleSearchChange = (value: string) => {
    setSearchQuery(value.toLowerCase());
  };

  function chunkArray(array: BlogPost[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const handleCategorySelection = (category: string | null) => {
    setSelectedCategory(category === "Tout" ? null : category);
  };

  const paginate = (pageNumber: number) => { 
    setCurrentPage(pageNumber);
    document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filterAndPaginateArticles = () => {
    const filteredArticles = articles.filter(article => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const inCategory = !selectedCategory || article.categories.includes(selectedCategory);
      const matchesQuery =
        !searchQuery ||
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.description.toLowerCase().includes(lowerCaseQuery);
      return inCategory && matchesQuery;
    });

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  };

  const currentArticles = filterAndPaginateArticles();

  return (
    <section className="flex flex-col gap-10 section w-full scroll-smooth" id='tabs'>
      {/* <h3>Découvrir</h3> */}
      <div className="flex flex-wrap justify-between gap-5 overflow-x-hidden" >
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
          <SearchbarAutocomplete onSearchChange={handleSearchChange} searchList={currentArticles} />  
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-8 justify-center">
        {currentArticles.map((article, index) => (
          <Reveal index={index} key={article.title}>
            <Article article={article} loading={true}/>
          </Reveal>
        ))}
      </div>
      <div className="flex justify-center">
      { currentArticles.length > 0 ? (
        <Pagination
          initialPage={1}
          total={totalPages}
          onChange={paginate}
        />
      ) : null}
      </div>
    </section>
  );
}

'use client';
import SearchbarAutocomplete from '@/app/blog/components/SearchbarAutocomplete.component';
import { BlogPost } from '@/class/BlogPost.class';
import { ScrollShadow, Spinner } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Key, useEffect, useState } from 'react';
import Article from './Article.component';
import { getArticles } from 'server/blog';
import { useInView } from 'react-intersection-observer';

interface ArticleBrowerProps {
  initialArticles?: BlogPost[];
  categories: string[];
  initialNextArticle?: string;
}

export default function ArticlesBrowser({
  initialArticles,
  categories,
  initialNextArticle,
}: ArticleBrowerProps) {
  const [articles, setArticles] = useState<BlogPost[]>(initialArticles ?? []);
  const [moreArticles, setHasMore] = useState<boolean>(true);
  const [nextArticle, setNextArticle] = useState<string | undefined>(
    initialNextArticle,
  );
  const { ref, inView } = useInView();

  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // const handleSearchChange = (value: string) => {
  //   setSearchQuery(value.toLowerCase());
  // };

  // const changeCategory = (category: string | null) => {
  //   setSelectedCategory(category === 'Tout' ? null : category);
  // };

  // const paginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  // function fetchData() {
  //   await getPage
  // }

  // const filterAndPaginateArticles = () => {
  //   const filteredArticles = articles.filter((article) => {
  //     const lowerCaseQuery = searchQuery.toLowerCase();
  //     const inCategory =
  //       !selectedCategory || article.categories.includes(selectedCategory);
  //     const matchesQuery =
  //       !searchQuery ||
  //       article.title.toLowerCase().includes(lowerCaseQuery) ||
  //       article.description.toLowerCase().includes(lowerCaseQuery);
  //     return inCategory && matchesQuery;
  //   });

  //   const indexOfLastArticle =
  //     currentPage * process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE ?? 10;
  //   const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  //   const currentArticles = filteredArticles.slice(
  //     indexOfFirstArticle,
  //     indexOfLastArticle,
  //   );

  //   return currentArticles;
  // };

  // const currentArticles = filterAndPaginateArticles();

  useEffect(() => {
    if (inView && moreArticles) {
      void fetchMore();
    }
  }, [inView]);

  /**
   * Récupère les articles suivants
   */
  const fetchMore = async () => {
    const { articles: newArticles, hasMore, nextArticle: newNextArticle } = await getArticles(nextArticle);
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setHasMore(hasMore);
    setNextArticle(newNextArticle);
  };

  return (
    <section className="flex flex-col gap-10 section w-full">
      {/* <h3>Découvrir</h3> */}
      <div className="flex flex-wrap justify-between gap-5 overflow-x-hidden ">
        <ScrollShadow
          orientation="horizontal"
          className="flex items-center h-16"
        >
          <Tabs
            variant="light"
            color="secondary"
            radius="full"
            classNames={{
              tabList: 'gap-6',
              cursor: 'bg-accent',
            }}
            onSelectionChange={(key: Key) => {
              // changeCategory(key as string);
            }}
          >
            <Tab key="Tout" title="Tout" />
            {categories.map((category) => (
              <Tab key={category} title={category} />
            ))}
          </Tabs>
        </ScrollShadow>
        <div className="max-w-[400px] w-full">
          {/* <SearchbarAutocomplete
            onSearchChange={handleSearchChange}
            searchList={loadedArticles}
          /> */}
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-8">
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </div>
      {moreArticles && <Spinner ref={ref} />}
    </section>
  );
}

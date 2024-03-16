'use client';
import SearchbarAutocomplete from '@/app/blog/components/SearchbarAutocomplete.component';
import { BlogPost } from '@/class/BlogPost.class';
import { ScrollShadow, Spinner } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Key, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getArticles, getArticlesByText } from 'server/blog';
import Article from './Article.component';
import { useRouter } from 'next/navigation';

interface ArticleBrowerProps {
  initialArticles?: BlogPost[];
  categories: string[];
  articleParams?: {
    hasMore: boolean;
    nextArticle: string | undefined;
  };
}

export default function ArticlesBrowser({
  initialArticles,
  categories,
  articleParams,
}: ArticleBrowerProps) {
  const [articles, setArticles] = useState<BlogPost[]>(initialArticles ?? []);
  const [moreArticles, setHasMore] = useState<boolean>(
    articleParams?.hasMore ?? false,
  );
  const [nextArticle, setNextArticle] = useState<string | undefined>(
    articleParams?.nextArticle,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchedArticles, setSearchedArticles] = useState<BlogPost[]>(initialArticles ?? []);

  const { ref, inView } = useInView();
  const router = useRouter();

  // const [searchQuery, setSearchQuery] = useState<string>('');

  // const handleSearchChange = (value: string) => {
  //   setSearchQuery(value.toLowerCase());
  // };

  // const changeCategory = (category: string | null) => {
  //   setSelectedCategory(category === 'Tout' ? null : category);
  // };

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

  /**
   * Récupère les articles suivants
   */
  const fetchMore = async () => {
    const {
      articles: newArticles,
      hasMore,
      nextArticle: newNextArticle,
    } = await getArticles(nextArticle);
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setHasMore(hasMore);
    setNextArticle(newNextArticle);
  };

  const handleSearchChange = async (value: string) => {
    const newArticles = await getArticlesByText(value);
    setSearchedArticles(newArticles);
  }

  useEffect(() => {
    if (inView && moreArticles) {
      void fetchMore();
    }
  }, [inView]);

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
          <SearchbarAutocomplete
            onSearchChange={(text) => void handleSearchChange(text)}
            onClick={(url) => { router.push(`/blog/${url}`); }}
            searchList={searchedArticles}
          />
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

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
  const [searchedArticles, setSearchedArticles] = useState<BlogPost[]>(
    initialArticles ?? [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSearchChange = async (value: string) => {
    const newArticles = await getArticlesByText(value);
    setSearchedArticles(newArticles);
  };

  /**
   * Change la catégorie courante
   * @param category Catégorie à afficher
   */
  const changeCategory = (category: string | null) => {
    let currentCategory = category;
    if (category === "Tout") {
      currentCategory = null;
    }

    setIsLoading(true);
    void getArticles(currentCategory).then((newArticles) => { 
      setIsLoading(false);
      setArticles(newArticles.articles); 
    });
  };

  /**
   * Récupère les articles suivants
   */
  const fetchMore = async (category: string | null, next?: string) => {
    const {
      articles: newArticles,
      hasMore,
      nextArticle: newNextArticle,
    } = await getArticles(category, next);
    setHasMore(hasMore);
    setNextArticle(newNextArticle);

    return newArticles;
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
              changeCategory(key as string);
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
            onClick={(url) => {
              router.push(`/blog/${url}`);
            }}
            searchList={searchedArticles}
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-8">
        {!isLoading && articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </div>
      {isLoading  && <Spinner />}
    </section>
  );
}

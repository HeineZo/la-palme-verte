'use client';
import SearchbarAutocomplete from '@/app/blog/components/SearchbarAutocomplete.component';
import { BlogPost } from '@/class/BlogPost.class';
import { Button, ScrollShadow, Spinner } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Key, useEffect, useState } from 'react';
import { getArticles, getArticlesByText } from 'server/blog';
import Article from './Article.component';
import { useRouter } from 'next/navigation';

interface ArticleBrowerProps {
  initialArticles?: BlogPost[];
  categories: string[];
  nextArticle: string | undefined;
}

export default function ArticlesBrowser({
  initialArticles,
  categories,
  nextArticle,
}: ArticleBrowerProps) {
  const router = useRouter();

  const [articles, setArticles] = useState<BlogPost[]>(initialArticles ?? []);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [nextPost, setNextPost] = useState<string | undefined>();
  const [searchedArticles, setSearchedArticles] = useState<BlogPost[]>(
    initialArticles ?? [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Recherche des articles correspondant à la valeur
   * @param value Valeur à rechercher
   */
  const handleSearchChange = async (value: string) => {
    const newArticles = await getArticlesByText(value);
    setSearchedArticles(newArticles);
  };

  /**
   * Change la catégorie courante et récupère les articles correspondants
   * @param category Catégorie à afficher
   */
  const changeCategory = (category: string | null) => {
    let cat = category;
    if (category === 'Tout') {
      cat = null;
    }
    setCurrentCategory(cat);

    void fetchData(cat, nextPost).then((newArticles) => {
      setArticles(newArticles);
    });
  };

  /**
   * Récupère les articles suivants
   */
  const loadMore = () => {
    void fetchData(currentCategory, nextPost).then((newArticles) => {
      setArticles((prev) => [...prev, ...newArticles]);
    });
  };

  /**
   * Récupère les articles
   * @param category Catégorie à récupérer
   * @param next Article suivant
   */
  const fetchData = async (category: string | null, next?: string) => {
    setIsLoading(true);
    const { articles: newArticles, nextArticle: newNextArticle } =
      await getArticles(category, next);
    setNextPost(newNextArticle);
    setIsLoading(false);

    return newArticles;
  };

  return (
    <section className="flex flex-col gap-10 section w-full items-center">
      {/* <h3>Découvrir</h3> */}
      <div className="flex flex-wrap justify-between gap-5 overflow-x-hidden">
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
      <div className="flex w-full flex-wrap gap-8 justify-center">
        {!isLoading &&
          articles.map((article) => (
            <Article article={article} key={article.id} />
          ))}
      </div>
      {isLoading && <Spinner />}
      {!isLoading && nextPost && (
        <Button
          className="text-accent w-fit"
          color="secondary"
          onClick={loadMore}
        >
          Charger plus
        </Button>
      )}
    </section>
  );
}

import { getArticles, getCategories } from 'server/blog';
import Article from './components/Article.component';
import ArticlesBrowser from './components/ArticlesBrowser.component';
import DiscoverPhotos from './components/DiscoverPhotos.component';

/**
 * Page Blog
 */
export default async function page() {
  const { articles, nextArticle } = await getArticles();
  const categories = await getCategories();
  const mainPost = articles.shift();

  return (
    <main>
      <section className="space-y-5">
        <h1>Nos derniers articles</h1>
        <p>
          Retrouvez les derniers articles écrits par les membres de la
          communauté et nos adhérents
        </p>
      </section>
      <section className="section">
        {mainPost && <Article article={mainPost} isMain />}
      </section>
      <ArticlesBrowser
        initialArticles={articles}
        categories={categories}
        nextArticle={nextArticle}
      />
      <DiscoverPhotos />
    </main>
  );
}

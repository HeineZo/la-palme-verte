/* eslint-disable @typescript-eslint/no-unsafe-assignment -- WIP */
import { getCategories, getPages } from 'server/blog';
import Article from './components/Article.component';
import ArticlesBrowser from './components/ArticlesBrowser.component';
import DiscoverPhotos from './components/DiscoverPhotos.component';


/**
 * Page Blog
 */
export default async function page() {
  const posts = await getPages();
  const categories = await getCategories();
  const mainPost = posts.shift();

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
          <Article article={mainPost} isMain loading={true} />
      </section>
      {/* Rest of your components */}
      <ArticlesBrowser articles={JSON.parse(JSON.stringify(posts))} categories={categories} />
      <DiscoverPhotos />
    </main>
  );
}

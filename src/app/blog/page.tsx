import React from 'react';
import Article from './components/Article.component';
import ArticlesBrowser from './components/ArticlesBrowser.component';
import DiscoverPhotos from './components/DiscoverPhotos.component';
import { getCategories, getPages } from 'server/blog';
import { clone } from '@/utils/utils';

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
        {mainPost && <Article article={mainPost} isMain />}
      </section>
      <ArticlesBrowser articles={clone(posts)} categories={categories} />
      <DiscoverPhotos />
    </main>
  );
}

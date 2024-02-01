import React from 'react';
import Article from './components/Article.component';
import ArticlesBrowser from './components/ArticlesBrowser.component';
import DiscoverPhotos from './components/DiscoverPhotos.component';
import { FullBlogPost } from '@/utils/type';
import { getCategories, getPages } from '@/utils/notion';
import Image from 'next/image';
import { BlogPost } from '@/class/BlogPost.class';
import { notFound } from 'next/navigation';

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
      <ArticlesBrowser articles={posts} categories={categories} />
      <DiscoverPhotos />
    </main>
  );
}

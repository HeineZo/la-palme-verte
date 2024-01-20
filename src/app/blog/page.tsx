import React from 'react';
import Article from './components/Article.component';
import ArticlesBrowser from './components/ArticlesBrowser.component';
import DiscoverPhotos from './components/DiscoverPhotos.component';
import { BlogPost } from '@prisma/client';

/**
 * Page Blog
 */
export default function page() {
  const placeholderArticles: BlogPost[] = [
    {
      id: 1,
      title: 'Top 5 des algues les plus rares',
      authorId: 1,
      readTime: 5,
      imageCover:
        'https://images.unsplash.com/photo-1500763702684-af70eba9a9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      content: 'Après quelques recherches sur le web, nous avons pu établir un top 5 des algues les plus rares à trouver en plongée sous-marine.',
      published: false,
      createdAt: new Date('01/01/2021'),
      updatedAt: null,
    },
    {
      id: 2,
      title: 'La crème solaire néfaste pour les coraux',
      authorId: 2,
      readTime: null,
      imageCover:
        'https://images.unsplash.com/photo-1655149000913-88f86c38593f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80',
      content: 'Selon un rapport de l’ONG Haereticus Environmental Laboratory, 14 000 tonnes de crème solaire se déversent chaque année dans les océans, et 25% de ces produits contiennent des substances toxiques pour les coraux.',
      published: false,
      createdAt: new Date('13/08/2023'),
      updatedAt: null,
    },
    {
      id: 3,
      title: 'Les 5 plus beaux spots de plongée',
      authorId: 3,
      readTime: null,
      imageCover:
        'https://images.unsplash.com/photo-1655149002351-132042bee905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
      content: 'Moi et quelques amis avons décidé de partir en voyage pour découvrir les plus beaux spots de plongée du monde. Voici notre top 5.',
      published: false,
      createdAt: new Date('24/09/2022'),
      updatedAt: null,
    },
  ];
  
  
  

  return (
    <main className=' flex justify-center'>
      <section className="section flex gap-5 mt-28 flex-col">
        <h1>Nos derniers articles</h1>
        <p>
          Retrouvez les derniers articles écrits par les membres de la
          communauté et nos adhérents
        </p>
        <div className="flex justify-center">
          <Article article={placeholderArticles[0]} isMain />
        </div>
        <ArticlesBrowser articles={placeholderArticles} />
        <DiscoverPhotos />
      </section>
    </main>
  );
}

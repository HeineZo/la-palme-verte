import React from 'react';
import Article from './components/Article.component';
import ArticlesBrowser from './components/ArticlesBrowser.component';
import DiscoverPhotos from './components/DiscoverPhotos.component';

/**
 * Page Blog
 */
export default function page() {
  const placeholderArticles = [
    {
      titre: 'Top 5 des algues les plus rares',
      description:
        'Après quelques recherches sur le web, nous avons pu établir un top 5 des algues les plus rares à trouver en plongée sous-marine.',
      categories: ['Algues'],
      date: '01/01/2021',
      auteur: 'Jean',
      photo:
        'https://images.unsplash.com/photo-1500763702684-af70eba9a9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      timeToRead: 5,
    },
    {
      titre: 'La crème solaire néfaste pour les coraux',
      description:
        'Selon un rapport de l’ONG Haereticus Environmental Laboratory, 14 000 tonnes de crème solaire se déversent chaque année dans les océans, et 25% de ces produits contiennent des substances toxiques pour les coraux.',
      categories: ['Consommation', 'Plage'],
      date: '13/08/2023',
      auteur: 'Maurice',
      photo:
        'https://images.unsplash.com/photo-1655149000913-88f86c38593f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80',
    },
    {
      titre: 'Les 5 plus beaux spots de plongée',
      description:
        'Moi et quelques amis avons décidé de partir en voyage pour découvrir les plus beaux spots de plongée du monde. Voici notre top 5.',
      categories: ['Voyage'],
      date: '24/09/2022',
      auteur: 'Parzival',
      photo:
        'https://images.unsplash.com/photo-1655149002351-132042bee905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
    },
  ];

  return (
    <main>
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

import Reveal from '@/shared/utils/Reveal.component';
import Button from '@/shared/theme/Button';
import Article from '../components/Article.component';
import { FullBlogPost } from '@/utils/type';

/**
 * Affiche les derniers articles en ligne
 */
export default function LastArticles() {
  // TODO: récupérer les articles depuis l'API
  const placeholderArticles: FullBlogPost[] = [
    {
      id: 0,
      authorId: 0,
      readTime: 300,
      published: true,
      updatedAt: new Date(),
      title: 'Top 5 des algues les plus rares',
      content:
				'Après quelques recherches sur le web, nous avons pu établir un top 5 des algues les plus rares à trouver en plongée sous-marine.',
      categories: [{ id: 0, name: 'Plongée' }],
      createdAt: new Date(),
      author: { id: 1, name: 'Parzival', email: '', role: 'Admin', profilePicture: '', socialMediaId: 1, description: '' },
      imageCover: 'https://images.unsplash.com/photo-1500763702684-af70eba9a9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    },
    {
      id: 1,
      authorId: 0,
      readTime: 300,
      published: true,
      updatedAt: new Date(),
      title: 'La crème solaire néfaste pour les coraux',
      content:
				'Selon un rapport de l’ONG Haereticus Environmental Laboratory, 14 000 tonnes de crème solaire se déversent chaque année dans les océans, et 25% de ces produits contiennent des substances toxiques pour les coraux.',
      categories: [{id: 0, name: 'Plongée' }, {id: 1, name: 'Voyage' }],
      createdAt: new Date(),
      author: { id: 0, name: 'Maurice', email: '', role: 'Admin', profilePicture: '', socialMediaId: 2, description: '' },
      imageCover: 'https://images.unsplash.com/photo-1655149000913-88f86c38593f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80',
    },
    {
      id: 2,
      authorId: 0,
      readTime: 300,
      published: true,
      updatedAt: new Date(),
      title: 'Les 5 plus beaux spots de plongée',
      content:
				'Moi et quelques amis avons décidé de partir en voyage pour découvrir les plus beaux spots de plongée du monde. Voici notre top 5.',
      categories: [{id: 0, name: 'Plongée' }, {id: 1, name: 'Voyage' }],
      createdAt: new Date(),
      author: { id: 1, name: 'Parzival', email: '', role: 'Admin', profilePicture: '', socialMediaId: 1, description: '' },
      imageCover: 'https://images.unsplash.com/photo-1655149002351-132042bee905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
    },
  ];

  return (
    <div className="section flex flex-col justify-center items-center gap-16">
      <div className="flex flex-col justify-center items-center gap-6 text-center">
        <h2>Nos derniers articles</h2>
        <p>
          En tant qu’adhérant vous avez la possibilité de rédiger des articles
          pour notre blog, voici les derniers articles de la communauté
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-8">
        {placeholderArticles.map((article, index) => (
          <Reveal index={index} key={article.title}>
            <Article article={article} />
          </Reveal>
        ))}
      </div>
      <Button className="text-accent w-fit" color="secondary">
        Voir plus
      </Button>
    </div>
  );
}

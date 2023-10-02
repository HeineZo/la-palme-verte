import Article from '../components/Article.component';
import Reveal from '@/shared/utils/Reveal.component';
import { Button } from '@/shared/theme/Button';

/**
 * Affiche les derniers articles en ligne
 */
export default function LastArticles() {
  // TODO: récupérer les articles depuis l'API
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
          <Reveal index={index} key={article.titre}>
            <Article article={article} />
          </Reveal>
        ))}
      </div>
      <Button color="secondary" className="text-accent w-fit">
        Voir plus
      </Button>
    </div>
  );
}

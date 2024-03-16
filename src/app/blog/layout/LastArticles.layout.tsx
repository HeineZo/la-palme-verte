import Reveal from '@/shared/utils/Reveal.component';
import Button from '@/shared/theme/Button';
import Article from '../components/Article.component';
import { getArticles } from 'server/blog';

/**
 * Affiche les derniers articles en ligne
 */
export default async function LastArticles() {
  const { articles } = await getArticles();

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
        {articles.map((article) => (
            <Article article={article} key={article.id} />
        ))}
      </div>
      <Button className="text-accent w-fit" color="secondary">
        Voir plus
      </Button>
    </div>
  );
}

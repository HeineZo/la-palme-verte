import Button from '@/shared/theme/Button';
import Reveal from '@/shared/utils/Reveal.component';
import { getPages } from 'server/blog';
import Article from '../components/Article.component';


/**
 * Affiche les derniers articles en ligne
 */
export default async function LastArticles() {
  const posts = await getPages();

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
        {posts.map((article, index) => (
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

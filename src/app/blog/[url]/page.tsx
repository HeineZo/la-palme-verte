import bookmarkPlugin from '@notion-render/bookmark-plugin';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';
import { getPageByUrl, getPageContent } from 'server/blog';
import { notionClient } from 'server/database';
import ArticleContent from './components/ArticleContent';

interface PageProps {
  params: {
    url: string;
  };
}

/**
 * Page d'articles
 * @param params URL de la page
 */
export default async function Page({ params }: PageProps) {
  const post = await getPageByUrl(params.url);

  const content = await getPageContent(post.id);
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);

  return (
    <ArticleContent
      article={post}
      htmlContent={html}
    />
  );
}

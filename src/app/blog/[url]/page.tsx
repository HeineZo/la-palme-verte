/* eslint-disable @typescript-eslint/no-unsafe-call -- L'API de Notion est mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-return -- L'API de Notion est mal typé */
/* eslint-disable @typescript-eslint/no-explicit-any -- L'API de Notion est mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- L'API de Notion est mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- L'API de Notion est mal typé */
import { getPageByUrl, getPageContent, notionClient } from '@/utils/notion';
import bookmarkPlugin from '@notion-render/bookmark-plugin';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';
import { notFound } from 'next/navigation';
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

  // if (!post) {
  //   notFound();
  // }

  const content = await getPageContent(post.id);
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);

  return (
    <ArticleContent
      title={post.title}
      categories={post.categories}
      cover={post.cover}
      content={html}
    />
  );
}

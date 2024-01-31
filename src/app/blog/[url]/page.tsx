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

export default async function Page({ params }: PageProps) {
  const post = await getPageByUrl(params.url);

  if (!post) {
    notFound();
  }

  const content = await getPageContent(post.id);
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);

  return (
    <ArticleContent
      title={(post.properties.Titre as any).title[0].plain_text}
      categories={(post.properties.Catégories as any).multi_select.map((c: any) => c.name)}
      cover={(post.properties.Cover as any).url}
      content={html}
    />
  );
}

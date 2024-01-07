'use client';

import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

export interface Post {
  title: string;
  watched: boolean;
}

const posts = atom<Post[]>([]);

export default function JotaiTest({ postsSent }: { postsSent: Post[] }) {
  useHydrateAtoms([[posts, postsSent]]);

  // const progressAtom = atom((get) => {
  //   const post = get(posts);
  //   return post.filter((item) => item.watched).length / post.length;
  // });

  const [post, setPost] = useAtom(posts);

  return (
    <>
      <ul>
        {post.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => {
          setPost((prevPost) => [
            ...prevPost,
            {
              title: `Post ${(prevPost.length + 1).toString()}`,
              watched: false,
            },
          ]);
        }}
      >
        Add Post
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setPost((prevPost) => prevPost.slice(0, prevPost.length - 1));
        }}
      >
        Remove
      </button>
    </>
  );
}

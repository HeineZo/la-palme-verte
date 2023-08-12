"use client";

import { atom, useAtom } from "jotai";

const countAtom = atom(0);

const countryAtom = atom("Japan");

const citiesAtom = atom(["Tokyo", "Kyoto", "Osaka"]);

const animeAtom = atom([
  {
    title: "Ghost in the Shell",
    year: 1995,
    watched: true,
  },
  {
    title: "Serial Experiments Lain",
    year: 1998,
    watched: false,
  },
]);
export default function JotaiTest() {
  const progressAtom = atom((get) => {
    const anime = get(animeAtom);
    return anime.filter((item) => item.watched).length / anime.length;
  });

  const [anime, setAnime] = useAtom(animeAtom);

  return (
    <>
      <ul>
        {anime.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => {
          setAnime((anime) => [
            ...anime,
            {
              title: "Cowboy Bebop",
              year: 1998,
              watched: false,
            },
          ]);
        }}
      >
        Add Cowboy Bebop
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setAnime((anime) => anime.slice(0, anime.length - 1));
        }}
      >
        Remove
      </button>
    </>
  );
}

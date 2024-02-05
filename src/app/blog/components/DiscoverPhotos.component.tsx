'use client';

import Reveal from '@/shared/utils/Reveal.component';
import { Button } from '@nextui-org/react';
import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';

export default function DiscoverPhotos() {
  return (
    <div className="flex flex-col lg:flex-row gap-20 px-10 section items-center justify-between bg-highlight rounded-medium">
      <div className="flex flex-col gap-6 lg:w-1/2">
        <Reveal>
          <h2>Découvrez les dernières photos de l'association</h2>
        </Reveal>
        <Reveal index={3}>
          <Button
            color="primary"
            endContent={<IconChevronRight size={16} />}
            className="w-fit hidden lg:flex"
          >
            Voir les photos
          </Button>
        </Reveal>
      </div>
      <div className="relative group cursor-pointer hover:scale-105 transition-all duration-300">
        <Image
          width={550}
          height={300}
          alt="Image de fond marin"
          src="https://images.unsplash.com/photo-1506434304575-afbb92660c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          className="rounded-large relative z-20 -rotate-3 group-hover:rotate-0 group-hover:shadow-none transition-all duration-300 shadow-2xl"
        />
        <Image
          width={550}
          height={300}
          alt="Image de fond marin"
          src="https://images.unsplash.com/photo-1691632194607-5890dcae879c?q=80&w=2658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="rounded-large absolute left-10 bottom-10 z-10 rotate-3 group-hover:rotate-0 group-hover:shadow-none transition-all duration-300 shadow-2xl"
        />
      </div>
      <Reveal index={3}>
        <Button
          color="primary"
          endContent={<IconChevronRight size={16} />}
          className="w-fit lg:hidden"
        >
          Voir les photos
        </Button>
      </Reveal>
    </div>
  );
}

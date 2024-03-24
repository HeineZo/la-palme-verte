import Reveal from '@/shared/utils/Reveal.component';
import { Button, Link, Image } from '@nextui-org/react';
import { IconChevronRight } from '@tabler/icons-react';
import { getLatestImages } from 'server/album';

export default async function DiscoverPhotos() {
  const photos = await getLatestImages();

  return (
    <div className="flex flex-col lg:flex-row gap-20 section items-center justify-between bg-highlight rounded-medium">
      <div className="flex flex-col gap-6 lg:w-1/2 px-10">
        <Reveal>
          <h4 className='lg:text-5xl'>Découvrez les dernières photos de l'association</h4>
        </Reveal>
        <Reveal index={3}>
          <Button
            color="primary"
            endContent={<IconChevronRight size={16} />}
            className="w-fit hidden lg:flex"
            as={Link}
            href="/photos"
          >
            Voir les photos
          </Button>
        </Reveal>
      </div>
      <div className="relative group hover:scale-105 transition-all duration-300 w-2/3 lg:w-1/3 py-5">
        <Image
          src={photos[0]}
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
          as={Link}
          href="/photos"
        >
          Voir les photos
        </Button>
      </Reveal>
    </div>
  );
}

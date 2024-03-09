import BecomeMember from '@/shared/components/BecomeMember.component';
import MemberCard from '@/shared/components/MemberCard.component';
import PhotoCarrousel from '@/shared/components/PhotoCarrousel.component';
import Timeline from '@/shared/layout/Timeline.layout';
import Counter from '@/shared/utils/Counter.component';
import Reveal from '@/shared/utils/Reveal.component';
import { FullUser } from '@/utils/type';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { IconMail, IconMapPin } from '@tabler/icons-react';
import { differenceInCalendarYears } from 'date-fns';
import timelineEvents from './assets/timeline-events.json';

/**
 * Page de présentation de l'association
 */
export default function Page() {
  const staffMembers: FullUser[] = [
    {
      id: 0,
      name: 'Killian',
      role: 'Admin',
      description: "J'aime le ski",
      profilePicture:
        'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
      socials: {
        id: 0,
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/',
      },
      posts: [],
      email: '',
      socialMediaId: 0,
    },
    {
      id: 1,
      name: 'Chloé',
      description: "J'aime les sacs Hermès",
      role: 'Admin',
      profilePicture:
        'https://images.unsplash.com/photo-1615538785945-6625ccdb4b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        id: 1,
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/',
      },
      posts: [],
      email: '',
      socialMediaId: 1,
    },
    {
      id: 2,
      name: 'Louann',
      description: "J'aime les crêpes",
      role: 'Admin',
      profilePicture:
        'https://images.unsplash.com/photo-1614436201459-156d322d38c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        id: 2,
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/',
      },
      posts: [],
      email: '',
      socialMediaId: 2,
    },
    {
      id: 3,
      name: 'Côme',
      description: "J'aime les pâtes",
      role: 'Admin',
      profilePicture:
        'https://images.unsplash.com/photo-1541290431335-1f4c2152e899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        id: 3,
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/',
      },
      posts: [],
      email: '',
      socialMediaId: 3,
    },
    {
      id: 4,
      name: 'Mélisande',
      description: "J'aime les chats",
      role: 'Admin',
      profilePicture:
        'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        id: 4,
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/',
      },
      posts: [],
      email: '',
      socialMediaId: 4,
    },
    {
      id: 5,
      name: 'Eva',
      description: "J'aime les chiens",
      role: 'Admin',
      profilePicture:
        'https://images.unsplash.com/photo-1619799087179-061f19622476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        id: 5,
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        instagram: 'https://www.instagram.com/',
        linkedin: 'https://www.linkedin.com/',
      },
      posts: [],
      email: '',
      socialMediaId: 5,
    },
  ];

  return (
    <main>
      <section className="section flex justify-between section gap-20 mt-28 flex-col lg:flex-row">
        <h1>Qui sommes-nous ?</h1>
        <div className="flex flex-col gap-6 lg:w-1/2">
          <p>
            Notre aventure commence en 2005, à l’origine réservée au personnel
            et aux anciens étudiants de l’UBS, nous sommes une association à but
            non-lucratif dont l’objectif majeur est de favoriser la connaissance
            de la biodiversité subaquatique par le biais de différentes
            activités (soirées de bio marines, sorties ornithologiques,
            plongées).
          </p>
          <p>
            Nous souhaitons également intervenir dans différentes actions
            d'éco-citoyenneté et sensibiliser le public à la protection de la
            biodiversité marine (nettoyages de plages, soirées caritatives).
            Aujourd’hui, nous sommes ouverts à tous les étudiants de l’UBS et
            nous vous attendons avec impatience !
          </p>
        </div>
      </section>
      <section className="flex w-full justify-center items-center section">
        <Image
          alt="Photo de groupe"
          src="/assets/association/photo_groupe.png"
        />
      </section>
      <section className="flex justify-between gap-20 flex-col lg:flex-row section">
        <h1 className="">
          Une association qui traverse les générations
        </h1>
        <div className='lg:w-1/2'>
          <Timeline events={timelineEvents} />
        </div>
      </section>
      <section className="flex justify-between lg:mx-10 section gap-20 flex-col lg:flex-row rounded-medium bg-primary-100">
        <div className="flex flex-col gap-10 lg:w-1/2">
          <div>
            <h1>Quelques chiffres</h1>
            <p>
              Depuis la création de l’association, nous ne cessons de réaliser
              des événements et des ateliers pour permettre de sensibiliser à la
              protection de l’environnement marin.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-6 w-full justify-between">
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-5xl font-heading font-bold"
                  value={20}
                />
                <Reveal>
                  <p>Ateliers réalisés</p>
                </Reveal>
              </span>
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-5xl font-heading font-bold"
                  value={differenceInCalendarYears(
                    new Date(),
                    new Date(2005, 1, 1),
                  )}
                />
                <Reveal>
                  <p>Années d'expérience</p>
                </Reveal>
              </span>
            </div>
            <div className="flex gap-6 w-full justify-between">
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-5xl font-heading font-bold"
                  suffix="€"
                  value={200}
                />
                <Reveal>
                  <p>Récoltés pour la protection de la faune maritime</p>
                </Reveal>
              </span>
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  fontStyle="text-5xl font-heading font-bold"
                  value={59} //TODO: rempalcer par une méthode getAdherentCount()
                />
                <Reveal>
                  <p>Adhérents</p>
                </Reveal>
              </span>
            </div>
          </div>
        </div>
        <PhotoCarrousel
          className="lg:w-1/2"
          height="h-[500px]"
          photos={[
            'https://images.unsplash.com/photo-1574802406791-ef6898f311d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
            'https://images.unsplash.com/photo-1574802406791-ef6898f311d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
          ]}
        />
      </section>
      <div className="section flex flex-col text-center items-center gap-20">
        <div className="flex flex-col gap-6">
          <h1>L'équipe</h1>
          <p>
            Le coeur de l'association bat au rythme des membres d'une jeune
            équipe talentueuse et motivée.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 justify-center">
          {staffMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
        <BecomeMember
          buttonTitle="Candidater"
          showInfiniteLoop={false}
          subtitle="Faites nous part de votre candidature et participez à une association dynamique"
          title="Vous souhaitez nous rejoindre ?"
        />
      </div>
      <div className="flex justify-between flex-col lg:flex-row section gap-5">
        <div className="flex flex-col gap-10 mb-10">
          <div>
            <h1>Contactez-nous</h1>
            <p className="break-word">
              Une question, une remarque, un avis ? Venez-nous en parler par
              message ou en personne !
            </p>
          </div>
          <div className="flex gap-4">
            <IconMapPin />
            <div>
              <h6>Email</h6>
              <Link
                color="foreground"
                href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
                underline="hover"
              >
                lapalmeverte.association@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            <IconMail />
            <div>
              <h6>Localisation</h6>
              <Link
                href="https://www.google.com/maps?ll=47.645279,-2.746143&z=14&t=m&hl=fr&gl=FR&mapclient=embed&cid=15593355113507095576"
                isExternal
                showAnchorIcon
              >
                Université Bretagne Sud - Vannes 56000
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <iframe
            className="rounded-medium"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10752.05926845766!2d-2.7461428!3d47.6452789!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48101e9be97d2849%3A0xd866b9dbcd1c8418!2sUniversit%C3%A9%20de%20Bretagne%20Sud%20UBS!5e0!3m2!1sfr!2sfr!4v1696194379296!5m2!1sfr!2sfr"
            title="Où sommes-nous ?"
            width="100%"
          />
        </div>
      </div>
    </main>
  );
}

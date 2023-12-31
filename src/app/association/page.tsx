import BecomeMember from '@/shared/components/BecomeMember.component';
import { IconMail, IconMapPin } from '@tabler/icons-react';
import { Image } from '@nextui-org/image';
import Timeline from '@/shared/layout/Timeline.layout';
import timelineEvents from './assets/timeline-events.json';
import PhotoCarrousel from '@/shared/components/PhotoCarrousel.component';
import Counter from '@/shared/utils/Counter.component';
import Reveal from '@/shared/utils/Reveal.component';
import { Link } from '@nextui-org/link';
import MemberCard, { Member } from '@/shared/components/MemberCard.component';

/**
 * Page de présentation de l'association
 */
export default async function Page() {
  const staffMembers: Member[] = [
    {
      name: 'Killian',
      role: 'Trésorier',
      avatar:
        'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
      socials: {
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        linkedin: 'https://www.linkedin.com/',
      },
    },
    {
      name: 'Chloé',
      role: 'Secrétaire',
      avatar:
        'https://images.unsplash.com/photo-1615538785945-6625ccdb4b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        mail: 'mailto:',
      },
    },
    {
      name: 'Louann',
      role: 'Graphiste',
      avatar:
        'https://images.unsplash.com/photo-1614436201459-156d322d38c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        mail: 'mailto:',
      },
    },
    {
      name: 'Côme',
      role: 'Responsable communication',
      avatar:
        'https://images.unsplash.com/photo-1541290431335-1f4c2152e899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        mail: 'mailto:',
      },
    },
    {
      name: 'Mélisande',
      role: 'Responsable animation',
      avatar:
        'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        mail: 'mailto:',
      },
    },
    {
      name: 'Eva',
      role: 'Organisatrice événements',
      avatar:
        'https://images.unsplash.com/photo-1619799087179-061f19622476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      socials: {
        facebook: 'https://www.facebook.com/',
        x: 'https://twitter.com/',
        mail: 'mailto:',
      },
    },
  ];

  return (
    <main>
      <section className="section flex justify-between section gap-20 mt-28 flex-col lg:flex-row">
        <h1>Une association ...</h1>
        <div className="flex flex-col gap-6 lg:w-1/2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            varius faucibus massa sollicitudin amet augue. Nibh metus a semper
            purus mauris duis. Lorem eu neque, tristique quis duis. Nibh
            scelerisque ac adipiscing velit non nulla in amet pellentesque.
          </p>
          <p>
            Sit turpis pretium eget maecenas. Vestibulum dolor mattis
            consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem
            mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse
            vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam
            ullamcorper in fringilla arcu aliquet fames arcu.
          </p>
          <p>
            Lacinia eget faucibus urna, nam risus nec elementum cras porta. Sed
            elementum, sed dolor purus dolor dui. Ut dictum nulla pulvinar
            vulputate sit sagittis in eleifend dignissim. Natoque mauris cras
            molestie velit. Maecenas eget adipiscing quisque viverra lectus
            arcu, tincidunt ultrices pellentesque.
          </p>
        </div>
      </section>
      <section className="section flex w-full justify-center items-center">
        <Image
          src="/assets/association/photo_groupe.png"
          alt="Photo de groupe"
        />
      </section>
      <section className="flex justify-between section gap-20 flex-col lg:flex-row">
        <h1>... qui traverse les générations</h1>
        <div className="lg:w-1/2">
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
                  value={20}
                  fontStyle="text-5xl font-heading font-bold"
                />
                <Reveal>
                  <p>Ateliers réalisés</p>
                </Reveal>
              </span>
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  value={18}
                  fontStyle="text-5xl font-heading font-bold"
                />
                <Reveal>
                  <p>Années d'expérience</p>
                </Reveal>
              </span>
            </div>
            <div className="flex gap-6 w-full justify-between">
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  value={300}
                  fontStyle="text-5xl font-heading font-bold"
                  suffix="€"
                />
                <Reveal>
                  <p>Récoltés pour la protection de la faune maritime</p>
                </Reveal>
              </span>
              <span className="flex flex-col gap-2 w-1/2">
                <Counter
                  value={15}
                  fontStyle="text-5xl font-heading font-bold"
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
            <MemberCard member={member} key={index} />
          ))}
        </div>
        <BecomeMember
          title="Vous souhaitez nous rejoindre ?"
          subtitle="Faites nous part de votre candidature et participez à une association dynamique"
          showInfiniteLoop={false}
          buttonTitle="Candidater"
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
                underline="hover"
                href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
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
                isExternal
                showAnchorIcon
                href="https://www.google.com/maps?ll=47.645279,-2.746143&z=14&t=m&hl=fr&gl=FR&mapclient=embed&cid=15593355113507095576"
              >
                Université Bretagne Sud - Vannes 56000
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <iframe
            title="Où sommes-nous ?"
            className="rounded-medium"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10752.05926845766!2d-2.7461428!3d47.6452789!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48101e9be97d2849%3A0xd866b9dbcd1c8418!2sUniversit%C3%A9%20de%20Bretagne%20Sud%20UBS!5e0!3m2!1sfr!2sfr!4v1696194379296!5m2!1sfr!2sfr"
            width="100%"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
